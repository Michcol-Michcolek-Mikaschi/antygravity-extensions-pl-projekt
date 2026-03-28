const fs = require('fs');
const b = process.env.LOCALAPPDATA + '\\Programs\\Antigravity\\resources\\app\\out\\jetskiAgent\\main.js.backup-pl';
const a = process.env.LOCALAPPDATA + '\\Programs\\Antigravity\\resources\\app\\out\\jetskiAgent\\main.js';
const f = fs.existsSync(b) ? b : a;
const c = fs.readFileSync(f, 'utf-8');

const exact = [
  'children:"Export Artifact"',
  'children:"Knowledge"',
  'children:"Add Custom Model"',
  'children:"Continue"',
  'children:"Add context"',
  'children:"Add Comment"',
  'children:"Confirm Browser Interaction"',
  'children:"Confirm Window Reload"',
  '"Send feedback as"',
  '"Open Agent Manager"',
  '"Enable Desktop Notifications"',
  '"Enable Sound Notifications"',
  '"Custom Instructions"',
  '"Disable"',
  '"Apply"',
  '"Sign in to enable"',
];

exact.forEach(t => {
  console.log((c.includes(t) ? 'YES' : 'NO ') + ' : ' + t);
});

console.log('--- ALT PATTERNS ---');
const alts = [
  'dialogTitle:"Export Artifact"',
  'title:"Add Custom Model"',
  '"aria-label":"Add context"',
  'submitLabel:s="Add Comment"',
  '"aria-label":"Confirm Browser',
  'label:"Confirm Window Reload"',
  'label:"Send feedback as "',
  'Sign in to enable',
];
alts.forEach(t => {
  const i = c.indexOf(t);
  if (i >= 0) {
    const start = Math.max(0, i - 10);
    console.log('ALT FOUND: ' + t);
    console.log('  ctx: ' + c.substring(start, start + 120));
  } else {
    console.log('ALT NOT FOUND: ' + t);
  }
});
