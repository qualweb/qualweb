/**
 * 
 */
'use strict';

import { DomElement } from 'htmlparser2';
import { ACTROptions, ACTRulesReport } from '@qualweb/act-rules';
const stew = new(require('stew-select')).Stew();

import mapping from './rules/mapping.json';

import * as QW_ACT_R1 from './rules/QW-ACT-R1';
import * as QW_ACT_R2 from './rules/QW-ACT-R2';
import * as QW_ACT_R3 from './rules/QW-ACT-R3';
import * as QW_ACT_R4 from './rules/QW-ACT-R4';
import * as QW_ACT_R5 from './rules/QW-ACT-R5';

const rules = {
  'QW-ACT-R1': QW_ACT_R1,
  'QW-ACT-R2': QW_ACT_R2,
  'QW-ACT-R3': QW_ACT_R3,
  'QW-ACT-R4': QW_ACT_R4,
  'QW-ACT-R5': QW_ACT_R5
};

const rules_to_execute = {
  'QW-ACT-R1': true,
  'QW-ACT-R2': true,
  'QW-ACT-R3': true,
  'QW-ACT-R4': true,
  'QW-ACT-R5': true
};

function configure(options: ACTROptions): void {
  if (options.principles) {
    options.principles = options.principles.map(p => (p.charAt(0).toUpperCase() + p.slice(1)).trim());
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
        if (!options.rules.includes(rule) && !options.rules.includes(rules[rule].getRuleMapping())) {
          rules_to_execute[rule] = false;
        }
      }
    } else {
      if (options.rules && options.rules.length !== 0) {
        if (options.rules.includes(rule) || options.rules.includes(rules[rule].getRuleMapping())) {
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