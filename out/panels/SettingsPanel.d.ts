import * as vscode from 'vscode';
import { BasePanel } from './BasePanel';
export declare class SettingsPanel extends BasePanel {
    static currentPanel: SettingsPanel | undefined;
    private static readonly viewType;
    static createOrShow(extensionUri: vscode.Uri): void;
    private constructor();
    protected getHtmlContent(): string;
}
//# sourceMappingURL=SettingsPanel.d.ts.map