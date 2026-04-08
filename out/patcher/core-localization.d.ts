export interface CoreLocalizationPaths {
    outRoot: string;
    extensionsRoot: string;
    nlsMessages: string;
    nlsMessagesBackup: string;
    nlsKeys: string;
}
export interface CoreLocalizationResult {
    success: boolean;
    coreReplacedCount: number;
    extensionReplacedCount: number;
    patchedFileCount: number;
    changedFiles: string[];
    details: string[];
}
export declare function applyCoreLocalizationFromLanguagePack(paths: CoreLocalizationPaths): CoreLocalizationResult;
export declare function restoreCoreLocalizationBackups(paths: CoreLocalizationPaths): {
    restoredFiles: number;
    details: string[];
};
export declare function getCorePatchStatus(paths: CoreLocalizationPaths): {
    polishFound: number;
    englishFound: number;
    details: string;
};
//# sourceMappingURL=core-localization.d.ts.map