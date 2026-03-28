const fs = require('fs');
const b = process.env.LOCALAPPDATA + '\\Programs\\Antigravity\\resources\\app\\out\\jetskiAgent\\main.js.backup-pl';
const a = process.env.LOCALAPPDATA + '\\Programs\\Antigravity\\resources\\app\\out\\jetskiAgent\\main.js';
const f = fs.existsSync(b) ? b : a;
const c = fs.readFileSync(f, 'utf-8');

// Check patterns
const patterns = [
  '?"Add Custom Model":"Edit Custom Model"',
  'children:"Continue"',
  'children:`Sign in to enable',
  'Sign in to enable ${',
];
patterns.forEach(p => {
  const i = c.indexOf(p);
  if (i >= 0) {
    console.log('FOUND: ' + p);
    console.log('  ctx: ' + c.substring(Math.max(0, i - 20), i + p.length + 40));
  } else {
    console.log('NO: ' + p);
  }
});

// Count all occurrences of children:"Continue"
let count = 0;
let pos = 0;
while (true) {
  pos = c.indexOf('"Continue"', pos);
  if (pos === -1) break;
  const ctx = c.substring(Math.max(0, pos - 20), pos + 40);
  if (count < 5) console.log('  "Continue" at ' + pos + ': ' + ctx);
  count++;
  pos++;
}
console.log('Total "Continue" occurrences: ' + count);
