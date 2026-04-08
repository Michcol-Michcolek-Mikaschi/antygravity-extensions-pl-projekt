import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_OUT = path.join(process.cwd(), 'reports', 'ui-strings.json');

function parseArgs(argv) {
  const options = {
    input: undefined,
    out: undefined,
    plainOut: undefined,
    pretty: false,
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
    if (arg === '--plain-out') {
      options.plainOut = argv[i + 1];
      i += 1;
      continue;
    }
    if (arg === '--pretty') {
      options.pretty = true;
      continue;
    }
  }

  return options;
}

export function resolveAntigravityMainPath(inputOverride) {
  if (inputOverride) {
    return path.resolve(inputOverride);
  }

  const candidates = [];

  const localAppData = process.env.LOCALAPPDATA || '';
  if (localAppData) {
    const base = path.join(localAppData, 'Programs', 'Antigravity', 'resources', 'app', 'out', 'jetskiAgent');
    candidates.push(path.join(base, 'main.js.backup-pl'));
    candidates.push(path.join(base, 'main.js'));
  }

  candidates.push('/Applications/Antigravity.app/Contents/Resources/app/out/jetskiAgent/main.js.backup-pl');
  candidates.push('/Applications/Antigravity.app/Contents/Resources/app/out/jetskiAgent/main.js');

  const home = process.env.HOME || process.env.USERPROFILE || '';
  if (home) {
    const base = path.join(home, '.local', 'share', 'antigravity', 'resources', 'app', 'out', 'jetskiAgent');
    candidates.push(path.join(base, 'main.js.backup-pl'));
    candidates.push(path.join(base, 'main.js'));
  }

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error('Nie znaleziono pliku main.js/main.js.backup-pl Antigravity. Użyj --input <ścieżka>.');
}

function normalizeToken(raw) {
  return raw.replace(/\s+/g, ' ').trim();
}

function isLikelyUiToken(token) {
  if (!token || token.length < 3 || token.length > 240) {
    return false;
  }

  if (token.includes('{') || token.includes('}') || token.includes('=>') || token.includes('function(')) {
    return false;
  }

  if (/^(https?:|data:|#|\.|\/)/.test(token)) {
    return false;
  }

  // Filter obvious implementation identifiers.
  if (/^[A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z0-9_]+)+$/.test(token)) {
    return false;
  }

  const alnum = token.replace(/[^A-Za-z0-9]/g, '');
  if (alnum.length > 0) {
    const upperRatio = (alnum.match(/[A-Z]/g) || []).length / alnum.length;
    if (upperRatio > 0.8 && alnum.length > 8) {
      return false;
    }
  }

  return true;
}

function collectPattern(content, regex, formatter) {
  const tokens = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    const token = normalizeToken(formatter(match));
    if (isLikelyUiToken(token)) {
      tokens.push(token);
    }
  }
  return tokens;
}

export function extractUiStrings(content) {
  const tokens = [];

  const keyedPatterns = [
    { regex: /children:"([A-Z][^"\\]{1,120})"/g, format: m => `children:"${m[1]}"` },
    { regex: /text:"([A-Z][^"\\]{1,120})"/g, format: m => `text:"${m[1]}"` },
    { regex: /placeholder:"([A-Z][^"\\]{1,120})"/g, format: m => `placeholder:"${m[1]}"` },
    { regex: /tooltipText:"([A-Z][^"\\]{1,120})"/g, format: m => `tooltipText:"${m[1]}"` },
    { regex: /dialogTitle:"([A-Z][^"\\]{1,120})"/g, format: m => `dialogTitle:"${m[1]}"` },
    { regex: /"aria-label":"([A-Z][^"\\]{1,120})"/g, format: m => `"aria-label":"${m[1]}"` },
  ];

  for (const p of keyedPatterns) {
    tokens.push(...collectPattern(content, p.regex, p.format));
  }

  return Array.from(new Set(tokens)).sort((a, b) => a.localeCompare(b));
}

export function readMainJs(inputOverride) {
  const file = resolveAntigravityMainPath(inputOverride);
  const content = fs.readFileSync(file, 'utf8');
  return { file, content };
}

function ensureParentDir(filePath) {
  const parent = path.dirname(filePath);
  fs.mkdirSync(parent, { recursive: true });
}

function runCli() {
  const args = parseArgs(process.argv);
  const { file, content } = readMainJs(args.input);
  const strings = extractUiStrings(content);

  const payload = {
    sourceFile: file,
    generatedAt: new Date().toISOString(),
    total: strings.length,
    strings,
  };

  const outputJson = JSON.stringify(payload, null, args.pretty ? 2 : 0);

  if (args.out) {
    const outPath = path.resolve(args.out);
    ensureParentDir(outPath);
    fs.writeFileSync(outPath, JSON.stringify(payload, null, 2), 'utf8');
    console.log(`Zapisano raport JSON: ${outPath}`);
  }

  if (args.plainOut) {
    const plainOutPath = path.resolve(args.plainOut);
    ensureParentDir(plainOutPath);
    fs.writeFileSync(plainOutPath, `${strings.join('\n')}\n`, 'utf8');
    console.log(`Zapisano listę tekstów: ${plainOutPath}`);
  }

  if (!args.out) {
    console.log(outputJson);
  }
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isDirectRun) {
  runCli();
}

export const DEFAULT_EXTRACT_OUTPUT = DEFAULT_OUT;
