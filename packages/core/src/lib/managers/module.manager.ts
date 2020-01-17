'use strict';

import { Page } from 'puppeteer';
import { randomBytes } from 'crypto';
//import clone from 'lodash.clone';
import { Url, QualwebOptions, ProcessedHtml, SourceHtml, CSSStylesheet } from '@qualweb/core';
import { executeWappalyzer } from '@qualweb/wappalyzer';
import { ACTRules } from '@qualweb/act-rules';
import * as html from '@qualweb/html-techniques';
import { CSSTechniques } from '@qualweb/css-techniques';
import { BestPractices } from '@qualweb/best-practices';

import Evaluation from '../data/evaluation.object';

function parseUrl(url: string, pageUrl: string): Url {
  let inputUrl = url;
  let protocol;
  let domainName;
  let domain;
  let uri;
  let completeUrl = pageUrl;

  protocol = completeUrl.split('://')[0];
  domainName = completeUrl.split('/')[2];

  const tmp = domainName.split('.');
  domain = tmp[tmp.length-1];
  uri = completeUrl.split('.' + domain)[1];

  const parsedUrl = {
    inputUrl,
    protocol,
    domainName,
    domain,
    uri,
    completeUrl
  };

  return parsedUrl;
}

async function evaluate(url: string, sourceHtml: SourceHtml, page: Page, stylesheets: CSSStylesheet[], mappedDOM: any, execute: any, options: QualwebOptions): Promise<Evaluation> {
  const act = new ACTRules();
  const css = new CSSTechniques();
  const bp = new BestPractices();

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

  const [pageUrl, plainHtml, pageTitle, elements, browserUserAgent] = await Promise.all([
    page.url(),
    page.evaluate(() => {
      return document.documentElement.outerHTML;
    }),
    page.title(),
    page.$$('*'),
    page.browser().userAgent()
  ]);

  const processedHtml: ProcessedHtml = {
    html: {
      plain: plainHtml
    },
    title: pageTitle,
    elementCount: elements.length
  };

  const viewport = page.viewport();

  const evaluator = {
    name: 'QualWeb',
    description: 'QualWeb is an automatic accessibility evaluator for webpages.',
    version: '3.0.0',
    homepage: 'http://www.qualweb.di.fc.ul.pt/',
    date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    hash: randomBytes(40).toString('hex'),
    url: parseUrl(url, pageUrl),
    page: {
      viewport: {
        mobile: viewport.isMobile,
        landscape: viewport.isLandscape,
        userAgent: browserUserAgent,
        resolution: {
          width: viewport.width,
          height: viewport.height
        }
      },
      dom: {
        source: sourceHtml,
        processed: processedHtml,
        stylesheets
      }
    }
  };

  const evaluation = new Evaluation(evaluator);

  const promises = new Array<any>();

  if (execute.wappalyzer) {
    promises.push(executeWappalyzer(url));
  }

  if (execute.act) {
    promises.push(act.execute(sourceHtml, page, stylesheets));
  }

  if (execute.html) {
    promises.push(html.executeHTMLT(page));
  }

  if (execute.css) {
    promises.push(css.execute(stylesheets, mappedDOM));
  }

  if (execute.bp) {
    promises.push(bp.execute(page, stylesheets));
  }

  const reports = await Promise.all(promises);

  for (const report of reports || []) {
    if (report.type === 'wappalyzer') {
      evaluation.addModuleEvaluation('wappalyzer', report);
    } else if (report.type === 'act-rules') {
      act.resetConfiguration();
      evaluation.addModuleEvaluation('act-rules', report);
    } else if (report.type === 'html-techniques') {
      html.resetConfiguration();
      evaluation.addModuleEvaluation('html-techniques', report);
    } else if (report.type === 'css-techniques') {
      css.resetConfiguration();
      evaluation.addModuleEvaluation('css-techniques', report);
    } else if (report.type === 'best-practices') {
      bp.resetConfiguration();
      evaluation.addModuleEvaluation('best-practices', report);
    }
  }

  return evaluation;
}

export {
  evaluate
};