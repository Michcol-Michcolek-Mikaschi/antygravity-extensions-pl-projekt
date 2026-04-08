"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyCoreLocalizationFromLanguagePack = applyCoreLocalizationFromLanguagePack;
exports.restoreCoreLocalizationBackups = restoreCoreLocalizationBackups;
exports.getCorePatchStatus = getCorePatchStatus;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const manualFallbackByKey = {
    'view.workbench.scm.empty': 'Aby korzystać z funkcji usługi Git, możesz otworzyć folder zawierający repozytorium Git albo sklonować je z adresu URL.\n' +
        '[Otwórz folder](command:vscode.openFolder)\n' +
        '[Sklonuj repozytorium](command:git.cloneRecursive)\n' +
        'Aby dowiedzieć się więcej o korzystaniu z Git i kontroli źródła w IDE, [przeczytaj dokumentację](https://aka.ms/vscode-scm).',
};
const manualFallbackByEnglish = {
    'In order to use Git features, you can open a folder containing a Git repository or clone from a URL.\n[Open Folder](command:vscode.openFolder)\n[Clone Repository](command:git.cloneRecursive)\nTo learn more about how to use Git and source control in the IDE [read our docs](https://aka.ms/vscode-scm).': 'Aby korzystać z funkcji usługi Git, możesz otworzyć folder zawierający repozytorium Git albo sklonować je z adresu URL.\n' +
        '[Otwórz folder](command:vscode.openFolder)\n' +
        '[Sklonuj repozytorium](command:git.cloneRecursive)\n' +
        'Aby dowiedzieć się więcej o korzystaniu z Git i kontroli źródła w IDE, [przeczytaj dokumentację](https://aka.ms/vscode-scm).',
};
function applyCoreLocalizationFromLanguagePack(paths) {
    const details = [];
    const languagePack = findPolishLanguagePack();
    if (!languagePack) {
        return {
            success: false,
            coreReplacedCount: 0,
            extensionReplacedCount: 0,
            patchedFileCount: 0,
            changedFiles: [],
            details: ['⚠️ Nie znaleziono Polish Language Pack (ms-ceintl.vscode-language-pack-pl).'],
        };
    }
    let nlsResult = { replaced: 0, changed: false };
    try {
        nlsResult = patchCoreMessages(paths, languagePack.mainTranslationPath);
    }
    catch (err) {
        details.push(`⚠️ Błąd patchowania rdzenia menu/ustawień: ${err}`);
    }
    let extensionResult = { replaced: 0, changedFiles: [], patchedFileCount: 0 };
    try {
        extensionResult = patchBuiltInExtensions(paths, languagePack.extensionTranslations);
    }
    catch (err) {
        details.push(`⚠️ Błąd patchowania rozszerzeń wbudowanych: ${err}`);
    }
    if (nlsResult.replaced > 0) {
        details.push(`✅ Spolszczono rdzeń UI: ${nlsResult.replaced} wpisów`);
    }
    if (extensionResult.replaced > 0) {
        details.push(`✅ Spolszczono rozszerzenia wbudowane: ${extensionResult.replaced} wpisów w ${extensionResult.patchedFileCount} plikach`);
    }
    if (nlsResult.replaced === 0 && extensionResult.replaced === 0) {
        details.push('ℹ️ Rdzeń UI i rozszerzenia wbudowane były już spolszczone lub brak nowych wpisów.');
    }
    const changedFiles = [];
    if (nlsResult.changed && nlsResult.changedFile) {
        changedFiles.push(nlsResult.changedFile);
    }
    changedFiles.push(...extensionResult.changedFiles);
    return {
        success: true,
        coreReplacedCount: nlsResult.replaced,
        extensionReplacedCount: extensionResult.replaced,
        patchedFileCount: (nlsResult.changed ? 1 : 0) + extensionResult.patchedFileCount,
        changedFiles,
        details,
    };
}
function restoreCoreLocalizationBackups(paths) {
    let restoredFiles = 0;
    const details = [];
    const nlsBackup = getBackupCandidates(paths, paths.nlsMessages, paths.nlsMessagesBackup)
        .find(candidate => fs.existsSync(candidate));
    if (nlsBackup) {
        fs.copyFileSync(nlsBackup, paths.nlsMessages);
        restoredFiles++;
        details.push('Przywrócono out/nls.messages.json');
    }
    let restoredExtensions = 0;
    const extensionTargets = findFilesBySuffix(paths.extensionsRoot, 'package.nls.json');
    for (const target of extensionTargets) {
        const backup = getBackupCandidates(paths, target, target + '.backup-pl')
            .find(candidate => fs.existsSync(candidate));
        if (!backup) {
            continue;
        }
        fs.copyFileSync(backup, target);
        restoredFiles++;
        restoredExtensions++;
    }
    if (restoredExtensions > 0) {
        details.push(`Przywrócono tłumaczenia rozszerzeń wbudowanych: ${restoredExtensions} plików`);
    }
    return { restoredFiles, details };
}
function getCorePatchStatus(paths) {
    let corePolishFound = 0;
    let coreEnglishFound = 0;
    try {
        const nlsRaw = fs.readFileSync(paths.nlsMessages, 'utf-8');
        const polishSentinels = ['Nowy plik tekstowy', 'Często używane'];
        const englishSentinels = ['New Text File', 'Commonly Used'];
        corePolishFound = polishSentinels.filter(s => nlsRaw.includes(`"${s}"`)).length;
        coreEnglishFound = englishSentinels.filter(s => nlsRaw.includes(`"${s}"`)).length;
    }
    catch {
        // ignored
    }
    let gitPolishFound = 0;
    let gitEnglishFound = 0;
    const gitNlsPath = path.join(paths.extensionsRoot, 'git', 'package.nls.json');
    if (fs.existsSync(gitNlsPath)) {
        try {
            const gitRaw = fs.readFileSync(gitNlsPath, 'utf-8');
            if (gitRaw.includes('Aby korzystać z funkcji usługi Git')) {
                gitPolishFound++;
            }
            if (gitRaw.includes('In order to use Git features')) {
                gitEnglishFound++;
            }
        }
        catch {
            // ignored
        }
    }
    return {
        polishFound: corePolishFound + gitPolishFound,
        englishFound: coreEnglishFound + gitEnglishFound,
        details: `Core UI: ${corePolishFound} PL / ${coreEnglishFound} EN | Git UI: ${gitPolishFound} PL / ${gitEnglishFound} EN`,
    };
}
function findPolishLanguagePack() {
    const roots = getLanguagePackSearchRoots();
    const candidates = [];
    for (const root of roots) {
        if (!fs.existsSync(root)) {
            continue;
        }
        let entries;
        try {
            entries = fs.readdirSync(root, { withFileTypes: true });
        }
        catch {
            continue;
        }
        for (const entry of entries) {
            if (!entry.isDirectory()) {
                continue;
            }
            if (/^ms-ceintl\.vscode-language-pack-pl-/i.test(entry.name)) {
                candidates.push(path.join(root, entry.name));
            }
        }
    }
    if (candidates.length === 0) {
        return null;
    }
    candidates.sort((a, b) => {
        try {
            return fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs;
        }
        catch {
            return 0;
        }
    });
    for (const candidate of candidates) {
        const pack = readLanguagePack(candidate);
        if (pack) {
            return pack;
        }
    }
    return null;
}
function getLanguagePackSearchRoots() {
    const roots = new Set();
    const home = process.env.HOME || process.env.USERPROFILE || '';
    const userProfile = process.env.USERPROFILE || home;
    if (userProfile) {
        roots.add(path.join(userProfile, '.antigravity', 'extensions'));
        roots.add(path.join(userProfile, '.vscode', 'extensions'));
    }
    if (home && home !== userProfile) {
        roots.add(path.join(home, '.antigravity', 'extensions'));
        roots.add(path.join(home, '.vscode', 'extensions'));
    }
    return Array.from(roots);
}
function readLanguagePack(root) {
    const packageJsonPath = path.join(root, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
        return null;
    }
    let packageJson;
    try {
        packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    }
    catch {
        return null;
    }
    const localizations = packageJson?.contributes?.localizations;
    if (!Array.isArray(localizations)) {
        return null;
    }
    const polish = localizations.find((entry) => entry?.languageId === 'pl');
    if (!polish || !Array.isArray(polish.translations)) {
        return null;
    }
    const translations = [];
    for (const item of polish.translations) {
        if (!item || typeof item.id !== 'string' || typeof item.path !== 'string') {
            continue;
        }
        translations.push({
            id: item.id,
            path: path.resolve(root, item.path),
        });
    }
    const mainTranslation = translations.find(t => t.id === 'vscode');
    if (!mainTranslation || !fs.existsSync(mainTranslation.path)) {
        return null;
    }
    return {
        mainTranslationPath: mainTranslation.path,
        extensionTranslations: translations.filter(t => t.id !== 'vscode'),
    };
}
function patchCoreMessages(paths, mainTranslationPath) {
    if (!fs.existsSync(paths.nlsMessages) || !fs.existsSync(paths.nlsKeys)) {
        return { replaced: 0, changed: false };
    }
    const sourcePath = ensureBackupAndGetSource(paths, paths.nlsMessages, paths.nlsMessagesBackup);
    const nlsMessages = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'));
    const nlsKeys = JSON.parse(fs.readFileSync(paths.nlsKeys, 'utf-8'));
    const mainI18n = JSON.parse(fs.readFileSync(mainTranslationPath, 'utf-8'));
    const contents = mainI18n?.contents || {};
    if (!Array.isArray(nlsMessages) || !Array.isArray(nlsKeys)) {
        return { replaced: 0, changed: false };
    }
    let index = 0;
    let replaced = 0;
    for (const block of nlsKeys) {
        if (!Array.isArray(block) || block.length < 2) {
            continue;
        }
        const moduleName = block[0];
        const keyList = block[1];
        if (typeof moduleName !== 'string' || !Array.isArray(keyList)) {
            continue;
        }
        const moduleTranslations = contents[moduleName];
        for (const key of keyList) {
            if (index >= nlsMessages.length) {
                break;
            }
            if (typeof key === 'string') {
                const translated = moduleTranslations?.[key];
                if (typeof translated === 'string' && translated.length > 0 && nlsMessages[index] !== translated) {
                    nlsMessages[index] = translated;
                    replaced++;
                }
            }
            index++;
        }
    }
    if (replaced > 0) {
        fs.writeFileSync(paths.nlsMessages, JSON.stringify(nlsMessages), 'utf-8');
        return { replaced, changed: true, changedFile: paths.nlsMessages };
    }
    return { replaced: 0, changed: false };
}
function patchBuiltInExtensions(paths, extensionTranslations) {
    if (!fs.existsSync(paths.extensionsRoot)) {
        return { replaced: 0, changedFiles: [], patchedFileCount: 0 };
    }
    let replaced = 0;
    let patchedFileCount = 0;
    const changedFiles = [];
    for (const translation of extensionTranslations) {
        if (!fs.existsSync(translation.path)) {
            continue;
        }
        const packageNlsPath = resolvePackageNlsPath(paths.extensionsRoot, translation.id);
        if (!packageNlsPath) {
            continue;
        }
        let translationJson;
        try {
            translationJson = JSON.parse(fs.readFileSync(translation.path, 'utf-8'));
        }
        catch {
            continue;
        }
        const bundle = translationJson?.contents?.bundle;
        if (!isPlainObject(bundle)) {
            continue;
        }
        const backup = packageNlsPath + '.backup-pl';
        const source = ensureBackupAndGetSource(paths, packageNlsPath, backup);
        let sourceJson;
        try {
            sourceJson = JSON.parse(fs.readFileSync(source, 'utf-8'));
        }
        catch {
            continue;
        }
        if (!isPlainObject(sourceJson)) {
            continue;
        }
        const patch = patchPackageNlsObject(sourceJson, bundle);
        if (patch.changed > 0) {
            fs.writeFileSync(packageNlsPath, JSON.stringify(patch.value), 'utf-8');
            replaced += patch.changed;
            patchedFileCount++;
            changedFiles.push(packageNlsPath);
        }
    }
    return { replaced, changedFiles, patchedFileCount };
}
function resolvePackageNlsPath(extensionsRoot, translationId) {
    const candidates = new Set();
    candidates.add(translationId);
    if (translationId.startsWith('vscode.')) {
        candidates.add(translationId.slice('vscode.'.length));
    }
    for (const candidate of candidates) {
        const file = path.join(extensionsRoot, candidate, 'package.nls.json');
        if (fs.existsSync(file)) {
            return file;
        }
    }
    return null;
}
function patchPackageNlsObject(sourceJson, bundle) {
    const result = {};
    let changed = 0;
    for (const [key, value] of Object.entries(sourceJson)) {
        if (typeof value === 'string') {
            const translated = pickTranslation(bundle, key, value);
            if (translated !== value) {
                changed++;
            }
            result[key] = translated;
            continue;
        }
        if (isPlainObject(value) && typeof value.message === 'string') {
            const cloned = { ...value };
            const translatedMessage = pickTranslation(bundle, key, value.message);
            if (translatedMessage !== value.message) {
                cloned.message = translatedMessage;
                changed++;
            }
            result[key] = cloned;
            continue;
        }
        result[key] = value;
    }
    return { value: result, changed };
}
function pickTranslation(bundle, key, english) {
    const fallbackByKey = manualFallbackByKey[key];
    if (typeof fallbackByKey === 'string' && fallbackByKey.length > 0) {
        return fallbackByKey;
    }
    const byKey = bundle[key];
    if (typeof byKey === 'string' && byKey.length > 0) {
        return byKey;
    }
    if (isPlainObject(byKey) && typeof byKey.message === 'string' && byKey.message.length > 0) {
        return byKey.message;
    }
    const byEnglish = bundle[english];
    if (typeof byEnglish === 'string' && byEnglish.length > 0) {
        return byEnglish;
    }
    if (isPlainObject(byEnglish) && typeof byEnglish.message === 'string' && byEnglish.message.length > 0) {
        return byEnglish.message;
    }
    const fallbackByEnglish = manualFallbackByEnglish[english];
    if (typeof fallbackByEnglish === 'string' && fallbackByEnglish.length > 0) {
        return fallbackByEnglish;
    }
    return english;
}
function ensureBackupAndGetSource(paths, target, backup) {
    const candidates = getBackupCandidates(paths, target, backup);
    const preferredBackup = candidates[0];
    const fallbackSource = candidates.slice(1).find(candidate => fs.existsSync(candidate)) ?? target;
    if (!fs.existsSync(preferredBackup) && fs.existsSync(fallbackSource)) {
        ensureParentDir(preferredBackup);
        fs.copyFileSync(fallbackSource, preferredBackup);
    }
    if (fs.existsSync(preferredBackup)) {
        return preferredBackup;
    }
    const existingFallback = candidates.slice(1).find(candidate => fs.existsSync(candidate));
    return existingFallback ?? target;
}
function getBackupCandidates(paths, target, defaultBackup) {
    const candidates = [];
    const preferred = paths.getBackupPathFor?.(target) ?? defaultBackup;
    candidates.push(preferred);
    const legacy = paths.getLegacyBackupPathFor?.(target);
    if (legacy && !candidates.includes(legacy)) {
        candidates.push(legacy);
    }
    if (!candidates.includes(defaultBackup)) {
        candidates.push(defaultBackup);
    }
    return candidates;
}
function ensureParentDir(filePath) {
    const directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
}
function findFilesBySuffix(root, suffix) {
    const files = [];
    if (!fs.existsSync(root)) {
        return files;
    }
    const stack = [root];
    while (stack.length > 0) {
        const current = stack.pop();
        if (!current) {
            continue;
        }
        let entries;
        try {
            entries = fs.readdirSync(current, { withFileTypes: true });
        }
        catch {
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
function isPlainObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
//# sourceMappingURL=core-localization.js.map