'use strict';

import { Page } from 'puppeteer';
import crypto from 'crypto';
import { QualwebOptions } from '@qualweb/core';
import { getDom } from '@qualweb/get-dom-puppeteer';
import { executeWappalyzer } from '@qualweb/wappalyzer';
import * as act from '@qualweb/act-rules';
import * as html from '@qualweb/html-techniques';
import * as css from '@qualweb/css-techniques';
import { executeBestPractices } from '@qualweb/best-practices';
import { Html } from '@qualweb/get-dom-puppeteer';
import * as act2 from './modules/act-rules/index'

import parseUrl from '../url';
import Evaluation from '../data/evaluation.object';

async function evaluate(url: string, execute: any, options: QualwebOptions): Promise<Evaluation> {
  const dom = await getDom(url);

  if (execute.act && options['act-rules']) {
    act.configure(options['act-rules']);
  }

  if (execute.html && options['html-techniques']) {
    html.configure(options['html-techniques']);
  }

  if (execute.css && options['css-techniques']) {
    css.configure(options['css-techniques']);
  }

  const evaluator = {
    name: 'QualWeb',
    description: 'QualWeb is an automatic accessibility evaluator for webpages.',
    version: '3.0.0',
    homepage: 'http://www.qualweb.di.fc.ul.pt/',
    date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    hash: crypto.randomBytes(40).toString('hex'),
    //url: parseUrl(url),
    dom: dom
  };

  const evaluation = new Evaluation(evaluator);

  if (execute.wappalyzer) {
    const wappalyzer = await executeWappalyzer(url);
    evaluation.addModuleEvaluation('wappalyzer', wappalyzer);
  }

  if (execute.act) {
    const actRules = await act.executeACTR(url, dom.source.html.parsed, dom.processed.html.parsed, dom.stylesheets);
    act.resetConfiguration();
    evaluation.addModuleEvaluation('act-rules', actRules);
  }

  if (execute.html) {
    const htmlTechniques = await html.executeHTMLT(url, dom.source.html.parsed, dom.processed.html.parsed);
    html.resetConfiguration();
    evaluation.addModuleEvaluation('html-techniques', htmlTechniques);
  }

  if (execute.css) {
    const cssTechniques = await css.executeCSST(dom.stylesheets);
    evaluation.addModuleEvaluation('css-techniques', cssTechniques);
  }

  if (execute.bp) {
    const bestPractices = await executeBestPractices(dom.processed.html.parsed);
    evaluation.addModuleEvaluation('best-practices', bestPractices);
  }

  return evaluation;
}

async function evaluate2(sourceHtml: Html, page: Page, stylesheets: any[], execute: any, options: QualwebOptions): Promise<Evaluation> {
  if (execute.act && options['act-rules']) {
    act2.configure(options['act-rules']);
  }

  if (execute.html && options['html-techniques']) {
    html.configure(options['html-techniques']);
  }

  if (execute.css && options['css-techniques']) {
    css.configure(options['css-techniques']);
  }

  const url = await page.evaluate(() => {
    return location.href;
  })

  const evaluator = {
    name: 'QualWeb',
    description: 'QualWeb is an automatic accessibility evaluator for webpages.',
    version: '3.0.0',
    homepage: 'http://www.qualweb.di.fc.ul.pt/',
    date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    hash: crypto.randomBytes(40).toString('hex'),
    url: parseUrl(url),
    //dom: dom
  };

  const evaluation = new Evaluation(evaluator);

  if (execute.act) {
    const actRules = await act2.executeACTR(sourceHtml, page, stylesheets);
    act2.resetConfiguration();
    evaluation.addModuleEvaluation('act-rules', actRules);
  }

  return evaluation;
}

export {
  evaluate,
  evaluate2
};