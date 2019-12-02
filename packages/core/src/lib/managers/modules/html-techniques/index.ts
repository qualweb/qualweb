/**
 *
 */
'use strict';

import { Page } from 'puppeteer';
import { HTMLTOptions, HTMLTechniquesReport } from '@qualweb/html-techniques';

import mapping from './techniques/mapping.json';

import { techniques, techniquesToExecute } from './techniques';

function configure(options: HTMLTOptions): void {
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
        if (!options.techniques.includes(technique) && !options.techniques.includes(techniques[technique].getTechniqueMapping())) {
          techniquesToExecute[technique] = false;
        }
      }
    } else {
      if (options.techniques && options.techniques.length !== 0) {
        if (options.techniques.includes(technique) || options.techniques.includes(techniques[technique].getTechniqueMapping())) {
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

async function executeTechnique(technique: string, selector: string, page: Page, report: HTMLTechniquesReport): Promise<void> {
  const elements = await page.$$(selector);
  if (elements.length > 0) {
    for (const elem of elements || []) {
      await techniques[technique].execute(elem, page);
      //await elem.dispose();
    }
  } else {
    await techniques[technique].execute(undefined, page);
  }
  report.techniques[technique] = techniques[technique].getFinalResults();
  report.metadata[report.techniques[technique].metadata.outcome]++;
  techniques[technique].reset();
}

async function executeMappedTechniques(report: HTMLTechniquesReport, page: Page, selectors: string[], mappedTechniques: any): Promise<void> {
  const promises = new Array<any>();
  for (const selector of selectors || []) {
    for (const technique of mappedTechniques[selector] || []) {
      if (techniquesToExecute[technique]) {
        promises.push(executeTechnique(technique, selector, page, report));
      }
    }
  }
  await Promise.all(promises);
}

async function executeNotMappedTechniques(report: HTMLTechniquesReport, page: Page): Promise<void> {
  if (techniquesToExecute['QW-HTML-T20']) {
    await techniques['QW-HTML-T20'].validate(page);
    report.techniques['QW-HTML-T20'] = techniques['QW-HTML-T20'].getFinalResults();
    report.metadata[report.techniques['QW-HTML-T20'].metadata.outcome]++;
    techniques['QW-HTML-T20'].reset();
  }

  if (techniquesToExecute['QW-HTML-T35']) {
    await techniques['QW-HTML-T35'].validate(page);
    report.techniques['QW-HTML-T35'] = techniques['QW-HTML-T35'].getFinalResults();
    report.metadata[report.techniques['QW-HTML-T35'].metadata.outcome]++;
    techniques['QW-HTML-T35'].reset();
  }
}

async function executeHTMLT(page: Page): Promise<HTMLTechniquesReport> {

  const report: HTMLTechniquesReport = {
    type: 'html-techniques',
    metadata: {
      passed: 0,
      warning: 0,
      failed: 0,
      inapplicable: 0
    },
    techniques: {}
  };

  //await executeMappedTechniques(url,report, sourceHTML, Object.keys(mapping.pre), mapping.pre);
  await executeMappedTechniques(report, page, Object.keys(mapping.post), mapping.post);

  await executeNotMappedTechniques(report, page);

  resetConfiguration();

  return report;
}

export { configure, resetConfiguration, executeHTMLT };
