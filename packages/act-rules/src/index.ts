/**
 *
 */
'use strict';

import { DomElement } from 'htmlparser2';
import { ACTROptions, ACTRulesReport } from '@qualweb/act-rules';
import { CSSStylesheet } from '@qualweb/get-dom-puppeteer';
const stew = new(require('stew-select')).Stew();

import mapping from './rules/mapping.json';

import { rules, rulesToExecute } from './rules';

function configure(options: ACTROptions): void {
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

  for (const rule of Object.keys(rules) || []) {
    if (options.principles && options.principles.length !== 0) {
      if (options.levels && options.levels.length !== 0) {
        if (!rules[rule].hasPrincipleAndLevels(options.principles, options.levels)) {
          rulesToExecute[rule] = false;
        }
      } else if (!rules[rule].hasPrincipleAndLevels(options.principles, ['A', 'AA', 'AAA'])) {
        rulesToExecute[rule] = false;
      }
    } else if (options.levels && options.levels.length !== 0) {
      if (!rules[rule].hasPrincipleAndLevels(['Perceivable', 'Operable', 'Understandable', 'Robust'], options.levels)) {
        rulesToExecute[rule] = false;
      }
    }
    if (!options.principles && !options.levels) {
      if (options.rules && options.rules.length !== 0) {
        if (!options.rules.includes(rule) && !options.rules.includes(rules[rule].getRuleMapping())) {
          rulesToExecute[rule] = false;
        }
      }
    } else {
      if (options.rules && options.rules.length !== 0) {
        if (options.rules.includes(rule) || options.rules.includes(rules[rule].getRuleMapping())) {
          rulesToExecute[rule] = true;
        }
      }
    }
  }
}

function resetConfiguration(): void {
  for (const rule in rulesToExecute) {
    rulesToExecute[rule] = true;
  }
}

async function executeMappedRules(url: string, report: ACTRulesReport, html: DomElement[], selectors: string[], mappedRules: any): Promise<void> {
  for (const selector of selectors || []) {
    for (const rule of mappedRules[selector] || []) {
      if (rulesToExecute[rule]) {
        const elements = stew.select(html, selector);
        if (elements.length > 0) {
          for (const elem of elements || []) {
            await rules[rule].execute(elem, html, url);
          }
        } else {
          await rules[rule].execute(undefined, html, url);
        }
        report.rules[rule] = rules[rule].getFinalResults();
        report.metadata[report.rules[rule].metadata.outcome]++;
        rules[rule].reset();
      }
    }
  }
}

async function executeNotMappedRules(report: ACTRulesReport, stylesheets: CSSStylesheet[]): Promise<void> {
  if (rulesToExecute['QW-ACT-R7']) {
    await rules['QW-ACT-R7'].unmappedExecute(stylesheets);
    report.rules['QW-ACT-R7'] = rules['QW-ACT-R7'].getFinalResults();
    report.metadata[report.rules['QW-ACT-R7'].metadata.outcome]++;
    rules['QW-ACT-R7'].reset();
  }
}

async function executeACTR(url: string, sourceHTML: DomElement[], processedHTML: DomElement[], stylesheets: CSSStylesheet[]): Promise<ACTRulesReport> {
  
  if (sourceHTML === null || sourceHTML === undefined) {
    throw new Error(`Source html can't be null or undefined`);
  }

  if (processedHTML === null || processedHTML === undefined) {
    throw new Error(`Processed html can't be null or undefined`);
  }

  const report: ACTRulesReport = {
    type: 'act-rules',
    metadata: {
      passed: 0,
      failed: 0,
      inapplicable: 0
    },
    rules: {}
  };

  await executeMappedRules(url, report, sourceHTML, Object.keys(mapping.pre), mapping.pre);
  await executeMappedRules(url, report, processedHTML, Object.keys(mapping.post), mapping.post);

  await executeNotMappedRules(report, stylesheets);

  return report;
}

export {
  configure,
  executeACTR,
  resetConfiguration
};