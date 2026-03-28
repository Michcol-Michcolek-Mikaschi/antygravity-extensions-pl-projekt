import * as vscode from 'vscode';
import { BasePanel } from './BasePanel';
export declare class QuickRefPanel extends BasePanel {
    static currentPanel: QuickRefPanel | undefined;
    private static readonly viewType;
    static createOrShow(extensionUri: vscode.Uri): void;
    private constructor();
    protected getHtmlContent(): string;
}
//# sourceMappingURL=QuickRefPanel.d.ts.map