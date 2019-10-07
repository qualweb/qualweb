'use strict';

import crypto from 'crypto';
import { QualwebOptions } from '@qualweb/core';
import { getDom } from '@qualweb/get-dom-puppeteer';
import { executeWappalyzer } from '@qualweb/wappalyzer';
import { executeACTR, configure as configureACTR } from '@qualweb/act-rules';
import { executeHTMLT, configure as configureHTMLT } from '@qualweb/html-techniques';
import { executeCSST, configure as configureCSST } from '@qualweb/css-techniques';
import { executeBestPractices } from '@qualweb/best-practices';

import parseUrl from '../url';
import Evaluation from '../data/evaluation.object';

async function evaluate(url: string, options: QualwebOptions): Promise<Evaluation> {
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

  const evaluator = {
    name: 'QualWeb',
    description: 'QualWeb is an automatic accessibility evaluator for webpages.',
    version: '3.0.0',
    homepage: 'http://www.qualweb.di.fc.ul.pt/',
    date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    hash: crypto.randomBytes(40).toString('hex'),
    url: parseUrl(url),
    dom: dom
  };

  const evaluation = new Evaluation(evaluator);

  if (options.wappalyzer) {
    const wappalyzer = await executeWappalyzer(url);
    evaluation.addModuleEvaluation('wappalyzer', wappalyzer);
  }

  {
    const actRules = await executeACTR(dom.source.html.parsed, dom.processed.html.parsed);
    evaluation.addModuleEvaluation('act-rules', actRules);
  }

  {
    const htmlTechniques = await executeHTMLT(url, dom.source.html.parsed, dom.processed.html.parsed);
    evaluation.addModuleEvaluation('html-techniques', htmlTechniques);
  }

  if (dom.stylesheets) {
    const cssTechniques = await executeCSST(dom.stylesheets);
    evaluation.addModuleEvaluation('css-techniques', cssTechniques);
  }

  {
    const bestPractices = await executeBestPractices(dom.source.html.parsed, dom.processed.html.parsed);
    evaluation.addModuleEvaluation('best-practices', bestPractices);
  }

  return evaluation;
}

export {
  evaluate
};