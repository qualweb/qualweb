/**
 * 
 */
'use strict';

import { DomElement } from 'htmlparser2';
import { ACTROptions, ACTRulesReport } from '@qualweb/act-rules';
const stew = new(require('stew-select')).Stew();

import mapping from './rules/mapping.json';

import * as R11 from './rules/R11';
import * as R12 from './rules/R12';
import * as R13 from './rules/R13';
import * as R23 from './rules/R23';
import * as R28 from './rules/R28';

const rules = {
  'R11': R11,
  'R12': R12,
  'R13': R13,
  'R23': R23,
  'R28': R28
};

const rules_to_execute = {
  'R11': true,
  'R12': true,
  'R13': true,
  'R23': true,
  'R28': true
};

function configure(options: ACTROptions): void {
  for (const rule of Object.keys(rules) || []) {
    
    if (options.principles && options.principles.length !== 0) {
      if (options.levels && options.levels.length !== 0) {
        if (!rules[rule].hasPrincipleAndLevels(options.principles, options.levels)) {
          rules_to_execute[rule] = false;
        }
      } else if (!rules[rule].hasPrincipleAndLevels(options.principles, ['A', 'AA', 'AAA'])) {
        rules_to_execute[rule] = false;
      }
    } else if (options.levels && options.levels.length !== 0) {
      if (!rules[rule].hasPrincipleAndLevels(['Perceivable', 'Operable', 'Understandable', 'Robust'], options.levels)) {
        rules_to_execute[rule] = false;
      }
    }
    if (!options.principles && !options.levels) {
      if (options.rules && options.rules.length !== 0) {
        if (!options.rules.includes(rule)) {
          rules_to_execute[rule] = false;
        }
      }
    } else {
      if (options.rules && options.rules.length !== 0) {
        if (options.rules.includes(rule)) {
          rules_to_execute[rule] = true;
        }
      }
    }
  }
}

async function executeACTR(sourceHTML: DomElement[], processedHTML: DomElement[]): Promise<ACTRulesReport> {
  
  const report: ACTRulesReport = {
    type: 'act-rules',
    rules: {}
  };

  const preRules = mapping['pre'];
  const preSelectors = Object.keys(preRules);
  
  for (const selector of preSelectors || []) {
    for (const rule of preRules[selector] || []) {
      if (rules_to_execute[rule]) {        
        let elements = stew.select(sourceHTML, selector);
        if (elements.length > 0) {
          for (const elem of elements || []) {
            await rules[rule].execute(elem, sourceHTML);
          }
        } else {
          await rules[rule].execute(undefined, sourceHTML);
        }
        report.rules[rule] = rules[rule].getFinalResults();
        rules[rule].reset();
      }
    }
  }

  const postRules = mapping['post'];
  const postSelectors = Object.keys(postRules);
  
  for (const selector of postSelectors || []) {
    for (const rule of postRules[selector] || []) {
      if (rules_to_execute[rule]) {        
        let elements = stew.select(processedHTML, selector);
        if (elements.length > 0) {
          for (const elem of elements || []) {
            await rules[rule].execute(elem, processedHTML);
          }
        } else {
          await rules[rule].execute(undefined, processedHTML);
        }
        report.rules[rule] = rules[rule].getFinalResults();
        rules[rule].reset();
      }
    }
  }

  return report;
}

export { configure, executeACTR };