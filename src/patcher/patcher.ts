// =============================================================================
// Patcher — podmienia angielskie stringi na polskie w plikach Antigravity
// =============================================================================
// WAŻNE: Ten moduł modyfikuje pliki w folderze instalacyjnym Antigravity.
//        Przed każdą zmianą tworzy backup, żeby można było przywrócić oryginał.
// =============================================================================

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { getAllTranslations, TranslationEntry } from './translations';

interface AntigravityPaths {
    jetskiMain: string;
    backup: string;
    productJson: string;
}

// Ścieżka do pliku Agent Managera (React SPA z UI Settings + Agent Manager)
function getAntigravityPaths(): AntigravityPaths | null {
    // Windows: AppData\Local\Programs\Antigravity
    const localAppData = process.env.LOCALAPPDATA || '';
    const basePath = path.join(localAppData, 'Programs', 'Antigravity', 'resources', 'app', 'out', 'jetskiAgent');
    const mainJs = path.join(basePath, 'main.js');
    const backupJs = path.join(basePath, 'main.js.backup-pl');
    const productJson = path.join(localAppData, 'Programs', 'Antigravity', 'resources', 'app', 'product.json');

    if (fs.existsSync(mainJs)) {
        return { jetskiMain: mainJs, backup: backupJs, productJson };
    }

    // macOS: /Applications/Antigravity.app/Contents/Resources/app/out/jetskiAgent
    const macPath = '/Applications/Antigravity.app/Contents/Resources/app/out/jetskiAgent';
    const macMain = path.join(macPath, 'main.js');
    const macBackup = path.join(macPath, 'main.js.backup-pl');
    const macProduct = '/Applications/Antigravity.app/Contents/Resources/app/product.json';
    if (fs.existsSync(macMain)) {
        return { jetskiMain: macMain, backup: macBackup, productJson: macProduct };
    }

    // Linux: ~/.local/share/antigravity (lub /usr/share/antigravity)
    const home = process.env.HOME || '';
    const linuxPath = path.join(home, '.local', 'share', 'antigravity', 'resources', 'app', 'out', 'jetskiAgent');
    const linuxMain = path.join(linuxPath, 'main.js');
    const linuxBackup = path.join(linuxPath, 'main.js.backup-pl');
    const linuxProduct = path.join(home, '.local', 'share', 'antigravity', 'resources', 'app', 'product.json');
    if (fs.existsSync(linuxMain)) {
        return { jetskiMain: linuxMain, backup: linuxBackup, productJson: linuxProduct };
    }

    return null;
}

export interface PatchResult {
    success: boolean;
    message: string;
    replacedCount: number;
    skippedCount: number;
    unmatchedCount: number;
    ambiguousCount: number;
    exactAppliedCount: number;
    regexAppliedCount: number;
    details: string[];
}

interface PreparedTranslation {
    entry: TranslationEntry;
    mode: 'exact' | 'regex';
    flags: string;
    priority: number;
    index: number;
}

interface DuplicateConflict {
    en: string;
    translations: string[];
}

/**
 * Aplikuje polskie tłumaczenia do pliku main.js Agent Managera.
 * Tworzy backup przed pierwszą zmianą. Idempotentna — można uruchomić wielokrotnie. 
 */
