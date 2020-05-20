'use strict';

import { ACTROptions, ACTRulesReport } from '@qualweb/act-rules';
import { SourceHtml } from '@qualweb/core';
import { Optimization } from '@qualweb/util';
import CSSselect from 'css-select';
import * as rules from './lib/rules';

import mapping from './lib/mapping';
import { QWPage } from '@qualweb/qw-page';

class ACTRules {

  private optimization: Optimization;
  private rules: any;
  private rulesToExecute: any;

  constructor(options?: ACTROptions) {
    this.rules = {};
    this.rulesToExecute = {};
    this.optimization = Optimization.Performance;

    for (const rule of Object.keys(rules) || []) {
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

  private executeSourceHtmlMappedRules(report: ACTRulesReport, html: SourceHtml, selectors: string[], mappedRules: any): void {
    for (const selector of selectors || []) {
      for (const rule of mappedRules[selector] || []) {
        if (this.rulesToExecute[rule]) {
          const elements = CSSselect(selector, html.html.parsed);
          if (elements.length > 0) {
            for (const elem of elements || []) {
              this.rules[rule].execute(elem, html);
            }
          } else {
            this.rules[rule].execute(undefined, html);
          }
          report.assertions[rule] = this.rules[rule].getFinalResults();
          report.metadata[report.assertions[rule].metadata.outcome]++;
          this.rules[rule].reset();
        }
      }
    }
  }

  private executeRule(rule: string, selector: string, page: QWPage, report: ACTRulesReport, concurrent: boolean): void {
    const promises = new Array<any>();
    if (rule === 'QW-ACT-R37') {
      this.rules[rule].execute(undefined, page, this.optimization);
    } else {
      const elements = page.getElements(selector);
      if (elements.length > 0) {
        for (const elem of elements || []) {
          if (concurrent) {
            promises.push(this.rules[rule].execute(elem, page, this.optimization));
          } else {
            this.rules[rule].execute(elem, page, this.optimization);
          }
        }
      } else {
        this.rules[rule].execute(undefined, page, this.optimization);
      }
    }


    report.assertions[rule] = this.rules[rule].getFinalResults();
    report.metadata[report.assertions[rule].metadata.outcome]++;
    this.rules[rule].reset();
  }

  private executePageMappedRules(report: ACTRulesReport, page: QWPage, selectors: string[], mappedRules: any, concurrent: boolean): void {
    const promises = new Array<any>();
    for (const selector of selectors || []) {
      for (const rule of mappedRules[selector] || []) {
        if (this.rulesToExecute[rule]) {
          promises.push(this.executeRule(rule, selector, page, report, concurrent));
        }
      }
    }
  }

  private executeNotMappedRules(report: ACTRulesReport, stylesheets: any[]): void{
    if (this.rulesToExecute['QW-ACT-R7']) {
      this.rules['QW-ACT-R7'].unmappedExecute(stylesheets);
      report.assertions['QW-ACT-R7'] = this.rules['QW-ACT-R7'].getFinalResults();
      report.metadata[report.assertions['QW-ACT-R7'].metadata.outcome]++;
      this.rules['QW-ACT-R7'].reset();
    }
  }

  private executeNonConcurrentRules(report: ACTRulesReport, html: SourceHtml, page: QWPage): void {
    this.executeSourceHtmlMappedRules(report, html, Object.keys(mapping.non_concurrent.pre), mapping.non_concurrent.pre),
      this.executePageMappedRules(report, page, Object.keys(mapping.non_concurrent.post), mapping.non_concurrent.post, false)
  }

  private executeConcurrentRules(report: ACTRulesReport, html: SourceHtml, page: QWPage): void {
    this.executeSourceHtmlMappedRules(report, html, Object.keys(mapping.concurrent.pre), mapping.concurrent.pre)
    this.executePageMappedRules(report, page, Object.keys(mapping.concurrent.post), mapping.concurrent.post, true)
  }

  public execute(sourceHtml: SourceHtml, page: QWPage, stylesheets: any[]): ACTRulesReport {

    const report: ACTRulesReport = {
      type: 'act-rules',
      metadata: {
        passed: 0,
        warning: 0,
        failed: 0,
        inapplicable: 0
      },
      assertions: {}
    };

    page.processShadowDom();

    this.executeNonConcurrentRules(report, sourceHtml, page)
    this.executeConcurrentRules(report, sourceHtml, page)
    this.executeNotMappedRules(report, stylesheets)

    return report;
  }
}

export {
  ACTRules
};