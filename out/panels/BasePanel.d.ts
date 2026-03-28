import * as vscode from 'vscode';
export declare abstract class BasePanel {
    protected panel: vscode.WebviewPanel;
    protected extensionUri: vscode.Uri;
    protected disposables: vscode.Disposable[];
    protected constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri);
    protected abstract getHtmlContent(): string;
    protected getMediaUri(fileName: string): vscode.Uri;
    protected getNonce(): string;
    protected getSharedStyles(): string;
    dispose(): void;
}
//# sourceMappingURL=BasePanel.d.ts.map