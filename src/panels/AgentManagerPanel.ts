// =============================================================================
// Panel: Menedżer Agentów — Przewodnik po polsku
// =============================================================================
// Interaktywny, spolszczony przewodnik po module Agent Manager w Antigravity.
// Opisuje każdy element interfejsu z tooltipami i wskazówkami.
// =============================================================================

import * as vscode from 'vscode';
import { BasePanel } from './BasePanel';

export class AgentManagerPanel extends BasePanel {
    public static currentPanel: AgentManagerPanel | undefined;
    private static readonly viewType = 'antigravityPL.agentManager';

    public static createOrShow(extensionUri: vscode.Uri) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        if (AgentManagerPanel.currentPanel) {
            AgentManagerPanel.currentPanel.panel.reveal(column);
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            AgentManagerPanel.viewType,
            '🤖 Menedżer Agentów — Przewodnik PL',
            column || vscode.ViewColumn.One,
            { enableScripts: true, retainContextWhenHidden: true }
        );

        AgentManagerPanel.currentPanel = new AgentManagerPanel(panel, extensionUri);
    }

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        super(panel, extensionUri);
        this.panel.onDidDispose(() => {
            AgentManagerPanel.currentPanel = undefined;
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
    <title>Menedżer Agentów — Przewodnik PL</title>
    <style nonce="${nonce}">
        ${this.getSharedStyles()}

        .hero {
            background: linear-gradient(135deg, rgba(88,166,255,0.1), rgba(188,140,255,0.1));
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: 32px;
            margin-bottom: 32px;
            text-align: center;
        }
        .hero h2 {
            font-size: 1.8rem;
            margin-bottom: 12px;
            background: var(--accent-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .hero p { color: var(--text-secondary); font-size: 1.05rem; }

        .interface-map {
            display: grid;
            grid-template-columns: 200px 1fr;
            gap: 16px;
            margin: 24px 0;
        }

        .sidebar-preview {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: 16px;
        }
        .sidebar-item {
            padding: 8px 12px;
            margin: 4px 0;
            border-radius: var(--radius);
            cursor: pointer;
            transition: all 0.2s;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .sidebar-item:hover { background: var(--bg-hover); }
        .sidebar-item.active { background: var(--accent-blue); color: #fff; }

        .main-area {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: 24px;
        }

        .step-number {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: var(--accent-blue);
            color: #fff;
            font-weight: 700;
            font-size: 0.9rem;
            flex-shrink: 0;
        }

        .step-card {
            display: flex;
            gap: 16px;
            padding: 20px;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            margin-bottom: 16px;
        }
        .step-card:hover { border-color: var(--accent-blue); }

        .step-content h4 {
            font-size: 1.05rem;
            margin-bottom: 8px;
            color: var(--text-primary);
        }
        .step-content p {
            color: var(--text-secondary);
            font-size: 0.9rem;
        }

        .keyboard-shortcut {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            margin: 8px 0;
            padding: 6px 12px;
            background: var(--bg-primary);
            border: 1px solid var(--border-color);
            border-radius: var(--radius);
        }

        .dictionary-table {
            width: 100%;
            border-collapse: collapse;
            margin: 16px 0;
        }
        .dictionary-table th {
            text-align: left;
            padding: 10px 14px;
            background: var(--bg-secondary);
            border-bottom: 2px solid var(--accent-blue);
            color: var(--accent-blue);
            font-size: 0.85rem;
            text-transform: uppercase;
        }
        .dictionary-table td {
            padding: 10px 14px;
            border-bottom: 1px solid var(--border-color);
            font-size: 0.9rem;
        }
        .dictionary-table tr:hover td {
            background: var(--bg-hover);
        }
        .dict-en { color: var(--text-muted); }
        .dict-pl { color: var(--accent-green); font-weight: 500; }
        .dict-desc { color: var(--text-secondary); font-size: 0.85rem; }

        @media (max-width: 700px) {
            .interface-map { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="page-header">
        <h1>🤖 Menedżer Agentów — Spolszczony Przewodnik</h1>
        <div class="subtitle">Kompletny opis interfejsu Agent Manager w Google Antigravity po polsku</div>
    </div>

    <div class="container">
        <!-- HERO -->
        <div class="hero">
            <h2>Witaj w Menedżerze Agentów!</h2>
            <p>Agent Manager to widok „z lotu ptaka" na wszystkie Twoje agenty i projekty.<br>
            Tu zarządzasz wieloma obszarami roboczymi i rozmowami jednocześnie.</p>
            <div class="keyboard-shortcut">
                <span>Przełącz Edytor ↔ Agent Manager:</span>
                <kbd>Ctrl + E</kbd> <span style="color:var(--text-muted)">(Windows)</span>
                <kbd>Cmd + E</kbd> <span style="color:var(--text-muted)">(Mac)</span>
            </div>
        </div>

        <!-- NAWIGACJA -->
        <div class="nav-tabs">
            <span class="nav-tab active" data-tab="overview">📋 Przegląd</span>
            <span class="nav-tab" data-tab="elements">🧩 Elementy interfejsu</span>
            <span class="nav-tab" data-tab="dictionary">📖 Słownik EN→PL</span>
            <span class="nav-tab" data-tab="howto">🚀 Jak zacząć</span>
        </div>

        <!-- TAB: PRZEGLĄD -->
        <div class="tab-content" id="tab-overview">
            <div class="section">
                <div class="section-title">Mapa interfejsu Agent Manager</div>
                <div class="interface-map">
                    <div class="sidebar-preview">
                        <div style="color:var(--text-muted);font-size:0.8rem;margin-bottom:8px">LEWY PANEL</div>
                        <div class="sidebar-item" data-info="workspaces">📁 Obszary robocze</div>
                        <div class="sidebar-item" data-info="conversations">💬 Rozmowy</div>
                        <div class="sidebar-item" data-info="inbox">📥 Skrzynka odbiorcza</div>
                        <div class="sidebar-item" data-info="playground">🎮 Plac zabaw</div>
                        <div class="sidebar-item" data-info="settings">⚙️ Ustawienia</div>
                        <div style="color:var(--text-muted);font-size:0.8rem;margin:12px 0 8px">NA GÓRZE</div>
                        <div class="sidebar-item" data-info="newworkspace">➕ Nowy obszar roboczy</div>
                        <div class="sidebar-item" data-info="openeditor">📝 Otwórz edytor</div>
                        <div class="sidebar-item" data-info="agentmanager">🤖 Menedżer agentów</div>
                    </div>
                    <div class="main-area" id="detailView">
                        <h3 style="color:var(--accent-blue);margin-bottom:12px">👆 Kliknij element z lewej strony</h3>
                        <p style="color:var(--text-secondary)">Kliknij dowolny element z panelu bocznego, żeby zobaczyć jego opis po polsku z wyjaśnieniem co robi i jak go używać.</p>
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="section-title">Kluczowe funkcje Agent Managera</div>
                <div class="settings-grid">
                    <div class="card">
                        <div class="card-header">
                            <h3>📁 Wielozadaniowość — wiele obszarów roboczych naraz</h3>
                        </div>
                        <div class="card-body">
                            <p>Otwieraj wiele projektów jednocześnie. Każdy ma własne rozmowy z agentem. Przełączaj się między nimi w lewym panelu.</p>
                            <div class="original">Oryginał: Work across multiple workspaces simultaneously</div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <h3>👁️ Nadzorowanie agentów</h3>
                        </div>
                        <div class="card-body">
                            <p>Z jednego miejsca kontroluj dziesiątki agentów pracujących równolegle. Widzisz status, postęp i wyniki każdego z nich.</p>
                            <div class="original">Oryginał: Oversee dozens of agents simultaneously</div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <h3>🔀 Przełączanie Edytor ↔ Manager</h3>
                        </div>
                        <div class="card-body">
                            <p>Używaj <kbd>Ctrl+E</kbd> do szybkiego przełączania. Możesz też zarządzać oknami edytora bezpośrednio z managera: ukrywać, fokusować lub zamykać.</p>
                            <div class="original">Oryginał: Toggle between Agent Manager and Editor</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- TAB: ELEMENTY INTERFEJSU -->
        <div class="tab-content" id="tab-elements" style="display:none;">
            <div class="section">
                <div class="section-title">Elementy interfejsu Agent Manager — po polsku</div>

                <div class="step-card">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <h4>Lewy panel boczny (Sidebar)</h4>
                        <p>Lista Twoich obszarów roboczych (projektów) i rozmów. Kliknij obszar roboczy by zobaczyć jego rozmowy. Użyj przycisku <strong>+</strong> żeby dodać nowy projekt.</p>
                    </div>
                </div>

                <div class="step-card">
                    <span class="step-number">2</span>
                    <div class="step-content">
                        <h4>Widok rozmowy (Conversation View)</h4>
                        <p>Główny obszar wyświetlający bieżącą rozmowę z agentem. Widzisz tu wiadomości, artefakty, zrzuty ekranu przeglądarki i listę zadań.</p>
                    </div>
                </div>

                <div class="step-card">
                    <span class="step-number">3</span>
                    <div class="step-content">
                        <h4>Panele (Panes)</h4>
                        <p>Dodatkowe panele: przeglądarka, terminal, pliki, zmiany w kodzie (diff). Możesz je układać obok siebie lub w zakładkach.</p>
                    </div>
                </div>

                <div class="step-card">
                    <span class="step-number">4</span>
                    <div class="step-content">
                        <h4>Pasek narzędzi (Toolbar)</h4>
                        <p>U góry: wybór modelu AI, przycisk „Otwórz edytor", rozpocznij nową rozmowę, ustawienia. Rozwijane menu pod <strong>„..."</strong> kryje dostęp do Customizations (Reguły, Przepływy, MCP).</p>
                    </div>
                </div>

                <div class="step-card">
                    <span class="step-number">5</span>
                    <div class="step-content">
                        <h4>Skrzynka odbiorcza (Inbox)</h4>
                        <p>Centralne miejsce na powiadomienia od agentów: pytania wymagające Twojej odpowiedzi, prośby o przegląd planu, ukończone zadania.</p>
                    </div>
                </div>

                <div class="step-card">
                    <span class="step-number">6</span>
                    <div class="step-content">
                        <h4>Plac zabaw (Playground)</h4>
                        <p>Środowisko testowe do eksperymentowania z agentami bez wpływu na rzeczywiste projekty. Idealne do nauki i testowania promptów.</p>
                    </div>
                </div>

                <div class="step-card">
                    <span class="step-number">7</span>
                    <div class="step-content">
                        <h4>Widok subagenta przeglądarki (Browser Subagent View)</h4>
                        <p>Obserwuj w czasie rzeczywistym jak agent steruje przeglądarką: widać co klika, gdzie scrolluje, jakie formularze wypełnia.</p>
                    </div>
                </div>

                <div class="step-card">
                    <span class="step-number">8</span>
                    <div class="step-content">
                        <h4>Pasek zmian (Changes Sidebar)</h4>
                        <p>Lista wszystkich plików zmienionych przez agenta w danej rozmowie. Kliknij aby zobaczyć różnice (diff) przed i po zmianach.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- TAB: SŁOWNIK -->
        <div class="tab-content" id="tab-dictionary" style="display:none;">
            <div class="section">
                <div class="section-title">📖 Kompletny słownik — Angielski → Polski</div>
                <input type="text" class="search-box" id="searchDict"
                       placeholder="🔍 Szukaj tłumaczenia... np. 'workspace' lub 'obszar'">

                <table class="dictionary-table" id="dictTable">
                    <thead>
                        <tr>
                            <th>Angielski (oryginał)</th>
                            <th>Polski (tłumaczenie)</th>
                            <th>Opis / kontekst</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td class="dict-en">Agent Manager</td><td class="dict-pl">Menedżer Agentów</td><td class="dict-desc">Główny panel zarządzania agentami AI</td></tr>
                        <tr><td class="dict-en">Workspace</td><td class="dict-pl">Obszar roboczy</td><td class="dict-desc">Projekt/folder z kodem</td></tr>
                        <tr><td class="dict-en">Conversation</td><td class="dict-pl">Rozmowa</td><td class="dict-desc">Sesja czatu z agentem AI</td></tr>
                        <tr><td class="dict-en">Planning Mode</td><td class="dict-pl">Tryb planowania</td><td class="dict-desc">Agent najpierw planuje, potem wykonuje</td></tr>
                        <tr><td class="dict-en">Fast Mode</td><td class="dict-pl">Tryb szybki</td><td class="dict-desc">Agent wykonuje polecenia od razu</td></tr>
                        <tr><td class="dict-en">Artifact</td><td class="dict-pl">Artefakt</td><td class="dict-desc">Plan działania lub dokument stworzony przez agenta</td></tr>
                        <tr><td class="dict-en">Review Policy</td><td class="dict-pl">Polityka przeglądu</td><td class="dict-desc">Zasady zatwierdzania planów agenta</td></tr>
                        <tr><td class="dict-en">Always Proceed</td><td class="dict-pl">Zawsze kontynuuj</td><td class="dict-desc">Agent nie pyta — działa automatycznie</td></tr>
                        <tr><td class="dict-en">Request Review</td><td class="dict-pl">Poproś o przegląd</td><td class="dict-desc">Agent czeka na Twoją zgodę</td></tr>
                        <tr><td class="dict-en">Terminal Command</td><td class="dict-pl">Polecenie terminala</td><td class="dict-desc">Komenda uruchamiana w konsoli</td></tr>
                        <tr><td class="dict-en">Auto Execution</td><td class="dict-pl">Automatyczne wykonywanie</td><td class="dict-desc">Polecenia uruchamiane bez pytania</td></tr>
                        <tr><td class="dict-en">Allow List</td><td class="dict-pl">Lista dozwolonych</td><td class="dict-desc">Polecenia/domeny zawsze dozwolone</td></tr>
                        <tr><td class="dict-en">Deny List</td><td class="dict-pl">Lista zablokowanych</td><td class="dict-desc">Polecenia/domeny zawsze blokowane</td></tr>
                        <tr><td class="dict-en">Strict Mode</td><td class="dict-pl">Tryb ścisły</td><td class="dict-desc">Restrykcyjniejsze zasady dla agenta</td></tr>
                        <tr><td class="dict-en">Sandboxing</td><td class="dict-pl">Piaskownica</td><td class="dict-desc">Izolacja poleceń terminala</td></tr>
                        <tr><td class="dict-en">Rules</td><td class="dict-pl">Reguły</td><td class="dict-desc">Pliki Markdown z instrukcjami dla agenta</td></tr>
                        <tr><td class="dict-en">Workflows</td><td class="dict-pl">Przepływy pracy</td><td class="dict-desc">Gotowe sekwencje kroków (/slash)</td></tr>
                        <tr><td class="dict-en">Skills</td><td class="dict-pl">Umiejętności</td><td class="dict-desc">Pakiety wiedzy rozszerzające agenta</td></tr>
                        <tr><td class="dict-en">Task Groups</td><td class="dict-pl">Grupy zadań</td><td class="dict-desc">Zorganizowane paczki zadań do wykonania</td></tr>
                        <tr><td class="dict-en">Task List</td><td class="dict-pl">Lista zadań</td><td class="dict-desc">Checklist kroków agenta</td></tr>
                        <tr><td class="dict-en">Implementation Plan</td><td class="dict-pl">Plan implementacji</td><td class="dict-desc">Szczegółowy plan zmian w kodzie</td></tr>
                        <tr><td class="dict-en">Knowledge</td><td class="dict-pl">Baza wiedzy</td><td class="dict-desc">Dokumenty kontekstowe dostępne dla agenta</td></tr>
                        <tr><td class="dict-en">Browser Subagent</td><td class="dict-pl">Subagent przeglądarki</td><td class="dict-desc">AI sterujący wbudowanym Chrome</td></tr>
                        <tr><td class="dict-en">Inbox</td><td class="dict-pl">Skrzynka odbiorcza</td><td class="dict-desc">Powiadomienia od agentów</td></tr>
                        <tr><td class="dict-en">Playground</td><td class="dict-pl">Plac zabaw</td><td class="dict-desc">Środowisko testowe</td></tr>
                        <tr><td class="dict-en">Panes</td><td class="dict-pl">Panele</td><td class="dict-desc">Dodatkowe okna (terminal, pliki, diff)</td></tr>
                        <tr><td class="dict-en">Focus Editor</td><td class="dict-pl">Otwórz edytor</td><td class="dict-desc">Przejdź do widoku edytora kodu</td></tr>
                        <tr><td class="dict-en">Open Agent Manager</td><td class="dict-pl">Otwórz Menedżer Agentów</td><td class="dict-desc">Przejdź do widoku zarządzania agentami</td></tr>
                        <tr><td class="dict-en">Start Conversation</td><td class="dict-pl">Rozpocznij rozmowę</td><td class="dict-desc">Nowa sesja czatu z agentem</td></tr>
                        <tr><td class="dict-en">Delete Conversation</td><td class="dict-pl">Usuń rozmowę</td><td class="dict-desc">PPM → Delete Conversation</td></tr>
                        <tr><td class="dict-en">Changes Sidebar</td><td class="dict-pl">Pasek zmian</td><td class="dict-desc">Lista zmienionych plików</td></tr>
                        <tr><td class="dict-en">Review Changes</td><td class="dict-pl">Przejrzyj zmiany</td><td class="dict-desc">Porównanie przed/po zmianach</td></tr>
                        <tr><td class="dict-en">Source Control</td><td class="dict-pl">Kontrola wersji</td><td class="dict-desc">Zarządzanie repozytorium Git</td></tr>
                        <tr><td class="dict-en">Tab (completion)</td><td class="dict-pl">Tab (uzupełnianie)</td><td class="dict-desc">Podpowiedzi kodu w linii</td></tr>
                        <tr><td class="dict-en">Command (inline)</td><td class="dict-pl">Polecenie (inline)</td><td class="dict-desc">Szybkie polecenie AI w edytorze</td></tr>
                        <tr><td class="dict-en">MCP</td><td class="dict-pl">MCP (Protokół kontekstu)</td><td class="dict-desc">Standard łączenia z zewnętrznymi narzędziami</td></tr>
                        <tr><td class="dict-en">Telemetry</td><td class="dict-pl">Telemetria</td><td class="dict-desc">Zbieranie danych o użytkowaniu</td></tr>
                        <tr><td class="dict-en">Reasoning Model</td><td class="dict-pl">Model rozumowania</td><td class="dict-desc">Główny model AI napędzający agenta</td></tr>
                        <tr><td class="dict-en">Walkthrough</td><td class="dict-pl">Przewodnik krokowy</td><td class="dict-desc">Interaktywny tutorial w programie</td></tr>
                        <tr><td class="dict-en">Screenshots</td><td class="dict-pl">Zrzuty ekranu</td><td class="dict-desc">Obrazy stron przechwycone przez agenta</td></tr>
                        <tr><td class="dict-en">Browser Recordings</td><td class="dict-pl">Nagrania przeglądarki</td><td class="dict-desc">Zapis sesji przeglądarkowej agenta</td></tr>
                        <tr><td class="dict-en">Overages / Credits</td><td class="dict-pl">Przekroczenia / Kredyty</td><td class="dict-desc">Dodatkowe zużycie AI ponad limit</td></tr>
                        <tr><td class="dict-en">Customizations</td><td class="dict-pl">Dostosowywanie</td><td class="dict-desc">Menu z regułami, przepływami i MCP</td></tr>
                        <tr><td class="dict-en">Non-Workspace File Access</td><td class="dict-pl">Dostęp poza obszarem roboczym</td><td class="dict-desc">Pozwolenie agentowi na pliki poza projektem</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- TAB: JAK ZACZĄĆ -->
        <div class="tab-content" id="tab-howto" style="display:none;">
            <div class="section">
                <div class="section-title">🚀 Pierwsze kroki z Agent Managerem</div>

                <div class="step-card">
                    <span class="step-number">1</span>
                    <div class="step-content">
                        <h4>Otwórz Agent Manager</h4>
                        <p>Naciśnij <kbd>Ctrl+E</kbd> (Windows) lub kliknij przycisk „Open Agent Manager" w prawym górnym rogu edytora. Zobaczysz widok z listą projektów po lewej stronie.</p>
                    </div>
                </div>

                <div class="step-card">
                    <span class="step-number">2</span>
                    <div class="step-content">
                        <h4>Dodaj swój pierwszy obszar roboczy (projekt)</h4>
                        <p>Kliknij przycisk <strong>+</strong> w lewym panelu i wybierz folder z Twoim projektem. Agent Manager otworzy go jako nowy obszar roboczy.</p>
                    </div>
                </div>

                <div class="step-card">
                    <span class="step-number">3</span>
                    <div class="step-content">
                        <h4>Rozpocznij pierwszą rozmowę z agentem</h4>
                        <p>Kliknij obszar roboczy w lewym panelu, a następnie naciśnij <strong>+</strong> obok nazwy projektu lub wybierz „Start Conversation" (Rozpocznij rozmowę).</p>
                    </div>
                </div>

                <div class="step-card">
                    <span class="step-number">4</span>
                    <div class="step-content">
                        <h4>Wybierz model AI i tryb</h4>
                        <p>Pod polem wiadomości zobaczysz selektor modelu. Wybierz model (np. Gemini 3.1 Pro) i tryb (Planowanie lub Szybki). Dla początkujących polecamy <strong>Planowanie</strong>.</p>
                    </div>
                </div>

                <div class="step-card">
                    <span class="step-number">5</span>
                    <div class="step-content">
                        <h4>Napisz swoje pierwsze polecenie</h4>
                        <p>Opisz po polsku co chcesz zrobić. Na przykład: „Przeanalizuj ten projekt i opisz jego strukturę" lub „Stwórz komponent React z formularzem logowania".</p>
                    </div>
                </div>

                <div class="step-card">
                    <span class="step-number">6</span>
                    <div class="step-content">
                        <h4>Obserwuj agenta w akcji</h4>
                        <p>Agent pokaże Ci listę zadań, plan implementacji i zacznie pracować. Możesz przeglądać zmiany w kodzie na bieżąco w panelu „Changes Sidebar" (Pasek zmian).</p>
                    </div>
                </div>

                <div class="step-card">
                    <span class="step-number">7</span>
                    <div class="step-content">
                        <h4>Przejrzyj i zaakceptuj zmiany</h4>
                        <p>Gdy agent skończy, przejrzyj wprowadzone zmiany. Kliknij „Review Changes" (Przejrzyj zmiany) żeby zobaczyć porównanie. Zaakceptuj lub odrzuć poszczególne pliki.</p>
                    </div>
                </div>

                <div class="step-card">
                    <span class="step-number">8</span>
                    <div class="step-content">
                        <h4>Przełącz do edytora żeby dalej pracować</h4>
                        <p>Naciśnij <kbd>Ctrl+E</kbd> żeby wrócić do edytora i kontynuować ręczną edycję kodu lub rozpocznij nową rozmowę z agentem.</p>
                    </div>
                </div>

                <div class="info-box" style="margin-top: 24px;">
                    💡 <strong>Wskazówka:</strong> Możesz mieć wiele rozmów z agentem na raz — każda działa niezależnie!
                    Przełączaj się między nimi w lewym panelu Agent Managera.
                </div>
            </div>
        </div>
    </div>

    <!-- SKRYPT -->
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

        // Klikalne elementy mapy interfejsu
        const details = {
            workspaces: '<h3>📁 Obszary robocze (Workspaces)</h3><p>Lista wszystkich otwartych projektów. Każdy obszar roboczy to osobny folder z kodem. Kliknij żeby zobaczyć rozmowy z agentem w tym projekcie.</p><p style="color:var(--text-muted);margin-top:8px"><em>Tip: Możesz mieć otwartych wiele projektów naraz i przełączać się między nimi.</em></p>',
            conversations: '<h3>💬 Rozmowy (Conversations)</h3><p>Lista sesji czatu z agentem AI w wybranym obszarze roboczym. Każda rozmowa to osobna sesja z własnym kontekstem i historią.</p><p style="color:var(--text-muted);margin-top:8px"><em>Tip: Kliknij + żeby rozpocząć nową rozmowę w bieżącym projekcie.</em></p>',
            inbox: '<h3>📥 Skrzynka odbiorcza (Inbox)</h3><p>Centralne miejsce na powiadomienia od wszystkich Twoich agentów. Tu trafiają pytania, prośby o przegląd planu i informacje o ukończonych zadaniach.</p>',
            playground: '<h3>🎮 Plac zabaw (Playground)</h3><p>Środowisko testowe bez wpływu na Twoje projekty. Idealne do nauki, testowania promptów i eksperymentowania z różnymi modelami AI.</p>',
            settings: '<h3>⚙️ Ustawienia (Settings)</h3><p>Konfiguracja Antigravity: Agent, Przeglądarka, Edytor, Konto. Skrót: <kbd>Ctrl+,</kbd> lub ikona zębatki.</p><p style="color:var(--text-muted);margin-top:8px"><em>Tip: Użyj komendy „Antigravity PL: Otwórz Spolszczone Ustawienia" żeby zobaczyć pełny opis po polsku!</em></p>',
            newworkspace: '<h3>➕ Nowy obszar roboczy</h3><p>Kliknij żeby otworzyć nowy projekt. Wybierz folder startowy, a Antigravity stworzy nowy obszar roboczy z tym folderem.</p>',
            openeditor: '<h3>📝 Otwórz edytor (Open Editor)</h3><p>Przełącza do widoku edytora kodu. Skrót: <kbd>Ctrl+E</kbd>. Możesz też zarządzać wieloma oknami edytora z poziomu managera.</p>',
            agentmanager: '<h3>🤖 Menedżer agentów (Agent Manager)</h3><p>Właśnie tu jesteś! To widok „z lotu ptaka" na wszystkie Twoje agenty, projekty i rozmowy. Przycisk w prawym górnym rogu lub <kbd>Ctrl+E</kbd>.</p>'
        };

        document.querySelectorAll('.sidebar-item[data-info]').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.sidebar-item').forEach(si => si.classList.remove('active'));
                item.classList.add('active');
                const key = item.getAttribute('data-info');
                document.getElementById('detailView').innerHTML = details[key] || '';
            });
        });

        // Wyszukiwarka słownika
        document.getElementById('searchDict').addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            document.querySelectorAll('#dictTable tbody tr').forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(query) ? '' : 'none';
            });
        });
    </script>
</body>
</html>`;
    }
}
