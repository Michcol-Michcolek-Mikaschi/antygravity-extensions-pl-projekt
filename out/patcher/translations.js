"use strict";
// =============================================================================
// KOMPLETNE SPOLSZCZENIE Google Antigravity — KAŻDY element interfejsu
// =============================================================================
// Patcher ZAWSZE zaczyna od oryginału EN (backup), więc tłumaczenia
// MUSZĄ pasować do oryginalnego angielskiego main.js.
// Kolejność: dłuższe stringi PRZED krótszymi (ochrona przed częściową podmianą).
// =============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.coverageGapTranslations = exports.diagnosticsTranslations = exports.additionalUpdateTranslations = exports.labelTranslations = exports.quotedStringsTranslations = exports.childrenShortTranslations = exports.childrenLongTranslations = exports.onboardingTranslations = exports.placeholderTranslations = exports.chatTranslations = exports.agentManagerTranslations = exports.settingsTranslations = exports.sectionTitleTranslations = exports.windowTitleTranslations = exports.sidebarLabelsTranslations = exports.sidebarSettingsTranslations = void 0;
exports.getAllTranslations = getAllTranslations;
// =====================================================================
//  A. SIDEBAR SETTINGS — wstrzyknięcie mapy PL do komponentu but
// =====================================================================
exports.sidebarSettingsTranslations = [
    {
        en: 'opacity-50 group-hover:opacity-100"),children:e})})',
        pl: 'opacity-50 group-hover:opacity-100"),children:({"Account":"Konto","Agent":"Agent","Appearance":"Wygląd","Browser":"Przeglądarka","Notifications":"Powiadomienia","Models":"Modele AI","Customizations":"Personalizacja","Tab":"Tab","Editor":"Edytor","Provide Feedback":"Prześlij opinię","MCP":"MCP"})[e]||e})})',
    },
];
// =====================================================================
//  B. SIDEBAR LABELS: "GLOBAL", "Workspaces"
// =====================================================================
exports.sidebarLabelsTranslations = [
    { en: 'children:"Global"', pl: 'children:"Globalne"' },
    { en: 'children:"Workspaces"', pl: 'children:"Obszary robocze"' },
];
// =====================================================================
//  C. TYTUŁ OKNA SETTINGS
// =====================================================================
exports.windowTitleTranslations = [
    { en: '"Settings - "', pl: '"Ustawienia — "' },
];
// =====================================================================
//  D. SEKCJE — title w mapie lrn (nagłówki nad ustawieniami)
// =====================================================================
exports.sectionTitleTranslations = [
    { en: 'title:"Security"', pl: 'title:"Bezpieczeństwo"' },
    { en: 'title:"Artifact"', pl: 'title:"Artefakty"' },
    { en: 'title:"Artifacts"', pl: 'title:"Artefakty"' },
    { en: 'title:"File Access"', pl: 'title:"Dostęp do plików"' },
    { en: 'title:"Automation"', pl: 'title:"Automatyzacja"' },
    { en: 'title:"History"', pl: 'title:"Historia"' },
    { en: 'title:"General"', pl: 'title:"Ogólne"' },
    { en: 'title:"Theme"', pl: 'title:"Motyw"' },
    { en: 'title:"Suggestions"', pl: 'title:"Sugestie"' },
    { en: 'title:"Navigation"', pl: 'title:"Nawigacja"' },
    { en: 'title:"Context"', pl: 'title:"Kontekst"' },
    { en: 'title:"Advanced"', pl: 'title:"Zaawansowane"' },
    { en: 'title:"Quota"', pl: 'title:"Limity"' },
    { en: 'title:"Model Credits"', pl: 'title:"Kredyty modeli"' },
    { en: 'title:"Model Quota"', pl: 'title:"Limity modeli"' },
    { en: 'title:"Account"', pl: 'title:"Konto"' },
    { en: 'title:"Browser"', pl: 'title:"Przeglądarka"' },
    { en: 'title:"Terminal"', pl: 'title:"Wiersz poleceń"' },
    { en: 'title:"Allowlist"', pl: 'title:"Lista dozwolonych"' },
    { en: 'title:"Commands"', pl: 'title:"Polecenia"' },
    { en: 'title:"Knowledge"', pl: 'title:"Baza wiedzy"' },
    { en: 'title:"Skills"', pl: 'title:"Umiejętności"' },
    { en: 'title:"Rules"', pl: 'title:"Reguły"' },
    { en: 'title:"Customizations"', pl: 'title:"Personalizacja"' },
    { en: 'title:"Custom Agents"', pl: 'title:"Własni agenci"' },
    { en: 'title:"MCP Servers"', pl: 'title:"Serwery MCP"' },
    { en: 'title:"Installed MCP Servers"', pl: 'title:"Zainstalowane serwery MCP"' },
    { en: 'title:"Installed Skills"', pl: 'title:"Zainstalowane umiejętności"' },
    { en: 'title:"Marketplace"', pl: 'title:"Sklep"' },
    { en: 'title:"Selection Actions"', pl: 'title:"Akcje zaznaczenia"' },
    { en: 'title:"Workspace Integration"', pl: 'title:"Integracja z obszarem roboczym"' },
    { en: 'title:"Token Usage"', pl: 'title:"Użycie tokenów"' },
    { en: 'title:"Subagents"', pl: 'title:"Podagenci"' },
    { en: 'title:"Files Changed"', pl: 'title:"Zmienione pliki"' },
    { en: 'title:"Strict Mode"', pl: 'title:"Tryb ścisły"' },
    { en: 'title:"Update Available"', pl: 'title:"Dostępna aktualizacja"' },
    { en: 'title:"Verification required"', pl: 'title:"Wymagana weryfikacja"' },
    { en: 'title:"Action required"', pl: 'title:"Wymagane działanie"' },
    { en: 'title:"Close Settings"', pl: 'title:"Zamknij ustawienia"' },
    { en: 'title:"Enable Notifications"', pl: 'title:"Włącz powiadomienia"' },
    { en: 'title:"Add MCP Servers"', pl: 'title:"Dodaj serwery MCP"' },
    { en: 'title:"Customize Global Skills"', pl: 'title:"Dostosuj globalne umiejętności"' },
    { en: 'title:"Select Model to Send Message"', pl: 'title:"Wybierz model do wysłania wiadomości"' },
    { en: 'title:"Baseline model quota reached"', pl: 'title:"Osiągnięto podstawowy limit modelu"' },
    { en: 'title:"Model quota reached"', pl: 'title:"Osiągnięto limit modelu"' },
    { en: 'title:"Insufficient AI Credits"', pl: 'title:"Niewystarczające kredyty AI"' },
    { en: 'title:"Find"', pl: 'title:"Znajdź"' },
    { en: 'title:"Edit"', pl: 'title:"Edytuj"' },
    { en: 'title:"View"', pl: 'title:"Widok"' },
    { en: 'title:"File"', pl: 'title:"Plik"' },
    { en: 'title:"Learn more"', pl: 'title:"Dowiedz się więcej"' },
    { en: 'title:"Close"', pl: 'title:"Zamknij"' },
    { en: 'title:"Custom configuration"', pl: 'title:"Własna konfiguracja"' },
];
// =====================================================================
//  E. USTAWIENIA — PEŁNE label+description (Settings panele)
// =====================================================================
exports.settingsTranslations = [
    // --- AGENT: Strict Mode ---
    {
        en: 'label:"Strict Mode",description:"When enabled, enforces settings that prevent the agent from autonomously running targeted exploits and requires human review for all agent actions. Visit antigravity.google/docs/strict-mode for details."',
        pl: 'label:"Tryb ścisły",description:"Po włączeniu wymusza ustawienia zapobiegające autonomicznemu uruchamianiu szkodliwych operacji przez agenta i wymaga ręcznego zatwierdzenia wszystkich jego działań. Szczegóły: antigravity.google/docs/strict-mode."',
    },
    // --- Review Policy ---
    { en: 'label:"Review Policy"', pl: 'label:"Zasady przeglądu"' },
    {
        en: "Specifies Agent's behavior when asking for review on artifacts, which are documents it creates to enable a richer conversation experience.",
        pl: "Określa zachowanie agenta przy proszeniu o przegląd artefaktów — dokumentów tworzonych w celu wzbogacenia rozmowy.",
    },
    {
        en: 'label:"Always Proceeds",description:"Agent never asks for review. This maximizes the autonomy of the Agent, but also has the highest risk of the Agent operating over unsafe or injected Artifact content."',
        pl: 'label:"Zawsze kontynuuj",description:"Agent nigdy nie prosi o przegląd. Maksymalizuje autonomię agenta, ale niesie najwyższe ryzyko działania na niebezpiecznych lub podmienionych treściach artefaktów."',
    },
    {
        en: 'label:"Agent Decides",description:"Agent will decide when to ask for review based on task complexity and user preference."',
        pl: 'label:"Agent decyduje",description:"Agent sam zdecyduje kiedy poprosić o przegląd, na podstawie złożoności zadania i preferencji użytkownika."',
    },
    {
        en: 'label:"Asks for Review",description:"Agent always asks for review."',
        pl: 'label:"Zawsze pytaj",description:"Agent zawsze prosi o przegląd przed wykonaniem."',
    },
    // --- Terminal Command Auto Execution ---
    { en: 'label:"Terminal Command Auto Execution"', pl: 'label:"Automatyczne wykonywanie poleceń terminala"' },
    {
        en: 'Always Proceed - Agent never asks for confirmation before executing terminal commands (except those in the Deny list). This provides the Agent with the maximum ability to operate over long periods without intervention, but also has the highest risk of an Agent executing an unsafe terminal command.',
        pl: 'Zawsze kontynuuj — Agent nigdy nie pyta o potwierdzenie przed wykonaniem poleceń terminala (z wyjątkiem tych z listy zablokowanych). Daje to agentowi maksymalną zdolność do pracy bez interwencji, ale niesie najwyższe ryzyko wykonania niebezpiecznego polecenia.',
    },
    {
        en: 'Request Review - Agent always asks for confirmation before executing terminal commands (except those in the Allow list).',
        pl: 'Poproś o przegląd — Agent zawsze prosi o potwierdzenie przed wykonaniem poleceń terminala (z wyjątkiem tych z listy dozwolonych).',
    },
    {
        en: 'Note: A change to this setting will only apply to new messages sent to Agent. In-progress responses will use the previous setting value.',
        pl: 'Uwaga: zmiana tego ustawienia dotyczy tylko nowych wiadomości wysłanych do agenta. Odpowiedzi w trakcie będą korzystać z poprzedniej wartości.',
    },
    // --- Dropdown values ---
    { en: 'return"Always Proceed"', pl: 'return"Zawsze kontynuuj"' },
    { en: 'return"Request Review"', pl: 'return"Poproś o przegląd"' },
    { en: 'return"Disabled"', pl: 'return"Wyłączone"' },
    { en: 'return"Fast"', pl: 'return"Szybko"' },
    { en: 'return"Slow"', pl: 'return"Wolno"' },
    // --- Terminal Sandbox ---
    {
        en: 'label:"Enable Terminal Sandbox",description:"When enabled, terminal commands run with sandbox restrictions."',
        pl: 'label:"Włącz piaskownicę terminala",description:"Po włączeniu polecenia terminala działają z ograniczeniami piaskownicy."',
    },
    {
        en: 'label:"Sandbox Allow Network",description:"When enabled, sandboxed commands are allowed to make network requests."',
        pl: 'label:"Piaskownica — zezwól na sieć",description:"Po włączeniu polecenia w piaskownicy mogą wykonywać żądania sieciowe."',
    },
    // --- Auto-Fix Lints ---
    {
        en: 'label:"Agent Auto-Fix Lints",description:"When enabled, Agent is given awareness of lint errors created by its edits and may fix them without explicit user prompting."',
        pl: 'label:"Automatyczna naprawa błędów lint",description:"Po włączeniu agent widzi błędy lint powstałe w wyniku jego edycji i może je naprawić bez polecenia użytkownika."',
    },
    // --- Workspace API ---
    {
        en: 'label:"Enable Workspace API",description:"When enabled, Agent can interact with Google Workspace through the API to search and read documents."',
        pl: 'label:"Włącz API Workspace",description:"Po włączeniu agent może korzystać z Google Workspace przez API do wyszukiwania i czytania dokumentów."',
    },
    // --- Agent Gitignore ---
    {
        en: 'label:"Agent Gitignore Access",description:"Allow Agent to view and edit the files in .gitignore automatically. Use with caution if your .gitignore lists files containing credentials, secrets, or other sensitive information."',
        pl: 'label:"Dostęp agenta do .gitignore",description:"Zezwól agentowi na automatyczne przeglądanie i edycję plików z .gitignore. Używaj ostrożnie, jeśli .gitignore zawiera pliki z danymi uwierzytelniającymi, kluczami lub innymi poufnymi informacjami."',
    },
    // --- Non-Workspace Files ---
    {
        en: 'label:"Agent Non-Workspace File Access",description:"Allow Agent to view and edit files outside of the current workspace automatically. Use with caution: this provides the Agent access to additional potentially-relevant information, but also allows the Agent to access credential files, secrets, and other files outside of the workspace that could be targeted in prompt injection attacks or other exploits by malicious actors."',
        pl: 'label:"Dostęp agenta do plików poza projektem",description:"Zezwól agentowi na automatyczne przeglądanie i edycję plików poza bieżącym obszarem roboczym. Używaj ostrożnie: daje to agentowi dostęp do dodatkowych informacji, ale także umożliwia dostęp do plików z danymi uwierzytelniającymi, kluczami i innymi plikami poza projektem, które mogą być celem ataków wstrzykiwania poleceń."',
    },
    // --- Auto-Open Edited Files ---
    {
        en: 'label:"Auto-Open Edited Files",description:"Open files in the background if Agent creates or edits them"',
        pl: 'label:"Auto-otwieranie edytowanych plików",description:"Otwieraj pliki w tle, jeśli agent je tworzy lub edytuje"',
    },
    // --- Sounds ---
    {
        en: 'label:"Enable Sounds for Agent",description:"When enabled, Antigravity will play a sound when Agent finishes generating a response."',
        pl: 'label:"Dźwięki agenta",description:"Po włączeniu Antigravity odtworzy dźwięk, gdy agent zakończy generowanie odpowiedzi."',
    },
    // --- Auto-Expand Changes ---
    {
        en: 'label:"Auto-Expand Changes Overview",description:"When enabled, the Changes Overview toolbar will automatically expand when Agent finishes generating a response."',
        pl: 'label:"Auto-rozwiń przegląd zmian",description:"Po włączeniu pasek przeglądu zmian automatycznie się rozwinie po wygenerowaniu odpowiedzi."',
    },
    // --- Conversation History ---
    {
        en: 'label:"Conversation History",description:"When enabled, the agent will be able to access past conversations to inform its responses."',
        pl: 'label:"Historia rozmów",description:"Po włączeniu agent może korzystać z wcześniejszych rozmów, aby lepiej formułować odpowiedzi."',
    },
    // --- Knowledge ---
    {
        en: 'label:"Knowledge",description:"When enabled, the agent will be able to access its knowledge base to inform its responses and automatically generate knowledge items in the background. Disabling this will prevent the agent from accessing existing knowledge items, but will not delete them."',
        pl: 'label:"Baza wiedzy",description:"Po włączeniu agent korzysta z bazy wiedzy, aby lepiej formułować odpowiedzi i automatycznie generować elementy wiedzy w tle. Wyłączenie uniemożliwi agentowi dostęp do istniejących elementów wiedzy, ale ich nie usunie."',
    },
    // --- Open Agent on Reload ---
    {
        en: 'label:"Open Agent on Reload",description:"Open Agent panel on window reload"',
        pl: 'label:"Otwórz agenta po przeładowaniu",description:"Otwórz panel agenta po przeładowaniu okna"',
    },
    // --- Explain and Fix ---
    {
        en: `label:"Explain and Fix in Current Conversation",description:'When enabled, "Explain and Fix" actions will continue in the current conversation instead of starting a new one.'`,
        pl: `label:"Wyjaśnij i napraw w bieżącej rozmowie",description:'Po włączeniu akcje „Wyjaśnij i napraw" będą kontynuowane w bieżącej rozmowie zamiast otwierać nową.'`,
    },
    // --- Tab: Suggestions ---
    {
        en: 'label:"Suggestions in Editor",description:"Show suggestions when typing in the editor"',
        pl: 'label:"Sugestie w edytorze",description:"Pokazuj sugestie podczas pisania w edytorze"',
    },
    // --- Tab Speed ---
    {
        en: 'label:"Tab Speed",description:"Set the speed of tab suggestions"',
        pl: 'label:"Szybkość Tab",description:"Ustaw szybkość sugestii Tab"',
    },
    // --- Highlight After Accept ---
    {
        en: 'label:"Highlight After Accept",description:"Highlight newly inserted text after accepting a Tab completion."',
        pl: 'label:"Podświetl po zaakceptowaniu",description:"Podświetl nowo wstawiony tekst po zaakceptowaniu uzupełnienia Tab."',
    },
    // --- Tab to Jump ---
    {
        en: 'label:"Tab to Jump",description:"Predict the location of your next edit and navigates you there with a tab keypress."',
        pl: 'label:"Tab — skok do edycji",description:"Przewiduje miejsce następnej edycji i przenosi Cię tam naciśnięciem Tab."',
    },
    // --- Tab to Import ---
    {
        en: 'label:"Tab to Import",description:"Quickly add and update imports with a tab keypress."',
        pl: 'label:"Tab — importy",description:"Szybko dodawaj i aktualizuj importy naciśnięciem Tab."',
    },
    // --- Clipboard Context ---
    {
        en: 'will use the clipboard as context for completions. May increase exposure to security exploits based on unintentional contents in clipboard.',
        pl: 'będzie używać schowka jako kontekstu dla uzupełnień. Może zwiększyć ryzyko ataków opartych na niezamierzonej zawartości schowka.',
    },
    { en: 'label:"Clipboard Context"', pl: 'label:"Kontekst schowka"' },
    // --- Tab Gitignore ---
    {
        en: 'label:"Tab Gitignore Access",description:"Allow Tab to view and edit the files in .gitignore. Use with caution if your .gitignore lists files containing credentials, secrets, or other sensitive information."',
        pl: 'label:"Dostęp Tab do .gitignore",description:"Zezwól Tab na przeglądanie i edycję plików z .gitignore. Używaj ostrożnie, jeśli .gitignore zawiera pliki z danymi uwierzytelniającymi, kluczami lub innymi poufnymi informacjami."',
    },
    // --- Browser Tools ---
    {
        en: 'label:"Enable Browser Tools",description:"When enabled, Agent can use browser tools to open URLs, read web pages, and interact with browser content. This allows the Agent access to important (and often critical) knowledge and methods of validation, but any browser integration does increase exposure to external malicious parties for security exploits."',
        pl: 'label:"Włącz narzędzia przeglądarki",description:"Po włączeniu agent może używać narzędzi przeglądarki do otwierania URL, czytania stron i interakcji z ich treścią. Daje to agentowi dostęp do ważnej wiedzy i metod walidacji, ale integracja z przeglądarką zwiększa narażenie na ataki."',
    },
    // --- Browser JS Policy ---
    { en: 'label:"Browser Javascript Execution Policy"', pl: 'label:"Polityka wykonywania JavaScript"' },
    { en: 'Disabled - Agent will never run Javascript code in the browser.', pl: 'Wyłączone — Agent nigdy nie uruchomi JavaScript w przeglądarce.' },
    { en: 'Request Review - Agent will always stop to ask for permission to run Javascript code in the browser.', pl: 'Poproś o przegląd — Agent zawsze zapyta o pozwolenie przed uruchomieniem JavaScript w przeglądarce.' },
    { en: 'Always Proceed - Agent will not stop to ask for permission to run Javascript in the browser. This provides the Agent with maximum autonomy to perform complex actions and validation in the browser, but also has the highest exposure to security exploits.', pl: 'Zawsze kontynuuj — Agent nie będzie pytać o pozwolenie na uruchomienie JavaScript w przeglądarce. Daje to agentowi maksymalną autonomię do złożonych akcji i walidacji, ale niesie najwyższe ryzyko ataków.' },
    // --- Chrome Binary ---
    {
        en: 'label:"Chrome Binary Path",description:"Path to the Chrome/Chromium executable. Leave empty for auto-detection."',
        pl: 'label:"Ścieżka do Chrome",description:"Ścieżka do pliku wykonywalnego Chrome/Chromium. Pozostaw puste dla automatycznego wykrywania."',
    },
    // --- Browser Profile ---
    {
        en: 'label:"Browser User Profile Path",description:"Custom path for the browser user profile directory. Leave empty for default (~/.gemini/antigravity-browser-profile)."',
        pl: 'label:"Ścieżka profilu przeglądarki",description:"Własna ścieżka katalogu profilu przeglądarki. Pozostaw puste dla domyślnej (~/.gemini/antigravity-browser-profile)."',
    },
    // --- CDP Port ---
    {
        en: 'label:"Browser CDP Port",description:"Port number for Chrome DevTools Protocol remote debugging. Leave empty for default (9222)."',
        pl: 'label:"Port CDP przeglądarki",description:"Numer portu zdalnego debugowania Chrome DevTools Protocol. Pozostaw puste dla domyślnego (9222)."',
    },
    // --- Models / AI Credits ---
    { en: 'label:"Enable AI Credit Overages"', pl: 'label:"Zezwól na przekroczenie limitu kredytów AI"' },
    // --- Editor: Selection Actions ---
    {
        en: `label:"Show Selection Actions",description:'Show "Edit" and "Chat" buttons when selecting text in the editor.'`,
        pl: `label:"Pokaż akcje zaznaczenia",description:'Pokazuj przyciski „Edytuj" i „Czatuj" po zaznaczeniu tekstu w edytorze.'`,
    },
    // --- Telemetry ---
    { en: 'label:"Enable Telemetry"', pl: 'label:"Włącz telemetrię"' },
    // --- Disabled tooltips ---
    { en: 'This option is disabled while strict mode is enabled.', pl: 'Ta opcja jest wyłączona, gdy tryb ścisły jest aktywny.' },
    { en: 'This option is disabled by your organization.', pl: 'Ta opcja została wyłączona przez Twoją organizację.' },
    // --- Allow/Deny List ---
    {
        en: 'label:"Allow List Terminal Commands",description:"Agent auto-executes commands matched by an allow list entry. For Unix shells, an allow list entry matches a command if its space-separated tokens form a prefix of the command\'s tokens. For PowerShell, the entry tokens may match any contiguous subsequence of the command tokens."',
        pl: 'label:"Lista dozwolonych poleceń terminala",description:"Agent automatycznie wykonuje polecenia pasujące do wpisu z listy dozwolonych. W powłokach Unix wpis odpowiada poleceniu, gdy jego tokeny tworzą prefiks tokenów polecenia. W PowerShell tokeny wpisu mogą pasować do dowolnego ciągłego podciągu tokenów polecenia."',
    },
    {
        en: 'label:"Deny List Terminal Commands",description:"Agent asks for permission before executing commands matched by a deny list entry. The deny list follows the same matching rules as the allow list and takes precedence over the allow list."',
        pl: 'label:"Lista zablokowanych poleceń terminala",description:"Agent prosi o pozwolenie przed wykonaniem poleceń pasujących do wpisu z listy zablokowanych. Lista zablokowanych stosuje te same reguły dopasowania co lista dozwolonych i ma nad nią pierwszeństwo."',
    },
    // --- Browser URL Allowlist ---
    {
        en: 'label:"Browser URL Allowlist",description:"Control which URLs the browser can access. Add domains or full URLs to the allowlist."',
        pl: 'label:"Dozwolone adresy URL przeglądarki",description:"Kontroluj, do których adresów URL przeglądarka ma dostęp. Dodaj domeny lub pełne adresy URL do listy dozwolonych."',
    },
    // --- Shell Integration ---
    {
        en: "label:\"Enable Shell Integration\",description:\"When enabled, Agent will use IDE's shell integration to detect and report terminal command execution. When disabled, the agent will use it's own shell. Restart the application for this to take effect.\"",
        pl: 'label:"Włącz integrację powłoki",description:"Po włączeniu agent korzysta z integracji powłoki IDE do wykrywania i raportowania wykonywania poleceń terminala. Po wyłączeniu agent używa własnej powłoki. Wymaga restartu aplikacji."',
    },
    // --- Marketing Emails ---
    { en: 'label:"Marketing Emails"', pl: 'label:"E-maile marketingowe"' },
    {
        en: 'Receive product updates, tips, and promotions from Google',
        pl: 'Otrzymuj informacje o aktualizacjach, wskazówki i promocje od Google',
    },
    // --- Telemetry opis ---
    {
        en: 'collects usage data to help Google enhance performance and features.',
        pl: 'zbiera dane użytkowania, aby pomóc Google ulepszać wydajność i funkcje.',
    },
    { en: 'When toggled on, ', pl: 'Po włączeniu' },
    // --- Your Plan ---
    { en: '"Your Plan: "', pl: '"Twój plan: "' },
    // --- AI Credits opis ---
    {
        en: 'will use your AI credits to fulfill model requests once you\'re out of model quota.',
        pl: 'użyje Twoich kredytów AI do realizacji żądań modelu po przekroczeniu limitu.',
    },
    {
        en: 'will always use your model quota first before using AI credits.',
        pl: 'zawsze wykorzysta limit modelu przed użyciem kredytów AI.',
    },
    // --- Models info ---
    {
        en: 'View your available model quota and AI credits. Model quota refreshes periodically based on your plan. Enable AI Credit Overages to continue using models when your quota is exhausted.',
        pl: 'Sprawdź dostępny limit modelu i kredyty AI. Limit modelu odświeża się okresowo zgodnie z Twoim planem. Włącz przekroczenie limitu kredytów AI, aby kontynuować korzystanie z modeli po wyczerpaniu limitu.',
    },
    {
        en: 'View your available model quota. Quota refreshes periodically based on your plan.',
        pl: 'Sprawdź dostępny limit modelu. Limit odświeża się okresowo zgodnie z Twoim planem.',
    },
    {
        en: 'AI Credits are used when you\'ve exceeded your model quota. Keep track of your current AI Credits in the',
        pl: 'Kredyty AI są używane po przekroczeniu limitu modelu. Śledź swoje kredyty AI na',
    },
    // --- Terms of Service ---
    { en: '"By using this app, you agree to its"', pl: '"Korzystając z tej aplikacji, zgadzasz się na"' },
];
// =====================================================================
//  F. AGENT MANAGER — Welcome, sidebar, onboarding
// =====================================================================
exports.agentManagerTranslations = [
    { en: 'children:"Welcome to the Agent Manager"', pl: 'children:"Witaj w Menedżerze Agentów"' },
    {
        en: "In the agent manager, start agents on tasks like deep research, long-running projects, or background tasks. You can monitor the progress of multiple agents in the Inbox and review their work when they're done.",
        pl: "W Menedżerze Agentów możesz zlecać agentom zadania: dogłębne badania, długoterminowe projekty lub zadania w tle. Postęp wielu agentów śledzisz w Skrzynce odbiorczej i przeglądasz ich pracę po zakończeniu.",
    },
    {
        en: 'Create multiple agents to tackle different tasks in an agent-first UX.',
        pl: 'Twórz wielu agentów do realizacji różnych zadań w interfejsie zorientowanym na agentów.',
    },
    // --- Sidebar text:"..." ---
    { en: 'text:"New Conversation"', pl: 'text:"Nowa rozmowa"' },
    { en: 'text:"Conversation History"', pl: 'text:"Historia rozmów"' },
    { en: 'text:"Command Center"', pl: 'text:"Centrum poleceń"' },
    { en: 'text:"Knowledge"', pl: 'text:"Baza wiedzy"' },
    { en: 'text:"Settings"', pl: 'text:"Ustawienia"' },
    { en: 'text:"Provide Feedback"', pl: 'text:"Prześlij opinię"' },
    { en: 'text:"Toggle Sidebar"', pl: 'text:"Przełącz panel boczny"' },
    { en: 'text:"Open editor"', pl: 'text:"Otwórz edytor"' },
    { en: 'text:"Artifact"', pl: 'text:"Artefakt"' },
    { en: 'text:"Browser"', pl: 'text:"Przeglądarka"' },
    { en: 'text:"Review"', pl: 'text:"Przegląd"' },
    { en: 'text:"Skills"', pl: 'text:"Umiejętności"' },
    { en: 'text:"Custom agent"', pl: 'text:"Własny agent"' },
    // --- Tooltips ---
    { en: 'tooltipText:"Conversation History"', pl: 'tooltipText:"Historia rozmów"' },
    { en: 'tooltipText:"Command Center"', pl: 'tooltipText:"Centrum poleceń"' },
    { en: 'tooltipText:"Settings"', pl: 'tooltipText:"Ustawienia"' },
    { en: 'tooltipText:"New Conversation"', pl: 'tooltipText:"Nowa rozmowa"' },
    { en: 'tooltipText:"Delete"', pl: 'tooltipText:"Usuń"' },
    { en: 'tooltipText:"Split"', pl: 'tooltipText:"Podziel"' },
];
// =====================================================================
//  G. CHAT PLACEHOLDER + INPUT
// =====================================================================
exports.chatTranslations = [
    { en: '"Ask anything, @ to mention, / for workflows"', pl: '"Zapytaj o cokolwiek, @ aby wspomnieć, / dla przepływów pracy"' },
    { en: '"Add a message..."', pl: '"Dodaj wiadomość..."' },
    { en: '"Add a comment to be queued after the next action"', pl: '"Dodaj komentarz do kolejki po następnej akcji"' },
    { en: '"Add an optional message, \\u23CE to submit comments"', pl: '"Dodaj opcjonalną wiadomość, \\u23CE aby wysłać komentarze"' },
];
// =====================================================================
//  H. PLACEHOLDERS
// =====================================================================
exports.placeholderTranslations = [
    { en: 'placeholder:"Search"', pl: 'placeholder:"Szukaj"' },
    { en: 'placeholder:"Find"', pl: 'placeholder:"Znajdź"' },
    { en: 'placeholder:"Find in page..."', pl: 'placeholder:"Znajdź na stronie..."' },
    { en: 'placeholder:"Filter topics..."', pl: 'placeholder:"Filtruj tematy..."' },
    { en: 'placeholder:"Filter log lines..."', pl: 'placeholder:"Filtruj logi..."' },
    { en: 'placeholder:"Type to search..."', pl: 'placeholder:"Wpisz, aby szukać..."' },
    { en: 'placeholder:"Search by name"', pl: 'placeholder:"Szukaj po nazwie"' },
    { en: 'placeholder:"Search skills\\u2026"', pl: 'placeholder:"Szukaj umiejętności\\u2026"' },
    { en: 'placeholder:"Search metrics..."', pl: 'placeholder:"Szukaj metryk..."' },
    { en: 'placeholder:"Select a conversation"', pl: 'placeholder:"Wybierz rozmowę"' },
    { en: 'placeholder:"Open window..."', pl: 'placeholder:"Otwórz okno..."' },
    { en: 'placeholder:"Enter directory path..."', pl: 'placeholder:"Podaj ścieżkę katalogu..."' },
    { en: 'placeholder:"Paste auth code"', pl: 'placeholder:"Wklej kod autoryzacji"' },
    { en: 'placeholder:"Describe the issue with this response..."', pl: 'placeholder:"Opisz problem z tą odpowiedzią..."' },
    { en: 'placeholder:"Please list the steps to reproduce the issue"', pl: 'placeholder:"Podaj kroki do odtworzenia problemu"' },
    { en: 'placeholder:"Absolute path to the Chrome/Chromium executable"', pl: 'placeholder:"Pełna ścieżka do pliku Chrome/Chromium"' },
    { en: 'placeholder:"Add recent remote workspace"', pl: 'placeholder:"Dodaj ostatni zdalny obszar roboczy"' },
    { en: 'placeholder:"Select workspace to delete all conversations..."', pl: 'placeholder:"Wybierz obszar roboczy, aby usunąć wszystkie rozmowy..."' },
    { en: 'placeholder:"Search by name or Cascade ID..."', pl: 'placeholder:"Szukaj po nazwie lub ID kaskady..."' },
];
// =====================================================================
//  I. ONBOARDING / WIZARD
// =====================================================================
exports.onboardingTranslations = [
    { en: 'children:"Choose your theme"', pl: 'children:"Wybierz motyw"' },
    { en: 'children:"Choose an option with \\u2190\\u2192 or by clicking a theme."', pl: 'children:"Wybierz opcję strzałkami \\u2190\\u2192 lub klikając motyw."' },
    { en: 'children:"Configure Your Editor"', pl: 'children:"Skonfiguruj swój edytor"' },
    { en: 'children:"Configure your editor settings below."', pl: 'children:"Skonfiguruj poniżej ustawienia edytora."' },
    { en: 'children:"Configure your keybindings."', pl: 'children:"Skonfiguruj skróty klawiszowe."' },
    { en: 'children:"Configure"', pl: 'children:"Konfiguruj"' },
    { en: 'children:"Before you begin"', pl: 'children:"Zanim zaczniesz"' },
    { en: 'children:"Setting Up Your Account"', pl: 'children:"Konfiguracja konta"' },
    { en: 'children:"Setup"', pl: 'children:"Konfiguracja"' },
    { en: 'children:"Select one of the options below."', pl: 'children:"Wybierz jedną z poniższych opcji."' },
    { en: 'children:"Select an option..."', pl: 'children:"Wybierz opcję..."' },
    {
        en: '"Choose your preferred terminal and review policies."',
        pl: '"Wybierz preferowany terminal i zasady przeglądu."',
    },
    {
        en: '"Set up your workspace in the Agent Manager."',
        pl: '"Skonfiguruj swój obszar roboczy w Menedżerze Agentów."',
    },
    {
        en: '"Select a model to send message"',
        pl: '"Wybierz model, aby wysłać wiadomość"',
    },
    {
        en: '"Select a model using the model selector in the input box"',
        pl: '"Wybierz model za pomocą selektora modelu w polu wprowadzania"',
    },
];
// =====================================================================
//  J. CHILDREN — DUŻE (dłuższe napisy, dialogi, statusy, feedback)
// =====================================================================
exports.childrenLongTranslations = [
    // --- Agent Manager ---
    { en: 'children:"Agent Manager"', pl: 'children:"Menedżer Agentów"' },
    { en: 'children:"Agent Script Command Configuration"', pl: 'children:"Konfiguracja poleceń skryptu agenta"' },
    { en: 'children:"Agent State Debug"', pl: 'children:"Debugowanie stanu agenta"' },
    { en: 'children:"AI Credits Used to Generate Response"', pl: 'children:"Kredyty AI użyte do wygenerowania odpowiedzi"' },
    // --- Artifacts ---
    { en: 'children:"Artifact Comments"', pl: 'children:"Komentarze artefaktu"' },
    { en: 'children:"Artifact Name"', pl: 'children:"Nazwa artefaktu"' },
    { en: 'children:"Open an artifact from the left pane to view its content here."', pl: 'children:"Otwórz artefakt z lewego panelu, aby wyświetlić jego zawartość tutaj."' },
    { en: 'children:"Select text in the artifact to add a comment"', pl: 'children:"Zaznacz tekst w artefakcie, aby dodać komentarz"' },
    { en: 'children:"No artifacts generated."', pl: 'children:"Nie wygenerowano artefaktów."' },
    { en: 'children:"Convert to Google Doc"', pl: 'children:"Konwertuj na Dokument Google"' },
    { en: 'dialogTitle:"Export Artifact"', pl: 'dialogTitle:"Eksportuj artefakt"' },
    // --- Browser ---
    { en: 'children:"Antigravity would like to use the browser."', pl: 'children:"Antigravity chce otworzyć przeglądarkę."' },
    { en: 'children:"Launching the browser..."', pl: 'children:"Uruchamianie przeglądarki..."' },
    { en: 'children:"No browser pages open"', pl: 'children:"Brak otwartych stron przeglądarki"' },
    { en: 'children:"Loading Browser recording..."', pl: 'children:"Ładowanie nagrania przeglądarki..."' },
    { en: 'children:"Error loading Browser recording"', pl: 'children:"Błąd ładowania nagrania przeglądarki"' },
    { en: 'children:"Error rendering playback"', pl: 'children:"Błąd odtwarzania nagrania"' },
    { en: 'children:"Rendering playback"', pl: 'children:"Renderowanie odtwarzania"' },
    { en: 'children:"Playback available"', pl: 'children:"Odtwarzanie dostępne"' },
    { en: 'children:"Open System Browser"', pl: 'children:"Otwórz przeglądarkę systemową"' },
    { en: 'children:"Execute Javascript policy"', pl: 'children:"Polityka wykonywania JavaScript"' },
    { en: 'children:"JavaScript execution policy"', pl: 'children:"Polityka wykonywania JavaScript"' },
    { en: 'children:"Terminal execution policy"', pl: 'children:"Polityka wykonywania terminala"' },
    { en: 'children:"JavaScript Result"', pl: 'children:"Wynik JavaScript"' },
    { en: 'children:"No Javascript Result Output"', pl: 'children:"Brak wyniku JavaScript"' },
    { en: 'children:"Denied Sites"', pl: 'children:"Zablokowane strony"' },
    { en: 'children:"Open allowlist"', pl: 'children:"Otwórz listę dozwolonych"' },
    // --- Conversations ---
    { en: 'children:"Chat History"', pl: 'children:"Historia czatu"' },
    { en: 'children:"No chats yet"', pl: 'children:"Brak rozmów"' },
    { en: 'children:"No workspaces yet"', pl: 'children:"Brak obszarów roboczych"' },
    { en: 'children:"Conversation mode"', pl: 'children:"Tryb rozmowy"' },
    { en: 'children:"Conversation"', pl: 'children:"Rozmowa"' },
    { en: 'children:"Delete Conversation"', pl: 'children:"Usuń rozmowę"' },
    { en: 'children:"Failed to load conversation"', pl: 'children:"Nie udało się załadować rozmowy"' },
    { en: 'children:"Loading conversation..."', pl: 'children:"Ładowanie rozmowy..."' },
    // --- Errors ---
    { en: 'children:"An error was thrown."', pl: 'children:"Wystąpił błąd."' },
    { en: 'children:"Something went wrong!"', pl: 'children:"Coś poszło nie tak!"' },
    { en: 'children:"Something went wrong"', pl: 'children:"Coś poszło nie tak"' },
    { en: 'children:"Error"', pl: 'children:"Błąd"' },
    { en: 'children:"Error Details"', pl: 'children:"Szczegóły błędu"' },
    { en: 'children:"Error Details:"', pl: 'children:"Szczegóły błędu:"' },
    { en: 'children:"Not Found"', pl: 'children:"Nie znaleziono"' },
    // --- Feedback ---
    { en: 'children:"Provide Feedback"', pl: 'children:"Prześlij opinię"' },
    { en: 'children:"Send Feedback"', pl: 'children:"Wyślij opinię"' },
    { en: 'children:"Feedback"', pl: 'children:"Opinia"' },
    { en: 'children:"Feedback Type"', pl: 'children:"Typ opinii"' },
    { en: 'children:"Good response"', pl: 'children:"Dobra odpowiedź"' },
    { en: 'children:"Bad response"', pl: 'children:"Zła odpowiedź"' },
    { en: 'children:"What went wrong?"', pl: 'children:"Co poszło nie tak?"' },
    { en: 'children:"Steps to Reproduce"', pl: 'children:"Kroki do odtworzenia"' },
    { en: 'children:"Steps to reproduce the issue"', pl: 'children:"Kroki do odtworzenia problemu"' },
    { en: 'children:"Expected behavior"', pl: 'children:"Oczekiwane zachowanie"' },
    { en: 'children:"Actual behavior"', pl: 'children:"Rzeczywiste zachowanie"' },
    { en: 'children:"Attach a screenshot (optional)"', pl: 'children:"Dołącz zrzut ekranu (opcjonalnie)"' },
    { en: 'children:"Screenshot must be under 10 MB"', pl: 'children:"Zrzut ekranu musi mieć mniej niż 10 MB"' },
    { en: 'children:"Attaching logs requires an email address"', pl: 'children:"Dołączenie logów wymaga adresu e-mail"' },
    { en: 'children:"Thanks for your feedback!"', pl: 'children:"Dziękujemy za opinię!"' },
    { en: 'children:"Having trouble? Let us know"', pl: 'children:"Masz problem? Daj nam znać"' },
    { en: 'children:"Any error messages seen when trying to log in"', pl: 'children:"Komunikaty błędów podczas logowania"' },
    { en: 'children:"Any error messages"', pl: 'children:"Komunikaty błędów"' },
    { en: 'children:"Any relevant information"', pl: 'children:"Wszelkie istotne informacje"' },
    { en: 'children:"How this feature would help you and other users"', pl: 'children:"Jak ta funkcja pomogłaby Tobie i innym użytkownikom"' },
    { en: 'children:"What is missing in your workflow"', pl: 'children:"Czego brakuje w Twoim przepływie pracy"' },
    { en: 'children:"What quota or feature is being incorrectly limited"', pl: 'children:"Który limit lub funkcja jest niepoprawnie ograniczona"' },
    { en: 'children:"Attach the trajectory ID to the feedback form"', pl: 'children:"Dołącz ID trajektorii do formularza opinii"' },
    { en: 'children:"To provide feedback"', pl: 'children:"Aby przesłać opinię"' },
    // --- Files ---
    { en: 'children:"Files Modified"', pl: 'children:"Zmienione pliki"' },
    { en: 'children:"File Comments"', pl: 'children:"Komentarze pliku"' },
    { en: 'children:"File Diff Comments"', pl: 'children:"Komentarze różnic pliku"' },
    { en: 'children:"File no longer exists"', pl: 'children:"Plik już nie istnieje"' },
    { en: 'children:"No file changes"', pl: 'children:"Brak zmian w plikach"' },
    // --- Knowledge ---
    { en: 'children:"Knowledge Generation"', pl: 'children:"Generowanie wiedzy"' },
    { en: 'children:"Knowledge feature is not available."', pl: 'children:"Funkcja bazy wiedzy jest niedostępna."' },
    { en: 'children:"Loading knowledge items..."', pl: 'children:"Ładowanie elementów wiedzy..."' },
    { en: 'children:"The agent has not generated any knowledge items yet."', pl: 'children:"Agent nie wygenerował jeszcze żadnych elementów wiedzy."' },
    // --- MCP ---
    { en: 'children:"MCP Servers Disabled"', pl: 'children:"Serwery MCP wyłączone"' },
    { en: 'children:"MCP Error"', pl: 'children:"Błąd MCP"' },
    { en: 'children:"No MCP Servers"', pl: 'children:"Brak serwerów MCP"' },
    { en: 'children:"Loading MCP servers..."', pl: 'children:"Ładowanie serwerów MCP..."' },
    { en: 'children:"Open MCP Config"', pl: 'children:"Otwórz konfigurację MCP"' },
    { en: 'children:"Search for MCP servers to add to your configuration"', pl: 'children:"Szukaj serwerów MCP do dodania do konfiguracji"' },
    { en: 'children:"Rejected MCP tool"', pl: 'children:"Odrzucone narzędzie MCP"' },
    // --- Models ---
    { en: 'children:"No models available"', pl: 'children:"Brak dostępnych modeli"' },
    { en: 'children:"Loading models..."', pl: 'children:"Ładowanie modeli..."' },
    { en: 'children:"Get More AI Credits"', pl: 'children:"Kup więcej kredytów AI"' },
    { en: 'children:"Models Tab"', pl: 'children:"Karta Modele AI"' },
    { en: 'children:"Add Model"', pl: 'children:"Dodaj model"' },
    { en: '?"Add Custom Model":"Edit Custom Model"', pl: '?"Dodaj własny model":"Edytuj własny model"' },
    { en: 'children:"Edit Model"', pl: 'children:"Edytuj model"' },
    { en: 'children:"Model"', pl: 'children:"Model AI"' },
    { en: 'children:"Unable to determine quota"', pl: 'children:"Nie można określić limitu"' },
    // --- Skills ---
    { en: 'children:"Skills"', pl: 'children:"Umiejętności"' },
    { en: 'children:"No skills loaded."', pl: 'children:"Brak załadowanych umiejętności."' },
    { en: 'children:"Loading skills..."', pl: 'children:"Ładowanie umiejętności..."' },
    { en: 'children:"Scanning skills config file..."', pl: 'children:"Skanowanie pliku konfiguracji umiejętności..."' },
    { en: 'children:"Refresh skills"', pl: 'children:"Odśwież umiejętności"' },
    { en: 'children:"This skill is installed in your workspace"', pl: 'children:"Ta umiejętność jest zainstalowana w Twoim obszarze roboczym"' },
    { en: 'children:"Skills are instructions that extend what Agent can do."', pl: 'children:"Umiejętności to instrukcje rozszerzające możliwości agenta."' },
    // --- Customizations ---
    { en: 'children:"No Custom Agents or Plugins"', pl: 'children:"Brak własnych agentów i wtyczek"' },
    { en: 'children:"No customizations found for this workspace."', pl: 'children:"Nie znaleziono personalizacji dla tego obszaru roboczego."' },
    { en: 'children:"Loading custom agents..."', pl: 'children:"Ładowanie własnych agentów..."' },
    { en: 'children:"View customizations"', pl: 'children:"Pokaż personalizacje"' },
    { en: 'children:"Customization token usage"', pl: 'children:"Użycie tokenów personalizacji"' },
    // --- Notifications ---
    { en: 'children:"Notification Settings"', pl: 'children:"Ustawienia powiadomień"' },
    // --- Images ---
    { en: 'children:"Failed to load image"', pl: 'children:"Nie udało się załadować obrazu"' },
    { en: 'children:"Image rendering blocked (strict mode enabled)"', pl: 'children:"Renderowanie obrazu zablokowane (tryb ścisły włączony)"' },
    { en: 'children:"Image Diff Not Supported"', pl: 'children:"Porównanie obrazów nie jest obsługiwane"' },
    { en: 'children:"Images"', pl: 'children:"Obrazy"' },
    // --- Status ---
    { en: 'children:"Blocked"', pl: 'children:"Zablokowano"' },
    { en: 'children:"Analyzed"', pl: 'children:"Przeanalizowano"' },
    { en: 'children:"Skipped"', pl: 'children:"Pominięto"' },
    { en: 'children:"Disabled"', pl: 'children:"Wyłączone"' },
    { en: 'children:"Disabled in strict mode"', pl: 'children:"Wyłączone w trybie ścisłym"' },
    { en: 'children:"Installed"', pl: 'children:"Zainstalowano"' },
    { en: 'children:"Copied"', pl: 'children:"Skopiowano"' },
    // --- Actions/Views ---
    { en: 'children:"Open Editor"', pl: 'children:"Otwórz edytor"' },
    { en: 'children:"Open Editor Settings"', pl: 'children:"Otwórz ustawienia edytora"' },
    { en: 'children:"Editor Settings"', pl: 'children:"Ustawienia edytora"' },
    { en: 'children:"Editor Window"', pl: 'children:"Okno edytora"' },
    { en: 'children:"Editor"', pl: 'children:"Edytor"' },
    { en: 'children:"Open Diff"', pl: 'children:"Otwórz różnice"' },
    { en: 'children:"View Diff"', pl: 'children:"Pokaż różnice"' },
    { en: 'children:"Open Setup Window"', pl: 'children:"Otwórz okno konfiguracji"' },
    { en: 'children:"Open System Preferences"', pl: 'children:"Otwórz preferencje systemowe"' },
    { en: 'children:"Open URL"', pl: 'children:"Otwórz adres URL"' },
    { en: 'children:"Open local folder"', pl: 'children:"Otwórz folder lokalny"' },
    { en: 'children:"Open remote folder"', pl: 'children:"Otwórz folder zdalny"' },
    { en: 'children:"Close Folder"', pl: 'children:"Zamknij folder"' },
    { en: 'children:"Connect to Remote Workspace"', pl: 'children:"Połącz ze zdalnym obszarem roboczym"' },
    { en: 'children:"Recent Remote Workspaces"', pl: 'children:"Ostatnie zdalne obszary robocze"' },
    { en: 'children:"Workspace"', pl: 'children:"Obszar roboczy"' },
    { en: 'children:"Open extracted DOM in editor"', pl: 'children:"Otwórz wyodrębniony DOM w edytorze"' },
    // --- Review ---
    { en: 'children:"Review Changes"', pl: 'children:"Przejrzyj zmiany"' },
    { en: 'children:"Review policy"', pl: 'children:"Zasady przeglądu"' },
    { en: 'children:"Review"', pl: 'children:"Przegląd"' },
    { en: 'children:"Confirm Undo"', pl: 'children:"Potwierdź cofnięcie"' },
    { en: 'children:"Confirmation required to execute this step"', pl: 'children:"Potwierdzenie wymagane do wykonania tego kroku"' },
    { en: 'children:"Accept all"', pl: 'children:"Zaakceptuj wszystko"' },
    { en: 'children:"Reject all"', pl: 'children:"Odrzuć wszystko"' },
    { en: 'children:"Allow Once"', pl: 'children:"Zezwól raz"' },
    { en: 'children:"Allow This Conversation"', pl: 'children:"Zezwól w tej rozmowie"' },
    { en: 'children:"Add them to allow future interactions"', pl: 'children:"Dodaj, aby zezwolić na przyszłe interakcje"' },
    { en: 'children:"The associated worktree will also be deleted."', pl: 'children:"Powiązane drzewo robocze również zostanie usunięte."' },
    { en: 'children:"The agent was prevented from accessing some sites"', pl: 'children:"Agentowi zablokowano dostęp do niektórych stron"' },
    { en: 'children:"The agent will frequently ask for review."', pl: 'children:"Agent będzie często pytać o przegląd."' },
    { en: 'children:"The agent will never request for review."', pl: 'children:"Agent nigdy nie poprosi o przegląd."' },
    { en: 'children:"The agent will wait for you to install the browser extension."', pl: 'children:"Agent poczeka na zainstalowanie rozszerzenia przeglądarki."' },
    // --- Misc children ---
    { en: 'children:"Advanced settings"', pl: 'children:"Ustawienia zaawansowane"' },
    { en: 'children:"Debug Mode"', pl: 'children:"Tryb debugowania"' },
    { en: 'children:"Python Coming Soon"', pl: 'children:"Python — wkrótce"' },
    { en: 'children:"Python Script"', pl: 'children:"Skrypt Python"' },
    { en: 'children:"FAQ"', pl: 'children:"Najczęściej zadawane pytania"' },
    { en: 'children:"Features"', pl: 'children:"Funkcje"' },
    { en: 'children:"Extensions"', pl: 'children:"Rozszerzenia"' },
    { en: 'children:"Keybindings"', pl: 'children:"Skróty klawiszowe"' },
    { en: 'children:"Environment"', pl: 'children:"Środowisko"' },
    { en: 'children:"History"', pl: 'children:"Historia"' },
    { en: 'children:"Sources"', pl: 'children:"Źródła"' },
    { en: 'children:"Details"', pl: 'children:"Szczegóły"' },
    { en: 'children:"Input"', pl: 'children:"Dane wejściowe"' },
    { en: 'children:"Output"', pl: 'children:"Dane wyjściowe"' },
    { en: 'children:"Description"', pl: 'children:"Opis"' },
    { en: 'children:"Comment"', pl: 'children:"Komentarz"' },
    { en: 'children:"Comments"', pl: 'children:"Komentarze"' },
    { en: 'children:"Custom"', pl: 'children:"Własne"' },
    { en: 'children:"Filter"', pl: 'children:"Filtruj"' },
    { en: 'children:"Prompt"', pl: 'children:"Polecenie"' },
    { en: 'children:"Goal"', pl: 'children:"Cel"' },
    { en: 'children:"Value"', pl: 'children:"Wartość"' },
    { en: 'children:"Command"', pl: 'children:"Polecenie"' },
    { en: 'children:"Preview"', pl: 'children:"Podgląd"' },
    { en: 'children:"Preview unavailable"', pl: 'children:"Podgląd niedostępny"' },
    { en: 'children:"New"', pl: 'children:"Nowy"' },
    { en: 'children:"Open"', pl: 'children:"Otwórz"' },
    { en: 'children:"View"', pl: 'children:"Widok"' },
    { en: 'children:"Rename"', pl: 'children:"Zmień nazwę"' },
    { en: 'children:"Expand"', pl: 'children:"Rozwiń"' },
    { en: 'children:"Install"', pl: 'children:"Zainstaluj"' },
    { en: 'children:"Launch"', pl: 'children:"Uruchom"' },
    { en: 'children:"Create"', pl: 'children:"Utwórz"' },
    { en: 'children:"Clear"', pl: 'children:"Wyczyść"' },
    { en: 'children:"Proceed"', pl: 'children:"Kontynuuj"' },
    { en: ',"Continue")', pl: ',"Kontynuuj")' },
    { en: 'children:"Decline"', pl: 'children:"Odrzuć"' },
    { en: 'children:"Deny"', pl: 'children:"Odmów"' },
    { en: 'children:"Collapse All"', pl: 'children:"Zwiń wszystko"' },
    { en: 'children:"Expand All"', pl: 'children:"Rozwiń wszystko"' },
    { en: 'children:"Previous"', pl: 'children:"Poprzedni"' },
    { en: 'children:"Show more"', pl: 'children:"Pokaż więcej"' },
    { en: 'children:"Show items analyzed"', pl: 'children:"Pokaż przeanalizowane elementy"' },
    { en: 'children:"Learn more."', pl: 'children:"Dowiedz się więcej."' },
    { en: 'children:"Learn more"', pl: 'children:"Dowiedz się więcej"' },
    { en: 'children:"Click here to learn more"', pl: 'children:"Kliknij tutaj, aby dowiedzieć się więcej"' },
    { en: 'children:"View documentation"', pl: 'children:"Pokaż dokumentację"' },
    { en: 'children:"View plans"', pl: 'children:"Pokaż plany"' },
    { en: 'children:"View Page"', pl: 'children:"Pokaż stronę"' },
    { en: 'children:"View MCP settings"', pl: 'children:"Pokaż ustawienia MCP"' },
    { en: 'children:"View network request"', pl: 'children:"Pokaż żądanie sieciowe"' },
    { en: 'children:"View network requests"', pl: 'children:"Pokaż żądania sieciowe"' },
    { en: 'children:"See Activity"', pl: 'children:"Pokaż aktywność"' },
    { en: 'children:"Viewing Subagent"', pl: 'children:"Podgląd podagenta"' },
    { en: 'children:"Visible only"', pl: 'children:"Tylko widoczne"' },
    { en: 'children:"Google Privacy Policy"', pl: 'children:"Polityka prywatności Google"' },
    { en: 'children:"Terms of Service"', pl: 'children:"Warunki korzystania z usługi"' },
    { en: 'children:"Suggested Actions"', pl: 'children:"Sugerowane akcje"' },
    { en: 'children:"Recent actions"', pl: 'children:"Ostatnie akcje"' },
    { en: 'children:"Drop to add to Agent"', pl: 'children:"Upuść, aby dodać do agenta"' },
    { en: 'children:"Pending messages"', pl: 'children:"Oczekujące wiadomości"' },
    { en: 'children:"Reload Window"', pl: 'children:"Przeładuj okno"' },
    { en: 'children:"Process Details"', pl: 'children:"Szczegóły procesu"' },
    { en: 'children:"Thought Process"', pl: 'children:"Proces myślowy"' },
    { en: 'children:"Tool Calls"', pl: 'children:"Wywołania narzędzi"' },
    { en: 'children:"Page contents"', pl: 'children:"Zawartość strony"' },
    { en: 'children:"Bytes"', pl: 'children:"Bajty"' },
    { en: 'children:"Submitting..."', pl: 'children:"Wysyłanie..."' },
    { en: 'children:"RECOMMENDED"', pl: 'children:"ZALECANE"' },
    { en: 'children:"Loading..."', pl: 'children:"Ładowanie..."' },
    { en: 'children:"Copy command"', pl: 'children:"Kopiuj polecenie"' },
    { en: 'children:"Copy the trajectory ID"', pl: 'children:"Kopiuj ID trajektorii"' },
    { en: 'children:"No matching results"', pl: 'children:"Brak pasujących wyników"' },
    { en: 'children:"No results found"', pl: 'children:"Nie znaleziono wyników"' },
    { en: 'children:"No items found"', pl: 'children:"Nie znaleziono elementów"' },
    { en: '"aria-label":"Add context"', pl: '"aria-label":"Dodaj kontekst"' },
    { en: 'submitLabel:s="Add Comment"', pl: 'submitLabel:s="Dodaj komentarz"' },
    { en: 'children:"Multi-conversation view is not available"', pl: 'children:"Widok wielu rozmów jest niedostępny"' },
    { en: 'children:"No agent changes to display"', pl: 'children:"Brak zmian agenta do wyświetlenia"' },
    { en: 'children:"There was an unexpected issue setting up your account."', pl: 'children:"Wystąpił nieoczekiwany problem podczas konfiguracji konta."' },
    { en: 'children:"Sign in with a different account"', pl: 'children:"Zaloguj się innym kontem"' },
    { en: 'children:"Sign into Google"', pl: 'children:"Zaloguj się do Google"' },
    { en: 'children:"Use a GCP project instead"', pl: 'children:"Użyj projektu GCP"' },
    { en: 'children:"Enter your Google Cloud project ID"', pl: 'children:"Podaj ID projektu Google Cloud"' },
    { en: 'children:"Document Answers"', pl: 'children:"Odpowiedzi z dokumentów"' },
    { en: 'children:"Image Answers"', pl: 'children:"Odpowiedzi z obrazów"' },
    { en: 'children:"System Message"', pl: 'children:"Wiadomość systemowa"' },
    { en: '"aria-label":"Confirm Browser Interaction"', pl: '"aria-label":"Potwierdź interakcję z przeglądarką"' },
    { en: 'label:"Confirm Window Reload"', pl: 'label:"Potwierdź przeładowanie okna"' },
    { en: 'children:"Focus Editor"', pl: 'children:"Skup na edytorze"' },
    { en: 'children:"Forward"', pl: 'children:"Dalej"' },
    { en: 'children:"Hide Editor"', pl: 'children:"Ukryj edytor"' },
    { en: 'children:"Command Line"', pl: 'children:"Wiersz poleceń"' },
];
// =====================================================================
//  K. CHILDREN — KRÓTKIE (przyciski, etykiety)
// =====================================================================
exports.childrenShortTranslations = [
    { en: 'children:"Next"', pl: 'children:"Dalej"' },
    { en: 'children:"Back"', pl: 'children:"Wstecz"' },
    { en: 'children:"Delete"', pl: 'children:"Usuń"' },
    { en: 'children:"Cancel"', pl: 'children:"Anuluj"' },
    { en: 'children:"Save"', pl: 'children:"Zapisz"' },
    { en: 'children:"Submit"', pl: 'children:"Wyślij"' },
    { en: 'children:"Send"', pl: 'children:"Wyślij"' },
    { en: 'children:"Close"', pl: 'children:"Zamknij"' },
    { en: 'children:"Skip"', pl: 'children:"Pomiń"' },
    { en: 'children:"Retry"', pl: 'children:"Ponów"' },
    { en: 'children:"Edit"', pl: 'children:"Edytuj"' },
    { en: 'children:"Accept"', pl: 'children:"Akceptuj"' },
    { en: 'children:"Reject"', pl: 'children:"Odrzuć"' },
    { en: 'children:"Dismiss"', pl: 'children:"Zamknij"' },
    { en: 'children:"Add"', pl: 'children:"Dodaj"' },
    { en: 'children:"Refresh"', pl: 'children:"Odśwież"' },
    { en: 'children:"Email"', pl: 'children:"E-mail"' },
    { en: 'children:"Sign out"', pl: 'children:"Wyloguj się"' },
    { en: 'children:"Sign in"', pl: 'children:"Zaloguj się"' },
    { en: 'children:"Not signed in"', pl: 'children:"Nie zalogowano"' },
    { en: 'children:"Thinking"', pl: 'children:"Myślenie"' },
    { en: 'children:"Cancel step"', pl: 'children:"Anuluj krok"' },
    { en: 'children:"Cancel command"', pl: 'children:"Anuluj polecenie"' },
    { en: 'children:"Continue"', pl: 'children:"Kontynuuj"' },
    { en: 'children:"Add context"', pl: 'children:"Dodaj kontekst"' },
    { en: 'children:"Add Comment"', pl: 'children:"Dodaj komentarz"' },
    { en: 'children:"Confirm Browser Interaction"', pl: 'children:"Potwierdź interakcję z przeglądarką"' },
    { en: 'children:"Confirm Window Reload"', pl: 'children:"Potwierdź przeładowanie okna"' },
];
// =====================================================================
//  L. QUOTED STRINGS — dialogi, komunikaty, akcje
// =====================================================================
exports.quotedStringsTranslations = [
    { en: '"Blocked on Your Input"', pl: '"Czeka na Twoją odpowiedź"' },
    { en: '"Feedback Type"', pl: '"Typ opinii"' },
    { en: 'label:"Send feedback as "', pl: 'label:"Wyślij opinię jako "' },
    { en: '"Attach Antigravity server logs"', pl: '"Dołącz logi serwera Antigravity"' },
    { en: '"Start new conversation"', pl: '"Rozpocznij nową rozmowę"' },
    { en: '"Delete Conversation"', pl: '"Usuń rozmowę"' },
    { en: '"Copy conversation markdown"', pl: '"Kopiuj rozmowę jako Markdown"' },
    { en: '"Copy debug info"', pl: '"Kopiuj info diagnostyczne"' },
    { en: '"Mark as Read"', pl: '"Oznacz jako przeczytane"' },
    { en: '"Mark as Unread"', pl: '"Oznacz jako nieprzeczytane"' },
    { en: '"Other Conversations"', pl: '"Inne rozmowy"' },
    { en: '"Open Folder"', pl: '"Otwórz folder"' },
    { en: '"Open Workspace"', pl: '"Otwórz obszar roboczy"' },
    { en: '"Open Settings"', pl: '"Otwórz ustawienia"' },
    { en: '"Open Command Palette"', pl: '"Otwórz paletę poleceń"' },
    { en: '"Open Conversation History"', pl: '"Otwórz historię rozmów"' },
    { en: '"New Editor Window"', pl: '"Nowe okno edytora"' },
    { en: '"New Editor"', pl: '"Nowy edytor"' },
    { en: '"Toggle Sidebar"', pl: '"Przełącz panel boczny"' },
    { en: '"Toggle Terminal"', pl: '"Przełącz terminal"' },
    { en: '"Toggle Fullscreen"', pl: '"Przełącz pełny ekran"' },
    { en: '"Toggle Planning Mode"', pl: '"Przełącz tryb planowania"' },
    { en: '"Toggle Model Selector"', pl: '"Przełącz wybór modelu"' },
    { en: '"Toggle Editor"', pl: '"Przełącz edytor"' },
    { en: '"Focus Editor"', pl: '"Skup na edytorze"' },
    { en: '"Focus Input"', pl: '"Skup na polu wejściowym"' },
    { en: '"Find in Pane"', pl: '"Znajdź w panelu"' },
    { en: '"Zoom In"', pl: '"Powiększ"' },
    { en: '"Zoom Out"', pl: '"Pomniejsz"' },
    { en: '"Reset Zoom"', pl: '"Resetuj powiększenie"' },
    { en: '"Select All"', pl: '"Zaznacz wszystko"' },
    { en: '"Select Model"', pl: '"Wybierz model"' },
    { en: '"Select another model"', pl: '"Wybierz inny model"' },
    { en: '"No Model Selected"', pl: '"Nie wybrano modelu"' },
    { en: '"Split Terminal"', pl: '"Podziel terminal"' },
    { en: '"MCP Servers"', pl: '"Serwery MCP"' },
    { en: '"Skills and Customizations"', pl: '"Umiejętności i personalizacja"' },
    { en: '"Start Voice Recording"', pl: '"Rozpocznij nagrywanie głosu"' },
    { en: '"Stop Voice Recording"', pl: '"Zatrzymaj nagrywanie głosu"' },
    { en: '"Getting scripts..."', pl: '"Pobieranie skryptów..."' },
    { en: '"Open in Editor"', pl: '"Otwórz w edytorze"' },
    { en: '"New Conversation in Workspace"', pl: '"Nowa rozmowa w obszarze roboczym"' },
    { en: '"Refresh quota and credits data"', pl: '"Odśwież dane limitów i kredytów"' },
    { en: '"No models available"', pl: '"Brak dostępnych modeli"' },
    { en: '"Upgrade"', pl: '"Uaktualnij"' },
    { en: '||"Upgrade"', pl: '||"Uaktualnij"' },
    // --- Actions ---
    { en: '"Copy to clipboard"', pl: '"Kopiuj do schowka"' },
    { en: '"Copy File Name"', pl: '"Kopiuj nazwę pliku"' },
    { en: '"Copy File Path"', pl: '"Kopiuj ścieżkę pliku"' },
    { en: '"Copy"', pl: '"Kopiuj"' },
    { en: '"Add to allowlist"', pl: '"Dodaj do listy dozwolonych"' },
    { en: '"Added to allowlist"', pl: '"Dodano do listy dozwolonych"' },
    { en: '"Stop recording"', pl: '"Zatrzymaj nagrywanie"' },
    { en: '"Export Artifact"', pl: '"Eksportuj artefakt"' },
    { en: '"Export"', pl: '"Eksportuj"' },
    { en: '"Import"', pl: '"Importuj"' },
    { en: '"Install Update"', pl: '"Zainstaluj aktualizację"' },
    { en: '"Show Sidebar"', pl: '"Pokaż panel boczny"' },
    { en: '"Hide Sidebar"', pl: '"Ukryj panel boczny"' },
    { en: '"Show Details"', pl: '"Pokaż szczegóły"' },
    { en: '"Hide Details"', pl: '"Ukryj szczegóły"' },
    { en: '"Show Error"', pl: '"Pokaż błąd"' },
    { en: '"Hide Error"', pl: '"Ukryj błąd"' },
    { en: '"Show JavaScript Result"', pl: '"Pokaż wynik JavaScript"' },
    { en: '"Show Selection Actions"', pl: '"Pokaż akcje zaznaczenia"' },
    { en: '"Undo changes up to this point"', pl: '"Cofnij zmiany do tego punktu"' },
    { en: '"Undo"', pl: '"Cofnij"' },
    { en: '"Redo"', pl: '"Ponów"' },
    { en: '"Pause"', pl: '"Pauza"' },
    { en: '"Resume"', pl: '"Wznów"' },
    { en: '"Stop"', pl: '"Zatrzymaj"' },
    { en: '"Remove"', pl: '"Usuń"' },
    { en: '"Remove audio"', pl: '"Usuń audio"' },
    { en: '"Reset"', pl: '"Resetuj"' },
    { en: '"Enable"', pl: '"Włącz"' },
    { en: '"Enabled"', pl: '"Włączone"' },
    { en: '"Disabled"', pl: '"Wyłączone"' },
    { en: '"Install"', pl: '"Zainstaluj"' },
    { en: '"Installed"', pl: '"Zainstalowano"' },
    { en: '"Approved"', pl: '"Zatwierdzono"' },
    { en: '"Hide"', pl: '"Ukryj"' },
    { en: '"Show"', pl: '"Pokaż"' },
    { en: '"View"', pl: '"Widok"' },
    { en: '"Find"', pl: '"Znajdź"' },
    // --- Statusy ---
    { en: '"Thinking"', pl: '"Myślenie"' },
    { en: '"Generating"', pl: '"Generowanie"' },
    { en: '"Loading"', pl: '"Ładowanie"' },
    { en: '"Loading..."', pl: '"Ładowanie..."' },
    { en: '"No results"', pl: '"Brak wyników"' },
    { en: '"Try again"', pl: '"Spróbuj ponownie"' },
    { en: '"Searching"', pl: '"Wyszukiwanie"' },
    { en: '"Processing"', pl: '"Przetwarzanie"' },
    { en: '"Initializing"', pl: '"Inicjalizacja"' },
    { en: '"Downloading Update"', pl: '"Pobieranie aktualizacji"' },
    { en: '"Installing Update"', pl: '"Instalowanie aktualizacji"' },
    { en: '"Installing..."', pl: '"Instalowanie..."' },
    { en: '"Completed"', pl: '"Ukończono"' },
    { en: '"Running"', pl: '"Uruchomiono"' },
    { en: '"Pending"', pl: '"Oczekujące"' },
    { en: '"Warning"', pl: '"Ostrzeżenie"' },
    { en: '"Error occurred"', pl: '"Wystąpił błąd"' },
    { en: '"No internet. Agent features may not work."', pl: '"Brak internetu. Funkcje agenta mogą nie działać."' },
    { en: '"Connecting to language server..."', pl: '"Łączenie z serwerem językowym..."' },
    { en: '"Updating\\u2026"', pl: '"Aktualizowanie\\u2026"' },
    { en: '"Checking"', pl: '"Sprawdzanie"' },
    { en: '"Confirm"', pl: '"Potwierdź"' },
    { en: '"Run MCP tool call?"', pl: '"Uruchomić narzędzie MCP?"' },
    { en: '"Confirm MCP arguments:"', pl: '"Potwierdź argumenty MCP:"' },
    { en: '"Read URL content?"', pl: '"Odczytać zawartość URL?"' },
    { en: '"Are you sure you want to delete this conversation? This action cannot be undone."', pl: '"Czy na pewno chcesz usunąć tę rozmowę? Tej operacji nie można cofnąć."' },
    { en: '"Confirming this undo action will make the following changes:"', pl: '"Potwierdzenie cofnięcia wprowadzi następujące zmiany:"' },
    // --- Misc ---
    { en: '"Select Agent"', pl: '"Wybierz agenta"' },
    { en: '"Checking command status"', pl: '"Sprawdzanie statusu polecenia"' },
    { en: '"Checking inbox"', pl: '"Sprawdzanie skrzynki odbiorczej"' },
    { en: '"Enable Overages"', pl: '"Włącz przekroczenia"' },
    { en: '"Enable Recording"', pl: '"Włącz nagrywanie"' },
    { en: '"Enable Demo Mode (Beta)"', pl: '"Włącz tryb demo (Beta)"' },
    { en: '"Add MCP Servers"', pl: '"Dodaj serwery MCP"' },
    { en: '"Running Low"', pl: '"Niski poziom"' },
    { en: '"Match case (Aa)"', pl: '"Uwzględnij wielkość liter (Aa)"' },
    { en: '"Match whole word (ab)"', pl: '"Dopasuj całe słowo (ab)"' },
    { en: '"Use regular expression (.*)"', pl: '"Użyj wyrażenia regularnego (.*)"' },
    { en: '"Next match (Enter)"', pl: '"Następne dopasowanie (Enter)"' },
    { en: '"Previous match (Shift+Enter)"', pl: '"Poprzednie dopasowanie (Shift+Enter)"' },
    { en: '"Close (Escape)"', pl: '"Zamknij (Escape)"' },
    { en: '`Sign in to enable ${$0i.name} features.`', pl: '`Zaloguj się, aby włączyć funkcje ${$0i.name}.`' },
    { en: '"Select workspace to send message"', pl: '"Wybierz obszar roboczy, aby wysłać wiadomość"' },
    { en: '"Select workspace"', pl: '"Wybierz obszar roboczy"' },
    { en: '"Show suggestions when typing in the editor"', pl: '"Pokazuj sugestie podczas pisania w edytorze"' },
    { en: '"Select option"', pl: '"Wybierz opcję"' },
];
// =====================================================================
//  M. LABEL — pozostałe
// =====================================================================
exports.labelTranslations = [
    { en: 'label:"New Conversation"', pl: 'label:"Nowa rozmowa"' },
    { en: 'label:"Local",description:"Run in your current workspace"', pl: 'label:"Lokalnie",description:"Uruchom w bieżącym obszarze roboczym"' },
    { en: 'label:"Worktree",description:"Run in a new worktree"', pl: 'label:"Drzewo robocze",description:"Uruchom w nowym drzewie roboczym"' },
];
// =====================================================================
//  EKSPORT: WSZYSTKIE TŁUMACZENIA W PRAWDZIWEJ KOLEJNOŚCI
// =====================================================================
// =====================================================================
// NOWE TŁUMACZENIA Z PODANEJ LISTY
// =====================================================================
exports.additionalUpdateTranslations = [
    // --- Korekty dynamicznych stringów w ustawieniach (template literals ${...}) ---
    { en: 'label:"Marketplace Item URL"', pl: 'label:"Adres URL elementu marketplace"' },
    { en: 'label:"Marketplace Gallery URL"', pl: 'label:"Adres URL galerii marketplace"' },
    {
        en: 'Changes the base URL on each extension page\\. You must restart (\\$\\{[^}]+\\}) to use the new marketplace after changing this value\\.',
        pl: 'Zmienia bazowy adres URL na każdej stronie rozszerzeń. Po zmianie tej wartości musisz ponownie uruchomić $1, aby używać nowego marketplace.',
        mode: 'regex',
    },
    {
        en: 'Changes the base URL for marketplace search results\\. You must restart (\\$\\{[^}]+\\}) to use the new marketplace after changing this value\\.',
        pl: 'Zmienia bazowy adres URL wyników wyszukiwania marketplace. Po zmianie tej wartości musisz ponownie uruchomić $1, aby używać nowego marketplace.',
        mode: 'regex',
    },
    {
        en: 'In addition to the custom skills folder, (\\$\\{[^}]+\\}) will search the following paths in order to find skills for the agent\\.',
        pl: 'Oprócz folderu niestandardowych umiejętności $1 będzie przeszukiwać poniższe ścieżki, aby znaleźć umiejętności dla agenta.',
        mode: 'regex',
    },
    {
        en: 'For google3 workspaces, paths are relative to //depot and begins with google3/',
        pl: 'Dla obszarów roboczych google3 ścieżki są względne względem //depot i zaczynają się od google3/',
    },
    {
        en: 'label:"Always Allow",description:"Actions the agent may always perform without asking."',
        pl: 'label:"Zawsze zezwalaj",description:"Działania, które agent może zawsze wykonywać bez pytania."',
    },
    {
        en: 'label:"Always Deny",description:"Actions the agent may never perform."',
        pl: 'label:"Zawsze blokuj",description:"Działania, których agent nigdy nie może wykonać."',
    },
    {
        en: 'label:"Always Ask",description:"Actions the agent must always ask before performing."',
        pl: 'label:"Zawsze pytaj",description:"Działania, o które agent zawsze musi zapytać przed wykonaniem."',
    },
    { en: 'label:"Always Allow",onClick:()=>e()', pl: 'label:"Zawsze zezwalaj",onClick:()=>e()' },
    { en: 'label:"Allow Once",onClick:()=>r()', pl: 'label:"Zezwól raz",onClick:()=>r()' },
    { en: 'label:"Deny",onClick:()=>t()', pl: 'label:"Odrzuć",onClick:()=>t()' },
    { en: 'label:"Allow List Terminal Commands"', pl: 'label:"Lista dozwolonych poleceń terminala"' },
    {
        en: 'description:"Agent auto-executes commands matched by an allow list entry."',
        pl: 'description:"Agent automatycznie wykonuje polecenia dopasowane do wpisu z listy dozwolonych."',
    },
    { en: 'label:"Deny List Terminal Commands"', pl: 'label:"Lista blokowanych poleceń terminala"' },
    {
        en: 'description:"Agent asks for permission before executing commands matched by a deny list entry."',
        pl: 'description:"Agent prosi o uprawnienie przed wykonaniem poleceń dopasowanych do wpisu z listy blokowanych."',
    },
    // --- MCP / Personalizacja: brakujące etykiety i opisy ---
    { en: 'children:[S?"Refreshing...":"Refresh",', pl: 'children:[S?"Odświeżanie...":"Odśwież",' },
    { en: 'children:"Refresh"', pl: 'children:"Odśwież"' },
    { en: 'children:"Refreshing..."', pl: 'children:"Odświeżanie..."' },
    { en: 'children:[v(St,{name:"add",className:"w-3 h-3"}),"Add"]', pl: 'children:[v(St,{name:"add",className:"w-3 h-3"}),"Dodaj"]' },
    { en: 'children:u?v(qt,{children:[v(St,{name:"progress_activity",className:"w-3 h-3 animate-spin"}),"Installing..."]}):"Install"', pl: 'children:u?v(qt,{children:[v(St,{name:"progress_activity",className:"w-3 h-3 animate-spin"}),"Instalowanie..."]}):"Zainstaluj"' },
    { en: 'children:r===a.id?v("button",{className:"flex items-center gap-1 px-2 py-1 text-xs bg-blue-500/50 text-white rounded cursor-not-allowed",disabled:!0,children:[v(St,{name:"progress_activity",className:"w-3 h-3 animate-spin"}),"Installing"]})', pl: 'children:r===a.id?v("button",{className:"flex items-center gap-1 px-2 py-1 text-xs bg-blue-500/50 text-white rounded cursor-not-allowed",disabled:!0,children:[v(St,{name:"progress_activity",className:"w-3 h-3 animate-spin"}),"Instalowanie"]})' },
    { en: 'children:[v(St,{name:"open_in_new",className:"w-3 h-3"}),"Authenticate"]', pl: 'children:[v(St,{name:"open_in_new",className:"w-3 h-3"}),"Uwierzytelnij"]' },
    { en: 'window.confirm("Sign out of this server?")', pl: 'window.confirm("Wylogować się z tego serwera?")' },
    {
        en: 'children:["You currently don\\\'t have any MCP Servers installed.",p.openConfigFile?" Add an MCP server below or add a custom one via the MCP Config.":" Add an MCP server below."]',
        pl: 'children:["Obecnie nie masz zainstalowanych serwerów MCP.",p.openConfigFile?" Dodaj serwer MCP poniżej albo dodaj własny przez konfigurację MCP.":" Dodaj serwer MCP poniżej."]',
    },
    { en: 'No MCP servers found for "', pl: 'Nie znaleziono serwerów MCP dla "' },
    { en: `children:['No MCP servers found for "',T,'"']`, pl: `children:['Nie znaleziono serwerów MCP dla "',T,'"']` },
    { en: 'children:"Search for MCP servers to add to your configuration"', pl: 'children:"Wyszukaj serwery MCP do dodania do konfiguracji"' },
    { en: 'title:"MCP Configuration Error:"', pl: 'title:"Błąd konfiguracji MCP:"' },
    { en: 'placeholder:"Search by name"', pl: 'placeholder:"Szukaj po nazwie"' },
    { en: 'children:"Open MCP Config"', pl: 'children:"Otwórz konfigurację MCP"' },
    { en: 'children:"No MCP Servers"', pl: 'children:"Brak serwerów MCP"' },
    // --- Konto ---
    { en: 'children:["Your Plan: ",a]', pl: 'children:["Twój plan: ",a]' },
    { en: 'children:["By using this app, you agree to its"," ",v("a",{href:"https://antigravity.google/terms",className:"text-blue-500 hover:underline",target:"_blank",rel:"noreferrer",children:"Terms of Service"})]', pl: 'children:["Korzystając z tej aplikacji, zgadzasz się na"," ",v("a",{href:"https://antigravity.google/terms",className:"text-blue-500 hover:underline",target:"_blank",rel:"noreferrer",children:"Warunki korzystania z usługi"})]' },
    // --- Krótkie etykiety EN wciąż widoczne w UI/diagnostyce ---
    { en: '"Always Allow"', pl: '"Zawsze zezwalaj"' },
    { en: '"Terms of Service"', pl: '"Warunki korzystania z usługi"' },
    { en: 'When toggled on, Antigravity collects usage data to help Google enhance performance and features.', pl: 'Po włączeniu Antigravity zbiera dane użycia, aby pomóc Google poprawiać wydajność i funkcje.' },
    { en: 'Marketing Emails', pl: 'E-maile marketingowe' },
    { en: 'Receive product updates, tips, and promotions from Google Antigravity via email.', pl: 'Otrzymuj przez e-mail aktualizacje produktu, wskazówki i promocje od Google Antigravity.' },
    { en: 'Your Plan: Google AI Pro', pl: 'Twój plan: Google AI Pro' },
    { en: 'You can upgrade to the Google AI Ultra plan to receive the highest rate limits.', pl: 'Możesz przejść na plan Google AI Ultra, aby uzyskać najwyższe limity.' },
    { en: 'GCP Project ID for enterprise features.', pl: 'Identyfikator projektu GCP dla funkcji korporacyjnych.' },
    { en: 'Enable Demo Mode (Beta)', pl: 'Włącz tryb demonstracyjny (Beta)' },
    { en: 'When enabled, your UI will be slightly modified to ensure more consistent demos. This is only recommended for demo purposes. In most cases, you can run \\"Antigravity: Start Demo Mode\\" and \\"Antigravity: Stop Demo Mode\\" to control this switch and update your ~/.gemini/antigravity data directory.', pl: 'Po włączeniu interfejs zostanie nieznacznie zmieniony, aby prezentacje były bardziej spójne. To ustawienie zaleca się wyłącznie do pokazów. Zwykle możesz użyć poleceń \\"Antigravity: Start Demo Mode\\" i \\"Antigravity: Stop Demo Mode\\", aby sterować tym przełącznikiem i zaktualizować katalog ~/.gemini/antigravity.' },
    { en: 'Control which URLs the browser can access. Add domains or full URLs to the allowlist.', pl: 'Kontroluj, do których adresów URL przeglądarka ma dostęp. Dodaj domeny lub pełne adresy URL do listy dozwolonych.' },
    { en: 'Notification Settings', pl: 'Ustawienia powiadomień' },
    { en: `To modify notification settings, open your operating system's system preferences.`, pl: 'Aby zmienić ustawienia powiadomień, otwórz preferencje systemowe swojego systemu operacyjnego.' },
    { en: `When toggled on, Antigravity will use your AI credits to fulfill model requests once you're out of model quota. Antigravity will always use your model quota first before using AI credits.`, pl: 'Po włączeniu Antigravity użyje kredytów AI do realizacji żądań modelu po wyczerpaniu limitu modelu. Antigravity zawsze najpierw wykorzysta limit modelu, a dopiero później kredyty AI.' },
    { en: 'View your available model quota and AI credits. Model quota refreshes periodically based on your plan. Enable AI Credit Overages to continue using models when your quota is exhausted.', pl: 'Sprawdź dostępny limit modelu i kredyty AI. Limit modelu odświeża się okresowo zgodnie z Twoim planem. Włącz przekroczenia kredytów AI, aby dalej korzystać z modeli po wyczerpaniu limitu.' },
    { en: 'Skill Custom Paths', pl: 'Niestandardowe ścieżki umiejętności' },
    { en: 'In addition to the custom skills folder, Antigravity will search the following paths in order to find skills for the agent.', pl: 'Oprócz folderu niestandardowych umiejętności Antigravity będzie przeszukiwać poniższe ścieżki, aby znaleźć umiejętności dla agenta.' },
    { en: 'Add MCP Servers', pl: 'Dodaj serwery MCP' },
    { en: 'Cloud Run', pl: 'Cloud Run' },
    { en: 'Enable Antigravity to deploy apps to Google Cloud Run.', pl: 'Zezwól Antigravity na wdrażanie aplikacji do Google Cloud Run.' },
    { en: 'Google Kubernetes Engine (OSS)', pl: 'Google Kubernetes Engine (OSS)' },
    { en: 'Enable Antigravity to interact with Google Kubernetes Engine (GKE).', pl: 'Zezwól Antigravity na pracę z Google Kubernetes Engine (GKE).' },
    { en: 'The Dart and Flutter MCP server exposes Dart (and Flutter) development tool actions to compatible AI-assistant clients.', pl: 'Serwer MCP dla Dart i Flutter udostępnia działania narzędzi programistycznych Dart (i Flutter) kompatybilnym klientom asystentów AI.' },
    { en: `The Firebase Model Context Protocol (MCP) Server gives AI-powered development tools the ability to work with your Firebase projects and your app's codebase.`, pl: 'Serwer Firebase Model Context Protocol (MCP) daje narzędziom programistycznym opartym o AI możliwość pracy z projektami Firebase i kodem Twojej aplikacji.' },
    { en: 'The Genkit Model Context Protocol (MCP) Server gives AI-powered development tools the ability to build, debug and inspect your Genkit app.', pl: 'Serwer Genkit Model Context Protocol (MCP) pozwala narzędziom programistycznym opartym o AI budować, diagnozować i analizować aplikację Genkit.' },
    { en: 'Interact with your BigQuery data using natural language. This MCP server allows you to securely connect to your datasets to search the datasets, inspect table metadata, execute SQL queries, generate time-series forecasts, and perform contribution analysis directly from your AI tools.', pl: 'Pracuj z danymi BigQuery przy użyciu języka naturalnego. Ten serwer MCP umożliwia bezpieczne łączenie z zestawami danych, ich przeszukiwanie, analizę metadanych tabel, wykonywanie zapytań SQL, tworzenie prognoz szeregów czasowych i analizę wkładu bezpośrednio z narzędzi AI.' },
    { en: 'When enabled, Antigravity will use the clipboard as context for completions. May increase exposure to security exploits based on unintentional contents in clipboard.', pl: 'Po włączeniu Antigravity będzie używać schowka jako kontekstu dla uzupełnień. Może to zwiększyć ryzyko ataków wynikających z niezamierzonej zawartości schowka.' },
    { en: 'Changes the base URL on each extension page. You must restart Antigravity to use the new marketplace after changing this value.', pl: 'Zmienia bazowy adres URL na każdej stronie rozszerzeń. Po zmianie tej wartości musisz ponownie uruchomić Antigravity, aby używać nowego marketplace.' },
    { en: 'Changes the base URL for marketplace search results. You must restart Antigravity to use the new marketplace after changing this value.', pl: 'Zmienia bazowy adres URL wyników wyszukiwania marketplace. Po zmianie tej wartości musisz ponownie uruchomić Antigravity, aby używać nowego marketplace.' },
    { en: 'Show \\"Edit\\" and \\"Chat\\" buttons when selecting text in the editor.', pl: 'Pokazuj przyciski \\"Edytuj\\" i \\"Czat\\" podczas zaznaczania tekstu w edytorze.' },
    { en: 'To modify editor settings, open Settings within the editor window.', pl: 'Aby zmienić ustawienia edytora, otwórz Ustawienia w oknie edytora.' },
    { en: 'Use the editor when you want to write code or focus on one task alongside one agent.', pl: 'Używaj edytora, gdy chcesz pisać kod lub skupić się na jednym zadaniu razem z jednym agentem.' },
    { en: 'Provide Feedback', pl: 'Prześlij opinię' },
    { en: '"Settings"', pl: '"Ustawienia"' },
    { en: '"Knowledge"', pl: '"Wiedza"' },
];
exports.diagnosticsTranslations = [
    { en: '"A new workspace will be created for you when you start a conversation"', pl: '"Po rozpoczęciu rozmowy zostanie utworzony nowy obszar roboczy."' },
    { en: '"Agent B"', pl: '"Agent B"' },
    { en: '"Agent C"', pl: '"Agent C"' },
    { en: '"Alt text:"', pl: '"Tekst alternatywny:"' },
    { en: '"An error ID that helps the team investigate the error."', pl: '"Identyfikator błędu, który pomaga zespołowi zbadać problem."' },
    { en: '"Arguments Schema:"', pl: '"Schemat argumentów:"' },
    { en: '"Artifacts are created when the agent performs more complex, longer running tasks while in Planning mode."', pl: '"Artefakty są tworzone, gdy agent wykonuje bardziej złożone, długotrwałe zadania w trybie planowania."' },
    { en: '"Browser allowlist begins with localhost and can be updated through the settings page."', pl: '"Lista dozwolonych adresów przeglądarki zaczyna się od localhost i może być aktualizowana na stronie ustawień."' },
    { en: '"Cleared Count"', pl: '"Liczba wyczyszczonych"' },
    { en: '"Count"', pl: '"Liczba"' },
    { en: '"Created:"', pl: '"Utworzono:"' },
    { en: '"Custom models are only supported on Cloudtop / Linux machines."', pl: '"Modele niestandardowe są obsługiwane tylko na maszynach Cloudtop / Linux."' },
    { en: '"Customizations feature is currently only available for the desktop app."', pl: '"Funkcja personalizacji jest obecnie dostępna tylko w aplikacji desktopowej."' },
    { en: '"Debug Sidebar"', pl: '"Panel boczny diagnostyki"' },
    { en: '"Defined subagent"', pl: '"Zdefiniowany podagent"' },
    { en: '"Description:"', pl: '"Opis:"' },
    { en: '"Dev Mode"', pl: '"Tryb deweloperski"' },
    { en: '"Enter the required configuration values to install this MCP server."', pl: '"Wprowadź wymagane wartości konfiguracji, aby zainstalować ten serwer MCP."' },
    { en: '"Failed to move changes"', pl: '"Nie udało się przenieść zmian"' },
    { en: '"Fetched network request for page."', pl: '"Pobrano żądanie sieciowe dla strony."' },
    { en: '"Fetched network requests for page."', pl: '"Pobrano żądania sieciowe dla strony."' },
    { en: '"Files to edit:"', pl: '"Pliki do edycji:"' },
    { en: '"Found references to"', pl: '"Znaleziono odwołania do"' },
    { en: '"Full Metadata"', pl: '"Pełne metadane"' },
    { en: '"Full output written to"', pl: '"Pełny wynik zapisano do"' },
    { en: '"Hide 0s"', pl: '"Ukryj zera"' },
    { en: '"Image URL:"', pl: '"Adres URL obrazu:"' },
    { en: '"Inspected commit"', pl: '"Przeanalizowano commit"' },
    { en: '"Last Updated"', pl: '"Ostatnia aktualizacja"' },
    { en: '"License:"', pl: '"Licencja:"' },
    { en: '"List resources:"', pl: '"Lista zasobów:"' },
    { en: '"Loading metrics..."', pl: '"Ładowanie metryk..."' },
    { en: '"LS Output Debug View"', pl: '"Widok diagnostyczny danych wyjściowych LS"' },
    { en: '"Max Tokens"', pl: '"Maksymalna liczba tokenów"' },
    { en: '"MCP Tool: "', pl: '"Narzędzie MCP: "' },
    { en: '"Metadata:"', pl: '"Metadane:"' },
    { en: '"Metric"', pl: '"Metryka"' },
    { en: '"Mouse button pressed"', pl: '"Naciśnięto przycisk myszy"' },
    { en: '"Mouse button released"', pl: '"Zwolniono przycisk myszy"' },
    { en: '"No cascade ID provided"', pl: '"Nie podano ID kaskady"' },
    { en: '"No chat model metadata available for this generator"', pl: '"Brak metadanych modelu czatu dla tego generatora"' },
    { en: '"No chat model metadata available in latest generator metadata"', pl: '"Brak metadanych modelu czatu w najnowszych metadanych generatora"' },
    { en: '"No content available for this resource"', pl: '"Brak dostępnej zawartości dla tego zasobu"' },
    { en: '"No generator metadata available"', pl: '"Brak dostępnych metadanych generatora"' },
    { en: '"No message prompts available"', pl: '"Brak dostępnych poleceń wiadomości"' },
    { en: '"No resources available"', pl: '"Brak dostępnych zasobów"' },
    { en: '"No subagents"', pl: '"Brak podagentów"' },
    { en: '"No token data available."', pl: '"Brak dostępnych danych tokenów."' },
    { en: '"No tracked components"', pl: '"Brak śledzonych komponentów"' },
    { en: '"Open SSH connection in setup window. When finished, you will be able to select the workspace in the sidebar."', pl: '"Otwórz połączenie SSH w oknie konfiguracji. Po zakończeniu będzie można wybrać obszar roboczy w panelu bocznym."' },
    { en: '"Proceeded with"', pl: '"Kontynuowano z"' },
    { en: '"Read resource:"', pl: '"Odczytaj zasób:"' },
    { en: '"Read URL rejected"', pl: '"Odrzucono odczyt adresu URL"' },
    { en: '"Rendered Step:"', pl: '"Wyrenderowany krok:"' },
    { en: '"Rerender Effects"', pl: '"Efekty ponownego renderowania"' },
    { en: '"Rerenders Per Second"', pl: '"Ponowne renderowania na sekundę"' },
    { en: '"Saves to your global ~/.gemini/antigravity/agents/ directory. This script will be available across all your workspaces."', pl: '"Zapisuje do globalnego katalogu ~/.gemini/antigravity/agents/. Ten skrypt będzie dostępny we wszystkich obszarach roboczych."' },
    { en: '"Searched\\xA0"', pl: '"Wyszukano\\xA0"' },
    { en: '"Sherlog Links"', pl: '"Łącza Sherlog"' },
    { en: '"Show 0s"', pl: '"Pokaż zera"' },
    { en: '"Some non-image binary content was truncated."', pl: '"Część binarnej zawartości innej niż obraz została skrócona."' },
    { en: '"Source:"', pl: '"Źródło:"' },
    { en: '"Step JSON:"', pl: '"Krok JSON:"' },
    { en: '"Step Type"', pl: '"Typ kroku"' },
    { en: '"Step:"', pl: '"Krok:"' },
    { en: '"Tasks can be done either in your agent manager or in an AI-powered editor."', pl: '"Zadania można wykonywać w menedżerze agentów albo w edytorze wspieranym przez AI."' },
    { en: '"The Agent attempted to interact with some sites that are not allowlisted"', pl: '"Agent próbował wejść na strony, które nie znajdują się na liście dozwolonych."' },
    { en: '"The agent manager is a new window allowing you to manage and create agents across workspaces."', pl: '"Menedżer agentów to nowe okno, które umożliwia zarządzanie i tworzenie agentów w wielu obszarach roboczych."' },
    { en: '"The editor is an AI-powered IDE with code suggestions, a context-aware agent side panel, and more."', pl: '"Edytor to środowisko IDE wspierane przez AI z podpowiedziami kodu, panelem bocznym agenta zależnym od kontekstu i dodatkowymi funkcjami."' },
    { en: '"Tool:"', pl: '"Narzędzie:"' },
    { en: '"Trajectory Debug View"', pl: '"Widok diagnostyki trajektorii"' },
    { en: '"Trajectory ID"', pl: '"ID trajektorii"' },
    { en: '"Trajectory Stats"', pl: '"Statystyki trajektorii"' },
    { en: '"Transpilation Error:"', pl: '"Błąd transpilacji:"' },
    { en: '"Transpiling React app..."', pl: '"Transpilacja aplikacji React..."' },
    { en: '"Unknown edit"', pl: '"Nieznana edycja"' },
    { en: '"Unknown file edit"', pl: '"Nieznana edycja pliku"' },
    { en: '"View could not be opened"', pl: '"Nie można było otworzyć widoku"' },
    { en: '"We recommend attaching logs. Attaching logs will help the Antigravity team act on and prioritize your feedback."', pl: '"Zalecamy dołączanie logów. Logi pomogą zespołowi Antigravity szybciej reagować i nadawać priorytet Twojej opinii."' },
    { en: '"What functionality you expect your account tier to have available that is missing"', pl: '"Jakiej brakującej funkcji oczekujesz w ramach swojego poziomu konta"' },
    { en: '"What you would like to see to address this gap in your workflow"', pl: '"Co chcesz zobaczyć, aby uzupełnić tę lukę w swoim przepływie pracy"' },
    { en: '"When debug mode is on, you can see additional information about each steps in the conversation."', pl: '"Po włączeniu trybu diagnostycznego zobaczysz dodatkowe informacje o każdym kroku rozmowy."' },
    { en: '"When exploring an untrusted workspace with the agent, we recommend enabling strict mode via the settings window."', pl: '"Podczas pracy z agentem w niezaufanym obszarze roboczym zalecamy włączenie trybu ścisłego w oknie ustawień."' },
    { en: '"You currently don\\\'t have any MCP Servers installed. Add a MCP tool below or add a custom one via the MCP Config."', pl: '"Obecnie nie masz zainstalowanych serwerów MCP. Dodaj poniżej narzędzie MCP albo dodaj własne przez konfigurację MCP."' },
    { en: '"Your administrator has disabled MCP servers for this workspace."', pl: '"Administrator wyłączył serwery MCP dla tego obszaru roboczego."' },
];
exports.coverageGapTranslations = [
    { en: '"aria-label":"Add pending comment"', pl: '"aria-label":"Dodaj oczekujący komentarz"' },
    { en: '"aria-label":"Clear agent script"', pl: '"aria-label":"Wyczyść skrypt agenta"' },
    { en: '"aria-label":"Close search"', pl: '"aria-label":"Zamknij wyszukiwanie"' },
    { en: '"aria-label":"Delete command"', pl: '"aria-label":"Usuń polecenie"' },
    { en: '"aria-label":"Deny setting up browser"', pl: '"aria-label":"Odrzuć konfigurację przeglądarki"' },
    { en: '"aria-label":"Dismiss error"', pl: '"aria-label":"Zamknij błąd"' },
    { en: '"aria-label":"Dismiss suggested actions"', pl: '"aria-label":"Zamknij sugerowane akcje"' },
    { en: '"aria-label":"Loading knowledge items"', pl: '"aria-label":"Ładowanie elementów wiedzy"' },
    { en: '"aria-label":"Message input"', pl: '"aria-label":"Pole wprowadzania wiadomości"' },
    { en: '"aria-label":"Open Browser Setup"', pl: '"aria-label":"Otwórz konfigurację przeglądarki"' },
    { en: '"aria-label":"Options"', pl: '"aria-label":"Opcje"' },
    { en: '"aria-label":"Refresh custom agents"', pl: '"aria-label":"Odśwież własnych agentów"' },
    { en: '"aria-label":"Send message"', pl: '"aria-label":"Wyślij wiadomość"' },
    { en: 'children:"Actionable"', pl: 'children:"Wymaga działania"' },
    { en: 'children:"Agent A"', pl: 'children:"Agent A"' },
    { en: 'children:"Agent Decides"', pl: 'children:"Agent decyduje"' },
    { en: 'children:"Always Proceed"', pl: 'children:"Zawsze kontynuuj"' },
    { en: 'children:"Approve"', pl: 'children:"Zatwierdź"' },
    { en: 'children:"Auto-run Unsupported"', pl: 'children:"Automatyczne uruchamianie nieobsługiwane"' },
    { en: 'children:"Base URL:"', pl: 'children:"Bazowy adres URL:"' },
    { en: 'children:"Battle mode is not available"', pl: 'children:"Tryb pojedynku jest niedostępny"' },
    { en: 'children:"Battle"', pl: 'children:"Pojedynek"' },
    { en: 'children:"BYOM/Custom Override:"', pl: 'children:"BYOM/Własne nadpisanie:"' },
    { en: 'children:"Cache:"', pl: 'children:"Pamięć podręczna:"' },
    { en: 'children:"Chat Model Metadata"', pl: 'children:"Metadane modelu czatu"' },
    { en: 'children:"Chat Model Name:"', pl: 'children:"Nazwa modelu czatu:"' },
    { en: 'children:"Create multiple agents to tackle different tasks in an agent-first UX."', pl: 'children:"Twórz wielu agentów do realizacji różnych zadań w interfejsie zorientowanym na agentów."' },
    { en: 'children:"Input:"', pl: 'children:"Wejście:"' },
    { en: 'children:"Keyboard Shortcuts"', pl: 'children:"Skróty klawiszowe"' },
    { en: 'children:"List resources: "', pl: 'children:"Lista zasobów: "' },
    { en: 'children:"Model Label"', pl: 'children:"Etykieta modelu"' },
    { en: 'children:"Model Name:"', pl: 'children:"Nazwa modelu:"' },
    { en: 'children:"Model URL"', pl: 'children:"Adres URL modelu"' },
    { en: 'children:"Model:"', pl: 'children:"Model AI:"' },
    { en: 'children:"Modified files:"', pl: 'children:"Zmienione pliki:"' },
    { en: 'children:"Needs input"', pl: 'children:"Wymaga danych wejściowych"' },
    { en: 'children:"No active skills"', pl: 'children:"Brak aktywnych umiejętności"' },
    { en: 'children:"No background tasks"', pl: 'children:"Brak zadań w tle"' },
    { en: 'children:"No build files are updated."', pl: 'children:"Żadne pliki kompilacji nie zostały zaktualizowane."' },
    { en: 'children:"Open in Cider"', pl: 'children:"Otwórz w Cider"' },
    { en: 'children:"Other:"', pl: 'children:"Inne:"' },
    { en: 'children:"Output:"', pl: 'children:"Wynik:"' },
    { en: 'children:"Pricing is based on public API pricing"', pl: 'children:"Cennik opiera się na publicznych cenach API"' },
    { en: 'children:"Read resource: "', pl: 'children:"Odczytaj zasób: "' },
    { en: 'children:"Request Review"', pl: 'children:"Poproś o przegląd"' },
    { en: 'children:"Restore"', pl: 'children:"Przywróć"' },
    { en: 'children:"Select all that apply"', pl: 'children:"Wybierz wszystkie pasujące opcje"' },
    { en: 'children:"Select Models"', pl: 'children:"Wybierz modele"' },
    { en: 'children:"Shortcuts"', pl: 'children:"Skróty"' },
    { en: 'children:"Single"', pl: 'children:"Pojedynczy"' },
    { en: 'children:"Skip (Esc)"', pl: 'children:"Pomiń (Esc)"' },
    { en: 'children:"This chat is archived."', pl: 'children:"Ten czat jest zarchiwizowany."' },
    { en: 'children:"Title:"', pl: 'children:"Tytuł:"' },
    { en: 'children:"To modify editor settings, open Settings within the editor window."', pl: 'children:"Aby zmienić ustawienia edytora, otwórz Ustawienia w oknie edytora."' },
    { en: 'children:"To modify notification settings, open your operating system\'s system preferences."', pl: 'children:"Aby zmienić ustawienia powiadomień, otwórz preferencje systemowe swojego systemu operacyjnego."' },
    { en: 'children:"Tool: "', pl: 'children:"Narzędzie: "' },
    { en: 'children:"Try Again"', pl: 'children:"Spróbuj ponownie"' },
    { en: 'children:"Unknown Notebook"', pl: 'children:"Nieznany notatnik"' },
    { en: 'children:"Use the editor when you want to write code or focus on one task alongside one agent."', pl: 'children:"Używaj edytora, gdy chcesz pisać kod lub skupić się na jednym zadaniu razem z jednym agentem."' },
    { en: 'children:"User cancelled agent execution."', pl: 'children:"Użytkownik anulował wykonanie przez agenta."' },
    { en: 'text:"Async functions can only be declared at the top level or inside a block."', pl: 'text:"Funkcje asynchroniczne można deklarować tylko na najwyższym poziomie lub wewnątrz bloku."' },
    { en: 'text:"Generators can only be declared at the top level or inside a block."', pl: 'text:"Generatory można deklarować tylko na najwyższym poziomie lub wewnątrz bloku."' },
    { en: 'text:"Initializers are not allowed in ambient contexts."', pl: 'text:"Inicjalizatory nie są dozwolone w kontekstach deklaratywnych."' },
    { en: 'text:"More"', pl: 'text:"Więcej"' },
];
function getAllTranslations() {
    return [
        // 1. Sidebar component injection (musi być przed innymi children)
        ...exports.sidebarSettingsTranslations,
        // 2. Sidebar labels
        ...exports.sidebarLabelsTranslations,
        // 3. Tytuł okna
        ...exports.windowTitleTranslations,
        // 4. Sekcje (title:"...")
        ...exports.sectionTitleTranslations,
        // 5. Settings — pełne label+description (dłuższe PRZED krótszymi)
        ...exports.settingsTranslations,
        // 6. Agent Manager
        ...exports.agentManagerTranslations,
        // 7. Chat
        ...exports.chatTranslations,
        // 8. Placeholders
        ...exports.placeholderTranslations,
        // 9. Onboarding
        ...exports.onboardingTranslations,
        // 10. Children — długie
        ...exports.childrenLongTranslations,
        // 11. Labels
        ...exports.labelTranslations,
        // 12. Quoted strings (dialogi, akcje, statusy)
        ...exports.quotedStringsTranslations,
        // 13. Children — krótkie (NA KOŃCU — shortest last)
        ...exports.childrenShortTranslations,
        // 14. Diagnostyka, debug i rzadziej widoczne frazy
        ...exports.diagnosticsTranslations,
        // 15. Braki wykryte przez audyt pokrycia
        ...exports.coverageGapTranslations,
        // 16. Dodatkowe aktualizacje i ujednolicenia
        ...exports.additionalUpdateTranslations,
    ];
}
//# sourceMappingURL=translations.js.map