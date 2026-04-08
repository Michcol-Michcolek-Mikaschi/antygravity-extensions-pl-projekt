import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TRANSLATIONS_FILE = path.join(ROOT, 'src', 'patcher', 'translations.ts');

function parseArgs(argv) {
  const options = {
    out: undefined,
    strict: false,
    maxPrint: 200,
  };

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--out') {
      options.out = argv[i + 1];
      i += 1;
      continue;
    }
    if (arg === '--strict') {
      options.strict = true;
      continue;
    }
    if (arg === '--max-print') {
      options.maxPrint = Number(argv[i + 1] || '200');
      i += 1;
      continue;
    }
  }

  return options;
}

function decodeTsStringLiteral(literal) {
  let content = literal.slice(1, -1);
  content = content
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\r/g, '\r')
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\`/g, '`')
    .replace(/\\\\/g, '\\');
  return content;
}

function parseEntries(fileContent) {
  const entries = [];
  const objectRegex = /\{\s*en:\s*("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)\s*,\s*pl:\s*("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)([\s\S]*?)\}/g;

  let match;
  while ((match = objectRegex.exec(fileContent)) !== null) {
    entries.push({
      en: decodeTsStringLiteral(match[1]),
      pl: decodeTsStringLiteral(match[2]),
    });
  }

  return entries;
}

function normalizeForCompare(value) {
  return value
    .replace(/["'`]/g, '')
    .replace(/\\u[0-9a-fA-F]{4}/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function collectIssues(entries) {
  const issues = [];

  const bannedPolishPatterns = [
    { regex: /\bapke\b/i, message: 'Użyj formy „aplikację” zamiast „apke”.' },
    { regex: /\bklipobard\b/i, message: 'Literówka: użyj „schowek”.' },
    { regex: /\bodrobine\b/i, message: 'Użyj formy z polskimi znakami: „odrobinę”.' },
    { regex: /\bgadaj\b/i, message: 'Unikaj stylu potocznego („gadaj”).' },
    { regex: /\baut\.\b/i, message: 'Unikaj skrótów potocznych („aut.”).' },
    { regex: /\bapka\b/i, message: 'Unikaj formy potocznej („apka”).' },
  ];

  const discouragedEnglishTerms = [
    { regex: /\bworkflow\b/i, message: 'Użyj „przepływ pracy”.' },
    { regex: /\bsetup\b/i, message: 'Użyj „konfiguracja”.' },
    { regex: /\bdebug\b/i, message: 'Użyj „diagnostyka”.' },
    { regex: /\bsidebar\b/i, message: 'Użyj „panel boczny”.' },
    { regex: /\bprompt\b/i, message: 'Użyj „polecenie”.' },
    { regex: /\bworktree\b/i, message: 'Użyj „drzewo robocze”.' },
    { regex: /\bsub-agent\b/i, message: 'Użyj „podagent”.' },
    { regex: /\bsubagent\b/i, message: 'Użyj „podagent”.' },
  ];

  const allowedEqual = [
    'google ai pro',
    'google ai ultra',
    'cloud run',
    'google kubernetes engine (oss)',
    'mcp',
    'agent a',
    'children:agent a',
    'agent b',
    'agent c',
  ];

  entries.forEach((entry, index) => {
    const plNorm = normalizeForCompare(entry.pl);
    const enNorm = normalizeForCompare(entry.en);

    if (entry.pl !== entry.pl.trim()) {
      issues.push({ index, en: entry.en, pl: entry.pl, rule: 'trim', message: 'Usuń spacje na początku lub końcu tłumaczenia.' });
    }

    if (/\s{2,}/.test(entry.pl)) {
      issues.push({ index, en: entry.en, pl: entry.pl, rule: 'double-space', message: 'Usuń wielokrotne spacje.' });
    }

    for (const pattern of bannedPolishPatterns) {
      if (pattern.regex.test(entry.pl)) {
        issues.push({ index, en: entry.en, pl: entry.pl, rule: 'colloquial', message: pattern.message });
      }
    }

    for (const pattern of discouragedEnglishTerms) {
      if (pattern.regex.test(entry.pl)) {
        issues.push({ index, en: entry.en, pl: entry.pl, rule: 'english-term', message: pattern.message });
      }
    }

    if (enNorm.length > 0 && plNorm === enNorm && !allowedEqual.includes(plNorm)) {
      if (/[a-zA-Z]{4,}/.test(enNorm)) {
        issues.push({ index, en: entry.en, pl: entry.pl, rule: 'same-as-en', message: 'Tłumaczenie jest identyczne jak angielski oryginał.' });
      }
    }
  });

  return issues;
}

function run() {
  const args = parseArgs(process.argv);
  const source = fs.readFileSync(TRANSLATIONS_FILE, 'utf8');
  const entries = parseEntries(source);
  const issues = collectIssues(entries);

  const report = {
    sourceFile: TRANSLATIONS_FILE,
    generatedAt: new Date().toISOString(),
    entries: entries.length,
    qualityIssues: issues.length,
    issues,
  };

  if (args.out) {
    const outPath = path.resolve(args.out);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf8');
    console.log(`Zapisano raport jakości: ${outPath}`);
  }

  console.log(`Wpisy tłumaczeń: ${entries.length}`);
  console.log(`Problemy jakości: ${issues.length}`);

  if (issues.length > 0) {
    console.log('--- Problemy (pierwsze wpisy) ---');
    for (const issue of issues.slice(0, args.maxPrint)) {
      console.log(`- [${issue.rule}] ${issue.message}`);
      console.log(`  EN: ${issue.en}`);
      console.log(`  PL: ${issue.pl}`);
    }
  }

  if (args.strict && issues.length > 0) {
    process.exitCode = 1;
  }
}

run();
