'use strict';

import { Page } from 'puppeteer';
import { randomBytes } from 'crypto';
import { Url, QualwebOptions, ProcessedHtml, SourceHtml, CSSStylesheet } from '@qualweb/core';
import { CSSTechniques } from '@qualweb/css-techniques';
import fetch from 'node-fetch';

import Evaluation from '../data/evaluation.object';
import { BrowserUtils } from '@qualweb/util';
let endpoint = 'http://194.117.20.242/validate/';


function parseUrl(url: string, pageUrl: string): Url {
  let inputUrl = url;
  let protocol: string;
  let domainName: string;
  let domain: string;
  let uri: string;
  let completeUrl = pageUrl;

  protocol = completeUrl.split('://')[0];
  domainName = completeUrl.split('/')[2];

  const tmp = domainName.split('.');
  domain = tmp[tmp.length - 1];
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

async function evaluateUrl(url: string, sourceHtml: SourceHtml, page: Page, stylesheets: CSSStylesheet[], mappedDOM: any, execute: any, options: QualwebOptions): Promise<Evaluation> {

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

  const reports = new Array<any>();
  const css = new CSSTechniques();
  await page.addScriptTag({
    path: require.resolve('../../../node_modules/@qualweb/qw-page/dist/qwPage.js')
  })

  if (execute.act) {
    await page.addScriptTag({
      path: require.resolve('@qualweb/act-rules')
    })
    sourceHtml.html.parsed = [];
    const actReport = await page.evaluate((sourceHtml, stylesheets, options) => {
      // @ts-ignore 
      const act = new ACTRules.ACTRules();
      if (options)
        act.configure(options);
      // @ts-ignore 
      const report = act.execute(sourceHtml, new QWPage.QWPage(document), stylesheets);
      return report;
      // @ts-ignore 
    }, sourceHtml, stylesheets, options['act-rules']);

    reports.push(actReport);
  }

  if (execute.html) {
    await page.addScriptTag({
      path: require.resolve('@qualweb/html-techniques')
    })
    const url = page.url();
    const urlVal = await page.evaluate(() => {
      return location.href;
    });

    const validationUrl = endpoint + encodeURIComponent(urlVal);

    let response, validation;

    try {
      response = await fetch(validationUrl);
    } catch (err) {
      console.log(err);
    }
    if (response && response.status === 200)
      validation = JSON.parse(await response.json());
    const newTabWasOpen = await BrowserUtils.detectIfUnwantedTabWasOpened(page.browser(), url);
    const htmlReport = await page.evaluate((newTabWasOpen, validation, options) => {
      // @ts-ignore 
      const html = new HTMLTechniques.HTMLTechniques();
      if (options)
        html.configure(options)
      // @ts-ignore 
      const report = html.execute(new QWPage.QWPage(document), newTabWasOpen, validation);
      return report;
      // @ts-ignore 
    }, newTabWasOpen, validation, options['html-techniques']);
    reports.push(htmlReport);
  }

  if (execute.css) {
    if (options['css-techniques']) {
      css.configure(options['css-techniques']);
    }
    reports.push(await css.execute(stylesheets, mappedDOM));
  }

  if (execute.bp) {
    await page.addScriptTag({
      path: require.resolve('@qualweb/best-practices')//'../../../node_modules/@qualweb/best-practices/dist/bp.js'
    })
    const bpReport = await page.evaluate((options) => {
      // @ts-ignore 
      const bp = new BestPractices.BestPractices();
      if (options)
        bp.configure(options)
      // @ts-ignore 
      const report = bp.execute(new QWPage.QWPage(document));
      return report;
    }, options['best-practices']);
    reports.push(bpReport);
  }


  for (const report of reports || []) {
    if (report.type === 'wappalyzer') {
      evaluation.addModuleEvaluation('wappalyzer', report);
    } else if (report.type === 'act-rules') {
      evaluation.addModuleEvaluation('act-rules', report);
    } else if (report.type === 'html-techniques') {
      evaluation.addModuleEvaluation('html-techniques', report);
    } else if (report.type === 'css-techniques') {
      css.resetConfiguration();
      evaluation.addModuleEvaluation('css-techniques', report);
    } else if (report.type === 'best-practices') {
      evaluation.addModuleEvaluation('best-practices', report);
    }
  }

  return evaluation;
}

async function evaluateHtml(sourceHtml: SourceHtml, page: Page, stylesheets: CSSStylesheet[], mappedDOM: any, execute: any, options: QualwebOptions): Promise<Evaluation> {

  const [plainHtml, pageTitle, elements, browserUserAgent] = await Promise.all([
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
  const reports = new Array<any>();
  const css = new CSSTechniques();

  await page.addScriptTag({
    path: require.resolve('../../../node_modules/@qualweb/qw-page/dist/qwPage.js')
  })

  if (execute.act) {
    await page.addScriptTag({
      path: require.resolve('@qualweb/act-rules')
    })
    sourceHtml.html.parsed = [];
    const actReport = await page.evaluate((sourceHtml, stylesheets, options) => {
      // @ts-ignore 
      const act = new ACTRules.ACTRules();
      if (options)
        act.configure(options);
      // @ts-ignore 
      const report = act.execute(sourceHtml, new QWPage.QWPage(document), stylesheets);
      return report;
      // @ts-ignore 
    }, sourceHtml, stylesheets, options['act-rules']);

    reports.push(actReport);
  }

  if (execute.html) {
    await page.addScriptTag({
      path: require.resolve('@qualweb/html-techniques')
    })
    const url = page.url();
    const urlVal = await page.evaluate(() => {
      return location.href;
    });

    const validationUrl = endpoint + encodeURIComponent(urlVal);

    let response, validation;

    try {
      response = await fetch(validationUrl);
    } catch (err) {
      console.log(err);
    }
    if (response && response.status === 200)
      validation = JSON.parse(await response.json());
    const newTabWasOpen = await BrowserUtils.detectIfUnwantedTabWasOpened(page.browser(), url);
    const htmlReport = await page.evaluate((newTabWasOpen, validation, options) => {
      // @ts-ignore 
      const html = new HTMLTechniques.HTMLTechniques();
      if (options)
        html.configure(options)
      // @ts-ignore 
      const report = html.execute(new QWPage.QWPage(document), newTabWasOpen, validation);
      return report;
      // @ts-ignore 
    }, newTabWasOpen, validation, options['html-techniques']);
    reports.push(htmlReport);
  }

  if (execute.css) {
    if (options['css-techniques']) {
      css.configure(options['css-techniques']);
    }
    reports.push(css.execute(stylesheets, mappedDOM));
  }

  if (execute.bp) {
    await page.addScriptTag({
      path: require.resolve('@qualweb/best-practices')//'../../../node_modules/@qualweb/best-practices/dist/bp.js'
    })
    const bpReport = await page.evaluate((options) => {
      // @ts-ignore 
      const bp = new BestPractices.BestPractices();
      if (options)
        bp.configure(options)
      // @ts-ignore 
      const report = bp.execute(new QWPage.QWPage(document));
      return report;
    }, options['best-practices']);
    reports.push(bpReport);
  }


  for (const report of reports || []) {
    if (report.type === 'wappalyzer') {
      evaluation.addModuleEvaluation('wappalyzer', report);
    } else if (report.type === 'act-rules') {
      evaluation.addModuleEvaluation('act-rules', report);
    } else if (report.type === 'html-techniques') {
      evaluation.addModuleEvaluation('html-techniques', report);
    } else if (report.type === 'css-techniques') {
      css.resetConfiguration();
      evaluation.addModuleEvaluation('css-techniques', report);
    } else if (report.type === 'best-practices') {
      evaluation.addModuleEvaluation('best-practices', report);
    }
  }

  return evaluation;
}

export {
  evaluateUrl,
  evaluateHtml
};