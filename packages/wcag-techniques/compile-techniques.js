const fs = require('fs');

const techniques = fs.readdirSync('./src/techniques');

fs.writeFileSync('./src/lib/techniques.ts', '');

const stream = fs.createWriteStream('./src/lib/techniques.ts', { flags: 'a' })

for (const technique of techniques || []) {
  const _technique = technique.split('.')[0].replace(/-/g, '_');
  stream.write(`import ${_technique} from '../techniques/${technique.split('.')[0]}';\n`);
}

stream.write('\nexport {\n');

for (const technique of techniques || []) {
  const _technique = technique.split('.')[0].replace(/-/g, '_');
  stream.write(`  ${_technique},\n`);
}

stream.write('};\n');

stream.end();