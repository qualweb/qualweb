/**
 * Newer CommanderJS-based approach. Allows for better control of options.
 */
import { Command, Option, OptionValues } from 'commander';

import { ACTRules } from '@qualweb/act-rules';
import { QualwebOptions } from '@qualweb/core';
import { addActRuleOptionsToCommand, addInputOptionsToCommand, addListActRulesSubcommand } from './lib/actRules';
import { ModuleOptionsEnum } from './lib/types';
import { addOutputOptions } from './lib/outputOptions';

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
    .default([])
    ;
  program.addOption(moduleToRunOption);

  /** GENERAL options */
  addOutputOptions(program);

  /** ACT options */
  addActRuleOptionsToCommand(program);

  // Add list-act-rules subcommand to dump known ACT rules to output.
  addListActRulesSubcommand(program);

  program.parse();

  const opts = program.opts();

  opts.module.forEach((module: ModuleOptionsEnum) => {
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