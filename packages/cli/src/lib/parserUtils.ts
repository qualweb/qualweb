import { sections, actRules, htmlTechniques, cssTechniques, bps, levels, principles } from './options';
import commandLineUsage from 'command-line-usage';

function printHelp(): void {
  console.log(commandLineUsage(sections));
  process.exit(0);
}

function printError(err: string): void {
  console.error(err);
  console.log('To get help please run');
  console.log('  $ qw --help');
  process.exit(0);
}

function validatePrinciples(arrayPrinciples: string[]): void {
  const valid = arrayContainsArray(arrayPrinciples, principles);
  if(!valid){
    printError('Invalid principle(s) selected.');
  }
}

function validateLevels(arrayLevels: string[]): void {
  const valid = arrayContainsArray(arrayLevels, levels);
  if(!valid){
    printError('Invalid level(s) selected.');
  }
}

function validateACT(rules: string[]): void {
  const valid = arrayContainsArray(rules, actRules);
  if(!valid){
    printError('Invalid rule(s) selected.');
  }
}

function validateHTML(techniques: string[]): void {
  const valid = arrayContainsArray(techniques, htmlTechniques);
  if(!valid){
    printError('Invalid techniques(s) selected.');
  }
}

function validateCSS(techniques: string[]): void {
  const valid = arrayContainsArray(techniques, cssTechniques);
  if(!valid){
    printError('Invalid techniques(s) selected.');
  }
}

function validateBP(bestPractices: string[]): void {
  const valid = arrayContainsArray(bestPractices, bps);
  if(!valid){
    printError('Invalid best-practice(s) selected.');
  }
}

/**
 * true if arr2 contains arr1
 */
function arrayContainsArray(arr1: string[], arr2: string[]): boolean {
  return arr1.some(r => arr2.includes(r))
}

export {
  printHelp,
  printError,
  validatePrinciples,
  validateLevels,
  validateACT,
  validateHTML,
  validateCSS,
  validateBP
};