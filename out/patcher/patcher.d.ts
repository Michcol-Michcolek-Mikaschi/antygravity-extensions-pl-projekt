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
/**
 * Aplikuje polskie tłumaczenia do pliku main.js Agent Managera.
 * Tworzy backup przed pierwszą zmianą. Idempotentna — można uruchomić wielokrotnie.
 */
export declare function applyPolishPatch(): PatchResult;
/**
 * Przywraca oryginalne angielskie stringi z backupu.
 */
export declare function restoreOriginal(): PatchResult;
/**
 * Sprawdza stan patcha — czy interfejs jest po polsku, angielsku, czy w stanie mieszanym.
 */
export declare function checkPatchStatus(): {
    patched: boolean;
    canPatch: boolean;
    details: string;
};
//# sourceMappingURL=patcher.d.ts.map