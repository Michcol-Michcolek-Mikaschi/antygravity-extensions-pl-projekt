import * as vscode from 'vscode';
import { BasePanel } from './BasePanel';
export declare class AgentManagerPanel extends BasePanel {
    static currentPanel: AgentManagerPanel | undefined;
    private static readonly viewType;
    static createOrShow(extensionUri: vscode.Uri): void;
    private constructor();
    protected getHtmlContent(): string;
}
//# sourceMappingURL=AgentManagerPanel.d.ts.map