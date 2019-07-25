/**
 * Author: João Afonso Vicente
 * 
 * Description: 
 *
 * Notes:
 *
 * Last modified: 22/02/2019
 */
'use strict';

import _ from 'lodash';
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
import { configure, executeACTR } from '@qualweb/act-rules';

let globalReports: EvaluationReport[] | undefined;

async function run(url: string, options: QualwebOptions): Promise<EvaluationReport> {
  const html = await getDom(url);

  if (options['act-rules']) {
    configure(options['act-rules']);
  }

  const report: EvaluationReport = {
    type: 'evaluation',
    system: {
      name: 'QualWeb',
      description: 'QualWeb is an automatic accessibility evaluator for webpages.',
      version: '3.0.0',
      homepage: 'http://www.qualweb.di.fc.ul.pt/',
      date: new Date().toLocaleDateString('pt-PT'),
      hash: crypto.randomBytes(20).toString('hex'),
      url: parse_url(url)
    },
    modules: {
      wappalyzer: options.wappalyzer ? await executeWappalyzer(url): undefined,
      'act-rules': await executeACTR(html.parsedSourceHTML, html.parsedProcessedHTML)
    }
  };

  return report;
}

async function evaluate(options: QualwebOptions): Promise<EvaluationReport | EvaluationReport[]> {
  if (!options.url && !options.file) {
    throw new Error('Invalid input method');
  }

  globalReports = new Array<EvaluationReport>();

  if (options.url) {
    const report = await run(options.url, options);
    globalReports.push(_.cloneDeep(report));

    return report;
  } else if (options.file) {
    const file = await readFile(options.file);
    const urls = file.toString().split('\n').map(u => decodeURIComponent(u).trim());

    for (const url of urls || []) {
      const report = await run(url, options);
      globalReports.push(_.cloneDeep(report));
    }

    return _.cloneDeep(globalReports);
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
          earlReports.push(_.cloneDeep(earlReport));
        }
        return _.cloneDeep(earlReports);
      }
    }
  }

  return null;
}

export {
  evaluate,
  generateEarlReport
};