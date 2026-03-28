// =============================================================================
// Panel: Roadmapa — Krok po kroku jak stworzyć rozszerzenie
// =============================================================================
// Interaktywna instrukcja tworzenia rozszerzenia dla Antigravity/VS Code.
// Stronnicowana z przyciskami Dalej/Wstecz jak instrukcja obsługi.
// =============================================================================

import * as vscode from 'vscode';
import { BasePanel } from './BasePanel';

export class RoadmapPanel extends BasePanel {
    public static currentPanel: RoadmapPanel | undefined;
    private static readonly viewType = 'antigravityPL.roadmap';

    public static createOrShow(extensionUri: vscode.Uri) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;
        if (RoadmapPanel.currentPanel) {
            RoadmapPanel.currentPanel.panel.reveal(column);
            return;
        }
        const panel = vscode.window.createWebviewPanel(
            RoadmapPanel.viewType,
            '🗺️ Roadmapa — Tworzenie rozszerzenia',
            column || vscode.ViewColumn.One,
            { enableScripts: true, retainContextWhenHidden: true }
        );
        RoadmapPanel.currentPanel = new RoadmapPanel(panel, extensionUri);
    }

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        super(panel, extensionUri);
        this.panel.onDidDispose(() => {
            RoadmapPanel.currentPanel = undefined;
        }, null, this.disposables);
    }

    protected getHtmlContent(): string {
        const nonce = this.getNonce();
        return `<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'nonce-${nonce}'; script-src 'nonce-${nonce}';">
    <title>Roadmapa — Jak stworzyć rozszerzenie</title>
    <style nonce="${nonce}">
        ${this.getSharedStyles()}

        .roadmap-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 0;
            border-top: 1px solid var(--border-color);
            margin-top: 32px;
        }

        .page-indicator {
            color: var(--text-muted);
            font-size: 0.9rem;
        }

        .progress-bar {
            width: 100%;
            height: 4px;
            background: var(--bg-hover);
            border-radius: 2px;
            margin-bottom: 24px;
            overflow: hidden;
        }
        .progress-fill {
            height: 100%;
            background: var(--accent-gradient);
            border-radius: 2px;
            transition: width 0.3s ease;
        }

        .page { display: none; }
        .page.active { display: block; }

        .timeline {
            position: relative;
            padding-left: 32px;
        }
        .timeline::before {
            content: '';
            position: absolute;
            left: 11px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: var(--border-color);
        }
        .timeline-item {
            position: relative;
            padding: 16px 0;
        }
        .timeline-dot {
            position: absolute;
            left: -32px;
            top: 18px;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            border: 2px solid var(--accent-blue);
            background: var(--bg-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.65rem;
            color: var(--accent-blue);
        }
        .timeline-dot.done { background: var(--accent-green); border-color: var(--accent-green); color: #fff; }
        .timeline-dot.current { background: var(--accent-blue); color: #fff; }

        .file-tree {
            font-family: 'Consolas', 'Courier New', monospace;
            font-size: 0.85rem;
            background: var(--bg-primary);
            padding: 16px;
            border-radius: var(--radius);
            border: 1px solid var(--border-color);
            line-height: 1.8;
            color: var(--text-secondary);
        }
        .file-tree .folder { color: var(--accent-blue); }
        .file-tree .file { color: var(--accent-green); }
        .file-tree .important { color: var(--accent-orange); font-weight: bold; }

        .code-inline {
            display: inline;
            padding: 2px 6px;
            background: var(--bg-primary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            font-family: 'Consolas', monospace;
            font-size: 0.85em;
            color: var(--accent-orange);
        }

        .code-block {
            position: relative;
            background: var(--bg-primary);
            border: 1px solid var(--border-color);
            border-radius: var(--radius);
            padding: 16px;
            margin: 12px 0;
            font-family: 'Consolas', monospace;
            font-size: 0.85rem;
            line-height: 1.6;
            overflow-x: auto;
            white-space: pre-wrap;
        }

        .copy-button {
            position: absolute;
            top: 8px;
            right: 8px;
            padding: 4px 12px;
            background: var(--bg-hover);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            color: var(--text-secondary);
            font-size: 0.75rem;
            cursor: pointer;
        }
        .copy-button:hover { background: var(--accent-green); color: #fff; }

        .checklist {
            list-style: none;
            padding: 0;
        }
        .checklist li {
            padding: 8px 0;
            padding-left: 28px;
            position: relative;
            color: var(--text-secondary);
        }
        .checklist li::before {
            content: '☐';
            position: absolute;
            left: 0;
            color: var(--text-muted);
        }
        .checklist li.done::before { content: '☑'; color: var(--accent-green); }
    </style>
</head>
<body>
    <div class="page-header">
        <h1>🗺️ Roadmapa — Jak stworzyć rozszerzenie od zera</h1>
        <div class="subtitle">Instrukcja krok po kroku dla kompletnych początkujących</div>
    </div>

    <div class="container">
        <div class="progress-bar"><div class="progress-fill" id="progressFill" style="width: 10%"></div></div>

        <!-- =================== STRONA 0: SPIS TREŚCI =================== -->
        <div class="page active" id="page-0">
            <div class="hero" style="text-align:left;padding:24px;">
                <h2 style="text-align:center;">📚 Spis treści — Twoja droga do rozszerzenia</h2>
                <p style="text-align:center;margin-bottom:24px;">Kliknij etap żeby przejść bezpośrednio lub czytaj od początku</p>

                <div class="timeline">
                    <div class="timeline-item"><div class="timeline-dot done">✓</div>
                        <h4 style="cursor:pointer;color:var(--accent-blue)" onclick="goToPage(1)">Etap 1: Co będziemy tworzyć?</h4>
                        <p class="card-body" style="margin:0"><span style="color:var(--text-secondary)">Omówienie projektu, wymagania, plan</span></p>
                    </div>
                    <div class="timeline-item"><div class="timeline-dot current">2</div>
                        <h4 style="cursor:pointer;color:var(--accent-blue)" onclick="goToPage(2)">Etap 2: Przygotowanie środowiska</h4>
                        <p style="color:var(--text-secondary)">Instalacja Node.js, npm, narzędzi</p>
                    </div>
                    <div class="timeline-item"><div class="timeline-dot">3</div>
                        <h4 style="cursor:pointer;color:var(--accent-blue)" onclick="goToPage(3)">Etap 3: Struktura projektu</h4>
                        <p style="color:var(--text-secondary)">Pliki, foldery, package.json — fundament rozszerzenia</p>
                    </div>
                    <div class="timeline-item"><div class="timeline-dot">4</div>
                        <h4 style="cursor:pointer;color:var(--accent-blue)" onclick="goToPage(4)">Etap 4: Kod rozszerzenia</h4>
                        <p style="color:var(--text-secondary)">TypeScript, webview panele, komendy</p>
                    </div>
                    <div class="timeline-item"><div class="timeline-dot">5</div>
                        <h4 style="cursor:pointer;color:var(--accent-blue)" onclick="goToPage(5)">Etap 5: Tłumaczenia i l10n</h4>
                        <p style="color:var(--text-secondary)">Pliki lokalizacji, słownik tłumaczeń</p>
                    </div>
                    <div class="timeline-item"><div class="timeline-dot">6</div>
                        <h4 style="cursor:pointer;color:var(--accent-blue)" onclick="goToPage(6)">Etap 6: Testowanie</h4>
                        <p style="color:var(--text-secondary)">Uruchamianie, debugowanie, poprawki</p>
                    </div>
                    <div class="timeline-item"><div class="timeline-dot">7</div>
                        <h4 style="cursor:pointer;color:var(--accent-blue)" onclick="goToPage(7)">Etap 7: Publikacja</h4>
                        <p style="color:var(--text-secondary)">Pakowanie, Open VSX, sklep Antigravity</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- =================== STRONA 1: CO TWORZYMY =================== -->
        <div class="page" id="page-1">
            <div class="section">
                <div class="section-title">📋 Etap 1: Co będziemy tworzyć?</div>

                <div class="card">
                    <div class="card-header"><h3>Cel projektu</h3></div>
                    <div class="card-body">
                        <p><strong>Tworzymy rozszerzenie „Antigravity Polski"</strong> — spolszczenie będące jednocześnie
                        interaktywnym przewodnikiem po Google Antigravity IDE po polsku.</p>
                        <p style="margin-top:12px"><strong>Wersja 0.5</strong> (pierwsza publikacja):</p>
                        <ul class="checklist">
                            <li>Panel „Spolszczone Ustawienia" — wszystkie opcje Antigravity po polsku z tooltipami</li>
                            <li>Panel „Menedżer Agentów PL" — przewodnik po Agent Manager</li>
                            <li>Panel „Ściągawka" — gotowe konfiguracje do skopiowania</li>
                            <li>Pasek stanu z szybkim dostępem</li>
                        </ul>
                        <p style="margin-top:12px"><strong>Wersja 1.0</strong> (rozbudowa):</p>
                        <ul class="checklist">
                            <li>Cook-book-antygravity — folder z HTML poradnikiem w każdym projekcie</li>
                            <li>Zescrapowana dokumentacja z wyszukiwarką</li>
                            <li>Samouczek krok po kroku</li>
                        </ul>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"><h3>Twoje zasoby</h3></div>
                    <div class="card-body">
                        <p>Na podstawie Twojego wyposażenia:</p>
                        <div class="option-list">
                            <div class="option-item"><span class="option-label">🤖 GitHub Copilot</span><span class="option-desc">Subskrypcja $10/mies. + $50 budżetu — asystent AI do pisania kodu</span></div>
                            <div class="option-item"><span class="option-label">📱 Google Pixel 9 Pro XL</span><span class="option-desc">Daje dostęp do Google AI Pro z 2TB dyskiem i Gemini Pro</span></div>
                            <div class="option-item"><span class="option-label">💻 VS Code Insiders</span><span class="option-desc">Tu piszemy kod rozszerzenia (lepsze narzędzia dev)</span></div>
                            <div class="option-item"><span class="option-label">🚀 Antigravity</span><span class="option-desc">Tu testujemy gotowe rozszerzenie</span></div>
                            <div class="option-item"><span class="option-label">🐙 GitHub Pro</span><span class="option-desc">Do hostowania kodu i publikacji</span></div>
                        </div>
                    </div>
                </div>

                <div class="info-box">
                    💡 <strong>Ważne:</strong> Rozszerzenia Antigravity to dokładnie to samo co rozszerzenia VS Code
                    — Antigravity bazuje na kodzie VS Code i używa tego samego API rozszerzeń.
                    Jedyna różnica: Antigravity korzysta ze sklepu <strong>Open VSX</strong> zamiast VS Code Marketplace.
                </div>
            </div>
        </div>

        <!-- =================== STRONA 2: ŚRODOWISKO =================== -->
        <div class="page" id="page-2">
            <div class="section">
                <div class="section-title">🛠️ Etap 2: Przygotowanie środowiska</div>

                <div class="card">
                    <div class="card-header"><h3>Krok 2.1 — Zainstaluj Node.js</h3><span class="badge badge-important">WYMAGANE</span></div>
                    <div class="card-body">
                        <p>Node.js to silnik JavaScript potrzebny do kompilacji i pakowania rozszerzenia.</p>
                        <p style="margin-top:8px">Pobierz <strong>Node.js LTS</strong> ze strony: <code>https://nodejs.org</code></p>
                        <p>Sprawdź instalację — otwórz terminal (<kbd>Ctrl+\`</kbd>) i wpisz:</p>
                        <div class="code-block" id="check-node">
<button class="copy-button" onclick="copyCode('check-node')">📋 Kopiuj</button>
node --version
npm --version</div>
                        <p>Powinno wyświetlić numery wersji (np. v20.x.x i 10.x.x).</p>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"><h3>Krok 2.2 — Zainstaluj narzędzia pakowania</h3><span class="badge badge-important">WYMAGANE</span></div>
                    <div class="card-body">
                        <p>Potrzebujesz dwóch narzędzi: <strong>vsce</strong> (pakowanie) i <strong>ovsx</strong> (publikacja na Open VSX).</p>
                        <div class="code-block" id="install-tools">
<button class="copy-button" onclick="copyCode('install-tools')">📋 Kopiuj</button>
npm install -g @vscode/vsce ovsx</div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"><h3>Krok 2.3 — Zainstaluj zależności projektu</h3><span class="badge badge-important">WYMAGANE</span></div>
                    <div class="card-body">
                        <p>Otwórz folder projektu rozszerzenia w VS Code Insiders i uruchom:</p>
                        <div class="code-block" id="install-deps">
<button class="copy-button" onclick="copyCode('install-deps')">📋 Kopiuj</button>
cd antygravity-extensions-pl-projekt
npm install</div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"><h3>Krok 2.4 — Skonfiguruj konto Open VSX</h3></div>
                    <div class="card-body">
                        <p>Do publikacji potrzebujesz tokenu dostępu z Open VSX:</p>
                        <ol style="color:var(--text-secondary);padding-left:20px;">
                            <li>Wejdź na <code>https://open-vsx.org</code></li>
                            <li>Zaloguj się kontem GitHub</li>
                            <li>Przejdź do Settings → Access Tokens</li>
                            <li>Stwórz nowy token i zapisz go bezpiecznie</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <!-- =================== STRONA 3: STRUKTURA =================== -->
        <div class="page" id="page-3">
            <div class="section">
                <div class="section-title">📁 Etap 3: Struktura projektu</div>

                <div class="card">
                    <div class="card-header"><h3>Drzewo plików rozszerzenia</h3></div>
                    <div class="card-body">
                        <div class="file-tree">
<span class="folder">antygravity-extensions-pl-projekt/</span>
├── <span class="important">package.json</span>          ← manifest rozszerzenia (najważniejszy plik!)
├── <span class="file">tsconfig.json</span>         ← konfiguracja TypeScript
├── <span class="file">.vscodeignore</span>         ← pliki pomijane przy pakowaniu
├── <span class="file">README.md</span>             ← opis na stronie sklepu
├── <span class="file">CHANGELOG.md</span>          ← historia zmian
├── <span class="file">LICENSE</span>               ← licencja MIT
├── <span class="folder">src/</span>                    ← kod źródłowy TypeScript
│   ├── <span class="important">extension.ts</span>      ← punkt startowy — aktywacja
│   └── <span class="folder">panels/</span>             ← panele webview
│       ├── <span class="file">BasePanel.ts</span>      ← bazowa klasa (style, nonce)
│       ├── <span class="file">SettingsPanel.ts</span>  ← spolszczone ustawienia
│       ├── <span class="file">AgentManagerPanel.ts</span> ← przewodnik Agent Manager
│       ├── <span class="file">QuickRefPanel.ts</span>  ← ściągawka
│       └── <span class="file">RoadmapPanel.ts</span>   ← ta roadmapa
├── <span class="folder">l10n/</span>                   ← pliki lokalizacji
│   ├── <span class="file">agent-manager.i18n.json</span>
│   └── <span class="file">settings.i18n.json</span>
├── <span class="folder">media/</span>                  ← zasoby (ikony, obrazy)
│   └── <span class="file">icon.png</span>
└── <span class="folder">.vscode/</span>                ← konfiguracja dev
    ├── <span class="file">launch.json</span>       ← debugowanie rozszerzenia
    └── <span class="file">tasks.json</span>        ← automatyczna kompilacja
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"><h3>Kluczowy plik: package.json</h3><span class="badge badge-important">FUNDAMENT</span></div>
                    <div class="card-body">
                        <p>To jest „dowód osobisty" rozszerzenia. Definiuje:</p>
                        <div class="option-list">
                            <div class="option-item"><span class="option-label">name</span><span class="option-desc">Unikalna nazwa rozszerzenia (małe litery, myślniki)</span></div>
                            <div class="option-item"><span class="option-label">displayName</span><span class="option-desc">Nazwa wyświetlana w sklepie</span></div>
                            <div class="option-item"><span class="option-label">version</span><span class="option-desc">Wersja w formacie X.Y.Z (np. 0.5.0)</span></div>
                            <div class="option-item"><span class="option-label">engines.vscode</span><span class="option-desc">Minimalna wersja VS Code/Antigravity</span></div>
                            <div class="option-item"><span class="option-label">activationEvents</span><span class="option-desc">Kiedy rozszerzenie się uruchamia</span></div>
                            <div class="option-item"><span class="option-label">main</span><span class="option-desc">Ścieżka do skompilowanego pliku JS (punkt wejścia)</span></div>
                            <div class="option-item"><span class="option-label">contributes</span><span class="option-desc">Co rozszerzenie dodaje: komendy, ustawienia, tłumaczenia</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- =================== STRONA 4: KOD =================== -->
        <div class="page" id="page-4">
            <div class="section">
                <div class="section-title">💻 Etap 4: Kod rozszerzenia</div>

                <div class="card">
                    <div class="card-header"><h3>extension.ts — Punkt startowy</h3></div>
                    <div class="card-body">
                        <p>Każde rozszerzenie VS Code/Antigravity musi eksportować dwie funkcje:</p>
                        <div class="code-block" id="code-ext">
<button class="copy-button" onclick="copyCode('code-ext')">📋 Kopiuj</button>
import * as vscode from 'vscode';

// Uruchamia się gdy rozszerzenie jest aktywowane
export function activate(context: vscode.ExtensionContext) {

    // Rejestruj komendę — to co widzisz w Ctrl+Shift+P
    const cmd = vscode.commands.registerCommand(
        'mojeRozszerzenie.helloWorld',
        () => {
            vscode.window.showInformationMessage('Cześć!');
        }
    );

    // Dodaj do kontekstu (żeby posprzątać przy dezaktywacji)
    context.subscriptions.push(cmd);
}

// Uruchamia się gdy rozszerzenie jest dezaktywowane
export function deactivate() { }</div>
                        <p style="margin-top:12px"><strong>Kluczowe koncepty:</strong></p>
                        <ul style="color:var(--text-secondary);padding-left:20px;line-height:2;">
                            <li><code class="code-inline">vscode.commands.registerCommand()</code> — rejestruje komendę w palecie poleceń</li>
                            <li><code class="code-inline">vscode.window.createWebviewPanel()</code> — tworzy panel HTML w edytorze</li>
                            <li><code class="code-inline">vscode.window.createStatusBarItem()</code> — dodaje element na pasku stanu</li>
                            <li><code class="code-inline">context.subscriptions.push()</code> — rejestruje zasoby do posprzątania</li>
                        </ul>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"><h3>Webview Panel — HTML wewnątrz edytora</h3></div>
                    <div class="card-body">
                        <p>Webview to sposób na wyświetlanie dowolnego HTML/CSS/JS wewnątrz VS Code/Antigravity. Tak właśnie działają nasze polskie panele.</p>
                        <div class="code-block" id="code-webview">
<button class="copy-button" onclick="copyCode('code-webview')">📋 Kopiuj</button>
// Stwórz panel webview
const panel = vscode.window.createWebviewPanel(
    'mojPanel',              // identyfikator (wewnętrzny)
    'Mój Panel po polsku',   // tytuł zakładki
    vscode.ViewColumn.One,   // w której kolumnie wyświetlić
    {
        enableScripts: true,           // pozwól na JavaScript
        retainContextWhenHidden: true  // nie niszcz przy ukrywaniu
    }
);

// Ustaw zawartość HTML
panel.webview.html = \`
    &lt;!DOCTYPE html&gt;
    &lt;html lang="pl"&gt;
    &lt;body&gt;
        &lt;h1&gt;Witaj w moim panelu!&lt;/h1&gt;
        &lt;p&gt;Tu możesz umieścić dowolne HTML.&lt;/p&gt;
    &lt;/body&gt;
    &lt;/html&gt;
\`;</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- =================== STRONA 5: TŁUMACZENIA =================== -->
        <div class="page" id="page-5">
            <div class="section">
                <div class="section-title">🌐 Etap 5: System tłumaczeń (l10n)</div>

                <div class="card">
                    <div class="card-header"><h3>Jak działa lokalizacja w VS Code / Antigravity</h3></div>
                    <div class="card-body">
                        <p>Rozszerzenie deklaruje tłumaczenia w <code class="code-inline">package.json</code> → <code class="code-inline">contributes.localizations</code>. Każde tłumaczenie to plik JSON z mapowaniem kluczy na przetłumaczone teksty.</p>
                        <p style="margin-top:12px">W naszym projekcie pliki tłumaczeń znajdują się w folderze <code class="code-inline">l10n/</code>:</p>
                        <div class="option-list">
                            <div class="option-item"><span class="option-label">agent-manager.i18n.json</span><span class="option-desc">Tłumaczenia elementów Agent Managera</span></div>
                            <div class="option-item"><span class="option-label">settings.i18n.json</span><span class="option-desc">Tłumaczenia opcji ustawień</span></div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"><h3>Format pliku tłumaczeń</h3></div>
                    <div class="card-body">
                        <div class="code-block" id="l10n-format">
<button class="copy-button" onclick="copyCode('l10n-format')">📋 Kopiuj</button>
{
  "contents": {
    "modul/sciezka": {
      "klucz.oryginalny": "Przetłumaczony tekst po polsku",
      "settings.title": "Ustawienia",
      "agent.mode.planning": "Planowanie"
    }
  }
}</div>
                        <p style="margin-top:12px">Klucze muszą dokładnie odpowiadać kluczom używanym w kodzie źródłowym Antigravity.</p>
                    </div>
                </div>

                <div class="info-box">
                    💡 <strong>Ważna uwaga:</strong> Standardowa lokalizacja VS Code działa dla elementów bazowych edytora.
                    Elementy specyficzne dla Antigravity (Agent Manager, niestandardowe Settings) mogą wymagać innego podejścia
                    — dlatego nasze rozszerzenie używa paneli webview z polskim interfejsem jako uzupełnienie.
                </div>
            </div>
        </div>

        <!-- =================== STRONA 6: TESTOWANIE =================== -->
        <div class="page" id="page-6">
            <div class="section">
                <div class="section-title">🧪 Etap 6: Testowanie rozszerzenia</div>

                <div class="card">
                    <div class="card-header"><h3>Krok 6.1 — Kompilacja</h3></div>
                    <div class="card-body">
                        <p>Skompiluj TypeScript do JavaScript:</p>
                        <div class="code-block" id="compile">
<button class="copy-button" onclick="copyCode('compile')">📋 Kopiuj</button>
npm run compile</div>
                        <p>Lub uruchom tryb nasłuchiwania (automatyczna rekompilacja):</p>
                        <div class="code-block" id="watch">
<button class="copy-button" onclick="copyCode('watch')">📋 Kopiuj</button>
npm run watch</div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"><h3>Krok 6.2 — Uruchomienie testowe (F5)</h3></div>
                    <div class="card-body">
                        <p>W VS Code Insiders naciśnij <kbd>F5</kbd> — otworzy się nowe okno z załadowanym rozszerzeniem.</p>
                        <ol style="color:var(--text-secondary);padding-left:20px;line-height:2;">
                            <li>Otwórz paletę poleceń: <kbd>Ctrl+Shift+P</kbd></li>
                            <li>Wpisz: <code class="code-inline">Antigravity PL</code></li>
                            <li>Powinieneś zobaczyć 4 komendy naszego rozszerzenia</li>
                            <li>Kliknij dowolną żeby otworzyć panel</li>
                        </ol>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"><h3>Krok 6.3 — Testowanie w Antigravity</h3></div>
                    <div class="card-body">
                        <p>Żeby przetestować w Antigravity, spakuj rozszerzenie i zainstaluj ręcznie:</p>
                        <div class="code-block" id="test-ag">
<button class="copy-button" onclick="copyCode('test-ag')">📋 Kopiuj</button>
# Spakuj do pliku .vsix
vsce package

# Zainstaluj w Antigravity:
# Otwórz Antigravity → Ctrl+Shift+P → "Install from VSIX"
# Wybierz plik .vsix</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- =================== STRONA 7: PUBLIKACJA =================== -->
        <div class="page" id="page-7">
            <div class="section">
                <div class="section-title">🚀 Etap 7: Publikacja na Open VSX</div>

                <div class="card">
                    <div class="card-header"><h3>Krok 7.1 — Przygotuj README</h3><span class="badge badge-important">WAŻNE</span></div>
                    <div class="card-body">
                        <p>README.md to strona Twojego rozszerzenia w sklepie. Napisz po polsku i angielsku.</p>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"><h3>Krok 7.2 — Spakuj rozszerzenie</h3></div>
                    <div class="card-body">
                        <div class="code-block" id="package-ext">
<button class="copy-button" onclick="copyCode('package-ext')">📋 Kopiuj</button>
# Spakuj do pliku .vsix
vsce package

# Wynik: antigravity-polish-pack-0.5.0.vsix</div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"><h3>Krok 7.3 — Opublikuj na Open VSX</h3></div>
                    <div class="card-body">
                        <div class="code-block" id="publish-ext">
<button class="copy-button" onclick="copyCode('publish-ext')">📋 Kopiuj</button>
# Zaloguj się tokenem
ovsx create-namespace antigravity-pl-community -p TWOJ_TOKEN

# Opublikuj
ovsx publish antigravity-polish-pack-0.5.0.vsix -p TWOJ_TOKEN</div>
                        <div class="warning-box">
                            ⚠️ <strong>Nigdy nie wklejaj tokenu w publicznym kodzie!</strong>
                            Użyj zmiennej środowiskowej lub wpisz bezpośrednio w komendzie.
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"><h3>🎉 Gotowe!</h3><span class="badge badge-recommended">SUKCES</span></div>
                    <div class="card-body">
                        <p>Po publikacji Twoje rozszerzenie jest dostępne dla wszystkich użytkowników Antigravity!
                        Mogą je znaleźć w sklepie wyszukując „Antigravity Polski" lub „spolszczenie".</p>
                        <p style="margin-top:12px"><strong>Następne kroki (v1.0):</strong></p>
                        <ul class="checklist">
                            <li>Dodaj cookbook z dokumentacją w HTML</li>
                            <li>Zescrapuj oficjalną dokumentację Google</li>
                            <li>Dodaj samouczek krok po kroku</li>
                            <li>Rozbuduj ściągawkę o nowe szablony</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- NAWIGACJA STRON -->
        <div class="roadmap-nav">
            <button class="btn btn-secondary" id="btnPrev" onclick="changePage(-1)">← Wstecz</button>
            <span class="page-indicator" id="pageIndicator">Strona 0 z 7</span>
            <button class="btn btn-primary" id="btnNext" onclick="changePage(1)">Dalej →</button>
        </div>
    </div>

    <script nonce="${nonce}">
        let currentPage = 0;
        const totalPages = 8; // 0-7

        function goToPage(page) {
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            const target = document.getElementById('page-' + page);
            if (target) {
                target.classList.add('active');
                currentPage = page;
                updateNav();
            }
        }

        function changePage(delta) {
            const newPage = currentPage + delta;
            if (newPage >= 0 && newPage < totalPages) {
                goToPage(newPage);
            }
        }

        function updateNav() {
            document.getElementById('pageIndicator').textContent =
                'Strona ' + currentPage + ' z ' + (totalPages - 1);
            document.getElementById('btnPrev').style.visibility =
                currentPage === 0 ? 'hidden' : 'visible';
            document.getElementById('btnNext').textContent =
                currentPage === totalPages - 1 ? '🎉 Koniec!' : 'Dalej →';
            document.getElementById('btnNext').disabled = currentPage === totalPages - 1;
            // Progress bar
            const progress = ((currentPage + 1) / totalPages) * 100;
            document.getElementById('progressFill').style.width = progress + '%';
            // Scroll na górę
            window.scrollTo(0, 0);
        }

        function copyCode(blockId) {
            const block = document.getElementById(blockId);
            if (!block) return;
            const button = block.querySelector('.copy-button');
            const text = block.textContent.replace(button.textContent, '').trim();
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            button.textContent = '✅ Skopiowano!';
            setTimeout(() => { button.textContent = '📋 Kopiuj'; }, 2000);
        }
        window.copyCode = copyCode;
        window.goToPage = goToPage;

        updateNav();
    </script>
</body>
</html>`;
    }
}
