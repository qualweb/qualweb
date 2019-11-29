'use strict';

import { CSSTOptions, CSSTechniquesReport } from '@qualweb/css-techniques';
import { CSSStylesheet } from '@qualweb/get-dom-puppeteer';

import { techniques, techniquesToExecute } from './techniques';

function configure(options: CSSTOptions): void {
  if (options.principles) {
    options.principles = options.principles.map(p => (p.charAt(0).toUpperCase() + p.toLowerCase().slice(1)).trim());
  }
  if (options.levels) {
    options.levels = options.levels.map(l => l.toUpperCase().trim());
  }
  if (options.techniques) {
    options.techniques = options.techniques.map(t => t.toUpperCase().trim());
  }

  for (const technique of Object.keys(techniques) || []) {
    techniquesToExecute[technique] = true;

    if (options.principles && options.principles.length !== 0) {
      if (options.levels && options.levels.length !== 0) {
        if (!techniques[technique].hasPrincipleAndLevels(options.principles, options.levels)) {
          techniquesToExecute[technique] = false;
        }
      } else if (!techniques[technique].hasPrincipleAndLevels(options.principles, ['A', 'AA', 'AAA'])) {
        techniquesToExecute[technique] = false;
      }
    } else if (options.levels && options.levels.length !== 0) {
      if (!techniques[technique].hasPrincipleAndLevels(['Perceivable', 'Operable', 'Understandable', 'Robust'], options.levels)) {
        techniquesToExecute[technique] = false;
      }
    }
    if (!options.principles && !options.levels) {
      if (options.techniques && options.techniques.length !== 0) {
        if (!options.techniques.includes(technique) && !options.techniques.includes(technique[technique].getTechniqueMapping())) {
          techniquesToExecute[technique] = false;
        }
      }
    } else {
      if (options.techniques && options.techniques.length !== 0) {
        if (options.techniques.includes(technique) || options.techniques.includes(technique[technique].getTechniqueMapping())) {
          techniquesToExecute[technique] = true;
        }
      }
    }
  }
}

function resetConfiguration(): void {
  for (const technique in techniquesToExecute) {
    techniquesToExecute[technique] = true;
  }
}

async function executeTechnique(report: CSSTechniquesReport, technique: string, styleSheets: CSSStylesheet[]): Promise<void> {
  await techniques[technique].execute(styleSheets);
  report.techniques[technique] = techniques[technique].getFinalResults();
  report.metadata[report.techniques[technique].metadata.outcome]++;
  techniques[technique].reset();
}

async function executeTechniques(report: CSSTechniquesReport, styleSheets: CSSStylesheet[]): Promise<void> {
  const promises = new Array<any>();
  for (const technique in techniques || {}) {
    if (techniquesToExecute[technique]) {
      promises.push(executeTechnique(report, technique, styleSheets));
    }
  }
  await Promise.all(promises);
}

async function executeCSST(styleSheets: CSSStylesheet[]): Promise<CSSTechniquesReport> {
  
  const report: CSSTechniquesReport = {
    type: 'css-techniques',
    metadata: {
      passed: 0,
      warning: 0,
      failed: 0,
      inapplicable: 0
    },
    techniques: {}
  };

  await executeTechniques(report, styleSheets);

  return report;
}

export { 
  configure, 
  executeCSST, 
  resetConfiguration 
};