import {
  Command,
  Option,
} from 'commander';

import actRulesJson from '@qualweb/act-rules/lib/rules.json';
import { ConformanceLevelEnum, ModuleOptionsEnum } from './types';

const allActRules = Object.values(actRulesJson);

type ActRuleListParseHelperAccumulator = {
  ok: string[],
  error: string[],
};

/**
 * Reducer function for parsing ACT rules. Pass to {@link Option.argParser}.
 * Gathers all inputs in an accumulator object with two arrays, one for valid
 * rules ("ok")  and one for invalid rules ("error").
 * @param value Current input value.
 * @param previousValue Accumulator value.
 * @returns 
 */
function actRulesListParseHelper(value: string, previousValue: ActRuleListParseHelperAccumulator): ActRuleListParseHelperAccumulator {
  // Initialize result array if undefined.
  if (!previousValue)
    previousValue = { error: [], ok: [] };

  if (value.match(/^QW-ACT-R\d+$/i)) {
    // parse as QualWeb internal name.

    // QW codes are all upper case.
    value = value.toUpperCase();

    const foundActRule = allActRules.find(rule => rule.code === value);

    if (foundActRule) {
      previousValue.ok.push(foundActRule.code);
    } else {
      previousValue.error.push(value);
    }
  } else if (value.length === 6) {
    // Parse as official ACT rule hash.

    // ACT hashes are all lower case.
    value = value.toLowerCase();

    const foundActRule = allActRules.find(rule => rule.mapping === value);

    if (foundActRule) {
      previousValue.ok.push(foundActRule.code);
    } else {
      previousValue.error.push(value);
    }
  } else {
    previousValue.error.push(value);
  }
  
  return previousValue;
}

/**
 * Adds input options (URL, file, crawl) to a command.
 * @param command The command to add the options to. This *will* modify the
 * {@link Command} object.
 * @returns The modified {@link Command} object. Good for chaining.
 */

export function addInputOptionsToCommand(command: Command): Command {
  const urlInputOption = new Option('-u, --url <url>', 'URL to test');
  const fileInputOption = new Option('-f, --file <file>', 'File to test');
  const crawlInputOption = new Option('-c, --crawl <crawl>', 'Crawl a website');

  urlInputOption.conflicts([fileInputOption.attributeName(), crawlInputOption.attributeName()]);
  fileInputOption.conflicts([urlInputOption.attributeName(), crawlInputOption.attributeName()]);
  crawlInputOption.conflicts([urlInputOption.attributeName(), fileInputOption.attributeName()]);

  command.addOption(urlInputOption);
  command.addOption(fileInputOption);
  command.addOption(crawlInputOption);

  return command;
}

/**
 * Adds ACT rule options (include/exclude/level filter) to a command.
 * @param command The command to add the options to. This *will* modify the
 * {@link Command} object.
 * @returns The modified {@link Command} object. Good for chaining.
 */
export function addActRuleOptionsToCommand(command: Command): Command {
  const actRuleIncludeOption = new Option('--act-rules <rules...>', 'ACT rules to include')
    .argParser(actRulesListParseHelper)
    .implies({ module: ModuleOptionsEnum.ACTRules })
    ;

  const actRuleExcludeOption = new Option('--exclude-act <rules...>', 'ACT rules to include')
    .argParser(actRulesListParseHelper)
    .implies({ module: ModuleOptionsEnum.ACTRules })
    ;

  const actRuleLevelOption = new Option('--act-levels <levels...>', 'ACT level to test')
    .choices(Object.values(ConformanceLevelEnum))
    .implies({ module: ModuleOptionsEnum.ACTRules })
    ;

  // Should we note conflicting options here, or let @qualweb/core determine how
  // to handle both an include and exclude list? Checking here gives more
  // immediate feedback to the user at the cost of more maintenance.
  // Allowing users to include AND exclude specific rules doesn't make sense.
  // It's either ONLY include a few rules or ALL rules EXCEPT a few.
  // actRuleIncludeOption.conflicts(actRuleExcludeOption.attributeName());
  // actRuleExcludeOption.conflicts(actRuleIncludeOption.attributeName());
  // For level, it doesn't make sense to use the include filter, as that's
  // implied. Excluding specific rules despite the level filter is fine.
  // actRuleLevelOption.conflicts(actRuleIncludeOption.attributeName());

  command.addOption(actRuleIncludeOption);
  command.addOption(actRuleExcludeOption);
  command.addOption(actRuleLevelOption);

  return command;
}

export function addListActRulesSubcommand(command: Command): Command {
  const subCommand = new Command('list-act-rules')
    .description('Lists all the ACT rules known to this program and exits.')
    .action(() => {
      console.info('ACT rules:');
      
      for (const rule of allActRules) {
        console.info(`${rule.code} (${rule.mapping}) - ${rule.name}`);
      }

      process.exit(0);
    })
    ;

  command.addCommand(subCommand);

  return command;
}