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

import { QualwebOptions, EvaluationReport } from '@qualweb/core';
import { EarlOptions, EarlReport } from '@qualweb/earl-reporter';

import { getDom } from '@qualweb/get-dom-puppeteer';
//import { executeWappalyzer } from '@qualweb/wappalyzer';
import { executeACTR } from '@qualweb/act-rules';

async function evaluate(options: QualwebOptions): Promise<EvaluationReport | EvaluationReport[]> {
  if (!options.url) {
    throw new Error('Invalid URL');
  }

  const html = await getDom(options.url);

  const report: EvaluationReport = {
    system: {
      name: 'QualWeb',
      description: 'QualWeb is an automatic accessibility evaluator for webpages.',
      version: '3.0.0',
      homepage: 'http://www.qualweb.di.fc.ul.pt/',
      date: new Date().toISOString(),
      hash: '413cc48ce6e71792bcfcd99c4323df17ee577bd67a768820a0fcc01a98de7c13'
    },
    modules: {
      //wappalyzer: options.wappalyzer ? await executeWappalyzer(options.url): undefined,
      'act-rules': await executeACTR(html.parsedSourceHTML, html.parsedProcessedHTML)
    }
  };

  return report;
}

async function generateEarlReport(options?: EarlOptions): Promise<EarlReport | EarlReport[] | null> {
  console.log(options);
  return null;
}

export {
  evaluate,
  generateEarlReport
};