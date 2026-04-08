// =============================================================================
// Antigravity Polski — Główny plik rozszerzenia
// =============================================================================
// Rozszerzenie tłumaczy interfejs Antigravity (Settings, Agent Manager)
// na język polski przez patchowanie pliku main.js w folderze instalacyjnym.
// =============================================================================

import * as vscode from 'vscode';
import { applyPolishPatch, restoreOriginal, checkPatchStatus } from './patcher/patcher';
import { SettingsPanel } from './panels/SettingsPanel';
import { AgentManagerPanel } from './panels/AgentManagerPanel';
import { RoadmapPanel } from './panels/RoadmapPanel';
import { QuickRefPanel } from './panels/QuickRefPanel';

export function activate(context: vscode.ExtensionContext) {

    // ======================== PATCHER ========================

    // Komenda: Spolszcz interfejs Antigravity (główna funkcja!)
    const patchCommand = vscode.commands.registerCommand(
        'antigravityPL.applyPatch',
        async () => {
            const confirm = await vscode.window.showWarningMessage(
                'Czy chcesz spolszczyć interfejs Antigravity? Zmienione zostaną panele Settings i Agent Manager.\n\n' +
                '⚠️ Najbezpieczniej patchować przy zamkniętym Antigravity. Jeśli uruchamiasz patch z poziomu Antigravity, może pojawić się chwilowy komunikat o modyfikacji instalacji do czasu restartu.',
                { modal: true },
                'Tak, spolszcz',
                'Anuluj'
            );
            if (confirm !== 'Tak, spolszcz') { return; }

            const result = applyPolishPatch();
            if (result.success) {
                const detail = result.details.slice(0, 10).join('\n');
                vscode.window.showInformationMessage(
                    `✅ ${result.message}\n\nPrzetłumaczono: ${result.replacedCount} | Pominięto: ${result.skippedCount}`,
                    { modal: true, detail }
                );
            } else {
                vscode.window.showErrorMessage(`❌ ${result.message}`, { modal: true });
            }
        }
    );

    // Komenda: Przywróć oryginalny angielski interfejs
    const restoreCommand = vscode.commands.registerCommand(
        'antigravityPL.restoreOriginal',
        async () => {
            const confirm = await vscode.window.showWarningMessage(
                'Przywrócić oryginalny angielski interfejs Antigravity?\n\n' +
                '⚠️ Najbezpieczniej przywracać przy zamkniętym Antigravity. Po przywróceniu uruchom go ponownie.',
                { modal: true },
                'Tak, przywróć angielski',
                'Anuluj'
            );
            if (confirm !== 'Tak, przywróć angielski') { return; }

            const result = restoreOriginal();
            if (result.success) {
                vscode.window.showInformationMessage(`✅ ${result.message}`, { modal: true });
            } else {
                vscode.window.showErrorMessage(`❌ ${result.message}`, { modal: true });
            }
        }
    );

    // Komenda: Sprawdź stan spolszczenia
    const statusCommand = vscode.commands.registerCommand(
        'antigravityPL.checkStatus',
        () => {
            const status = checkPatchStatus();
            vscode.window.showInformationMessage(
                `Stan spolszczenia: ${status.details}`,
                ...(status.canPatch && !status.patched ? ['Spolszcz teraz'] : [])
            ).then(selection => {
                if (selection === 'Spolszcz teraz') {
                    vscode.commands.executeCommand('antigravityPL.applyPatch');
                }
            });
        }
    );

    // ======================== PANELE REFERENCYJNE ========================

    const openSettings = vscode.commands.registerCommand(
        'antigravityPL.openSettings',
        () => SettingsPanel.createOrShow(context.extensionUri)
    );

    const openAgentManager = vscode.commands.registerCommand(
        'antigravityPL.openAgentManager',
        () => AgentManagerPanel.createOrShow(context.extensionUri)
    );

    const openRoadmap = vscode.commands.registerCommand(
        'antigravityPL.openRoadmap',
        () => RoadmapPanel.createOrShow(context.extensionUri)
    );

    const openQuickRef = vscode.commands.registerCommand(
        'antigravityPL.openQuickRef',
        () => QuickRefPanel.createOrShow(context.extensionUri)
    );

    // ======================== SUBSKRYPCJE ========================

    context.subscriptions.push(
        patchCommand, restoreCommand, statusCommand,
        openSettings, openAgentManager, openRoadmap, openQuickRef
    );

    // ======================== PASEK STANU ========================

    const statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right, 100
    );
    statusBarItem.text = '$(globe) Antigravity PL';
    statusBarItem.tooltip = 'Kliknij → Spolszcz interfejs Antigravity';
    statusBarItem.command = 'antigravityPL.applyPatch';
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    // ======================== PIERWSZE URUCHOMIENIE ========================

    const hasShownWelcome = context.globalState.get<boolean>('welcomeShown2');
    if (!hasShownWelcome) {
        const status = checkPatchStatus();
        if (status.canPatch && !status.patched) {
            vscode.window.showInformationMessage(
                '🇵🇱 Antigravity Polski zainstalowany!\n\n' +
                'Aby spolszczyć Settings i Agent Manager, zamknij Antigravity i użyj komendy "Spolszcz interfejs".',
                'Spolszcz teraz',
                'Pokaż przewodnik',
                'Później'
            ).then(selection => {
                if (selection === 'Spolszcz teraz') {
                    vscode.commands.executeCommand('antigravityPL.applyPatch');
                } else if (selection === 'Pokaż przewodnik') {
                    vscode.commands.executeCommand('antigravityPL.openSettings');
                }
            });
        }
        context.globalState.update('welcomeShown2', true);
    }

    console.log('[Antigravity PL] Rozszerzenie aktywowane — użyj Ctrl+Shift+P → "Antigravity PL: Spolszcz"');
}

export function deactivate() {
    console.log('[Antigravity PL] Dezaktywowano.');
}
