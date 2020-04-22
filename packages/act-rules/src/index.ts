'use strict';

import { ACTROptions, ACTRulesReport } from '@qualweb/act-rules';
import { SourceHtml } from '@qualweb/core';
import { ShadowDomUtils, Optimization } from '@qualweb/util';
import CSSselect from 'css-select';
import { Page } from 'puppeteer';

import * as rules from './lib/rules';

import mapping from './lib/mapping';

class ACTRules {

  private optimization: Optimization;
  private rules: any;
  private rulesToExecute: any;

  constructor(options?: ACTROptions) {
    this.rules = {};
    this.rulesToExecute = {};
    this.optimization = Optimization.Performance;

    for(const rule of Object.keys(rules) || []) {
      const _rule = rule.replace(/_/g, '-');
      this.rules[_rule] = new rules[rule]();
      this.rulesToExecute[_rule] = true;
    }

    if (options) {
      this.configure(options);
    }
  }

  public configure(options: ACTROptions): void {
    this.resetConfiguration();

    if (options.principles) {
      options.principles = options.principles.map(p => (p.charAt(0).toUpperCase() + p.toLowerCase().slice(1)).trim());
    }
    if (options.levels) {
      options.levels = options.levels.map(l => l.toUpperCase().trim());
    }
    if (options.rules) {
      options.rules = options.rules.map(r => {
        return r.toLowerCase().startsWith('qw') ? r.toUpperCase().trim() : r.trim();
      });
    }

    for (const rule of Object.keys(this.rules) || []) {
      if (options.principles && options.principles.length !== 0) {
        if (options.levels && options.levels.length !== 0) {
          if (!this.rules[rule].hasPrincipleAndLevels(options.principles, options.levels)) {
            this.rulesToExecute[rule] = false;
          }
        } else if (!this.rules[rule].hasPrincipleAndLevels(options.principles, ['A', 'AA', 'AAA'])) {
          this.rulesToExecute[rule] = false;
        }
      } else if (options.levels && options.levels.length !== 0) {
        if (!this.rules[rule].hasPrincipleAndLevels(['Perceivable', 'Operable', 'Understandable', 'Robust'], options.levels)) {
          this.rulesToExecute[rule] = false;
        }
      }
      if (!options.principles && !options.levels) {
        if (options.rules && options.rules.length !== 0) {
          if (!options.rules.includes(rule) && !options.rules.includes(this.rules[rule].getRuleMapping())) {
            this.rulesToExecute[rule] = false;
          } else {
            this.rulesToExecute[rule] = true;
          }
        }
      } else {
        if (options.rules && options.rules.length !== 0) {
          if (options.rules.includes(rule) || options.rules.includes(this.rules[rule].getRuleMapping())) {
            this.rulesToExecute[rule] = true;
          }
        }
      }
    }

    if (options.optimize) {
      if (options.optimize.toLowerCase() === 'performance') {
        this.optimization = Optimization.Performance;
      } else if (options.optimize.toLowerCase() === 'error-detection') {
        this.optimization = Optimization.ErrorDetection;
      }
    }
  }

  public resetConfiguration(): void {
    for (const rule in this.rulesToExecute || {}) {
      this.rulesToExecute[rule] = true;
    }
  }

  private async executeSourceHtmlMappedRules(report: ACTRulesReport, html: SourceHtml, selectors: string[], mappedRules: any): Promise<void> {
    for (const selector of selectors || []) {
      for (const rule of mappedRules[selector] || []) {
        if (this.rulesToExecute[rule]) {
          const elements = CSSselect(selector, html.html.parsed);
          if (elements.length > 0) {
            for (const elem of elements || []) {
              await this.rules[rule].execute(elem, html);
            }
          } else {
            await this.rules[rule].execute(undefined, html);
          }
          report.rules[rule] = this.rules[rule].getFinalResults();
          report.metadata[report.rules[rule].metadata.outcome]++;
          this.rules[rule].reset();
        }
      }
    }
  }

  private async executeRule(rule: string, selector: string, page: Page, report: ACTRulesReport, concurrent: boolean): Promise<void> {
    const promises = new Array<any>();
    if(rule === 'QW-ACT-R37'){
      await this.rules[rule].execute(undefined, page, this.optimization);
    }else{
      const elements = await page.$$(selector);
      if (elements.length > 0) {
        for (const elem of elements || []) {
          if (concurrent) {
            promises.push(this.rules[rule].execute(elem, page, this.optimization));
          } else {
            await this.rules[rule].execute(elem, page, this.optimization);
          }
        }
      } else {
        await this.rules[rule].execute(undefined, page, this.optimization);
      }
    }

    if (concurrent) {
      await Promise.all(promises);
    }

    report.rules[rule] = this.rules[rule].getFinalResults();
    report.metadata[report.rules[rule].metadata.outcome]++;
    this.rules[rule].reset();
  }

  private async executePageMappedRules(report: ACTRulesReport, page: Page, selectors: string[], mappedRules: any, concurrent: boolean): Promise<void> {
    const promises = new Array<any>();
    for (const selector of selectors || []) {
      for (const rule of mappedRules[selector] || []) {
        if (this.rulesToExecute[rule]) {
          promises.push(this.executeRule(rule, selector, page, report, concurrent));
        }
      }
    }
    await Promise.all(promises);
  }

  private async executeNotMappedRules(report: ACTRulesReport, stylesheets: any[]): Promise<void> {
    if (this.rulesToExecute['QW-ACT-R7']) {
      await this.rules['QW-ACT-R7'].unmappedExecute(stylesheets);
      report.rules['QW-ACT-R7'] = this.rules['QW-ACT-R7'].getFinalResults();
      report.metadata[report.rules['QW-ACT-R7'].metadata.outcome]++;
      this.rules['QW-ACT-R7'].reset();
    }
  }

  private async executeNonConcurrentRules(report: ACTRulesReport, html: SourceHtml, page: Page): Promise<void> {
    await Promise.all([
      this.executeSourceHtmlMappedRules(report, html, Object.keys(mapping.non_concurrent.pre), mapping.non_concurrent.pre),
      this.executePageMappedRules(report, page, Object.keys(mapping.non_concurrent.post), mapping.non_concurrent.post, false)
    ]);
  }

  private async executeConcurrentRules(report: ACTRulesReport, html: SourceHtml, page: Page): Promise<void> {
    await Promise.all([
      this.executeSourceHtmlMappedRules(report, html, Object.keys(mapping.concurrent.pre), mapping.concurrent.pre),
      this.executePageMappedRules(report, page, Object.keys(mapping.concurrent.post), mapping.concurrent.post, true)
    ]);
  }

  public async execute(sourceHtml: SourceHtml, page: Page, stylesheets: any[]): Promise<ACTRulesReport> {

    const report: ACTRulesReport = {
      type: 'act-rules',
      metadata: {
        passed: 0,
        warning: 0,
        failed: 0,
        inapplicable: 0
      },
      rules: {}
    };

    page = await ShadowDomUtils.processShadowDom(page);

    await Promise.all([
      this.executeNonConcurrentRules(report, sourceHtml, page),
      this.executeConcurrentRules(report, sourceHtml, page),
      this.executeNotMappedRules(report, stylesheets)
    ]);

    return report;
  }
}

export {
  ACTRules
};