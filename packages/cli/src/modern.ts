/**
 * Newer CommanderJS-based approach. Allows for better control of options.
 */
import { promises as fs } from 'node:fs';

import { Command, InvalidOptionArgumentError, Option, OptionValues } from 'commander';
import { ACTRules } from '@qualweb/act-rules';
import { QualWeb, QualwebOptions } from '@qualweb/core';
import { ActRuleOptions, addActRuleOptionsToCommand, addListActRulesSubcommand } from './lib/actRules';
import { ModuleOptionsEnum } from './lib/types';
import { addOutputOptions, OutputFormatEnum, OutputOptions } from './lib/outputOptions';
import { addInputOptionsToCommand, InputOptions } from './lib/inputOptions';
import { addListWcagTechniquesSubcommand, addWcagTechniqueOptionsToCommand, WcagTechniqueOptions } from './lib/wcagTechniques';
import { WCAGTechniques } from '@qualweb/wcag-techniques';
import { addBestPracticeOptionsToCommand, addListBestPracticesSubcommand, BestPracticesOptions } from './lib/bestPractices';
import { BestPractices } from '@qualweb/best-practices';
import { generateEARLReport } from '@qualweb/earl-reporter';
import { addViewportOptions, ViewportOptions } from './lib/viewportOptions';
import { addPuppeteerOptions, PuppeteerOptions } from './lib/puppeteerOptions';

/**
 * Aggregate type containing all option types that have been separately imported
 * and added to the command.
 * This helps us make sure that {@link Command.opts()} yields a typed object,
 * but isn't the most elegant way to ensure typing (typing and adding are done
 * separately).
 */
type ParsedCommandOptions = { module: ModuleOptionsEnum[] }
  & InputOptions
  & OutputOptions
  & ViewportOptions
  & PuppeteerOptions
  & ActRuleOptions
  & WcagTechniqueOptions
  & BestPracticesOptions
  ;

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
  addListActRulesSubcommand(program);
  addListWcagTechniquesSubcommand(program);
  addListBestPracticesSubcommand(program);

  // Set the default callback to run when the command is run. This is the
  // regular evaluation flow, as opposed to a subcommand.
  program.action(async () => {
    const opts = program.opts<ParsedCommandOptions>();

    // If set to true, the program will abort after parsing args but before
    // running QualWeb. This is so we can report all user input errors at once
    // instead of halting at every one.
    let bailAfterParsing: boolean = false;

    // Use a set to check for modules to run. Since the "imply" for Options don't
    // have good semantics for arrays/inclusion, we instead populate this set
    // right after parsing (from --module) and when checking/validating module
    // options (in essence, our own "imply" logic).
    const modulesToRun: Set<ModuleOptionsEnum> = new Set();

    // Dump the list of modules into a set instead. Simpler to check/set values
    // without having to iterate ourselves.
    opts.module.forEach((module: ModuleOptionsEnum) => {
      modulesToRun.add(module);
    });

    const qualwebOptions: QualwebOptions = {
      url: opts.url,
      file: opts.file,
      modules: [],
      
      maxParallelEvaluations: opts.maxParallelEvaluations,
      waitUntil: opts.waitUntil,
      timeout: opts.timeout,
    };

    // Set viewport options, if any one option was set.
    if (opts.viewportResolution || opts.mobile || opts.orientation || opts.userAgent) {
      qualwebOptions.viewport = {
        mobile: opts.mobile,
        landscape: opts.orientation === 'landscape',
        userAgent: opts.userAgent,
        resolution: opts.viewportResolution,
      };
    }

    // Set ACTRules module flag if any of the ACT options were set.
    if (opts.actLevels || opts.actPrinciples || opts.excludeAct || opts.actRules) {
      modulesToRun.add(ModuleOptionsEnum.ACTRules);
    }

    if (modulesToRun.has(ModuleOptionsEnum.ACTRules)) {
      // We don't make any assumptions about conflicts between include/exclude here.
      // We're only concerned with whether they contain any invalid rules.
      
      if (opts.actRules && opts.actRules.error.length > 0) {
        console.error(`Unknown ACT rules in inclusion list: ${opts.actRules.error.join(', ')}`);
        bailAfterParsing = true;
      }
    
      if (opts.excludeAct && opts.excludeAct.error.length > 0) {
        console.error(`Unknown ACT rules in exclusion list: ${opts.excludeAct.error.join(', ')}`);
        bailAfterParsing = true;
      }

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

    // Set WcagTechniques module flag if any of the WCAG techniques options were set.
    if (opts.wcagLevels && opts.wcagPrinciples || opts.wcagTechniques || opts.excludeWcag) {
      modulesToRun.add(ModuleOptionsEnum.WCAGTechniques);
    }

    if (modulesToRun.has(ModuleOptionsEnum.WCAGTechniques)) {
      // Check for errors in lists and set the error/bail flag if so.

      if (opts.wcagTechniques && opts.wcagTechniques.error.length > 0) {
        console.error(`Unknown WCAG techniques in inclusion list: ${opts.wcagTechniques.error.join(', ')}`);
        bailAfterParsing = false;
      }
    
      if (opts.excludeWcag && opts.excludeWcag.error.length > 0) {
        console.error(`Unknown WCAG techniques in exclusion list: ${opts.excludeWcag.error.join(', ')}`);
        bailAfterParsing = false;
      }

      qualwebOptions.modules.push(new WCAGTechniques({
        include: opts.actRules?.ok,
        exclude: opts.excludeAct?.ok,
        levels: opts.actLevels,
      }));
    }

    // Set BestPractices module flag if any of the BP options were set.
    if (opts.bestPractices || opts.excludeBp) {
      modulesToRun.add(ModuleOptionsEnum.BestPractices);
    }

    if (modulesToRun.has(ModuleOptionsEnum.BestPractices)) {
      // Check for errors in lists and set the error/bail flag if so.

      if (opts.bestPractices && opts.bestPractices.error.length > 0) {
        console.error(`Unknown best practices in inclusion list: ${opts.bestPractices.error.join(', ')}`);
        bailAfterParsing = false;
      }
    
      if (opts.excludeWcag && opts.excludeWcag.error.length > 0) {
        console.error(`Unknown best practices in exclusion list: ${opts.excludeWcag.error.join(', ')}`);
        bailAfterParsing = false;
      }

      qualwebOptions.modules.push(new BestPractices({
        include: opts.actRules?.ok,
        exclude: opts.excludeAct?.ok,
      }));
    }

    if (modulesToRun.size === 0) {
      // If NO modules were set explicitly OR implicitly, enable all of them.
      qualwebOptions.modules.push(
        new ACTRules(),
        new BestPractices(),
        new WCAGTechniques(),
      );
    }

    if (bailAfterParsing) {
      console.error('One or more inputs were invalid. Please correct them and try again.');
      return;
    }

    /** Run QualWeb with options */

    const qw = new QualWeb();

    await qw.start();

    const reports = await qw.evaluate(qualwebOptions);

    await qw.stop();

    /** Return data to user */

    let outputString: string;

    switch (opts.format) {
      case 'json':
        outputString = JSON.stringify(reports, null, 2);
        break;
      case 'earl':
        outputString = JSON.stringify(generateEARLReport(reports), null, 2);
        break;
      default:
        throw new InvalidOptionArgumentError(`Invalid output format: ${opts.format}`);
    }

    if (opts.outFile) {
      fs.writeFile(opts.outFile, outputString, 'utf-8');
    } else {
      console.info(outputString);
    }
  });

  // Parse command line. This will run the appropriate action callback, either
  // the default (evaluation) or a subcommand.
  await program.parseAsync();
}

main();