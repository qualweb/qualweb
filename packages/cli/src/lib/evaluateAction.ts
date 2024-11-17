import { promises as fs } from 'node:fs';

import { Command, InvalidOptionArgumentError } from 'commander';
import { ActRuleOptions } from './options/actRules';
import { BestPracticesOptions } from './options/bestPractices';
import { InputOptions } from './options/input';
import { OutputOptions } from './options/output';
import { PuppeteerOptions } from './options/puppeteer';
import { ViewportOptions } from './options/viewport';
import { WcagTechniqueOptions } from './options/wcagTechniques';
import { ModuleOptionsEnum } from './types';
import { QualWeb, QualwebOptions } from '@qualweb/core';
import { ACTRules } from '@qualweb/act-rules';
import { WCAGTechniquesModule } from '@qualweb/wcag-techniques/WcagTechniquesModule';
import { BestPractices } from '@qualweb/best-practices';
import { generateEARLReport } from '@qualweb/earl-reporter';
import { Counter } from '@qualweb/counter';

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

/**
 * Wraps the process of converting the parsed command line options into a
 * {@link QualwebOptions} object.
 * 
 * @example
 * ```ts
 * const optionsParser = new QualwebOptionsBuilder(opts);
 * optionsParser.parse(); // Will throw if there are any validation errors.
 * const qwOptions = optionsParser.getQualwebOptions();
 * ```
 */
class QualwebOptionsBuilder {
  /**
   * QualwebOptions object that can be passed to {@link QualWeb.evaluate}. It
   * is populated with a call to {@link parse}.
   */
  protected readonly qualwebOptions: QualwebOptions;

  protected readonly modulesToRun: Set<string>;

  constructor(protected readonly opts: ParsedCommandOptions) {
    this.qualwebOptions = {
      modules: [],
    };

    // Use a set to check for modules to run. Since the "imply" for Options don't
    // have good semantics for arrays/inclusion, we instead populate this set
    // right after parsing (from --module) and when checking/validating module
    // options (in essence, our own "imply" logic).
    this.modulesToRun = new Set(this.opts.module);
  }

  /**
   * Adds an ACTRules module to the QualwebOptions object if any ACT rule
   * options were set.
   * @returns True if there were any validation errors.
   */
  protected validateActRuleOptions(): boolean {
    let hasValidationErrors: boolean = false;

    // Set up ACT rules module if it was set explicitly (--module) or implicitly
    // (via any of the ACT rule filtering options).
    if (this.modulesToRun.has(ModuleOptionsEnum.ACTRules) || this.opts.actLevels || this.opts.actPrinciples || this.opts.excludeAct || this.opts.actRules) {
      // We don't make any assumptions about conflicts between include/exclude here.
      // We're only concerned with whether they contain any invalid rules.
      
      if (this.opts.actRules && this.opts.actRules.error.length > 0) {
        console.error(`Unknown ACT rules in inclusion list: ${this.opts.actRules.error.join(', ')}`);
        hasValidationErrors = true;
      }
    
      if (this.opts.excludeAct && this.opts.excludeAct.error.length > 0) {
        console.error(`Unknown ACT rules in exclusion list: ${this.opts.excludeAct.error.join(', ')}`);
        hasValidationErrors = true;
      }

      // I'm not sure how the ACTRules module handles conflicting filter lists,
      // but at this point in execution it's better to defer to it than add
      // additional validations of our own.
      this.qualwebOptions.modules.push(new ACTRules({
        include: this.opts.actRules?.ok,
        exclude: this.opts.excludeAct?.ok,
        levels: this.opts.actLevels,
      }));
    }

    return hasValidationErrors;
  }

