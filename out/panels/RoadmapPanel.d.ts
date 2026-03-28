import * as vscode from 'vscode';
import { BasePanel } from './BasePanel';
export declare class RoadmapPanel extends BasePanel {
    static currentPanel: RoadmapPanel | undefined;
    private static readonly viewType;
    static createOrShow(extensionUri: vscode.Uri): void;
    private constructor();
    protected getHtmlContent(): string;
}
//# sourceMappingURL=RoadmapPanel.d.ts.map