export function applyPolishPatch(): PatchResult {
    const paths = getAntigravityPaths();
    if (!paths) {
        return {
            success: false,
            message: 'Nie znaleziono instalacji Antigravity. Upewnij się, że program jest zainstalowany.',
            replacedCount: 0,
            skippedCount: 0,
            unmatchedCount: 0,
            ambiguousCount: 0,
            exactAppliedCount: 0,
            regexAppliedCount: 0,
            details: []
        };
    }

    // Odczytaj plik — ZAWSZE z backupu (oryginał EN) jeśli istnieje
    let content: string;
    try {
        // Jeśli backup istnieje, czytamy z niego (czysty EN) i nadpisujemy main.js
        const sourceFile = fs.existsSync(paths.backup) ? paths.backup : paths.jetskiMain;
        content = fs.readFileSync(sourceFile, 'utf-8');
    } catch (err) {
        return {
            success: false,
            message: `Nie można odczytać pliku: ${paths.jetskiMain}. Błąd: ${err}`,
            replacedCount: 0,
            skippedCount: 0,
            unmatchedCount: 0,
            ambiguousCount: 0,
            exactAppliedCount: 0,
            regexAppliedCount: 0,
            details: []
        };
    }

    // Utwórz backup (tylko jeśli nie istnieje — zachowaj oryginalny angielski)
    if (!fs.existsSync(paths.backup)) {
        try {
            fs.copyFileSync(paths.jetskiMain, paths.backup);
        } catch (err) {
            return {
                success: false,
                message: `Nie można utworzyć kopii zapasowej: ${err}`,
                replacedCount: 0,
                skippedCount: 0,
                unmatchedCount: 0,
                ambiguousCount: 0,
                exactAppliedCount: 0,
                regexAppliedCount: 0,
                details: []
            };
        }
    }

    const preparedTranslations = prepareTranslations(getAllTranslations());
    const duplicateConflicts = findDuplicateConflicts(preparedTranslations);

    let replaced = 0;
    let skipped = 0;
    let unmatched = 0;
    let ambiguous = 0;
    let exactApplied = 0;
    let regexApplied = 0;
    const details: string[] = [];

    if (duplicateConflicts.length > 0) {
        ambiguous += duplicateConflicts.length;
        for (const conflict of duplicateConflicts) {
            details.push(`⚠️ Kolizja mapowania EN: ${truncate(conflict.en)} -> [${conflict.translations.map(truncate).join(' | ')}]`);
        }
    }

    const unsafeShortPatterns = detectUnsafeShortPatterns(preparedTranslations);
    if (unsafeShortPatterns.size > 0) {
        ambiguous += unsafeShortPatterns.size;
        for (const token of unsafeShortPatterns) {
            details.push(`⚠️ Potencjalna kolizja krótkiego tekstu: ${truncate(token)}`);
        }
    }

    for (const t of preparedTranslations) {
        if (t.entry.en === t.entry.pl) {
            skipped++;
            continue;
        }

        if (t.mode === 'regex') {
            const regex = buildRegex(t.entry.en, t.flags);
            if (!regex) {
                skipped++;
                ambiguous++;
                details.push(`⚠️ Błędny regex: ${truncate(t.entry.en)}`);
                continue;
            }

            const matches = content.match(regex);
            const count = matches ? matches.length : 0;
            if (count > 0) {
                content = content.replace(regex, t.entry.pl);
                replaced += count;
                regexApplied++;
                details.push(`✅ [regex x${count}] ${truncate(t.entry.en)}`);
            } else if (content.includes(t.entry.pl)) {
                skipped++;
                details.push(`⏭️ Już PL: ${truncate(t.entry.pl)}`);
            } else {
                skipped++;
                unmatched++;
                details.push(`⚠️ Nie znaleziono (regex): ${truncate(t.entry.en)}`);
            }
            continue;
        }

        // exact
        if (isUnsafeExactEntry(t.entry.en) && !isContextAnchoredExactEntry(t.entry.en)) {
            // Już przetłumaczone
            skipped++;
            ambiguous++;
            details.push(`⚠️ Pominięto ryzykowny krótki wpis exact: ${truncate(t.entry.en)}`);
            continue;
        }

        const occurrenceCount = countOccurrences(content, t.entry.en);
        if (occurrenceCount > 0) {
            content = content.split(t.entry.en).join(t.entry.pl);
            replaced += occurrenceCount;
            exactApplied++;
            details.push(`✅ [exact x${occurrenceCount}] ${truncate(t.entry.en)}`);
        } else if (content.includes(t.entry.pl)) {
            skipped++;
            details.push(`⏭️ Już PL: ${truncate(t.entry.pl)}`);
        } else {
            skipped++;
            unmatched++;
            details.push(`⚠️ Nie znaleziono: ${truncate(t.entry.en)}`);
        }
    }

    // Zapisz spatchowany plik
    if (replaced > 0) {
        try {
            fs.writeFileSync(paths.jetskiMain, content, 'utf-8');
        } catch (err) {
            return {
                success: false,
                message: `Nie można zapisać spatchowanego pliku: ${err}. Możliwe, że Antigravity jest uruchomiony — zamknij go i spróbuj ponownie.`,
                replacedCount: 0,
                skippedCount: 0,
                unmatchedCount: unmatched,
                ambiguousCount: ambiguous,
                exactAppliedCount: exactApplied,
                regexAppliedCount: regexApplied,
                details
            };
        }

        // Aktualizuj checksum w product.json, aby uniknąć ostrzeżenia "instalacja uszkodzona"
        try {
            updateProductChecksum(paths, content);
            details.push('✅ Zaktualizowano checksum w product.json');
        } catch (err) {
            details.push(`⚠️ Nie udało się zaktualizować checksumu: ${err}`);
        }
    }

    return {
        success: true,
        message: replaced > 0
            ? `Spolszczono ${replaced} elementów interfejsu! Uruchom ponownie Antigravity, aby zobaczyć zmiany.`
            : 'Interfejs jest już spolszczony — nie trzeba nic zmieniać.',
        replacedCount: replaced,
        skippedCount: skipped,
        unmatchedCount: unmatched,
        ambiguousCount: ambiguous,
        exactAppliedCount: exactApplied,
        regexAppliedCount: regexApplied,
        details
    };
}

