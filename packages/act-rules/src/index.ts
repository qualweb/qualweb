'use strict';

import { ACTROptions, ACTRulesReport } from '@qualweb/act-rules';
import { SourceHtml } from '@qualweb/core';
const stew = new(require('stew-select')).Stew();
import { Page } from 'puppeteer';

import QW_ACT_R1 from './rules/QW-ACT-R1';
import QW_ACT_R2 from './rules/QW-ACT-R2';
import QW_ACT_R3 from './rules/QW-ACT-R3';
import QW_ACT_R4 from './rules/QW-ACT-R4';
import QW_ACT_R5 from './rules/QW-ACT-R5';
import QW_ACT_R6 from './rules/QW-ACT-R6';
import QW_ACT_R7 from './rules/QW-ACT-R7';
import QW_ACT_R8 from './rules/QW-ACT-R8';
import QW_ACT_R9 from './rules/QW-ACT-R9';
import QW_ACT_R10 from './rules/QW-ACT-R10';
import QW_ACT_R11 from './rules/QW-ACT-R11';
import QW_ACT_R12 from './rules/QW-ACT-R12';
import QW_ACT_R13 from './rules/QW-ACT-R13';
import QW_ACT_R14 from './rules/QW-ACT-R14';
import QW_ACT_R15 from './rules/QW-ACT-R15';
import QW_ACT_R16 from './rules/QW-ACT-R16';
import QW_ACT_R17 from './rules/QW-ACT-R17';
import QW_ACT_R18 from './rules/QW-ACT-R18';
import QW_ACT_R19 from './rules/QW-ACT-R19';
import QW_ACT_R20 from './rules/QW-ACT-R20';
import QW_ACT_R21 from './rules/QW-ACT-R21';
import QW_ACT_R22 from './rules/QW-ACT-R22';
import QW_ACT_R23 from './rules/QW-ACT-R23';
import QW_ACT_R25 from './rules/QW-ACT-R25';
import QW_ACT_R26 from './rules/QW-ACT-R26';
import QW_ACT_R30 from './rules/QW-ACT-R30';
import QW_ACT_R31 from './rules/QW-ACT-R31';

import mapping from './rules/mapping';

class ACTRules {

  rules: any;

  rulesToExecute = {
    'QW-ACT-R1': true,
    'QW-ACT-R2': true,
    'QW-ACT-R3': true,
    'QW-ACT-R4': true,
    'QW-ACT-R5': true,
    'QW-ACT-R6': true,
    'QW-ACT-R7': true,
    'QW-ACT-R8': true,
    'QW-ACT-R9': false,
    'QW-ACT-R10': false,
    'QW-ACT-R11': true,
    'QW-ACT-R12': true,
    'QW-ACT-R13': true,
    'QW-ACT-R14': true,
    'QW-ACT-R15': false,
    'QW-ACT-R16': true,
    'QW-ACT-R17': true,
    'QW-ACT-R18': true,
    'QW-ACT-R19': true,
    'QW-ACT-R20': true,
    'QW-ACT-R21': true,
    'QW-ACT-R22': true,
    'QW-ACT-R23': false,
    'QW-ACT-R25': false,
    'QW-ACT-R26': false,
    'QW-ACT-R30': true,
    'QW-ACT-R31': false
  };

  constructor(options?: ACTROptions) {
    this.rules = {
      'QW-ACT-R1': new QW_ACT_R1(),
      'QW-ACT-R2': new QW_ACT_R2(),
      'QW-ACT-R3': new QW_ACT_R3(),
      'QW-ACT-R4': new QW_ACT_R4(),
      'QW-ACT-R5': new QW_ACT_R5(),
      'QW-ACT-R6': new QW_ACT_R6(),
      'QW-ACT-R7': new QW_ACT_R7(),
      'QW-ACT-R8': new QW_ACT_R8(),
      'QW-ACT-R9': new QW_ACT_R9(),
      'QW-ACT-R10': new QW_ACT_R10(),
      'QW-ACT-R11': new QW_ACT_R11(),
      'QW-ACT-R12': new QW_ACT_R12(),
      'QW-ACT-R13': new QW_ACT_R13(),
      'QW-ACT-R14': new QW_ACT_R14(),
      'QW-ACT-R15': new QW_ACT_R15(),
      'QW-ACT-R16': new QW_ACT_R16(),
      'QW-ACT-R17': new QW_ACT_R17(),
      'QW-ACT-R18': new QW_ACT_R18(),
      'QW-ACT-R19': new QW_ACT_R19(),
      'QW-ACT-R20': new QW_ACT_R20(),
      'QW-ACT-R21': new QW_ACT_R21(),
      'QW-ACT-R22': new QW_ACT_R22(),
      'QW-ACT-R23': new QW_ACT_R23(),
      'QW-ACT-R25': new QW_ACT_R25(),
      'QW-ACT-R26': new QW_ACT_R26(),
      'QW-ACT-R30': new QW_ACT_R30(),
      'QW-ACT-R31': new QW_ACT_R31()
    };

    if (options) {
      this.configure(options);
    }
  }

  public configure(options: ACTROptions): void {
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
  }

  public resetConfiguration(): void {
    for (const rule in this.rulesToExecute) {
      this.rulesToExecute[rule] = true;
    }
  }

  private async executeSourceHtmlMappedRules(report: ACTRulesReport, html: SourceHtml, selectors: string[], mappedRules: any): Promise<void> {
    for (const selector of selectors || []) {
      for (const rule of mappedRules[selector] || []) {
        if (this.rulesToExecute[rule]) {
          const elements = stew.select(html.html.parsed, selector);
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
    const elements = await page.$$(selector);
    if (elements.length > 0) {
      for (const elem of elements || []) {
        if (concurrent) {
          promises.push(this.rules[rule].execute(elem, page));
        } else {
          await this.rules[rule].execute(elem, page);
        }
      }
    } else {
      await this.rules[rule].execute(undefined, page);
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

    await Promise.all([
      this.executeNonConcurrentRules(report, sourceHtml, page),
      this.executeConcurrentRules(report, sourceHtml, page),
      this.executeNotMappedRules(report, stylesheets)
    ]);

    //await executeSourceHtmlMappedRules(report, sourceHtml, Object.keys(mapping.pre), mapping.pre);
    //await executePageMappedRules(report, page, Object.keys(mapping.post), mapping.post);

    //await executeNotMappedRules(report, stylesheets);
    
    return report;
  }
}

export {
  ACTRules
};