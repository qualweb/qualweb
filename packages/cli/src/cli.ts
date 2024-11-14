/**
 * Newer CommanderJS-based approach. Allows for better control of options.
 */

import { Command, Option } from 'commander';

import { ModuleOptionsEnum } from './lib/types';

import { addActRuleOptionsToCommand } from './lib/options/actRules';
import { addBestPracticeOptionsToCommand } from './lib/options/bestPractices';
import { addWcagTechniqueOptionsToCommand } from './lib/options/wcagTechniques';
import { addOutputOptions } from './lib/options/output';
import { addInputOptionsToCommand } from './lib/options/input';
import { addViewportOptions } from './lib/options/viewport';
import { addPuppeteerOptions } from './lib/options/puppeteer';

import { ListActRulesCommand } from './lib/commands/listActRules';
import { ListWcagTechniquesCommand } from './lib/commands/listWcagTechniques';
import { ListBestPracticesCommand } from './lib/commands/listBestPractices';
import { EvaluateAction } from './lib/evaluateAction';

async function main(): Promise<void> {
  // Base command. This is the root of the CLI and will by default run the
  // "evaluate" portion of functionality.
  const program = new Command('qualweb-cli');

  // Add general options.

  // Input options are the URLs to evaluate/crawl.
  addInputOptionsToCommand(program);

  // Which module(s) to run during evaluation.
  const moduleToRunOption = new Option('-m, --module <modules...>', 'Modules to run')
    // Use enum values for choices to avoid typos and string repetition.
    .choices(Object.values(ModuleOptionsEnum))
    .default([])
    ;
  program.addOption(moduleToRunOption);

  // Viewport options modify the browser viewport when evaluating.
  addViewportOptions(program);

  // Puppeteer options to modify browser behavior.
  addPuppeteerOptions(program);

  // Output options. Do we write to stdout or a file, and which format?
  addOutputOptions(program);

  // Add module-specific options (include/exclude lists).
  addActRuleOptionsToCommand(program);
  addWcagTechniqueOptionsToCommand(program);
  addBestPracticeOptionsToCommand(program);

  // Add "list-x" subcommands. These just list out the known rules for a given
  // module, then exit.
  program.addCommand(ListActRulesCommand);
  program.addCommand(ListWcagTechniquesCommand);
  program.addCommand(ListBestPracticesCommand);

  // Set the default callback to run when the command is run. This is the
  // regular evaluation flow, as opposed to a subcommand.
  program.action(EvaluateAction);

  // Parse command line. This will run the appropriate action callback, either
  // the default (evaluation) or a subcommand.
  await program.parseAsync();
}

main();