/**
 * Aktualizuje checksum pliku jetskiAgent/main.js w product.json.
 * Zapobiega ostrzeżeniu "instalacja jest uszkodzona" po patchowaniu.
 */
function updateProductChecksum(paths: AntigravityPaths, fileContent: string): void {
    if (!fs.existsSync(paths.productJson)) {
        return;
    }

    // Backup product.json (tylko raz)
    const productBackup = paths.productJson + '.backup-pl';
    if (!fs.existsSync(productBackup)) {
        fs.copyFileSync(paths.productJson, productBackup);
    }

    const hash = crypto.createHash('sha256').update(fileContent).digest('base64');
    const productRaw = fs.readFileSync(paths.productJson, 'utf-8');
    const product = JSON.parse(productRaw);

    if (product.checksums && product.checksums['jetskiAgent/main.js']) {
        product.checksums['jetskiAgent/main.js'] = hash;
        fs.writeFileSync(paths.productJson, JSON.stringify(product, null, '\t'), 'utf-8');
    }
}

/**
 * Przywraca oryginalne angielskie stringi z backupu.
 */
export function restoreOriginal(): PatchResult {
    const paths = getAntigravityPaths();
    if (!paths) {
        return {
            success: false,
            message: 'Nie znaleziono instalacji Antigravity.',
            replacedCount: 0,
            skippedCount: 0,
            unmatchedCount: 0,
            ambiguousCount: 0,
            exactAppliedCount: 0,
            regexAppliedCount: 0,
            details: []
        };
    }

    if (!fs.existsSync(paths.backup)) {
        return {
            success: false,
            message: 'Nie znaleziono kopii zapasowej — oryginalny plik nie był modyfikowany lub backup został usunięty.',
            replacedCount: 0,
            skippedCount: 0,
            unmatchedCount: 0,
            ambiguousCount: 0,
            exactAppliedCount: 0,
            regexAppliedCount: 0,
            details: []
        };
    }

    try {
        fs.copyFileSync(paths.backup, paths.jetskiMain);

        // Przywróć oryginalny product.json
        const productBackup = paths.productJson + '.backup-pl';
        if (fs.existsSync(productBackup)) {
            fs.copyFileSync(productBackup, paths.productJson);
        }

        return {
            success: true,
            message: 'Przywrócono oryginalną (angielską) wersję interfejsu. Uruchom ponownie Antigravity.',
            replacedCount: 0,
            skippedCount: 0,
            unmatchedCount: 0,
            ambiguousCount: 0,
            exactAppliedCount: 0,
            regexAppliedCount: 0,
            details: ['Backup przywrócony pomyślnie']
        };
    } catch (err) {
        return {
            success: false,
            message: `Błąd podczas przywracania: ${err}. Zamknij Antigravity i spróbuj ponownie.`,
            replacedCount: 0,
            skippedCount: 0,
            unmatchedCount: 0,
            ambiguousCount: 0,
            exactAppliedCount: 0,
            regexAppliedCount: 0,
            details: []
        };
    }
}

/**
 * Sprawdza stan patcha — czy interfejs jest po polsku, angielsku, czy w stanie mieszanym.
 */
