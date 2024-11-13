import {
  Command,
  Option,
} from 'commander';

import wcagTechniquesJson from '@qualweb/wcag-techniques/lib/techniques.json';
import { ConformanceLevelEnum, ModuleOptionsEnum, PrincipleEnum, RuleListParseResult } from './types';

/**
 * Reducer function for parsing WCAG techniques. Pass to
 * {@link Option.argParser}. Gathers all inputs in an accumulator object with
 * two arrays, one for valid rules ("ok")  and one for invalid rules ("error").
 * @param value Current input value.
 * @param previousValue Accumulator value.
 * @returns 
 */
function wcagTechniquesListParseHelper(value: string, previousValue: RuleListParseResult): RuleListParseResult {
  // Initialize result array if undefined.
  if (!previousValue)
    previousValue = { error: [], ok: [] };

  const allWcagTechniques = Object.values(wcagTechniquesJson);

  if (value.match(/^QW-WCAG-T\d+$/i)) {
    // parse as QualWeb internal name.

    // QW codes are all upper case.
    value = value.toUpperCase();

    const foundWcagTechnique = allWcagTechniques.find(rule => rule.code === value);

    if (foundWcagTechnique) {
      previousValue.ok.push(foundWcagTechnique.code);
    } else {
      previousValue.error.push(value);
    }
  } else {
    // Try to parse as mapping (like "H24" or "SCR20")

    // Mappings are all uppercase.
    value = value.toUpperCase();

    const foundTechnique = allWcagTechniques.find(rule => rule.mapping === value);

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
 * {@link addWcagTechniqueOptionsToCommand}. Optimally, this would flow
 * naturally from a call to {@link addWcagTechniqueOptionsToCommand} but that's
 * not simply supported in TypeScript.
 */
export type WcagTechniqueOptions = {
  wcagTechniques?: RuleListParseResult,
  excludeWcag?: RuleListParseResult,
  wcagLevels?: ConformanceLevelEnum[],
  wcagPrinciples?: PrincipleEnum[],
}

/**
 * Adds WCAG technique options (include/exclude/level filter) to a command.
 * @param command The command to add the options to. This *will* modify the
 * {@link Command} object.
 * @returns The modified {@link Command} object. Good for chaining.
 */
export function addWcagTechniqueOptionsToCommand(command: Command): Command {
  const wcagTechniqueIncludeOption = new Option('--wcag-techniques <techniques...>', 'Which WCAG techniques to execute. Can be multiple.')
    .argParser(wcagTechniquesListParseHelper)
    .implies({ module: [ ModuleOptionsEnum.WCAGTechniques ] })
    ;

  const wcagTechniqueExcludeOption = new Option('--exclude-wcag <techniques...>', 'Which WCAG techniques to not execute. Can be multiple.')
    .argParser(wcagTechniquesListParseHelper)
    .implies({ module: [ ModuleOptionsEnum.WCAGTechniques ] })
    ;

  const wcagTechniqueLevelOption = new Option('--wcag-levels <levels...>', 'Which conformance levels to test for WCAG techniques. Will include all techniques that match the level. Can be multiple.')
    .choices(Object.values(ConformanceLevelEnum))
    .implies({ module: [ ModuleOptionsEnum.WCAGTechniques ] })
    ;

  const wcagTechniquePrincipleOption = new Option('--wcag-principles <principles...>', 'Which principles to test for in WCAG techniques. Only techniques matching the principle will be tested.')
    .choices(Object.values(PrincipleEnum))
    .implies({ module: [ ModuleOptionsEnum.WCAGTechniques ] })
    ;

  command.addOption(wcagTechniqueIncludeOption);
  command.addOption(wcagTechniqueExcludeOption);
  command.addOption(wcagTechniqueLevelOption);
  command.addOption(wcagTechniquePrincipleOption);

  return command;
}
