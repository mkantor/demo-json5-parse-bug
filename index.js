const JSON5 = require('json5');

console.log('About to parse hexadecimal numeric literal...');
JSON5.parse('0x1');
console.log('Done parsing hexadecimal numeric literal.');
