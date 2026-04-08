// =============================================================================
// Patcher — podmienia angielskie stringi na polskie w plikach Antigravity
// =============================================================================
// WAŻNE: Ten moduł modyfikuje pliki w folderze instalacyjnym Antigravity.
//        Przed każdą zmianą tworzy backup, żeby można było przywrócić oryginał.
// =============================================================================

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { execFileSync } from 'child_process';
import { getAllTranslations, TranslationEntry } from './translations';
import {
    CoreLocalizationPaths,
    applyCoreLocalizationFromLanguagePack,
    getCorePatchStatus,
    restoreCoreLocalizationBackups
} from './core-localization';

interface AntigravityPaths extends CoreLocalizationPaths {
    appRoot: string;
    backupRoot: string;
    jetskiMain: string;
    backup: string;
    productJson: string;
    productJsonBackup: string;
}

// Ścieżki do plików patchowanych przez rozszerzenie.
function getAntigravityPaths(): AntigravityPaths | null {
    const localAppData = process.env.LOCALAPPDATA || '';
    const windowsAppRoot = path.join(localAppData, 'Programs', 'Antigravity', 'resources', 'app');
    const windows = buildPathsForAppRoot(windowsAppRoot);
    if (windows) {
        return windows;
    }

    const macAppRoot = '/Applications/Antigravity.app/Contents/Resources/app';
    const mac = buildPathsForAppRoot(macAppRoot);
    if (mac) {
        return mac;
    }

    const home = process.env.HOME || '';
    const linuxAppRoot = path.join(home, '.local', 'share', 'antigravity', 'resources', 'app');
    const linux = buildPathsForAppRoot(linuxAppRoot);
    if (linux) {
        return linux;
    }

    return null;
}

function buildPathsForAppRoot(appRoot: string): AntigravityPaths | null {
    const outRoot = path.join(appRoot, 'out');
    const jetskiMain = path.join(outRoot, 'jetskiAgent', 'main.js');
    if (!fs.existsSync(jetskiMain)) {
        return null;
    }

    const backupRoot = getBackupRootForInstallation(appRoot);
    const getBackupPathFor = (targetPath: string) => resolveExternalBackupPath(appRoot, backupRoot, targetPath);
    const getLegacyBackupPathFor = (targetPath: string): string | null => {
        const relative = path.relative(appRoot, targetPath);
        if (relative.startsWith('..') || path.isAbsolute(relative)) {
            return null;
        }
        return targetPath + '.backup-pl';
    };

    return {
        appRoot,
        backupRoot,
        outRoot,
        extensionsRoot: path.join(appRoot, 'extensions'),
        nlsMessages: path.join(outRoot, 'nls.messages.json'),
        nlsMessagesBackup: getBackupPathFor(path.join(outRoot, 'nls.messages.json')),
        nlsKeys: path.join(outRoot, 'nls.keys.json'),
        jetskiMain,
        backup: getBackupPathFor(jetskiMain),
        productJson: path.join(appRoot, 'product.json'),
        productJsonBackup: getBackupPathFor(path.join(appRoot, 'product.json')),
        getBackupPathFor,
        getLegacyBackupPathFor
    };
}

function getBackupRootForInstallation(appRoot: string): string {
    const globalBackupRoot = getGlobalBackupRoot();
    const installationId = crypto
        .createHash('sha1')
        .update(normalizePathForCompare(appRoot))
        .digest('hex')
        .slice(0, 12);

    return path.join(globalBackupRoot, 'installations', installationId);
}

function getGlobalBackupRoot(): string {
    if (process.platform === 'win32') {
        const appData = process.env.APPDATA || process.env.LOCALAPPDATA || process.cwd();
        return path.join(appData, 'AntigravityPL', 'backups');
    }

    if (process.platform === 'darwin') {
        const home = process.env.HOME || process.cwd();
        return path.join(home, 'Library', 'Application Support', 'AntigravityPL', 'backups');
    }

    const xdgStateHome = process.env.XDG_STATE_HOME;
    if (xdgStateHome && xdgStateHome.length > 0) {
        return path.join(xdgStateHome, 'antigravity-pl', 'backups');
    }

    const home = process.env.HOME || process.cwd();
    return path.join(home, '.local', 'state', 'antigravity-pl', 'backups');
}

