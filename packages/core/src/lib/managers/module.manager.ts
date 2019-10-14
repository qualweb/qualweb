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

async function evaluate(url: string, execute: any, options: QualwebOptions): Promise<Evaluation> {
  const dom = await getDom(url);

  if (execute.act && options['act-rules']) {
    configureACTR(options['act-rules']);
  }

  if (execute.html && options['html-techniques']) {
    configureHTMLT(options['html-techniques']);
  }

  if (execute.css && options['css-techniques']) {
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

  if (execute.wappalyzer) {
    const wappalyzer = await executeWappalyzer(url);
    evaluation.addModuleEvaluation('wappalyzer', wappalyzer);
  }

  if (execute.act) {
    const actRules = await executeACTR(url, dom.source.html.parsed, dom.processed.html.parsed, dom.stylesheets);
    evaluation.addModuleEvaluation('act-rules', actRules);
  }

  if (execute.html) {
    const htmlTechniques = await executeHTMLT(url, dom.source.html.parsed, dom.processed.html.parsed);
    evaluation.addModuleEvaluation('html-techniques', htmlTechniques);
  }

  if (execute.css) {
    const cssTechniques = await executeCSST(dom.stylesheets);
    evaluation.addModuleEvaluation('css-techniques', cssTechniques);
  }

  if (execute.bp) {
    const bestPractices = await executeBestPractices(dom.source.html.parsed, dom.processed.html.parsed);
    evaluation.addModuleEvaluation('best-practices', bestPractices);
  }

  return evaluation;
}

export {
  evaluate
};