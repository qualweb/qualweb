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
import { executeACTR } from '@qualweb/act-rules';

let globalReport: EvaluationReport | undefined;

async function evaluate(options: QualwebOptions): Promise<EvaluationReport | EvaluationReport[]> {
  if (!options.url /*&& !options.urls && !options.file*/) {
    throw new Error('Invalid input method');
  }

  const html = await getDom(options.url);

  const report: EvaluationReport = {
    type: 'evaluation',
    system: {
      name: 'QualWeb',
      description: 'QualWeb is an automatic accessibility evaluator for webpages.',
      version: '3.0.0',
      homepage: 'http://www.qualweb.di.fc.ul.pt/',
      date: new Date().toISOString(),
      hash: '413cc48ce6e71792bcfcd99c4323df17ee577bd67a768820a0fcc01a98de7c13',
      url: parse_url(options.url)
    },
    modules: {
      wappalyzer: options.wappalyzer ? await executeWappalyzer(options.url): undefined,
      'act-rules': await executeACTR(html.parsedSourceHTML, html.parsedProcessedHTML)
    }
  };

  globalReport = _.cloneDeep(report);

  return report;
}

async function generateEarlReport(options?: EarlOptions): Promise<EarlReport | EarlReport[] | null> {
  if (globalReport) {
    if (options && options.multi) {
      return await generateAggregatedEarlReport([globalReport]);
    } else {
      return await generateSingleEarlReport(globalReport);
    }
  }

  return null;
}

export {
  evaluate,
  generateEarlReport
};