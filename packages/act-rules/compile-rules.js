const fs = require('fs');

const rules = fs.readdirSync('./src/rules');

fs.writeFileSync('./src/lib/rules.ts', '');

const stream = fs.createWriteStream('./src/lib/rules.ts', { flags: 'a' })

for (const rule of rules || []) {
  const _rule = rule.split('.')[0].replace(/-/g, '_');
  stream.write(`import ${_rule} from '../rules/${rule.split('.')[0]}';\n`);
}

stream.write('\nexport {\n');

for (const rule of rules || []) {
  const _rule = rule.split('.')[0].replace(/-/g, '_');
  stream.write(`  ${_rule},\n`);
}

stream.write('};\n');

stream.end();