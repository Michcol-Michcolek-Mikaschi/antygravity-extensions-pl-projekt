import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractUiStrings, readMainJs } from './extract-ui-strings.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TRANSLATIONS_FILE = path.join(ROOT, 'src', 'patcher', 'translations.ts');

function parseArgs(argv) {
  const options = {
    input: undefined,
    out: undefined,
    strict: false,
    maxPrint: 120,
  };

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--input') {
      options.input = argv[i + 1];
      i += 1;
      continue;
    }
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
      options.maxPrint = Number(argv[i + 1] || '120');
      i += 1;
      continue;
    }
  }

  return options;
}

function decodeTsStringLiteral(literal) {
  const quote = literal[0];
  let content = literal.slice(1, -1);
  content = content
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\r/g, '\r')
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\`/g, '`')
    .replace(/\\\\/g, '\\');

  if (quote === '`') {
    // Keep template placeholders as-is.
    return content;
  }

  return content;
}

function parseTranslationEntries(fileContent) {
  const exactEntries = [];
  const regexEntries = [];

  const enRegex = /en:\s*("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g;
  let enMatch;
  while ((enMatch = enRegex.exec(fileContent)) !== null) {
    exactEntries.push({
      en: decodeTsStringLiteral(enMatch[1]),
      mode: 'exact',
      flags: 'g',
    });
  }

  const regexObject = /\{\s*en:\s*("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)\s*,\s*pl:\s*("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)([\s\S]*?)\}/g;
  let regexMatch;
  while ((regexMatch = regexObject.exec(fileContent)) !== null) {
    const tail = regexMatch[3] || '';
    const modeMatch = tail.match(/mode:\s*['"](exact|regex)['"]/);
    if (!modeMatch || modeMatch[1] !== 'regex') {
      continue;
    }
    const flagsMatch = tail.match(/flags:\s*['"]([a-zA-Z]+)['"]/);
    regexEntries.push({
      en: decodeTsStringLiteral(regexMatch[1]),
      mode: 'regex',
      flags: flagsMatch ? flagsMatch[1] : 'g',
    });
  }

  return [...exactEntries, ...regexEntries];
}

function canBeIgnoredToken(token) {
  // These look like implementation constants and are not user-visible labels.
  return /^("(?:uss-|theme|themeMode|themeService|symbol-icon-theme\.json).*)$/.test(token);
}

function canonicalizeToken(token) {
  const keyedMatch = token.match(/^(children|label|title|text|placeholder|description|message|tooltipText|tooltip|dialogTitle):\"([\s\S]+)\"$/);
  if (keyedMatch) {
    return `"${keyedMatch[2]}"`;
  }

  const ariaMatch = token.match(/^\"aria-label\":\"([\s\S]+)\"$/);
  if (ariaMatch) {
    return `"${ariaMatch[1]}"`;
  }

  return token;
}

function isCoveredByEntry(token, entry) {
  const canonicalToken = canonicalizeToken(token);
  const canonicalEntry = canonicalizeToken(entry.en);

  if (entry.mode === 'exact') {
    return token === entry.en || canonicalToken === canonicalEntry;
  }

  try {
    const testFlags = entry.flags.replace(/g/g, '');
    const regex = new RegExp(entry.en, testFlags);
    return regex.test(token) || regex.test(canonicalToken);
  } catch {
    return false;
  }
}

function run() {
  const args = parseArgs(process.argv);
  const translationsRaw = fs.readFileSync(TRANSLATIONS_FILE, 'utf8');
  const translationEntries = parseTranslationEntries(translationsRaw);

  const { file: sourceFile, content } = readMainJs(args.input);
  const extracted = extractUiStrings(content);

  const uncovered = [];

  for (const token of extracted) {
    if (canBeIgnoredToken(token)) {
      continue;
    }

    const covered = translationEntries.some(entry => isCoveredByEntry(token, entry));
    if (!covered) {
      uncovered.push(token);
    }
  }

  const report = {
    sourceFile,
    generatedAt: new Date().toISOString(),
    extractedCount: extracted.length,
    translationEntryCount: translationEntries.length,
    coveredCount: extracted.length - uncovered.length,
    untranslated: uncovered.length,
    uncovered,
  };

  if (args.out) {
    const outPath = path.resolve(args.out);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf8');
    console.log(`Zapisano raport pokrycia: ${outPath}`);
  }

  console.log(`Źródło: ${sourceFile}`);
  console.log(`Wykryte tokeny UI: ${report.extractedCount}`);
  console.log(`Wpisy słownika: ${report.translationEntryCount}`);
  console.log(`Pokryte: ${report.coveredCount}`);
  console.log(`Nieprzetłumaczone: ${report.untranslated}`);

  if (report.untranslated > 0) {
    console.log('--- Braki (pierwsze wpisy) ---');
    for (const token of uncovered.slice(0, args.maxPrint)) {
      console.log(`- ${token}`);
    }
  }

  if (args.strict && report.untranslated > 0) {
    process.exitCode = 1;
  }
}

run();
