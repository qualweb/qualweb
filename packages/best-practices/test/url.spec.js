import { expect } from 'chai';
import puppeteer from 'puppeteer';
import { Dom } from '@qualweb/dom';
import enLocale from './locales/en.json';
import ptLocale from './locales/pt.json';

describe('Running tests', function () {
  it('Evaluates url', async function () {
    this.timeout(0);
    
    const url = 'https://www.museu.presidencia.pt/pt/fazer/um-museu-em-movimento-a-caminho-da-cidadania/';

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--ignore-certificate-errors']
    });
    const incognito = await browser.createIncognitoBrowserContext();
    const page = await incognito.newPage();
    const dom = new Dom(page);
    await dom.process({ execute: { bp: true } }, url, '');

    await page.addScriptTag({
      path: require.resolve('@qualweb/qw-page')
    });

    await page.addScriptTag({
      path: require.resolve('@qualweb/util')
    });

    await page.addScriptTag({
      path: require.resolve('../dist/bp.bundle.js')
    });

    const report = await page.evaluate(({ ptLocale, enLocale }) => {
      const bp = new BestPractices({ translate: ptLocale, fallback: enLocale }, { bestPractices: ['QW-BP2'] });
      return bp.execute();
    }, { ptLocale, enLocale });


    await page.close();
    await incognito.close();
    await browser.close();

    console.log(report);
    expect(report);
  });
});