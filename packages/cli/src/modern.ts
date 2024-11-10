/**
 * Newer CommanderJS-based approach. Allows for better control of options.
 */
import { Command, Option, OptionValues } from 'commander';

import actRulesJson from '@qualweb/act-rules/lib/rules.json';
import { ACTRules } from '@qualweb/act-rules';
import { ModuleOptions, QualWeb, QualwebOptions } from '@qualweb/core';
const allActRules = Object.values(actRulesJson);

/**
 * Option values for --module.
 * Kept here in one place to avoid repeated strings.
 */
enum ModuleOptionsEnum {
  ACTRules = 'act-rules',
  BestPractices = 'best-practices',
  WCAGTechniques = 'wcag-techniques',
  Counter = 'counter',
};

type ActRuleListParseHelperAccumulator = {
  ok: string[],
  error: string[],
};

/**
 * Accumulator helper function for parsing ACT rules. Pass to
 * {@link Option.argParser}. Gathers all inputs in an object with two arrays,
 * one for valid rules ("ok")  and one for invalid rules ("error"). * 
 * @param value Current input value. CommanderJS calls this function once for
 * each value that was passed.
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
 * command object.
 * @returns The modified command object. Good for chaining.
 */
function addInputOptionsToCommand(command: Command): Command {
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
 * command object.
 * @returns The modified command object. Good for chaining.
 */
function addActRuleOptionsToCommand(command: Command): Command {
  const actRuleIncludeOption = new Option('--act-rules <rules...>', 'ACT rules to include')
    .argParser(actRulesListParseHelper)
    .implies({ module: 'act-rules' })
    ;

  const actRuleExcludeOption = new Option('--exclude-act <rules...>', 'ACT rules to include')
    .argParser(actRulesListParseHelper)
    .implies({ module: 'act-rules' })
    ;

  const actRuleLevelOption = new Option('--act-levels <levels...>', 'ACT level to test')
    .choices(['A', 'AA', 'AAA'])
    .implies({ module: 'act-rules' })
    ;

  // Allowing users to include AND exclude specific rules doesn't make sense.
  // It's either ONLY include a few rules or ALL rules EXCEPT a few.
  actRuleIncludeOption.conflicts(actRuleExcludeOption.attributeName());
  actRuleExcludeOption.conflicts(actRuleIncludeOption.attributeName());
  // For level, it doesn't make sense to use the include filter, as that's
  // implied. Excluding specific rules despite the level filter is fine.
  actRuleLevelOption.conflicts([actRuleIncludeOption.attributeName()]);

  command.addOption(actRuleIncludeOption);
  command.addOption(actRuleExcludeOption);
  command.addOption(actRuleLevelOption);

  return command;
}

/**
 * Checks that the ACT rule options parsed from user input is valid. Prints
 * errors to stderr if any are found.
 * @param opts Option values as returned by {@link Command.opts}.
 * @returns True if validation succeeded, false otherwise.
 */
function validateActRuleOptions(opts: OptionValues): boolean {
  let isValid: boolean = true;

  // We don't make any assumptions about conflicts between include/exclude here.
  // We're only concerned with whether they contain any invalid rules.
  
  if (opts.actRules?.error.length > 0) {
    console.error(`Unknown ACT rules in inclusion list: ${opts.actRules.error.join(', ')}`);
    isValid = false;
  }

  if (opts.excludeAct?.error.length > 0) {
    console.error(`Unknown ACT rules in exclusion list: ${opts.excludeAct.error.join(', ')}`);
    isValid = false;
  }

  return isValid;
}

/**
 * Ensures that {@link opts.modules} contains ACT modules if any ACT rules
 * options were set.
 * This is necessary because CommanderJS doesn't support "inclusive implies"
 * for options with choices. "implies" will set a value for an option that was
 * not specified by the user, but will ignore if the option was set.
 * If the user specifies "-m wcag-techniques --act-rules QW-ACT-R7" then
 * CommanderJS will ignore the implication because -m was already set.
 * @param opts Options as parsed by {@link Command.opts}.
 */
function fixMissingImpliedActModule(opts: OptionValues): OptionValues {
  if (opts.actRules || opts.excludeAct || opts.actLevels) {
    if (!opts.module.includes('act-rules')) {
      opts.module.push('act-rules');
    }
  }

  return opts;
}

async function main(): Promise<void> {
  const program = new Command('qualweb-cli');

  // If set to true, the program will abort after parsing args but before
  // running QualWeb. This is so we can report all user input errors at once
  // instead of halting at every one.
  let bailAfterParsing: boolean = false;

  addInputOptionsToCommand(program);

  // Use a set to check for modules to run. Since the "imply" for Options don't
  // have good semantics for arrays/inclusion, we instead populate this set
  // right after parsing (from --module) and when checking/validating module
  // options (in essence, our own "imply" logic).
  const modulesToRun: Set<ModuleOptionsEnum> = new Set();

  const moduleToRunOption = new Option('-m, --module <modules...>', 'Modules to run')
    // Use enum values for choices to avoid typos and string repetition.
    .choices(Object.values(ModuleOptionsEnum))
    ;

  program.addOption(moduleToRunOption);

  addActRuleOptionsToCommand(program);

  program.parse();

  const opts = program.opts();

  opts.modules.forEach((module: ModuleOptionsEnum) => {
    modulesToRun.add(module);
  });

  console.debug(opts);

  const qualwebOptions: QualwebOptions = {
    url: opts.url,
    file: opts.file,
    modules: [],
  };

  if (modulesToRun.has(ModuleOptionsEnum.ACTRules)) {
    // Set bailAfterParsing to true if already true or validation failed.
    bailAfterParsing = bailAfterParsing || validateActRuleOptions(opts) === false;

    // Build ACT rule module for QW.

    // I'm not sure how the ACTRules module handles conflicting filter lists,
    // but at this point in execution it's better to defer to it than add
    // additional validations of our own.
    qualwebOptions.modules.push(new ACTRules({
      include: opts.actRules?.ok,
      exclude: opts.excludeAct?.ok,
      levels: opts.actLevels,
    }));
  }

  if (bailAfterParsing) {
    console.error('One or more inputs were invalid. Please correct them and try again.');
    return;
  }

  // const qw = new QualWeb();

  // await qw.start();

  // const reports = await qw.evaluate(qualwebOptions);

  // console.debug(reports);

  // await qw.stop();
}

main();