export function checkPatchStatus(): { patched: boolean; canPatch: boolean; details: string } {
    const paths = getAntigravityPaths();
    if (!paths) {
        return { patched: false, canPatch: false, details: 'Nie znaleziono instalacji Antigravity.' };
    }

    let content: string;
    try {
        content = fs.readFileSync(paths.jetskiMain, 'utf-8');
    } catch {
        return { patched: false, canPatch: false, details: 'Nie można odczytać pliku Antigravity.' };
    }

    const translations = prepareTranslations(getAllTranslations());
    let polishFound = 0;
    let englishFound = 0;

    for (const t of translations) {
        if (t.entry.en === t.entry.pl) { continue; }
        if (content.includes(t.entry.pl)) {
            polishFound++;
            continue;
        }

        if (t.mode === 'exact' && content.includes(t.entry.en)) {
            englishFound++;
        }
    }

    const total = polishFound + englishFound;
    if (polishFound === total && total > 0) {
        return { patched: true, canPatch: true, details: `Interfejs w pełni po polsku (${polishFound} elementów).` };
    } else if (englishFound === total && total > 0) {
        return { patched: false, canPatch: true, details: `Interfejs po angielsku — gotowy do spolszczenia (${total} elementów).` };
    } else {
        return {
            patched: false,
            canPatch: true,
            details: `Stan mieszany: ${polishFound} PL / ${englishFound} EN. Uruchom patchowanie ponownie.`
        };
    }
}

function prepareTranslations(entries: TranslationEntry[]): PreparedTranslation[] {
    return entries
        .map((entry, index): PreparedTranslation => ({
            entry,
            mode: entry.mode ?? 'exact',
            flags: normalizeRegexFlags(entry.flags),
            priority: entry.priority ?? 0,
            index,
        }))
        .sort((a, b) => {
            if (a.priority !== b.priority) {
                return b.priority - a.priority;
            }
            if (a.entry.en.length !== b.entry.en.length) {
                return b.entry.en.length - a.entry.en.length;
            }
            return a.index - b.index;
        });
}

function normalizeRegexFlags(flags: string | undefined): string {
    if (!flags || flags.trim().length === 0) {
        return 'g';
    }
    const unique = Array.from(new Set(flags.split('')));
    if (!unique.includes('g')) {
        unique.push('g');
    }
    return unique.join('');
}

function findDuplicateConflicts(entries: PreparedTranslation[]): DuplicateConflict[] {
    const grouped = new Map<string, Set<string>>();

    for (const item of entries) {
        if (item.mode !== 'exact') {
            continue;
        }
        const key = item.entry.en;
        if (!grouped.has(key)) {
            grouped.set(key, new Set<string>());
        }
        grouped.get(key)?.add(item.entry.pl);
    }

    const conflicts: DuplicateConflict[] = [];
    for (const [en, variants] of grouped.entries()) {
        if (variants.size > 1) {
            conflicts.push({ en, translations: Array.from(variants) });
        }
    }
    return conflicts;
}

function detectUnsafeShortPatterns(entries: PreparedTranslation[]): Set<string> {
    const shortEntries = entries
        .filter(e => e.mode === 'exact')
        .map(e => e.entry.en)
        .filter(en => isUnsafeExactEntry(en));

    const unsafe = new Set<string>();
    for (const token of shortEntries) {
        if (isContextAnchoredExactEntry(token)) {
            continue;
        }
        for (const other of shortEntries) {
            if (token === other) {
                continue;
            }
            if (other.includes(token) || token.includes(other)) {
                unsafe.add(token);
                break;
            }
        }
    }
    return unsafe;
}

function isUnsafeExactEntry(en: string): boolean {
    const cleaned = en.replace(/['"`]/g, '').trim();
    return cleaned.length > 0 &&
        cleaned.length <= 10 &&
        /^[A-Za-z][A-Za-z0-9 ]*$/.test(cleaned);
}

function isContextAnchoredExactEntry(en: string): boolean {
    return /(children:|label:|title:|text:|placeholder:|tooltip|aria-label|return|dialogTitle:|submitLabel:|\|\||\?")/.test(en);
}

function buildRegex(pattern: string, flags: string): RegExp | null {
    try {
        return new RegExp(pattern, flags);
    } catch {
        return null;
    }
}

function countOccurrences(content: string, search: string): number {
    if (!search.length) {
        return 0;
    }
    return content.split(search).length - 1;
}

function truncate(value: string, max = 80): string {
    if (value.length <= max) {
        return value;
    }
    return value.slice(0, max) + '...';
}
