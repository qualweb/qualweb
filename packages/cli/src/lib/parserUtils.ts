import commandLineUsage from 'command-line-usage';
import { sections, actRules, wcagTechniques, bps, levels, principles } from './options';

export function printHelp(): void {
  console.log(commandLineUsage(sections));
  process.exit(0);
}

export function printError(err: string): void {
  console.error(err);
  console.log('To get help please run');
  console.log('  $ qw --help');
  process.exit(0);
}

export function validatePrinciples(arrayPrinciples: string[] | undefined): void {
  if (arrayPrinciples) {
    const valid = arrayContainsArray(arrayPrinciples, principles);
    if (!valid) {
      printError('Invalid principle(s) selected.');
    }
  }
}

export function validateLevels(arrayLevels: string[] | undefined): void {
  if (arrayLevels) {
    const valid = arrayContainsArray(arrayLevels, levels);
    if (!valid) {
      printError('Invalid level(s) selected.');
    }
  }
}

export function validateACT(rules: string[] | undefined): void {
  if (rules) {
    const valid = arrayContainsArray(rules, actRules);
    if (!valid) {
      printError('Invalid rule(s) selected.');
    }
  }
}

export function validateWCAG(techniques: string[] | undefined): void {
  if (techniques) {
    const valid = arrayContainsArray(techniques, wcagTechniques);
    if (!valid) {
      printError('Invalid techniques(s) selected.');
    }
  }
}

export function validateBP(bestPractices: string[] | undefined): void {
  if (bestPractices) {
    const valid = arrayContainsArray(bestPractices, bps);
    if (!valid) {
      printError('Invalid best-practice(s) selected.');
    }
  }
}

/**
 * true if arr2 contains arr1
 */
function arrayContainsArray(arr1: string[], arr2: string[]): boolean {
  return arr1.some((r) => arr2.includes(r));
}
