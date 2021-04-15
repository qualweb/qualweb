import { Dom } from '../dist/index';
import puppeteer from 'puppeteer';
import { expect }from 'chai';

describe('DOM', function() {
  it('should work', async function() {
    this.timeout(0);
    const browser = await puppeteer.launch({ headless: false });
    const _page = await browser.newPage();
    const dom = new Dom(_page); // https://www.w3schools.com/xml/note.xml
    const { page } = await dom.process({}, 'https://ciencias.ulisboa.pt', '');
    
    await _page.close();
    await browser.close();
    
    expect("").to.be.equal('');
  });
});