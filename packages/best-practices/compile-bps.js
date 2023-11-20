const fs = require('fs');

const bestPractices = fs.readdirSync('./src/best-practices');

fs.writeFileSync('./src/lib/bestPractices.ts', '');

const stream = fs.createWriteStream('./src/lib/bestPractices.ts', { flags: 'a' })

for (const bp of bestPractices || []) {
  const _bp = bp.split('.')[0].replace(/-/g, '_');
  stream.write(`import ${_bp} from '../best-practices/${bp.split('.')[0]}';\n`);
}

stream.write('\nexport {\n');

for (const bp of bestPractices || []) {
  const _bp = bp.split('.')[0].replace(/-/g, '_');
  stream.write(`  ${_bp},\n`);
}

stream.write('};\n');

stream.end();