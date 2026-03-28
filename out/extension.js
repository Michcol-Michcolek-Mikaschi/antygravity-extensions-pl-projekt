"use strict";
// =============================================================================
// Antigravity Polski — Główny plik rozszerzenia
// =============================================================================
// Rozszerzenie tłumaczy interfejs Antigravity (Settings, Agent Manager)
// na język polski przez patchowanie pliku main.js w folderze instalacyjnym.
// =============================================================================
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
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const patcher_1 = require("./patcher/patcher");
const SettingsPanel_1 = require("./panels/SettingsPanel");
const AgentManagerPanel_1 = require("./panels/AgentManagerPanel");
const RoadmapPanel_1 = require("./panels/RoadmapPanel");
const QuickRefPanel_1 = require("./panels/QuickRefPanel");
function activate(context) {
    // ======================== PATCHER ========================
    // Komenda: Spolszcz interfejs Antigravity (główna funkcja!)
    const patchCommand = vscode.commands.registerCommand('antigravityPL.applyPatch', async () => {
        const confirm = await vscode.window.showWarningMessage('Czy chcesz spolszczyć interfejs Antigravity? Zmienione zostaną panele Settings i Agent Manager.\n\n' +
            '⚠️ Antigravity musi być ZAMKNIĘTY podczas patchowania. Po zastosowaniu zmian uruchom go ponownie.', { modal: true }, 'Tak, spolszcz', 'Anuluj');
        if (confirm !== 'Tak, spolszcz') {
            return;
        }
        const result = (0, patcher_1.applyPolishPatch)();
        if (result.success) {
            const detail = result.details.slice(0, 10).join('\n');
            vscode.window.showInformationMessage(`✅ ${result.message}\n\nPrzetłumaczono: ${result.replacedCount} | Pominięto: ${result.skippedCount}`, { modal: true, detail });
        }
        else {
            vscode.window.showErrorMessage(`❌ ${result.message}`, { modal: true });
        }
    });
    // Komenda: Przywróć oryginalny angielski interfejs
    const restoreCommand = vscode.commands.registerCommand('antigravityPL.restoreOriginal', async () => {
        const confirm = await vscode.window.showWarningMessage('Przywrócić oryginalny angielski interfejs Antigravity?\n\n' +
            '⚠️ Antigravity musi być zamknięty. Po przywróceniu uruchom go ponownie.', { modal: true }, 'Tak, przywróć angielski', 'Anuluj');
        if (confirm !== 'Tak, przywróć angielski') {
            return;
        }
        const result = (0, patcher_1.restoreOriginal)();
        if (result.success) {
            vscode.window.showInformationMessage(`✅ ${result.message}`, { modal: true });
        }
        else {
            vscode.window.showErrorMessage(`❌ ${result.message}`, { modal: true });
        }
    });
    // Komenda: Sprawdź stan spolszczenia
    const statusCommand = vscode.commands.registerCommand('antigravityPL.checkStatus', () => {
        const status = (0, patcher_1.checkPatchStatus)();
        vscode.window.showInformationMessage(`Stan spolszczenia: ${status.details}`, ...(status.canPatch && !status.patched ? ['Spolszcz teraz'] : [])).then(selection => {
            if (selection === 'Spolszcz teraz') {
                vscode.commands.executeCommand('antigravityPL.applyPatch');
            }
        });
    });
    // ======================== PANELE REFERENCYJNE ========================
    const openSettings = vscode.commands.registerCommand('antigravityPL.openSettings', () => SettingsPanel_1.SettingsPanel.createOrShow(context.extensionUri));
    const openAgentManager = vscode.commands.registerCommand('antigravityPL.openAgentManager', () => AgentManagerPanel_1.AgentManagerPanel.createOrShow(context.extensionUri));
    const openRoadmap = vscode.commands.registerCommand('antigravityPL.openRoadmap', () => RoadmapPanel_1.RoadmapPanel.createOrShow(context.extensionUri));
    const openQuickRef = vscode.commands.registerCommand('antigravityPL.openQuickRef', () => QuickRefPanel_1.QuickRefPanel.createOrShow(context.extensionUri));
    // ======================== SUBSKRYPCJE ========================
    context.subscriptions.push(patchCommand, restoreCommand, statusCommand, openSettings, openAgentManager, openRoadmap, openQuickRef);
    // ======================== PASEK STANU ========================
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = '$(globe) Antigravity PL';
    statusBarItem.tooltip = 'Kliknij → Spolszcz interfejs Antigravity';
    statusBarItem.command = 'antigravityPL.applyPatch';
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);
    // ======================== PIERWSZE URUCHOMIENIE ========================
    const hasShownWelcome = context.globalState.get('welcomeShown2');
    if (!hasShownWelcome) {
        const status = (0, patcher_1.checkPatchStatus)();
        if (status.canPatch && !status.patched) {
            vscode.window.showInformationMessage('🇵🇱 Antigravity Polski zainstalowany!\n\n' +
                'Aby spolszczyć Settings i Agent Manager, zamknij Antigravity i użyj komendy "Spolszcz interfejs".', 'Spolszcz teraz', 'Pokaż przewodnik', 'Później').then(selection => {
                if (selection === 'Spolszcz teraz') {
                    vscode.commands.executeCommand('antigravityPL.applyPatch');
                }
                else if (selection === 'Pokaż przewodnik') {
                    vscode.commands.executeCommand('antigravityPL.openSettings');
                }
            });
        }
        context.globalState.update('welcomeShown2', true);
    }
    console.log('[Antigravity PL] Rozszerzenie aktywowane — użyj Ctrl+Shift+P → "Antigravity PL: Spolszcz"');
}
function deactivate() {
    console.log('[Antigravity PL] Dezaktywowano.');
}
//# sourceMappingURL=extension.js.map