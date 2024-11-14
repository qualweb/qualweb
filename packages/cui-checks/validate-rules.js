/**
 * Validation script.
 * Uses the schema defined in: cui-checks.schema.json
 * For the cui checks in: src/lib/rules.json
 */

const Ajv = require('ajv');
const fsSync = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'cui-checks.schema.json');
const cuichecksPath = path.join(__dirname, 'src', 'lib', 'rules.json');

const ajv = new Ajv({
  allErrors: true
});

console.info(`Using schema at ${schemaPath}`);
console.info(`Using ACT rules defined in ${cuichecksPath}`);

const schemaString = fsSync.readFileSync(schemaPath, 'utf-8');
// const schemaString = await fs.readFile(schemaPath, 'utf-8');

const schemaObject = JSON.parse(schemaString);

const cuichecks = JSON.parse(fsSync.readFileSync(cuichecksPath, 'utf-8'));
// const actrules = JSON.parse(await fs.readFile(actrulesPath, 'utf-8'));

const validateFunction = ajv.compile(schemaObject);
// const validateFunction = await ajv.compileAsync(schemaObject);

console.info('Starting validation');

const isValid = validateFunction(cuichecks);

if (isValid === false && validateFunction.errors) {
  for (const error of validateFunction.errors) {
    console.error(error);
  }
} else {
  console.info('Validation found no errors.');
}
