'use strict';

import { Page } from 'puppeteer';
import { randomBytes } from 'crypto';
import { QualwebOptions, Dom, ProcessedHtml, SourceHtml, CSSStylesheet } from '@qualweb/core';
import { executeWappalyzer } from '@qualweb/wappalyzer';
import * as act from '@qualweb/act-rules';
import * as html from '@qualweb/html-techniques';
import * as css from '@qualweb/css-techniques';
import * as bp from '@qualweb/best-practices';

import parseUrl from '../url';
import Evaluation from '../data/evaluation.object';

async function evaluate(sourceHtml: SourceHtml, page: Page, stylesheets: CSSStylesheet[], execute: any, options: QualwebOptions): Promise<Evaluation> {
  if (execute.act && options['act-rules']) {
    act.configure(options['act-rules']);
  }

  if (execute.html && options['html-techniques']) {
    html.configure(options['html-techniques']);
  }

  if (execute.css && options['css-techniques']) {
    css.configure(options['css-techniques']);
  }

  if (execute.bp && options['best-practices']) {
    bp.configure(options['best-practices']);
  }

  const url = await page.url();

  const processedHtml: ProcessedHtml = {
    html: {
      plain: await page.evaluate(() => {
        return document.documentElement.outerHTML;
      })
    },
    title: await page.title(),
    elementCount: (await page.$$('*')).length
  };

  const evaluator = {
    name: 'QualWeb',
    description: 'QualWeb is an automatic accessibility evaluator for webpages.',
    version: '3.0.0',
    homepage: 'http://www.qualweb.di.fc.ul.pt/',
    date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    hash: randomBytes(40).toString('hex'),
    url: parseUrl(url),
    dom: <Dom> {
      source: sourceHtml,
      processed: processedHtml,
      stylesheets
    }
  };

  const evaluation = new Evaluation(evaluator);

  const promises = new Array<any>();

  if (execute.wappalyzer) {
    const wappalyzer = executeWappalyzer(url);
    promises.push(wappalyzer);
  }

  if (execute.act) {
    const actRules = act.executeACTR(sourceHtml, page, stylesheets);
    promises.push(actRules);
  }

  if (execute.html) {
    const htmlTechniques = html.executeHTMLT(page);
    promises.push(htmlTechniques);
  }

  if (execute.css) {
    const cssTechniques = css.executeCSST(stylesheets);
    promises.push(cssTechniques);
  }

  if (execute.bp) {
    const bestPractices = bp.executeBestPractices(page, stylesheets);
    promises.push(bestPractices);
  }

  const modulesReports = await Promise.all(promises);

  for (const mr of modulesReports || []) {
    if (mr.type === 'wappalyzer') {
      evaluation.addModuleEvaluation('wappalyzer', mr);
    } else if (mr.type === 'act-rules') {
      act.resetConfiguration();
      evaluation.addModuleEvaluation('act-rules', mr);
    } else if (mr.type === 'html-techniques') {
      html.resetConfiguration();
      evaluation.addModuleEvaluation('html-techniques', mr);
    } else if (mr.type === 'css-techniques') {
      css.resetConfiguration();
      evaluation.addModuleEvaluation('css-techniques', mr);
    } else if (mr.type === 'best-practices') {
      bp.resetConfiguration();
      evaluation.addModuleEvaluation('best-practices', mr);
    }
  }

  return evaluation;
}

export {
  evaluate
};