import {
  Command,
  Option,
} from 'commander';

import bestPracticesJson from '@qualweb/best-practices/lib/bestPractices.json';
import { ModuleOptionsEnum, RuleListParseResult } from '../types';

/**
 * Reducer function for parsing best practices. Pass to
 * {@link Option.argParser}. Gathers all inputs in an accumulator object with
 * two arrays, one for valid practices ("ok")  and one for invalid rules
 * ("error").
 * @param value Current input value.
 * @param previousValue Accumulator value.
 * @returns 
 */
function bestPracticesListParseHelper(value: string, previousValue: RuleListParseResult): RuleListParseResult {
  // Initialize result array if undefined.
  if (!previousValue)
    previousValue = { error: [], ok: [] };

  const allBestPractices = Object.values(bestPracticesJson);

  if (value.match(/^QW-BP\d+$/i)) {
    // parse as QualWeb internal name.

    // QW codes are all upper case.
    value = value.toUpperCase();

    const foundBestPractice = allBestPractices.find(rule => rule.code === value);

    if (foundBestPractice) {
      previousValue.ok.push(foundBestPractice.code);
    } else {
      previousValue.error.push(value);
    }
  } else {
    // Try to parse as mapping (like "H24" or "SCR20"). Not all best practices
    // have a mapping, so this is a best-effort attempt.

    // Mappings are all uppercase.
    value = value.toUpperCase();

    const foundTechnique = allBestPractices.find(rule => 'mapping' in rule && rule.mapping === value);

    if (foundTechnique) {
      previousValue.ok.push(foundTechnique.code);
    } else {
      previousValue.error.push(value);
    }
  }

  return previousValue;
}

/**
 * The types added to {@link Command.opts()} by
 * {@link addBestPracticeOptionsToCommand}. Optimally, this would flow naturally
 * from a call to {@link addBestPracticeOptionsToCommand} but that's not simply
 * supported in TypeScript.
 */
export type BestPracticesOptions = {
  bestPractices?: RuleListParseResult,
  excludeBp?: RuleListParseResult,
}

/**
 * Adds best practices options (include/exclude/level filter) to a command.
 * @param command The command to add the options to. This *will* modify the
 * {@link Command} object.
 * @returns The modified {@link Command} object. Good for chaining.
 */
export function addBestPracticeOptionsToCommand(command: Command): Command {
  const bestPracticeIncludeOption = new Option('--best-practices <practices...>', 'Which tests for best practices to execute. Can be multiple.')
    .argParser(bestPracticesListParseHelper)
    .implies({ module: [ ModuleOptionsEnum.BestPractices ] })
    ;

  const bestPracticeExcludeOption = new Option('--exclude-bp <practices...>', 'Which tests for best practices to exclude. Can be multiple.')
    .argParser(bestPracticesListParseHelper)
    .implies({ module: [ ModuleOptionsEnum.BestPractices ] })
    ;

  command.addOption(bestPracticeIncludeOption);
  command.addOption(bestPracticeExcludeOption);

  return command;
}
