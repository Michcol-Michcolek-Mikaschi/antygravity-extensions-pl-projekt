// =============================================================================
// Bazowa klasa dla paneli webview
// =============================================================================
// Każdy panel (Ustawienia, Agent Manager, Roadmapa) dziedziczy po tej klasie.
// Obsługuje tworzenie okna, ładowanie HTML i zarządzanie cyklem życia panelu.
// =============================================================================

import * as vscode from 'vscode';

export abstract class BasePanel {
    protected panel: vscode.WebviewPanel;
    protected extensionUri: vscode.Uri;
    protected disposables: vscode.Disposable[] = [];

    protected constructor(
        panel: vscode.WebviewPanel,
        extensionUri: vscode.Uri
    ) {
        this.panel = panel;
        this.extensionUri = extensionUri;

        // Gdy użytkownik zamknie panel — posprzątaj zasoby
        this.panel.onDidDispose(() => this.dispose(), null, this.disposables);

        // Ustaw zawartość HTML panelu
        this.panel.webview.html = this.getHtmlContent();
    }

    // Każdy panel musi zdefiniować swoją zawartość HTML
    protected abstract getHtmlContent(): string;

    // Pomocnicza metoda — generuje bezpieczny URI do plików CSS/JS w folderze media
    protected getMediaUri(fileName: string): vscode.Uri {
        return this.panel.webview.asWebviewUri(
            vscode.Uri.joinPath(this.extensionUri, 'media', fileName)
        );
    }

    // Pomocnicza metoda — generuje nonce dla Content Security Policy
    protected getNonce(): string {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 32; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    // Wspólne style CSS używane przez wszystkie panele
    protected getSharedStyles(): string {
        return `
        :root {
            --bg-primary: #0d1117;
            --bg-secondary: #161b22;
            --bg-card: #1c2128;
            --bg-hover: #272d36;
            --border-color: #30363d;
            --text-primary: #e6edf3;
            --text-secondary: #8b949e;
            --text-muted: #6e7681;
            --accent-blue: #58a6ff;
            --accent-green: #3fb950;
            --accent-orange: #d29922;
            --accent-red: #f85149;
            --accent-purple: #bc8cff;
            --accent-gradient: linear-gradient(135deg, #58a6ff, #bc8cff);
            --radius: 8px;
            --radius-lg: 12px;
            --shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.6;
            padding: 0;
        }

        .container {
            max-width: 960px;
            margin: 0 auto;
            padding: 24px;
        }

        /* Nagłówek strony */
        .page-header {
            background: var(--bg-secondary);
            border-bottom: 1px solid var(--border-color);
            padding: 20px 24px;
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .page-header h1 {
            font-size: 1.5rem;
            font-weight: 600;
            background: var(--accent-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .page-header .subtitle {
            color: var(--text-secondary);
            font-size: 0.9rem;
            margin-top: 4px;
        }

        /* Karty ustawień */
        .card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: 20px;
            margin-bottom: 16px;
            transition: border-color 0.2s;
        }
        .card:hover {
            border-color: var(--accent-blue);
        }

        .card-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
        }

        .card-header h3 {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--text-primary);
        }

        .card-header .badge {
            font-size: 0.7rem;
            padding: 2px 8px;
            border-radius: 12px;
            font-weight: 500;
            text-transform: uppercase;
        }
        .badge-important { background: rgba(248,81,73,0.15); color: var(--accent-red); }
        .badge-recommended { background: rgba(63,185,80,0.15); color: var(--accent-green); }
        .badge-optional { background: rgba(139,148,158,0.15); color: var(--text-secondary); }

        .card-body p {
            color: var(--text-secondary);
            font-size: 0.95rem;
            margin-bottom: 8px;
        }

        .card-body .original {
            color: var(--text-muted);
            font-size: 0.8rem;
            font-style: italic;
        }

        /* Tooltip / dymek z opisem */
        .tooltip-trigger {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: var(--bg-hover);
            border: 1px solid var(--border-color);
            color: var(--accent-blue);
            font-size: 0.75rem;
            cursor: pointer;
            position: relative;
            flex-shrink: 0;
        }
        .tooltip-trigger:hover { background: var(--accent-blue); color: #fff; }

        .tooltip-content {
            display: none;
            position: absolute;
            left: 28px;
            top: -8px;
            width: 320px;
            padding: 14px;
            background: var(--bg-secondary);
            border: 1px solid var(--accent-blue);
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            z-index: 50;
            font-size: 0.85rem;
            color: var(--text-primary);
            line-height: 1.5;
        }
        .tooltip-trigger:hover .tooltip-content,
        .tooltip-trigger:focus .tooltip-content {
            display: block;
        }

        /* Sekcje */
        .section {
            margin-bottom: 32px;
        }
        .section-title {
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--accent-blue);
            margin-bottom: 16px;
            padding-bottom: 8px;
            border-bottom: 1px solid var(--border-color);
        }

        /* Opcje wyboru */
        .option-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-top: 12px;
        }
        .option-item {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            padding: 10px 14px;
            background: var(--bg-primary);
            border-radius: var(--radius);
            border: 1px solid var(--border-color);
        }
        .option-item .option-label {
            font-weight: 600;
            color: var(--accent-green);
            min-width: 140px;
        }
        .option-item .option-desc {
            color: var(--text-secondary);
            font-size: 0.9rem;
        }

        /* Przyciski */
        .btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 8px 16px;
            border-radius: var(--radius);
            font-size: 0.9rem;
            font-weight: 500;
            border: none;
            cursor: pointer;
            transition: all 0.2s;
        }
        .btn-primary { background: var(--accent-blue); color: #fff; }
        .btn-primary:hover { background: #79c0ff; }
        .btn-secondary { background: var(--bg-hover); color: var(--text-primary); border: 1px solid var(--border-color); }
        .btn-secondary:hover { border-color: var(--accent-blue); }

        /* Nawigacja */
        .nav-tabs {
            display: flex;
            gap: 0;
            border-bottom: 1px solid var(--border-color);
            margin-bottom: 24px;
            overflow-x: auto;
        }
        .nav-tab {
            padding: 10px 20px;
            color: var(--text-secondary);
            text-decoration: none;
            border-bottom: 2px solid transparent;
            cursor: pointer;
            white-space: nowrap;
            font-size: 0.9rem;
            transition: all 0.2s;
        }
        .nav-tab:hover { color: var(--text-primary); }
        .nav-tab.active {
            color: var(--accent-blue);
            border-bottom-color: var(--accent-blue);
        }

        /* Wyszukiwarka */
        .search-box {
            width: 100%;
            padding: 10px 16px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: var(--radius);
            color: var(--text-primary);
            font-size: 0.95rem;
            margin-bottom: 20px;
        }
        .search-box:focus {
            outline: none;
            border-color: var(--accent-blue);
        }
        .search-box::placeholder { color: var(--text-muted); }

        /* Skrót klawiszowy */
        kbd {
            display: inline-block;
            padding: 2px 6px;
            font-size: 0.8rem;
            background: var(--bg-primary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            font-family: 'Consolas', 'Courier New', monospace;
            color: var(--accent-orange);
        }

        /* Responsywność */
        @media (max-width: 600px) {
            .container { padding: 16px; }
            .tooltip-content { width: 240px; left: -120px; top: 28px; }
        }
        `;
    }

    public dispose() {
        this.panel.dispose();
        while (this.disposables.length) {
            const disposable = this.disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }
}
