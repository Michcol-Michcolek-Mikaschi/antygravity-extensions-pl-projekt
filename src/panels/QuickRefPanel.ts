// =============================================================================
// Panel: Szybka ściągawka tłumaczeń — gotowe do skopiowania
// =============================================================================
// Panel z gotowymi fragmentami konfiguracji do wklejenia, skrótami 
// klawiszowymi i szybkimi tłumaczeniami.
// =============================================================================

import * as vscode from 'vscode';
import { BasePanel } from './BasePanel';

export class QuickRefPanel extends BasePanel {
    public static currentPanel: QuickRefPanel | undefined;
    private static readonly viewType = 'antigravityPL.quickRef';

    public static createOrShow(extensionUri: vscode.Uri) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;
        if (QuickRefPanel.currentPanel) {
            QuickRefPanel.currentPanel.panel.reveal(column);
            return;
        }
        const panel = vscode.window.createWebviewPanel(
            QuickRefPanel.viewType,
            '📋 Ściągawka Antigravity PL',
            column || vscode.ViewColumn.One,
            { enableScripts: true, retainContextWhenHidden: true }
        );
        QuickRefPanel.currentPanel = new QuickRefPanel(panel, extensionUri);
    }

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        super(panel, extensionUri);
        this.panel.onDidDispose(() => {
            QuickRefPanel.currentPanel = undefined;
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
    <title>Ściągawka Antigravity PL</title>
    <style nonce="${nonce}">
        ${this.getSharedStyles()}

        .cheat-section { margin-bottom: 32px; }

        .code-block {
            position: relative;
            background: var(--bg-primary);
            border: 1px solid var(--border-color);
            border-radius: var(--radius);
            padding: 16px;
            margin: 12px 0;
            font-family: 'Consolas', 'Courier New', monospace;
            font-size: 0.85rem;
            line-height: 1.6;
            color: var(--text-primary);
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
            transition: all 0.2s;
        }
        .copy-button:hover {
            background: var(--accent-green);
            color: #fff;
            border-color: var(--accent-green);
        }
        .copy-button.copied {
            background: var(--accent-green);
            color: #fff;
        }

        .shortcut-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 12px;
        }
        .shortcut-card {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: var(--radius);
        }
        .shortcut-keys {
            display: flex;
            gap: 4px;
            flex-shrink: 0;
        }
        .shortcut-desc {
            color: var(--text-secondary);
            font-size: 0.9rem;
        }

        .tag {
            display: inline-block;
            padding: 1px 8px;
            border-radius: 12px;
            font-size: 0.7rem;
            font-weight: 500;
            margin-left: 8px;
        }
        .tag-config { background: rgba(188,140,255,0.15); color: var(--accent-purple); }
        .tag-file { background: rgba(63,185,80,0.15); color: var(--accent-green); }
        .tag-shortcut { background: rgba(88,166,255,0.15); color: var(--accent-blue); }
    </style>
</head>
<body>
    <div class="page-header">
        <h1>📋 Ściągawka Antigravity — Spolszczona</h1>
        <div class="subtitle">Gotowe fragmenty konfiguracji, skróty i szybkie tłumaczenia do skopiowania</div>
    </div>

    <div class="container">
        <!-- WYSZUKIWARKA -->
        <input type="text" class="search-box" id="searchCheat"
               placeholder="🔍 Szukaj w ściągawce... np. 'reguły' lub 'terminal'">

        <!-- NAWIGACJA -->
        <div class="nav-tabs">
            <span class="nav-tab active" data-tab="shortcuts">⌨️ Skróty klawiszowe</span>
            <span class="nav-tab" data-tab="configs">📝 Konfiguracje</span>
            <span class="nav-tab" data-tab="rules">📜 Przykładowe reguły</span>
            <span class="nav-tab" data-tab="paths">📂 Ważne ścieżki</span>
        </div>

        <!-- SKRÓTY KLAWISZOWE -->
        <div class="tab-content" id="tab-shortcuts">
            <div class="cheat-section" data-search="skróty klawiszowe shortcuts klawiatura">
                <div class="section-title">⌨️ Najważniejsze skróty klawiszowe <span class="tag tag-shortcut">Windows</span></div>
                <div class="shortcut-grid">
                    <div class="shortcut-card">
                        <div class="shortcut-keys"><kbd>Ctrl</kbd>+<kbd>E</kbd></div>
                        <div class="shortcut-desc">Przełącz: Edytor ↔ Agent Manager</div>
                    </div>
                    <div class="shortcut-card">
                        <div class="shortcut-keys"><kbd>Ctrl</kbd>+<kbd>,</kbd></div>
                        <div class="shortcut-desc">Otwórz ustawienia</div>
                    </div>
                    <div class="shortcut-card">
                        <div class="shortcut-keys"><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd></div>
                        <div class="shortcut-desc">Paleta poleceń (Command Palette)</div>
                    </div>
                    <div class="shortcut-card">
                        <div class="shortcut-keys"><kbd>Ctrl</kbd>+<kbd>\`</kbd></div>
                        <div class="shortcut-desc">Otwórz / zamknij terminal</div>
                    </div>
                    <div class="shortcut-card">
                        <div class="shortcut-keys"><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd></div>
                        <div class="shortcut-desc">Eksplorator plików</div>
                    </div>
                    <div class="shortcut-card">
                        <div class="shortcut-keys"><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>G</kbd></div>
                        <div class="shortcut-desc">Kontrola wersji (Git)</div>
                    </div>
                    <div class="shortcut-card">
                        <div class="shortcut-keys"><kbd>Ctrl</kbd>+<kbd>B</kbd></div>
                        <div class="shortcut-desc">Pokaż / ukryj panel boczny</div>
                    </div>
                    <div class="shortcut-card">
                        <div class="shortcut-keys"><kbd>Tab</kbd></div>
                        <div class="shortcut-desc">Zaakceptuj podpowiedź kodu AI</div>
                    </div>
                    <div class="shortcut-card">
                        <div class="shortcut-keys"><kbd>Esc</kbd></div>
                        <div class="shortcut-desc">Odrzuć podpowiedź kodu AI</div>
                    </div>
                    <div class="shortcut-card">
                        <div class="shortcut-keys"><kbd>Ctrl</kbd>+<kbd>K</kbd> <kbd>Ctrl</kbd>+<kbd>S</kbd></div>
                        <div class="shortcut-desc">Skróty klawiszowe — pełna lista</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- KONFIGURACJE DO SKOPIOWANIA -->
        <div class="tab-content" id="tab-configs" style="display:none;">
            <div class="cheat-section" data-search="konfiguracja ustawienia json settings">
                <div class="section-title">📝 Gotowe ustawienia JSON — skopiuj i wklej do settings.json</div>

                <div class="card">
                    <div class="card-header"><h3>Zalecane ustawienia początkowe</h3><span class="badge badge-recommended">ZALECANE</span></div>
                    <div class="card-body">
                        <p>Optymalne ustawienia dla początkującego użytkownika — bezpieczne i wygodne.</p>
                        <div class="code-block" id="config-starter">
<button class="copy-button" onclick="copyCode('config-starter')">📋 Kopiuj</button>
{
  // === ANTIGRAVITY — Ustawienia zalecane dla początkujących ===

  // Język interfejsu
  "locale": "pl",

  // Edytor — podstawowe
  "editor.fontSize": 14,
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "editor.minimap.enabled": true,
  "editor.bracketPairColorization.enabled": true,
  "editor.formatOnSave": true,

  // Terminal
  "terminal.integrated.fontSize": 13,

  // Pliki
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,

  // Git
  "git.enableSmartCommit": true,
  "git.autofetch": true
}</div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"><h3>Globalne reguły agenta — GEMINI.md</h3><span class="badge badge-recommended">ZALECANE</span></div>
                    <div class="card-body">
                        <p>Wklej do pliku <code>~/.gemini/GEMINI.md</code> — te reguły będą działać we wszystkich projektach.</p>
                        <div class="code-block" id="config-gemini">
<button class="copy-button" onclick="copyCode('config-gemini')">📋 Kopiuj</button>
# Globalne reguły agenta

## Język
- Odpowiadaj zawsze po polsku
- Komentarze w kodzie pisz po polsku
- Komunikaty commitów pisz po angielsku (konwencja)

## Styl kodu
- Używaj TypeScript zamiast JavaScript gdzie to możliwe
- Preferuj const nad let, nigdy var
- Używaj async/await zamiast .then()
- Dodawaj typy do parametrów funkcji

## Bezpieczeństwo
- Nie zapisuj sekretów w kodzie — używaj zmiennych środowiskowych
- Waliduj dane wejściowe od użytkownika
- Przed uruchomieniem destrukcyjnych poleceń — zapytaj o potwierdzenie

## Komunikacja
- Wyjaśniaj co robisz krok po kroku
- Gdy nie jesteś pewien — zapytaj zamiast zgadywać
- Po większych zmianach — podsumuj co zostało zrobione</div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"><h3>Reguła projektowa — .agents/rules/</h3><span class="badge badge-optional">OPCJONALNE</span></div>
                    <div class="card-body">
                        <p>Stwórz plik <code>.agents/rules/projekt.md</code> w katalogu głównym projektu.</p>
                        <div class="code-block" id="config-workspace-rule">
<button class="copy-button" onclick="copyCode('config-workspace-rule')">📋 Kopiuj</button>
---
description: Reguły dla tego projektu
alwaysApply: true
---

# Reguły projektu [NAZWA PROJEKTU]

## Stack technologiczny
- Frontend: React + TypeScript
- Styling: Tailwind CSS
- Backend: Node.js + Express
- Baza danych: PostgreSQL

## Konwencje
- Nazwy komponentów: PascalCase (np. UserProfile.tsx)
- Nazwy plików utility: camelCase (np. formatDate.ts)
- Testy obok plików źródłowych: Component.test.tsx

## Struktura projektu
- src/components/ — komponenty React
- src/pages/ — strony/widoki
- src/utils/ — funkcje pomocnicze
- src/api/ — obsługa API</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- PRZYKŁADOWE REGUŁY -->
        <div class="tab-content" id="tab-rules" style="display:none;">
            <div class="cheat-section" data-search="reguły rules workflow przepływ pracy skills umiejętności przykłady">
                <div class="section-title">📜 Przykłady reguł, przepływów i umiejętności</div>

                <div class="card">
                    <div class="card-header"><h3>Przepływ pracy: Wdrożenie (deploy)</h3><span class="tag tag-file">Workflow</span></div>
                    <div class="card-body">
                        <p>Utwórz plik <code>.agents/workflows/deploy.md</code> — wywołaj przez <code>/deploy</code> w czacie</p>
                        <div class="code-block" id="workflow-deploy">
<button class="copy-button" onclick="copyCode('workflow-deploy')">📋 Kopiuj</button>
---
name: deploy
description: Wdróż aplikację na produkcję
---

# Wdrożenie na produkcję

## Krok 1: Sprawdź testy
Uruchom wszystkie testy i upewnij się, że przechodzą:
\`npm run test\`

## Krok 2: Zbuduj projekt
Stwórz wersję produkcyjną:
\`npm run build\`

## Krok 3: Sprawdź build
Upewnij się, że folder build/dist został utworzony
i nie ma błędów kompilacji.

## Krok 4: Wdróż
Uruchom skrypt wdrożeniowy:
\`npm run deploy\`

## Krok 5: Weryfikacja
Otwórz przeglądarkę i zweryfikuj, że aplikacja działa poprawnie.
Sprawdź konsolę pod kątem błędów.</div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"><h3>Umiejętność: Review kodu</h3><span class="tag tag-file">Skill</span></div>
                    <div class="card-body">
                        <p>Utwórz plik <code>.agents/skills/code-review/SKILL.md</code></p>
                        <div class="code-block" id="skill-review">
<button class="copy-button" onclick="copyCode('skill-review')">📋 Kopiuj</button>
---
name: code-review
description: Przeglądaj kod pod kątem błędów, stylu i najlepszych praktyk. Używaj przy przeglądaniu zmian lub sprawdzaniu jakości kodu.
---

# Umiejętność: Przegląd kodu

## Checklist przeglądu
1. **Poprawność** — Czy kod robi to co powinien?
2. **Przypadki brzegowe** — Czy obsłużone są błędy?
3. **Styl** — Czy zgodny z konwencjami projektu?
4. **Wydajność** — Czy nie ma oczywistych problemów?
5. **Bezpieczeństwo** — Czy nie ma luk?

## Format uwag
- Bądź konkretny — wskaż dokładnie co zmienić
- Wyjaśnij dlaczego, nie tylko co
- Zaproponuj alternatywę gdy to możliwe</div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header"><h3>Konfiguracja MCP — mcp_config.json</h3><span class="tag tag-config">MCP</span></div>
                    <div class="card-body">
                        <p>Plik konfiguracji MCP. Otwórz: Menu "..." → MCP Store → Manage MCP Servers → View raw config</p>
                        <div class="code-block" id="mcp-config">
<button class="copy-button" onclick="copyCode('mcp-config')">📋 Kopiuj</button>
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "TWOJ_TOKEN_TUTAJ"
      }
    }
  }
}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- WAŻNE ŚCIEŻKI -->
        <div class="tab-content" id="tab-paths" style="display:none;">
            <div class="cheat-section" data-search="ścieżki foldery pliki lokalizacja gdzie znaleźć">
                <div class="section-title">📂 Ważne ścieżki i lokalizacje plików</div>

                <table class="dictionary-table">
                    <thead>
                        <tr>
                            <th>Co to jest</th>
                            <th>Ścieżka (Windows)</th>
                            <th>Opis</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="dict-pl">Globalne reguły agenta</td>
                            <td class="dict-en"><code>~\\.gemini\\GEMINI.md</code></td>
                            <td class="dict-desc">Reguły działające we wszystkich projektach</td>
                        </tr>
                        <tr>
                            <td class="dict-pl">Reguły projektu</td>
                            <td class="dict-en"><code>.agents\\rules\\*.md</code></td>
                            <td class="dict-desc">Reguły specyficzne dla danego projektu</td>
                        </tr>
                        <tr>
                            <td class="dict-pl">Przepływy pracy (globalne)</td>
                            <td class="dict-en"><code>~\\.gemini\\antigravity\\workflows\\</code></td>
                            <td class="dict-desc">Globalne workflows (/nazwa)</td>
                        </tr>
                        <tr>
                            <td class="dict-pl">Przepływy pracy (projekt)</td>
                            <td class="dict-en"><code>.agents\\workflows\\*.md</code></td>
                            <td class="dict-desc">Workflows dla konkretnego projektu</td>
                        </tr>
                        <tr>
                            <td class="dict-pl">Umiejętności (globalne)</td>
                            <td class="dict-en"><code>~\\.gemini\\antigravity\\skills\\</code></td>
                            <td class="dict-desc">Globalne skills z SKILL.md</td>
                        </tr>
                        <tr>
                            <td class="dict-pl">Umiejętności (projekt)</td>
                            <td class="dict-en"><code>.agents\\skills\\&lt;nazwa&gt;\\SKILL.md</code></td>
                            <td class="dict-desc">Skills dla konkretnego projektu</td>
                        </tr>
                        <tr>
                            <td class="dict-pl">Katalog Antigravity</td>
                            <td class="dict-en"><code>~\\.antigravity\\</code></td>
                            <td class="dict-desc">Artefakty, wiedza, konfiguracja</td>
                        </tr>
                        <tr>
                            <td class="dict-pl">Konfiguracja MCP</td>
                            <td class="dict-en"><code>mcp_config.json</code></td>
                            <td class="dict-desc">Menu "..." → MCP Store → raw config</td>
                        </tr>
                        <tr>
                            <td class="dict-pl">Ustawienia użytkownika</td>
                            <td class="dict-en"><code>Ctrl + ,</code></td>
                            <td class="dict-desc">Lub Settings > Open Antigravity User Settings</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script nonce="${nonce}">
        // Nawigacja zakładkami
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const tabId = tab.getAttribute('data-tab');
                document.querySelectorAll('.tab-content').forEach(tc => tc.style.display = 'none');
                const target = document.getElementById('tab-' + tabId);
                if (target) target.style.display = 'block';
            });
        });

        // Kopiowanie fragmentów kodu
        function copyCode(blockId) {
            const block = document.getElementById(blockId);
            if (!block) return;

            // Pobierz tekst bez przycisku "Kopiuj"
            const button = block.querySelector('.copy-button');
            const text = block.textContent.replace(button.textContent, '').trim();

            // Kopiuj do schowka
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);

            // Zmień tekst przycisku
            button.textContent = '✅ Skopiowano!';
            button.classList.add('copied');
            setTimeout(() => {
                button.textContent = '📋 Kopiuj';
                button.classList.remove('copied');
            }, 2000);
        }
        // Udostępnij globalnie
        window.copyCode = copyCode;

        // Wyszukiwarka
        document.getElementById('searchCheat').addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (!query) {
                document.querySelectorAll('.card, .cheat-section, .shortcut-card').forEach(el => el.style.display = '');
                return;
            }
            // Pokaż wszystkie zakładki
            document.querySelectorAll('.tab-content').forEach(tc => tc.style.display = 'block');
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

            document.querySelectorAll('.card').forEach(card => {
                const text = card.textContent.toLowerCase();
                card.style.display = text.includes(query) ? '' : 'none';
            });
            document.querySelectorAll('.shortcut-card').forEach(card => {
                const text = card.textContent.toLowerCase();
                card.style.display = text.includes(query) ? '' : 'none';
            });
        });
    </script>
</body>
</html>`;
    }
}