function resolveExternalBackupPath(appRoot: string, backupRoot: string, targetPath: string): string {
    const relative = path.relative(appRoot, targetPath);
    if (!relative.startsWith('..') && !path.isAbsolute(relative)) {
        return path.join(backupRoot, relative + '.backup-pl');
    }

    const externalId = crypto
        .createHash('sha1')
        .update(normalizePathForCompare(targetPath))
        .digest('hex')
        .slice(0, 20);
    return path.join(backupRoot, 'external', `${externalId}.backup-pl`);
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

interface RuntimePatchGuardResult {
    canProceed: boolean;
    reason?: string;
    advisory?: string;
}

interface ChecksumUpdateResult {
    updated: number;
    normalized: number;
    scannedCandidates: number;
    missingKeys: number;
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

    const details: string[] = [];
    const runtimeGuard = evaluateRuntimePatchGuard(paths);
    if (runtimeGuard.advisory) {
        details.push(runtimeGuard.advisory);
    }
    if (!runtimeGuard.canProceed) {
        return {
            success: false,
            message: runtimeGuard.reason ?? 'Nie można bezpiecznie wykonać patchowania.',
            replacedCount: 0,
            skippedCount: 0,
            unmatchedCount: 0,
            ambiguousCount: 0,
            exactAppliedCount: 0,
            regexAppliedCount: 0,
            details
        };
    }

    // Odczytaj plik — ZAWSZE z backupu (oryginał EN) jeśli istnieje
    let content: string;
    try {
        // Jeśli backup istnieje, czytamy z niego (czysty EN) i nadpisujemy main.js
        const sourceFile = findExistingBackup(paths, paths.jetskiMain, paths.backup) ?? paths.jetskiMain;
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
            details
        };
    }

    // Utwórz backup (tylko jeśli nie istnieje — zachowaj oryginalny angielski)
    try {
        ensureBackupFile(paths, paths.jetskiMain, paths.backup);
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
            details
        };
    }

    const preparedTranslations = prepareTranslations(getAllTranslations());
    const duplicateConflicts = findDuplicateConflicts(preparedTranslations);

    let replaced = 0;
    let skipped = 0;
    let unmatched = 0;
    let ambiguous = 0;
    let exactApplied = 0;
    let regexApplied = 0;
    const changedFiles = new Set<string>();

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
            changedFiles.add(paths.jetskiMain);
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
    }

    // Spolszczenie rdzenia UI (menu, settings) + rozszerzeń wbudowanych (np. Git).
    const coreResult = applyCoreLocalizationFromLanguagePack(paths);
    details.push(...coreResult.details);
    for (const file of coreResult.changedFiles) {
        changedFiles.add(file);
    }

    // Aktualizuj checksumy wszystkich plików patchowanych teraz i historycznie (na podstawie backupów).
    try {
        const checksumResult = updateProductChecksums(paths, Array.from(changedFiles));
        if (checksumResult.updated > 0 || checksumResult.normalized > 0) {
            details.push(
                `✅ Zsynchronizowano checksumy w product.json (zaktualizowane: ${checksumResult.updated}, znormalizowane: ${checksumResult.normalized})`
            );
        } else if (checksumResult.scannedCandidates > 0) {
            details.push('ℹ️ Checksumy product.json są już zgodne z plikami.');
        }
        if (checksumResult.missingKeys > 0) {
            details.push(`⚠️ ${checksumResult.missingKeys} plików nie miało wpisu checksum w product.json.`);
        }
    } catch (err) {
        details.push(`⚠️ Nie udało się zaktualizować checksumów: ${err}`);
    }

    const legacyCleanup = cleanupLegacyBackups(paths);
    if (legacyCleanup.removed > 0 || legacyCleanup.migrated > 0) {
        details.push(
            `✅ Posprzątano legacy backupy w instalacji (usunięto: ${legacyCleanup.removed}, zmigrowano: ${legacyCleanup.migrated}).`
        );
    }
    if (legacyCleanup.failed > 0) {
        details.push(`⚠️ Nie udało się posprzątać ${legacyCleanup.failed} legacy backupów.`);
    }

    const totalReplaced = replaced + coreResult.coreReplacedCount + coreResult.extensionReplacedCount;

    return {
        success: true,
        message: totalReplaced > 0
            ? `Spolszczono ${totalReplaced} elementów interfejsu! Uruchom ponownie Antigravity, aby zobaczyć zmiany.`
            : 'Interfejs jest już spolszczony — nie trzeba nic zmieniać.',
        replacedCount: totalReplaced,
        skippedCount: skipped,
        unmatchedCount: unmatched,
        ambiguousCount: ambiguous,
        exactAppliedCount: exactApplied,
        regexAppliedCount: regexApplied,
        details
    };
}

