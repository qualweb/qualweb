'use strict';

import cloneDeep from 'lodash/cloneDeep';
import { readFile } from 'fs-extra';
import crypto from 'crypto';

import parse_url from './lib/parse_url';

import { QualwebOptions, EvaluationReport } from '@qualweb/core';
import { 
  EarlOptions, 
  EarlReport, 
  generateSingleEarlReport, 
  generateAggregatedEarlReport 
} from '@qualweb/earl-reporter';

import { getDom } from '@qualweb/get-dom-puppeteer';
import { executeWappalyzer } from '@qualweb/wappalyzer';
import { executeACTR, configure as configureACTR } from '@qualweb/act-rules';
import { executeHTMLT, configure as configureHTMLT } from '@qualweb/html-techniques';
import { executeCSST, configure as configureCSST } from '@qualweb/css-techniques';
import { executeBestPractices } from '@qualweb/best-practices';

let globalReports: EvaluationReport[] | undefined;

async function run(url: string, options: QualwebOptions): Promise<EvaluationReport> {
  const dom = await getDom(url);

  if (options['act-rules']) {
    configureACTR(options['act-rules']);
  }

  if (options['html-techniques']) {
    configureHTMLT(options['html-techniques']);
  }

  if (options['css-techniques']) {
    configureCSST(options['css-techniques']);
  }

  const report: EvaluationReport = {
    type: 'evaluation',
    system: {
      name: 'QualWeb',
      description: 'QualWeb is an automatic accessibility evaluator for webpages.',
      version: '3.0.0',
      homepage: 'http://www.qualweb.di.fc.ul.pt/',
      date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      hash: crypto.randomBytes(40).toString('hex'),
      url: parse_url(url),
      dom: dom
    },
    metadata: {
      passed: 0,
      warning: 0,
      failed: 0,
      inapplicable: 0
    },
    modules: {}
  };

  if (options.wappalyzer) {
    const wappalyzer = await executeWappalyzer(url);
    report.modules['wappalyzer'] = cloneDeep(wappalyzer);
  }

  {
    const actRules = await executeACTR(dom.source.html.parsed, dom.processed.html.parsed);
    report.modules['act-rules'] = cloneDeep(actRules);

    report.metadata.passed += actRules.metadata.passed;
    report.metadata.failed += actRules.metadata.failed;
    report.metadata.inapplicable += actRules.metadata.inapplicable;
  }

  {
    const htmlTechniques = await executeHTMLT(dom.source.html.parsed, dom.processed.html.parsed);
    report.modules['html-techniques'] = cloneDeep(htmlTechniques);

    report.metadata.passed += htmlTechniques.metadata.passed;
    report.metadata.warning += htmlTechniques.metadata.warning;
    report.metadata.failed += htmlTechniques.metadata.failed;
    report.metadata.inapplicable += htmlTechniques.metadata.inapplicable;
  }

  if (dom.stylesheets) {
    const cssTechniques = await executeCSST(dom.stylesheets);
    report.modules['css-techniques'] = cloneDeep(cssTechniques);

    report.metadata.passed += cssTechniques.metadata.passed;
    report.metadata.warning += cssTechniques.metadata.warning;
    report.metadata.failed += cssTechniques.metadata.failed;
    report.metadata.inapplicable += cssTechniques.metadata.inapplicable;
  }

  {
    const bestPractices = await executeBestPractices(dom.source.html.parsed, dom.processed.html.parsed);
    report.modules['best-practices'] = cloneDeep(bestPractices);

    report.metadata.passed += bestPractices.metadata.passed;
    report.metadata.warning += bestPractices.metadata.warning;
    report.metadata.failed += bestPractices.metadata.failed;
    report.metadata.inapplicable += bestPractices.metadata.inapplicable;
  }

  if (report.system.dom) {
    delete report.system.dom.processed.html.parsed;
    delete report.system.dom.source.html.parsed;
  }

  return report;
}

async function evaluate(options: QualwebOptions): Promise<EvaluationReport | EvaluationReport[]> {
  if (!options.url && !options.file) {
    throw new Error('Invalid input method');
  }

  globalReports = new Array<EvaluationReport>();

  if (options.url) {
    const report = await run(options.url, options);
    globalReports.push(cloneDeep(report));

    return report;
  } else if (options.file) {
    const file = await readFile(options.file);
    const urls = file.toString().split('\n').map(u => decodeURIComponent(u).trim());

    for (const url of urls || []) {
      const report = await run(url, options);
      globalReports.push(cloneDeep(report));
    }

    return cloneDeep(globalReports);
  } else {
    throw new Error('Invalid input method');
  }
}

async function generateEarlReport(options?: EarlOptions): Promise<EarlReport | EarlReport[] | null> {
  if (globalReports && globalReports.length > 0) {
    if (options && options.aggregated) {
      return await generateAggregatedEarlReport(<EvaluationReport[]> globalReports);
    } else {
      if (globalReports.length === 1) {
        return await generateSingleEarlReport(<EvaluationReport> globalReports[0]);
      } else {
        const earlReports = new Array<EarlReport>();
        for (const report of globalReports || []) {
          const earlReport = await generateSingleEarlReport(report);
          earlReports.push(cloneDeep(earlReport));
        }
        return cloneDeep(earlReports);
      }
    }
  } else {
    throw new Error('There are no evaluations to report');
  }
}

export {
  evaluate,
  generateEarlReport
};