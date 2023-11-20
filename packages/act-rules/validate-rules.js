/**
 * Validation script.
 * Uses the schema defined in: act-rules.schema.json
 * For the act rules in: src/lib/rules.json
 */

const Ajv = require('ajv');
const fsSync = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'act-rules.schema.json');
const actrulesPath = path.join(__dirname, 'src', 'lib', 'rules.json');

const ajv = new Ajv({
  allErrors: true
});

console.info(`Using schema at ${schemaPath}`);
console.info(`Using ACT rules defined in ${actrulesPath}`);

const schemaString = fsSync.readFileSync(schemaPath, 'utf-8');
// const schemaString = await fs.readFile(schemaPath, 'utf-8');

const schemaObject = JSON.parse(schemaString);

const actrules = JSON.parse(fsSync.readFileSync(actrulesPath, 'utf-8'));
// const actrules = JSON.parse(await fs.readFile(actrulesPath, 'utf-8'));

const validateFunction = ajv.compile(schemaObject);
// const validateFunction = await ajv.compileAsync(schemaObject);

console.info('Starting validation');

const isValid = validateFunction(actrules);

if (isValid === false && validateFunction.errors) {
  for (const error of validateFunction.errors) {
    console.error(error);
  }
} else {
  console.info('Validation found no errors.');
}