/**
 * Aktualizuje checksumy patchowanych plików i normalizuje wpisy product.json.
 */
function updateProductChecksums(paths: AntigravityPaths, changedFiles: string[]): ChecksumUpdateResult {
    const emptyResult: ChecksumUpdateResult = {
        updated: 0,
        normalized: 0,
        scannedCandidates: 0,
        missingKeys: 0
    };
    if (!fs.existsSync(paths.productJson)) {
        return emptyResult;
    }

    // Backup product.json poza katalogiem instalacji.
    ensureBackupFile(paths, paths.productJson, paths.productJsonBackup);

    const productRaw = fs.readFileSync(paths.productJson, 'utf-8');
    const product = JSON.parse(productRaw);

    if (!product.checksums || typeof product.checksums !== 'object' || Array.isArray(product.checksums)) {
        return emptyResult;
    }

    const checksums = product.checksums as Record<string, string>;
    let updated = 0;
    let normalized = 0;
    let missingKeys = 0;

    // Normalizacja starych wpisów zapisanych z paddingiem "=" przez starsze wersje rozszerzenia.
    for (const [key, rawValue] of Object.entries(checksums)) {
        if (typeof rawValue !== 'string') {
            continue;
        }
        const normalizedValue = rawValue.replace(/=+$/g, '');
        if (normalizedValue !== rawValue) {
            checksums[key] = normalizedValue;
            normalized++;
        }
    }

    const candidates = collectChecksumCandidates(paths, changedFiles);
    for (const candidateFile of candidates) {
        if (!fs.existsSync(candidateFile)) {
            continue;
        }

        const key = resolveChecksumKey(paths, candidateFile);
        if (!key || !Object.prototype.hasOwnProperty.call(checksums, key)) {
            missingKeys++;
            continue;
        }

        // Antigravity trzyma checksumy base64 bez końcowego paddingu "=".
        const hash = crypto
            .createHash('sha256')
            .update(fs.readFileSync(candidateFile))
            .digest('base64')
            .replace(/=+$/g, '');
        if (checksums[key] !== hash) {
            checksums[key] = hash;
            updated++;
        }
    }

    if (updated > 0 || normalized > 0) {
        fs.writeFileSync(paths.productJson, JSON.stringify(product, null, '\t'), 'utf-8');
    }

    return {
        updated,
        normalized,
        scannedCandidates: candidates.length,
        missingKeys
    };
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

    try {
        let restoredFiles = 0;
        const details: string[] = [];

        const jetskiBackup = findExistingBackup(paths, paths.jetskiMain, paths.backup);
        if (jetskiBackup) {
            fs.copyFileSync(jetskiBackup, paths.jetskiMain);
            restoredFiles++;
            details.push('Przywrócono jetskiAgent/main.js');
        }

        const coreRestore = restoreCoreLocalizationBackups(paths);
        restoredFiles += coreRestore.restoredFiles;
        details.push(...coreRestore.details);

        // Przywróć oryginalny product.json
        const productBackup = findExistingBackup(paths, paths.productJson, paths.productJsonBackup);
        if (productBackup) {
            fs.copyFileSync(productBackup, paths.productJson);
            restoredFiles++;
            details.push('Przywrócono product.json');
        }

        if (restoredFiles === 0) {
            return {
                success: false,
                message: 'Nie znaleziono żadnych kopii zapasowych .backup-pl do przywrócenia.',
                replacedCount: 0,
                skippedCount: 0,
                unmatchedCount: 0,
                ambiguousCount: 0,
                exactAppliedCount: 0,
                regexAppliedCount: 0,
                details: []
            };
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
            details
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

    const coreStatus = getCorePatchStatus(paths);

    const totalPolish = polishFound + coreStatus.polishFound;
    const totalEnglish = englishFound + coreStatus.englishFound;
    const details = `Agent UI: ${polishFound} PL / ${englishFound} EN | ${coreStatus.details}`;

    if (totalEnglish === 0 && totalPolish > 0) {
        return { patched: true, canPatch: true, details: `Interfejs w pełni po polsku. ${details}` };
    }

    if (totalPolish === 0 && totalEnglish > 0) {
        return { patched: false, canPatch: true, details: `Interfejs po angielsku — gotowy do spolszczenia. ${details}` };
    }

    return {
        patched: false,
        canPatch: true,
        details: `Stan mieszany. ${details}`
    };
}

function evaluateRuntimePatchGuard(paths: AntigravityPaths): RuntimePatchGuardResult {
    const runningExecutables = listRunningAntigravityExecutables();
    if (runningExecutables.length === 0) {
        return { canProceed: true };
    }

    const installRoot = normalizePathForCompare(path.resolve(paths.appRoot, '..', '..'));
    const currentExec = normalizePathForCompare(process.execPath);
    const targetRunning = runningExecutables.some(executable =>
        normalizePathForCompare(executable).startsWith(installRoot)
    );

    if (!targetRunning) {
        return { canProceed: true };
    }

    if (currentExec.startsWith(installRoot)) {
        return {
            canProceed: true,
            advisory:
                'ℹ️ Patch uruchomiono z działającego Antigravity. Komunikat „instalacja zmodyfikowana na dysku” może pojawić się do restartu i nie oznacza awarii tłumaczenia.'
        };
    }

    return {
        canProceed: false,
        reason: 'Wykryto uruchomiony proces Antigravity. Zamknij wszystkie okna Antigravity i spróbuj ponownie.'
    };
}

function listRunningAntigravityExecutables(): string[] {
    try {
        if (process.platform === 'win32') {
            const output = execFileSync(
                'powershell',
                [
                    '-NoProfile',
                    '-Command',
                    "Get-Process -Name 'Antigravity' -ErrorAction SilentlyContinue | ForEach-Object { $_.Path } | Where-Object { $_ }"
                ],
                { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] }
            );
            return output
                .split(/\r?\n/)
                .map(line => line.trim())
                .filter(Boolean);
        }

        if (process.platform === 'darwin' || process.platform === 'linux') {
            const output = execFileSync('pgrep', ['-af', 'Antigravity'], {
                encoding: 'utf-8',
                stdio: ['ignore', 'pipe', 'ignore']
            });
            return output
                .split(/\r?\n/)
                .map(line => line.trim())
                .filter(Boolean)
                .map(line => {
                    const firstSpace = line.indexOf(' ');
                    return firstSpace >= 0 ? line.slice(firstSpace + 1).trim() : '';
                })
                .filter(Boolean);
        }
    } catch {
        return [];
    }

    return [];
}

function collectChecksumCandidates(paths: AntigravityPaths, changedFiles: string[]): string[] {
    const candidates = new Set<string>();
    for (const changedFile of changedFiles) {
        candidates.add(changedFile);
    }

    // Zawsze sprawdzaj główne cele patchowania.
    candidates.add(paths.jetskiMain);
    candidates.add(paths.nlsMessages);

    // Jeśli istnieją backupy, to pliki były patchowane wcześniej — też wymagają synchronizacji checksum.
    if (fs.existsSync(paths.backup)) {
        candidates.add(paths.jetskiMain);
    }
    if (fs.existsSync(paths.nlsMessagesBackup)) {
        candidates.add(paths.nlsMessages);
    }

    const extensionTargets = findFilesBySuffix(paths.extensionsRoot, 'package.nls.json');
    for (const target of extensionTargets) {
        if (hasAnyBackup(paths, target, target + '.backup-pl')) {
            candidates.add(target);
        }
    }

    return Array.from(candidates).filter(file => fs.existsSync(file));
}

function ensureBackupFile(paths: AntigravityPaths, targetPath: string, preferredBackup: string): void {
    const candidates = getBackupCandidates(paths, targetPath, preferredBackup);
    const primaryBackup = candidates[0];
    if (fs.existsSync(primaryBackup)) {
        return;
    }

    const source = candidates.slice(1).find(candidate => fs.existsSync(candidate)) ?? targetPath;
    if (!fs.existsSync(source)) {
        return;
    }

    ensureParentDirectory(primaryBackup);
    fs.copyFileSync(source, primaryBackup);
}

function findExistingBackup(paths: AntigravityPaths, targetPath: string, preferredBackup: string): string | null {
    const candidates = getBackupCandidates(paths, targetPath, preferredBackup);
    for (const candidate of candidates) {
        if (fs.existsSync(candidate)) {
            return candidate;
        }
    }
    return null;
}

function hasAnyBackup(paths: AntigravityPaths, targetPath: string, preferredBackup: string): boolean {
    return findExistingBackup(paths, targetPath, preferredBackup) !== null;
}

function getBackupCandidates(paths: AntigravityPaths, targetPath: string, preferredBackup: string): string[] {
    const candidates: string[] = [];
    candidates.push(preferredBackup);

    const viaResolver = paths.getBackupPathFor?.(targetPath);
    if (viaResolver && !candidates.includes(viaResolver)) {
        candidates.push(viaResolver);
    }

    const legacyByResolver = paths.getLegacyBackupPathFor?.(targetPath);
    if (legacyByResolver && !candidates.includes(legacyByResolver)) {
        candidates.push(legacyByResolver);
    }

    const legacyByConvention = targetPath + '.backup-pl';
    if (!candidates.includes(legacyByConvention)) {
        candidates.push(legacyByConvention);
    }

    return candidates;
}

function cleanupLegacyBackups(paths: AntigravityPaths): { removed: number; migrated: number; failed: number } {
    const legacyFiles = new Set<string>();
    const legacySeeds = [paths.jetskiMain, paths.nlsMessages, paths.productJson];

    for (const target of legacySeeds) {
        const legacy = paths.getLegacyBackupPathFor?.(target) ?? (target + '.backup-pl');
        if (legacy) {
            legacyFiles.add(legacy);
        }
    }

    for (const extensionLegacy of findFilesBySuffix(paths.extensionsRoot, 'package.nls.json.backup-pl')) {
        legacyFiles.add(extensionLegacy);
    }

    let removed = 0;
    let migrated = 0;
    let failed = 0;

    for (const legacyFile of legacyFiles) {
        if (!fs.existsSync(legacyFile)) {
            continue;
        }

        const targetPath = legacyFile.endsWith('.backup-pl')
            ? legacyFile.slice(0, -'.backup-pl'.length)
            : legacyFile;
        const preferredBackup = paths.getBackupPathFor?.(targetPath);

        try {
            if (preferredBackup) {
                if (!fs.existsSync(preferredBackup)) {
                    ensureParentDirectory(preferredBackup);
                    fs.copyFileSync(legacyFile, preferredBackup);
                    migrated++;
                }
            }
            fs.unlinkSync(legacyFile);
            removed++;
        } catch {
            failed++;
        }
    }

    return { removed, migrated, failed };
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

function resolveChecksumKey(paths: AntigravityPaths, absolutePath: string): string | null {
    const outRelative = path.relative(paths.outRoot, absolutePath);
    if (!outRelative.startsWith('..') && !path.isAbsolute(outRelative)) {
        return toPosixPath(outRelative);
    }

    const appRelative = path.relative(paths.appRoot, absolutePath);
    if (!appRelative.startsWith('..') && !path.isAbsolute(appRelative)) {
        return toPosixPath(appRelative);
    }

    return null;
}

function toPosixPath(value: string): string {
    return value.split(path.sep).join('/');
}

function ensureParentDirectory(filePath: string): void {
    const directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
}

function normalizePathForCompare(value: string): string {
    return path.normalize(value).replace(/\\/g, '/').toLowerCase();
}

function findFilesBySuffix(root: string, suffix: string): string[] {
    const files: string[] = [];
    if (!fs.existsSync(root)) {
        return files;
    }

    const stack = [root];
    while (stack.length > 0) {
        const current = stack.pop();
        if (!current) {
            continue;
        }

        let entries: fs.Dirent[];
        try {
            entries = fs.readdirSync(current, { withFileTypes: true });
        } catch {
            continue;
        }

        for (const entry of entries) {
            const fullPath = path.join(current, entry.name);
            if (entry.isDirectory()) {
                stack.push(fullPath);
                continue;
            }
            if (entry.isFile() && fullPath.endsWith(suffix)) {
                files.push(fullPath);
            }
        }
    }

    return files;
}

function truncate(value: string, max = 80): string {
    if (value.length <= max) {
        return value;
    }
    return value.slice(0, max) + '...';
}
