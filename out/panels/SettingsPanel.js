"use strict";
// =============================================================================
// Panel: Spolszczone Ustawienia Antigravity
// =============================================================================
// Ten panel wyświetla WSZYSTKIE ustawienia Antigravity przetłumaczone na polski.
// Każde ustawienie ma tooltip (ikonka ℹ️) z rozszerzonym opisem po najechaniu.
// =============================================================================
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsPanel = void 0;
const vscode = __importStar(require("vscode"));
const BasePanel_1 = require("./BasePanel");
class SettingsPanel extends BasePanel_1.BasePanel {
    static currentPanel;
    static viewType = 'antigravityPL.settings';
    // Tworzy nowy panel lub pokazuje istniejący
    static createOrShow(extensionUri) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;
        // Jeśli panel już istnieje — pokaż go
        if (SettingsPanel.currentPanel) {
            SettingsPanel.currentPanel.panel.reveal(column);
            return;
        }
        // Stwórz nowy panel
        const panel = vscode.window.createWebviewPanel(SettingsPanel.viewType, '⚙️ Ustawienia Antigravity — Polski', column || vscode.ViewColumn.One, {
            enableScripts: true,
            retainContextWhenHidden: true,
            localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')]
        });
        SettingsPanel.currentPanel = new SettingsPanel(panel, extensionUri);
    }
    constructor(panel, extensionUri) {
        super(panel, extensionUri);
        this.panel.onDidDispose(() => {
            SettingsPanel.currentPanel = undefined;
        }, null, this.disposables);
    }
    getHtmlContent() {
        const nonce = this.getNonce();
        return `<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'nonce-${nonce}'; script-src 'nonce-${nonce}';">
    <title>Ustawienia Antigravity — Polski</title>
    <style nonce="${nonce}">
        ${this.getSharedStyles()}

        .settings-grid {
            display: grid;
            gap: 16px;
        }

        .setting-category {
            margin-top: 8px;
        }

        .warning-box {
            background: rgba(210, 153, 34, 0.1);
            border: 1px solid var(--accent-orange);
            border-radius: var(--radius);
            padding: 12px 16px;
            margin: 12px 0;
            font-size: 0.9rem;
            color: var(--accent-orange);
        }

        .info-box {
            background: rgba(88, 166, 255, 0.1);
            border: 1px solid var(--accent-blue);
            border-radius: var(--radius);
            padding: 12px 16px;
            margin: 12px 0;
            font-size: 0.9rem;
        }

        .shortcut-hint {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            margin-top: 8px;
        }

        .copy-btn {
            font-size: 0.75rem;
            padding: 2px 8px;
            background: var(--bg-hover);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            color: var(--text-secondary);
            cursor: pointer;
        }
        .copy-btn:hover { color: var(--accent-green); border-color: var(--accent-green); }

        .results-count {
            color: var(--text-muted);
            font-size: 0.85rem;
            margin-bottom: 16px;
        }
    </style>
</head>
<body>
    <!-- NAGŁÓWEK -->
    <div class="page-header">
        <h1>⚙️ Ustawienia Antigravity — Spolszczone</h1>
        <div class="subtitle">Kompletny przewodnik po ustawieniach Google Antigravity IDE po polsku</div>
    </div>

    <div class="container">
        <!-- WYSZUKIWARKA -->
        <input type="text" class="search-box" id="searchSettings"
               placeholder="🔍 Szukaj ustawienia po polsku lub angielsku... np. 'terminal' lub 'piaskownica'">
        <div class="results-count" id="resultsCount"></div>

        <!-- NAWIGACJA ZAKŁADKOWA -->
        <div class="nav-tabs">
            <span class="nav-tab active" data-tab="agent">🤖 Agent</span>
            <span class="nav-tab" data-tab="editor">📝 Edytor</span>
            <span class="nav-tab" data-tab="browser">🌐 Przeglądarka</span>
            <span class="nav-tab" data-tab="account">👤 Konto</span>
            <span class="nav-tab" data-tab="all">📋 Wszystkie</span>
        </div>

        <!-- ===== SEKCJA: AGENT ===== -->
        <div class="tab-content" id="tab-agent">
            <div class="section">
                <div class="section-title">🤖 Ustawienia Agenta</div>
                <div class="info-box">
                    💡 <strong>Jak otworzyć ustawienia w Antigravity:</strong>
                    Użyj skrótu <kbd>Ctrl + ,</kbd> (Windows) lub kliknij ikonę zębatki w Agent Managerze.
                </div>

                <div class="settings-grid">
                    <!-- Tryb rozmowy -->
                    <div class="card" data-search="conversation mode tryb rozmowy planowanie szybki planning fast">
                        <div class="card-header">
                            <h3>Tryb rozmowy</h3>
                            <span class="badge badge-important">WAŻNE</span>
                            <span class="tooltip-trigger" tabindex="0">ℹ️
                                <div class="tooltip-content">
                                    <strong>Tryb rozmowy (Conversation Mode)</strong><br><br>
                                    To ustawienie decyduje, jak agent podchodzi do Twojego zadania.
                                    Wybierz <strong>Planowanie</strong> dla skomplikowanych projektów —
                                    agent najpierw przemyśli strategię, stworzy listę zadań i artefakty.
                                    Wybierz <strong>Szybki</strong> dla prostych zadań jak zmiana nazwy zmiennej.<br><br>
                                    <em>Wskazówka: Dla początkujących zalecamy tryb Planowanie — daje lepszą jakość.</em>
                                </div>
                            </span>
                        </div>
                        <div class="card-body">
                            <p>Określa sposób pracy agenta AI przy rozpoczynaniu nowej rozmowy.</p>
                            <div class="original">Oryginał: Conversation-Level Mode (Planning / Fast)</div>
                            <div class="option-list">
                                <div class="option-item">
                                    <span class="option-label">🧠 Planowanie</span>
                                    <span class="option-desc">Agent najpierw planuje, potem wykonuje. Tworzy grupy zadań, artefakty i przemyślany plan. Idealny do złożonych zadań, projektów i wspólnej pracy.</span>
                                </div>
                                <div class="option-item">
                                    <span class="option-label">⚡ Szybki</span>
                                    <span class="option-desc">Agent od razu wykonuje polecenia. Używaj do prostych zadań: zmiana nazw, uruchomienie poleceń, drobne poprawki w kodzie.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Polityka przeglądu artefaktów -->
                    <div class="card" data-search="artifact review policy polityka przegląd artefakty zawsze kontynuuj poproś">
                        <div class="card-header">
                            <h3>Polityka przeglądu artefaktów</h3>
                            <span class="badge badge-recommended">ZALECANE</span>
                            <span class="tooltip-trigger" tabindex="0">ℹ️
                                <div class="tooltip-content">
                                    <strong>Polityka przeglądu artefaktów (Artifact Review Policy)</strong><br><br>
                                    Artefakty to plany działania, które agent tworzy przed wprowadzaniem zmian.
                                    Gdy ta opcja jest ustawiona na „Poproś o przegląd", agent zatrzyma się
                                    i pokaże Ci plan do zatwierdzenia — możesz dodać komentarze i poprawki.<br><br>
                                    <em>Dla początkujących: ustaw „Poproś o przegląd" — dzięki temu zawsze sprawdzisz
                                    co agent zamierza zrobić zanim zacznie zmieniać Twój kod.</em>
                                </div>
                            </span>
                        </div>
                        <div class="card-body">
                            <p>Czy agent powinien pytać o zgodę przed wykonaniem planu zmian, czy działać automatycznie.</p>
                            <div class="original">Oryginał: Artifact Review Policy</div>
                            <div class="option-list">
                                <div class="option-item">
                                    <span class="option-label">✅ Zawsze kontynuuj</span>
                                    <span class="option-desc">Agent nigdy nie pyta — od razu realizuje plan. Oszczędza czas, ale nie masz szansy na korektę przed zmianami.</span>
                                </div>
                                <div class="option-item">
                                    <span class="option-label">🔍 Poproś o przegląd</span>
                                    <span class="option-desc">Agent zawsze czeka na Twoją akceptację. Możesz przejrzeć plan, dodać komentarze i dopiero potem zatwierdzić.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Auto-wykonywanie poleceń terminala -->
                    <div class="card" data-search="terminal command auto execution automatyczne wykonywanie polecenia lista dozwolonych zablokowanych allow deny">
                        <div class="card-header">
                            <h3>Automatyczne wykonywanie poleceń terminala</h3>
                            <span class="badge badge-important">WAŻNE</span>
                            <span class="tooltip-trigger" tabindex="0">ℹ️
                                <div class="tooltip-content">
                                    <strong>Aut. wyk. poleceń terminala (Terminal Command Auto Execution)</strong><br><br>
                                    Agent może uruchamiać polecenia w terminalu (np. npm install, git commit).
                                    To ustawienie kontroluje, czy robi to automatycznie, czy pyta o zgodę.<br><br>
                                    Możesz skonfigurować <strong>Listę dozwolonych</strong> (te polecenia wykonują się
                                    bez pytania) i <strong>Listę zablokowanych</strong> (te polecenia zawsze wymagają
                                    Twojej zgody) w zakładce Agent w ustawieniach.<br><br>
                                    <em>Dla bezpieczeństwa: ustaw „Poproś o przegląd" i dodaj do listy dozwolonych
                                    tylko bezpieczne polecenia jak npm install, npm test, ls, dir.</em>
                                </div>
                            </span>
                        </div>
                        <div class="card-body">
                            <p>Czy agent może automatycznie uruchamiać polecenia w terminalu, czy każdorazowo wymaga Twojej zgody.</p>
                            <div class="original">Oryginał: Terminal Command Auto Execution</div>
                            <div class="warning-box">
                                ⚠️ <strong>Uwaga bezpieczeństwa:</strong> Automatyczne wykonywanie poleceń daje agentowi możliwość
                                uruchamiania dowolnych komend na Twoim komputerze. Używaj ostrożnie!
                            </div>
                            <div class="option-list">
                                <div class="option-item">
                                    <span class="option-label">🔍 Poproś o przegląd</span>
                                    <span class="option-desc">Agent prosi o zgodę przed każdym poleceniem (oprócz tych z listy dozwolonych).</span>
                                </div>
                                <div class="option-item">
                                    <span class="option-label">⚡ Zawsze kontynuuj</span>
                                    <span class="option-desc">Agent wykonuje polecenia bez pytania (oprócz tych z listy zablokowanych).</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Dostęp do plików poza workspace -->
                    <div class="card" data-search="non-workspace file access dostęp pliki poza obszar roboczy niebezpieczne">
                        <div class="card-header">
                            <h3>Dostęp agenta do plików poza obszarem roboczym</h3>
                            <span class="badge badge-important">WAŻNE</span>
                            <span class="tooltip-trigger" tabindex="0">ℹ️
                                <div class="tooltip-content">
                                    <strong>Dostęp poza obszarem roboczym (Agent Non-Workspace File Access)</strong><br><br>
                                    Domyślnie agent widzi tylko pliki w Twoim projekcie (obszarze roboczym)
                                    i w folderze <code>~/.antigravity/</code> (artefakty, wiedza, konfiguracja).<br><br>
                                    Włączenie tej opcji daje agentowi dostęp do WSZYSTKICH plików na Twoim
                                    komputerze — co może ujawnić prywatne dane, klucze API itp.<br><br>
                                    <em>⚠️ Używaj z najwyższą ostrożnością! Dla początkujących: zostaw WYŁĄCZONE.</em>
                                </div>
                            </span>
                        </div>
                        <div class="card-body">
                            <p>Pozwól agentowi na odczyt i edycję plików znajdujących się poza bieżącym obszarem roboczym.</p>
                            <div class="original">Oryginał: Agent Non-Workspace File Access</div>
                            <div class="warning-box">
                                ⚠️ <strong>Ryzyko prywatności:</strong> Może ujawnić lokalne dane wrażliwe (klucze SSH, tokeny API, prywatne pliki) agentowi AI.
                            </div>
                        </div>
                    </div>

                    <!-- Model rozumowania -->
                    <div class="card" data-search="reasoning model model rozumowania gemini claude gpt wybór modelu">
                        <div class="card-header">
                            <h3>Model rozumowania</h3>
                            <span class="badge badge-recommended">ZALECANE</span>
                            <span class="tooltip-trigger" tabindex="0">ℹ️
                                <div class="tooltip-content">
                                    <strong>Model rozumowania (Reasoning Model)</strong><br><br>
                                    Wybierz model AI, który napędza agenta. Dostępne modele:<br>
                                    • <strong>Gemini 3.1 Pro (high)</strong> — najlepsza jakość od Google<br>
                                    • <strong>Gemini 3.1 Pro (low)</strong> — szybszy, mniej dokładny<br>
                                    • <strong>Gemini 3 Flash</strong> — najszybszy<br>
                                    • <strong>Claude Sonnet 4.6</strong> — model Anthropic z myśleniem<br>
                                    • <strong>Claude Opus 4.6</strong> — najsilniejszy Anthropic<br>
                                    • <strong>GPT-OSS-120b</strong> — model open-source<br><br>
                                    Wybór modelu jest „przyklejony" do rozmowy — zmiana w trakcie zadziała
                                    dopiero od następnej wiadomości użytkownika.<br><br>
                                    <em>Wskazówka: Na początek Gemini 3.1 Pro (high) — najlepszy stosunek jakości do dostępności.</em>
                                </div>
                            </span>
                        </div>
                        <div class="card-body">
                            <p>Główny model AI napędzający agenta. Wybierz z listy pod polem wiadomości w widoku rozmowy.</p>
                            <div class="original">Oryginał: Reasoning Model — model selector dropdown</div>
                        </div>
                    </div>

                    <!-- Tryb ścisły -->
                    <div class="card" data-search="strict mode tryb ścisły restrykcyjny bezpieczeństwo">
                        <div class="card-header">
                            <h3>Tryb ścisły</h3>
                            <span class="badge badge-optional">OPCJONALNE</span>
                            <span class="tooltip-trigger" tabindex="0">ℹ️
                                <div class="tooltip-content">
                                    <strong>Tryb ścisły (Strict Mode)</strong><br><br>
                                    Dodatkowa warstwa bezpieczeństwa. Gdy włączony, agent ma bardziej
                                    restrykcyjne zasady działania — mniej swobody w podejmowaniu decyzji,
                                    więcej pytań do użytkownika, ściślejsze trzymanie się instrukcji.<br><br>
                                    <em>Przydatne gdy pracujesz z wrażliwym kodem produkcyjnym.</em>
                                </div>
                            </span>
                        </div>
                        <div class="card-body">
                            <p>Ogranicza swobodę agenta — wymusza ściślejsze przestrzeganie instrukcji i częstsze pytania o zgodę.</p>
                            <div class="original">Oryginał: Strict Mode</div>
                        </div>
                    </div>

                    <!-- Piaskownica -->
                    <div class="card" data-search="sandbox sandboxing piaskownica izolacja bezpieczeństwo">
                        <div class="card-header">
                            <h3>Piaskownica (sandboxing)</h3>
                            <span class="badge badge-optional">OPCJONALNE</span>
                            <span class="tooltip-trigger" tabindex="0">ℹ️
                                <div class="tooltip-content">
                                    <strong>Piaskownica / Sandboxing</strong><br><br>
                                    Uruchamia polecenia terminala w izolowanym środowisku (piaskownicy).
                                    Chroni Twój system przed potencjalnie niebezpiecznymi poleceniami
                                    — nawet jeśli agent popełni błąd, nie uszkodzi Twojego komputera.<br><br>
                                    <em>Dobra opcja bezpieczeństwa dla początkujących. Włącz jeśli martwisz się
                                    o to, co agent może zrobić w terminalu.</em>
                                </div>
                            </span>
                        </div>
                        <div class="card-body">
                            <p>Uruchamia polecenia terminala w odizolowanym, bezpiecznym środowisku. Chroni system przed nieprzewidzianymi zmianami.</p>
                            <div class="original">Oryginał: Sandboxing Terminal Commands</div>
                        </div>
                    </div>

                    <!-- Reguły / Rules -->
                    <div class="card" data-search="rules reguły zasady agent zachowanie styl markdown plik">
                        <div class="card-header">
                            <h3>Reguły agenta</h3>
                            <span class="badge badge-recommended">ZALECANE</span>
                            <span class="tooltip-trigger" tabindex="0">ℹ️
                                <div class="tooltip-content">
                                    <strong>Reguły (Rules)</strong><br><br>
                                    Reguły to pliki Markdown z instrukcjami dla agenta. Określają styl pracy,
                                    konwencje kodowania i zachowanie specyficzne dla Twojego projektu.<br><br>
                                    <strong>Typy reguł:</strong><br>
                                    • <strong>Globalne</strong> — plik <code>~/.gemini/GEMINI.md</code> — działają wszędzie<br>
                                    • <strong>Obszar roboczy</strong> — folder <code>.agents/rules/</code> — dla konkretnego projektu<br><br>
                                    <strong>Tryby aktywacji:</strong><br>
                                    • Ręczna — przez @wzmiankę<br>
                                    • Zawsze włączona<br>
                                    • Decyzja modelu — AI sam decyduje<br>
                                    • Glob — dopasowanie do wzorca plików<br><br>
                                    <em>Limit: 12 000 znaków na plik reguł.</em>
                                </div>
                            </span>
                        </div>
                        <div class="card-body">
                            <p>Definiuj zasady zachowania agenta w plikach Markdown — globalnie lub per projekt.</p>
                            <div class="original">Oryginał: Rules — .agents/rules/ oraz ~/.gemini/GEMINI.md</div>
                            <div class="shortcut-hint">
                                Jak dodać: Otwórz menu <strong>"..."</strong> na górze panelu agenta → <strong>Customizations</strong> → <strong>Rules</strong>
                            </div>
                        </div>
                    </div>

                    <!-- Przepływy pracy / Workflows -->
                    <div class="card" data-search="workflows przepływy pracy automatyzacja kroki komendy slash">
                        <div class="card-header">
                            <h3>Przepływy pracy (Workflows)</h3>
                            <span class="badge badge-optional">OPCJONALNE</span>
                            <span class="tooltip-trigger" tabindex="0">ℹ️
                                <div class="tooltip-content">
                                    <strong>Przepływy pracy (Workflows)</strong><br><br>
                                    Gotowe sekwencje kroków, które agent wykonuje na polecenie.
                                    Idealne do powtarzalnych zadań jak: wdrażanie, review kodu, testy.<br><br>
                                    Wywołujesz je komendą slash: <code>/nazwa-workflow</code><br>
                                    Można wywoływać jeden workflow z drugiego!<br><br>
                                    <strong>Tworzenie:</strong> Menu "..." → Customizations → Workflows → + Global / + Workspace<br><br>
                                    <em>Agent może też sam wygenerować workflow na podstawie waszej rozmowy!</em>
                                </div>
                            </span>
                        </div>
                        <div class="card-body">
                            <p>Zdefiniuj powtarzalne sekwencje kroków jako polecenia slash — agent wykona je krok po kroku.</p>
                            <div class="original">Oryginał: Workflows — invoked via /workflow-name</div>
                        </div>
                    </div>

                    <!-- Umiejętności / Skills -->
                    <div class="card" data-search="skills umiejętności rozszerzanie agent wiedza pakiety SKILL.md">
                        <div class="card-header">
                            <h3>Umiejętności (Skills)</h3>
                            <span class="badge badge-optional">OPCJONALNE</span>
                            <span class="tooltip-trigger" tabindex="0">ℹ️
                                <div class="tooltip-content">
                                    <strong>Umiejętności (Skills)</strong><br><br>
                                    Pakiety wiedzy rozszerzające możliwości agenta. Każda umiejętność to folder
                                    z plikiem <code>SKILL.md</code> zawierającym instrukcje, najlepsze praktyki
                                    i opcjonalne skrypty.<br><br>
                                    <strong>Lokalizacje:</strong><br>
                                    • <code>.agents/skills/</code> — dla konkretnego projektu<br>
                                    • <code>~/.gemini/antigravity/skills/</code> — globalne<br><br>
                                    Agent sam decyduje czy użyć umiejętności na podstawie opisu.<br><br>
                                    <em>Możesz też wymienić umiejętność po nazwie, żeby wymusić jej użycie.</em>
                                </div>
                            </span>
                        </div>
                        <div class="card-body">
                            <p>Rozszerzaj wiedzę agenta o specjalistyczne instrukcje i procedury w folderach skills.</p>
                            <div class="original">Oryginał: Skills — .agents/skills/&lt;skill&gt;/SKILL.md</div>
                        </div>
                    </div>

                    <!-- MCP -->
                    <div class="card" data-search="mcp model context protocol narzędzia zewnętrzne serwery integracja baza danych">
                        <div class="card-header">
                            <h3>MCP — Protokół kontekstu modelu</h3>
                            <span class="badge badge-optional">OPCJONALNE</span>
                            <span class="tooltip-trigger" tabindex="0">ℹ️
                                <div class="tooltip-content">
                                    <strong>MCP (Model Context Protocol)</strong><br><br>
                                    Standard łączenia Antigravity z zewnętrznymi narzędziami, bazami danych
                                    i serwisami. Zamiast ręcznie wklejać kontekst, agent pobiera go
                                    automatycznie z podłączonych serwerów MCP.<br><br>
                                    <strong>Przykłady:</strong><br>
                                    • Podłączenie do bazy PostgreSQL — agent widzi schemat tabel<br>
                                    • GitHub — agent tworzy issues i PR<br>
                                    • Figma — agent odczytuje projekty UI<br><br>
                                    <strong>Dostęp:</strong> Menu "..." → MCP Store<br><br>
                                    <em>Obsługuje 30+ serwisów: Firebase, Supabase, Linear, Notion i więcej.</em>
                                </div>
                            </span>
                        </div>
                        <div class="card-body">
                            <p>Podłącz zewnętrzne narzędzia i serwisy do agenta przez standardowy protokół MCP. Sklep z gotowymi integracjami.</p>
                            <div class="original">Oryginał: MCP Integration — Model Context Protocol</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ===== SEKCJA: EDYTOR ===== -->
        <div class="tab-content" id="tab-editor" style="display:none;">
            <div class="section">
                <div class="section-title">📝 Ustawienia Edytora</div>

                <div class="settings-grid">
                    <div class="card" data-search="tab uzupełnianie kodu autocomplete podpowiedzi inline">
                        <div class="card-header">
                            <h3>Tab — Uzupełnianie kodu w linii</h3>
                            <span class="badge badge-recommended">ZALECANE</span>
                            <span class="tooltip-trigger" tabindex="0">ℹ️
                                <div class="tooltip-content">
                                    <strong>Tab (Inline Completions)</strong><br><br>
                                    Podpowiedzi kodu wyświetlane bezpośrednio w edytorze podczas pisania.
                                    Naciśnij <kbd>Tab</kbd> aby zaakceptować sugestię.
                                    Jest to odpowiednik GitHub Copilot w Antigravity — działa bezlimitowo
                                    na wszystkich planach!
                                </div>
                            </span>
                        </div>
                        <div class="card-body">
                            <p>Podpowiedzi kodu w linii — wystarczy nacisnąć Tab aby zaakceptować. Bez limitu na każdym planie.</p>
                            <div class="original">Oryginał: Tab — Inline Code Completions</div>
                        </div>
                    </div>

                    <div class="card" data-search="command polecenie cmd+i inline edit krótkie zadanie">
                        <div class="card-header">
                            <h3>Command — Szybkie polecenie inline</h3>
                            <span class="badge badge-recommended">ZALECANE</span>
                            <span class="tooltip-trigger" tabindex="0">ℹ️
                                <div class="tooltip-content">
                                    <strong>Command (Inline Command)</strong><br><br>
                                    Krótkie polecenia AI bezpośrednio w edytorze. Zaznacz kod i wydaj
                                    polecenie — agent zmieni tylko zaznaczony fragment.
                                    Idealne do refaktoryzacji, dodawania komentarzy, poprawiania błędów.<br><br>
                                    Bez limitu na każdym planie!
                                </div>
                            </span>
                        </div>
                        <div class="card-body">
                            <p>Szybkie polecenia AI w edytorze — zaznacz kod i wydaj krótkie polecenie. Bez limitu.</p>
                            <div class="original">Oryginał: Command — inline code requests</div>
                        </div>
                    </div>

                    <div class="card" data-search="agent side panel boczny agenta rozmowa czat">
                        <div class="card-header">
                            <h3>Panel boczny agenta</h3>
                            <span class="tooltip-trigger" tabindex="0">ℹ️
                                <div class="tooltip-content">
                                    <strong>Panel boczny agenta (Agent Side Panel)</strong><br><br>
                                    Główne okno rozmowy z agentem AI w edytorze. Tu wydajesz polecenia,
                                    widzisz odpowiedzi, plan zadań i artefakty. To jest serce interakcji
                                    z AI w Antigravity.
                                </div>
                            </span>
                        </div>
                        <div class="card-body">
                            <p>Główne okno czatu z agentem AI — dostępne z boku edytora. Tu prowadzisz rozmowy i wydajesz polecenia.</p>
                            <div class="original">Oryginał: Agent Side Panel</div>
                        </div>
                    </div>

                    <div class="card" data-search="review changes source control przegląd zmian kontrola wersji git">
                        <div class="card-header">
                            <h3>Przegląd zmian i kontrola wersji</h3>
                            <span class="tooltip-trigger" tabindex="0">ℹ️
                                <div class="tooltip-content">
                                    <strong>Przegląd zmian (Review Changes + Source Control)</strong><br><br>
                                    Po tym jak agent dokona zmian w plikach, możesz przejrzeć wszystkie
                                    modyfikacje w widoku diff i zatwierdzić je (commit) do repozytorium Git.
                                    Działa identycznie jak w VS Code.
                                </div>
                            </span>
                        </div>
                        <div class="card-body">
                            <p>Przeglądaj zmiany wprowadzone przez agenta AI i zarządzaj kontrolą wersji Git.</p>
                            <div class="original">Oryginał: Review Changes + Source Control</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ===== SEKCJA: PRZEGLĄDARKA ===== -->
        <div class="tab-content" id="tab-browser" style="display:none;">
            <div class="section">
                <div class="section-title">🌐 Przeglądarka i subagent</div>

                <div class="settings-grid">
                    <div class="card" data-search="browser przeglądarka wbudowana otwieranie stron">
                        <div class="card-header">
                            <h3>Wbudowana przeglądarka</h3>
                            <span class="tooltip-trigger" tabindex="0">ℹ️
                                <div class="tooltip-content">
                                    <strong>Wbudowana przeglądarka (Browser)</strong><br><br>
                                    Antigravity ma wbudowaną przeglądarkę Chrome. Agent może z niej korzystać
                                    do testowania stron, robienia zrzutów ekranu i interakcji z interfejsem
                                    użytkownika Twojej aplikacji.
                                </div>
                            </span>
                        </div>
                        <div class="card-body">
                            <p>Wbudowany Chrome do testowania aplikacji webowych — agent może przeglądać, klikać i analizować strony.</p>
                            <div class="original">Oryginał: Browser Integration</div>
                        </div>
                    </div>

                    <div class="card" data-search="browser subagent subagent przeglądarki UI interakcja klikanie scrollowanie">
                        <div class="card-header">
                            <h3>Subagent przeglądarki</h3>
                            <span class="tooltip-trigger" tabindex="0">ℹ️
                                <div class="tooltip-content">
                                    <strong>Subagent przeglądarki (Browser Subagent)</strong><br><br>
                                    Specjalny agent AI (napędzany modelem Gemini 2.5 Pro UI) który potrafi
                                    obsługiwać przeglądarkę: klikać, scrollować, wypełniać formularze.
                                    Używany automatycznie gdy agent potrzebuje przetestować UI.
                                </div>
                            </span>
                        </div>
                        <div class="card-body">
                            <p>Agent AI sterujący przeglądarką — klika, scrolluje, wypełnia formularze, testuje Twój interfejs.</p>
                            <div class="original">Oryginał: Browser Subagent — powered by Gemini 2.5 Pro UI</div>
                        </div>
                    </div>

                    <div class="card" data-search="allowlist denylist lista dozwolonych zablokowanych domeny strony blokowanie">
                        <div class="card-header">
                            <h3>Lista dozwolonych / zablokowanych domen</h3>
                            <span class="tooltip-trigger" tabindex="0">ℹ️
                                <div class="tooltip-content">
                                    <strong>Allowlist / Denylist (Lista dozwolonych / zablokowanych)</strong><br><br>
                                    Kontroluj do jakich stron internetowych ma dostęp agent przez wbudowaną
                                    przeglądarkę. Możesz zablokować konkretne domeny (np. strony z logowaniem)
                                    lub zezwolić tylko na wybrane.
                                </div>
                            </span>
                        </div>
                        <div class="card-body">
                            <p>Ogranicz strony internetowe, które agent może odwiedzać w wbudowanej przeglądarce.</p>
                            <div class="original">Oryginał: Allowlist / Denylist — domain filtering</div>
                        </div>
                    </div>

                    <div class="card" data-search="separate chrome profile profil chrome oddzielny izolacja ciasteczka">
                        <div class="card-header">
                            <h3>Oddzielny profil Chrome</h3>
                            <span class="tooltip-trigger" tabindex="0">ℹ️
                                <div class="tooltip-content">
                                    <strong>Oddzielny profil Chrome (Separate Chrome Profile)</strong><br><br>
                                    Używa osobnego profilu przeglądarki dla agenta — dzięki temu agent
                                    nie ma dostępu do Twoich ciasteczek, haseł i zalogowanych sesji.
                                    Zalecane ze względów bezpieczeństwa.
                                </div>
                            </span>
                        </div>
                        <div class="card-body">
                            <p>Izoluj dane przeglądarki agenta od Twoich prywatnych danych — osobny profil Chrome.</p>
                            <div class="original">Oryginał: Separate Chrome Profile</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ===== SEKCJA: KONTO ===== -->
        <div class="tab-content" id="tab-account" style="display:none;">
            <div class="section">
                <div class="section-title">👤 Konto i plany</div>

                <div class="settings-grid">
                    <div class="card" data-search="telemetry telemetria zbieranie danych prywatność analityka">
                        <div class="card-header">
                            <h3>Telemetria — zbieranie danych</h3>
                            <span class="badge badge-important">WAŻNE</span>
                            <span class="tooltip-trigger" tabindex="0">ℹ️
                                <div class="tooltip-content">
                                    <strong>Telemetria (Enable Telemetry)</strong><br><br>
                                    Gdy włączona, Antigravity zbiera dane o Twoich interakcjach w celu
                                    ulepszania produktu i modeli AI. Możesz to wyłączyć w dowolnym momencie
                                    w sekcji „Konto" w ustawieniach.<br><br>
                                    <em>Znajdziesz to w: Ustawienia → Konto (Account) → Enable Telemetry</em>
                                </div>
                            </span>
                        </div>
                        <div class="card-body">
                            <p>Kontroluj czy Antigravity zbiera dane o Twoim użytkowaniu w celu ulepszania usługi.</p>
                            <div class="original">Oryginał: Enable Telemetry — Account section</div>
                        </div>
                    </div>

                    <div class="card" data-search="plans plany limit kredyty ai pro ultra quota przydział rate">
                        <div class="card-header">
                            <h3>Plany i limity</h3>
                            <span class="tooltip-trigger" tabindex="0">ℹ️
                                <div class="tooltip-content">
                                    <strong>Plany (Plans)</strong><br><br>
                                    <strong>Bez planu AI:</strong> podstawowy przydział, odnawiany co tydzień<br>
                                    <strong>Google AI Pro:</strong> hojny przydział co 5h + wyższy limit tygodniowy<br>
                                    <strong>Google AI Ultra / Workspace AI Ultra:</strong> najwyższy przydział co 5h, BEZ limitu tygodniowego<br><br>
                                    Wszystkie plany dają: nielimitowane Tab, nielimitowane Command,
                                    dostęp do Agent Manager i przeglądarki.<br><br>
                                    <em>Masz Google Pixel 9 Pro XL → dostajesz Google AI Pro w ramach urządzenia!</em>
                                </div>
                            </span>
                        </div>
                        <div class="card-body">
                            <p>Twój plan Google AI określa limity użycia agenta. AI Pro/Ultra dają znacznie wyższe przydziały.</p>
                            <div class="original">Oryginał: Plans — rate limits and model availability</div>
                        </div>
                    </div>

                    <div class="card" data-search="overages kredyty ai przekroczenia dodatkowe zużycie vertex">
                        <div class="card-header">
                            <h3>Przekroczenia — kredyty AI</h3>
                            <span class="tooltip-trigger" tabindex="0">ℹ️
                                <div class="tooltip-content">
                                    <strong>Przekroczenia kredytów AI (AI Credit Overages)</strong><br><br>
                                    Gdy wyczerpiesz podstawowy przydział, możesz dalej korzystać z agenta
                                    za pomocą kredytów AI z Twojego planu Google One.<br><br>
                                    <strong>Nigdy</strong> — nie używaj kredytów, czekaj na odnowienie<br>
                                    <strong>Zawsze</strong> — automatycznie używaj kredytów gdy przydział się skończy<br><br>
                                    Kredyty zużywane po cenach Vertex API. Możesz <a href="http://one.google.com/ai/credits">kupić dodatkowe</a>.
                                </div>
                            </span>
                        </div>
                        <div class="card-body">
                            <p>Czy używać kredytów AI Google One gdy podstawowy przydział się wyczerpie.</p>
                            <div class="original">Oryginał: AI Credit Overages — Never / Always</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ===== SEKCJA: WSZYSTKIE (pokazywana przy "all") ===== -->
        <div class="tab-content" id="tab-all" style="display:none;"></div>
    </div>

    <!-- SKRYPT INTERAKTYWNOŚCI -->
    <script nonce="${nonce}">
        // === Nawigacja zakładkami ===
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                // Usuń aktywność ze wszystkich
                document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const tabId = tab.getAttribute('data-tab');

                if (tabId === 'all') {
                    // Pokaż wszystkie sekcje
                    document.querySelectorAll('.tab-content').forEach(tc => tc.style.display = 'block');
                } else {
                    // Pokaż tylko wybraną
                    document.querySelectorAll('.tab-content').forEach(tc => tc.style.display = 'none');
                    const target = document.getElementById('tab-' + tabId);
                    if (target) target.style.display = 'block';
                }
            });
        });

        // === Wyszukiwarka ustawień ===
        const searchBox = document.getElementById('searchSettings');
        const resultsCount = document.getElementById('resultsCount');

        searchBox.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const cards = document.querySelectorAll('.card');
            let visible = 0;

            if (query === '') {
                // Pokaż aktualną zakładkę
                cards.forEach(c => c.style.display = 'block');
                resultsCount.textContent = '';
                return;
            }

            // Pokaż wszystkie zakładki przy wyszukiwaniu
            document.querySelectorAll('.tab-content').forEach(tc => tc.style.display = 'block');
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
            document.querySelector('[data-tab="all"]').classList.add('active');

            cards.forEach(card => {
                const searchData = (card.getAttribute('data-search') || '').toLowerCase();
                const textContent = card.textContent.toLowerCase();
                const matches = searchData.includes(query) || textContent.includes(query);
                card.style.display = matches ? 'block' : 'none';
                if (matches) visible++;
            });

            resultsCount.textContent = visible + ' ' +
                (visible === 1 ? 'wynik' : visible < 5 ? 'wyniki' : 'wyników');
        });
    </script>
</body>
</html>`;
    }
}
exports.SettingsPanel = SettingsPanel;
//# sourceMappingURL=SettingsPanel.js.map