  /**
   * Adds a WCAGTechniques module to the QualwebOptions object if any WCAG
   * technique options were set.
   * @returns True if there were any validation errors.
   */
  protected validateWcagTechniqueOptions(): boolean {
    let hasValidationErrors: boolean = false;

    if (this.modulesToRun.has(ModuleOptionsEnum.WCAGTechniques) || this.opts.wcagLevels || this.opts.wcagPrinciples || this.opts.wcagTechniques || this.opts.excludeWcag) {
      if (this.opts.wcagTechniques && this.opts.wcagTechniques.error.length > 0) {
        console.error(`Unknown WCAG techniques in inclusion list: ${this.opts.wcagTechniques.error.join(', ')}`);
        hasValidationErrors = true;
      }
    
      if (this.opts.excludeWcag && this.opts.excludeWcag.error.length > 0) {
        console.error(`Unknown WCAG techniques in exclusion list: ${this.opts.excludeWcag.error.join(', ')}`);
        hasValidationErrors = true;
      }

        new WCAGTechniquesModule({
    }

    return hasValidationErrors;
  }

  /**
   * Adds a BestPractices module to the QualwebOptions object if any relevant
   * options were set by the user.
   * @returns True if there were any validation errors.
   */
  protected validateBestPracticeOptions(): boolean {
    let hasValidationErrors: boolean = false;

    if (this.modulesToRun.has(ModuleOptionsEnum.BestPractices) || this.opts.bestPractices || this.opts.excludeBp) {
      if (this.opts.bestPractices && this.opts.bestPractices.error.length > 0) {
        console.error(`Unknown best practices in inclusion list: ${this.opts.bestPractices.error.join(', ')}`);
        hasValidationErrors = true;
      }
    
      if (this.opts.excludeWcag && this.opts.excludeWcag.error.length > 0) {
        console.error(`Unknown best practices in exclusion list: ${this.opts.excludeWcag.error.join(', ')}`);
        hasValidationErrors = true;
      }

      this.qualwebOptions.modules.push(new BestPractices({
        include: this.opts.actRules?.ok,
        exclude: this.opts.excludeAct?.ok,
      }));
    }

    return hasValidationErrors;
  }

  protected validateCounterOptions(): boolean {
    if (this.modulesToRun.has(ModuleOptionsEnum.Counter)) {
      this.qualwebOptions.modules.push(new Counter());
    }

    return false;
  }

  /**
   * Transfers viewport options to the QualwebOptions object.
   */
  protected validateViewportOptions(): void {
    // Set viewport options, if any one option was set.
    if (this.opts.viewportResolution || this.opts.mobile || this.opts.orientation || this.opts.userAgent) {
      this.qualwebOptions.viewport = {
        mobile: this.opts.mobile,
        landscape: this.opts.orientation === 'landscape',
        userAgent: this.opts.userAgent,
        resolution: this.opts.viewportResolution,
      };
    }
  }

  /**
   * Transfers Puppeteer options to the QualwebOptions object.
   */
  protected validatePuppeteerOptions(): void {
    this.qualwebOptions.maxParallelEvaluations = this.opts.maxParallelEvaluations;
    this.qualwebOptions.waitUntil = this.opts.waitUntil;
    this.qualwebOptions.timeout = this.opts.timeout;
  }

  /**
   * Transfers input options to the QualwebOptions object.
   */
  protected validateInputOptions(): void {
    this.qualwebOptions.url = this.opts.url;
    this.qualwebOptions.file = this.opts.file;
  }

  /**
   * Parses the options that were passed during construction and puts together
   * a {@link QualwebOptions} object to be retrieved with
   * {@link getQualwebOptions}.
   * This method throws if there are any validation errors. If it returns
   * without issue, the final {@link QualwebOptions} object can be pulled via
   * {@link getQualwebOptions}.
   */
  public parse(): void {
    // Process simple options.
    this.validateViewportOptions();
    this.validatePuppeteerOptions();
    this.validateInputOptions();

    // Process options that require a validation check. If any of these return
    // a validation error, they'll have printed the error to stderr and we can
    // throw at the end to stop more processing.
    const hasValidationErrors =
      this.validateActRuleOptions() ||
      this.validateWcagTechniqueOptions() ||
      this.validateBestPracticeOptions() ||
      this.validateCounterOptions()
      ;

    if (hasValidationErrors) {
      throw new Error('One or more inputs were invalid. Please correct them and try again.');
    }

    // If NO modules were set explicitly OR implicitly, enable all of them as
    // a default.
    if (this.modulesToRun.size === 0) {
      this.qualwebOptions.modules.push(
        new ACTRules(),
        new BestPractices(),
        new WCAGTechniquesModule(),
        new Counter(),
      );
    }
  }

  public getQualwebOptions(): QualwebOptions {
    return this.qualwebOptions;
  }
}

/**
 * Should not be called directly, but used as an action handler/callback for
 * a {@link Command} object.
 * Runs validation on the parsed options and runs them through
 * {@link QualWeb.evaluate}. The results are then output to the console or
 * written to file, depending on options.
 * @param this Should be passed by {@link Command.action} when used as a
 * callback.
 */
export async function EvaluateAction(this: Command): Promise<void> {
  // Validate the CLI options.
  const opts = this.opts<ParsedCommandOptions>();

  const optionsParser = new QualwebOptionsBuilder(opts);

  try {
    optionsParser.parse();
  } catch {
    console.error('One or more inputs were invalid. Please correct them and try again.');
    return;
  }

  const qwOptions = optionsParser.getQualwebOptions();

  // Set up and run QualWeb with the validated options.

  const qw = new QualWeb();

  await qw.start();

  const reports = await qw.evaluate(qwOptions);

  await qw.stop();

  // Return data to user.

  // Construct final output. This is independent of whether we're writing to
  // file or stdout.
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

  // Dump the serialized data to file or stdout.
  if (opts.outFile) {
    await fs.writeFile(opts.outFile, outputString, 'utf-8');
  } else {
    console.info(outputString);
  }
}