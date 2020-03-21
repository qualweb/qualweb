const { expect } = require('chai');
const puppeteer = require('puppeteer');
const { getDom } = require('./getDom');
const { ACTRules } = require('../dist/index');

describe('ACT-Rules module', function() {
  it('Should evaluate www.nav.no', async function() {
    this.timeout(1000 * 1000);
    const browser = await puppeteer.launch({
      args: ['--no-sandbox']
    });
    const { sourceHtml, page, stylesheets } = await getDom(browser, 'https://ciencias.ulisboa.pt');
    
    try {
      const actRules = new ACTRules({ rules: [
        'QW-ACT-R1',
        'QW-ACT-R2',
        'QW-ACT-R3',
        'QW-ACT-R4',
        'QW-ACT-R5',
        'QW-ACT-R6',
        'QW-ACT-R7',
        'QW-ACT-R8',
        'QW-ACT-R10',
        'QW-ACT-R11',
        'QW-ACT-R13',
        'QW-ACT-R14',
        'QW-ACT-R15',
        'QW-ACT-R16',
        'QW-ACT-R17',
        'QW-ACT-R18',
        'QW-ACT-R19',
        'QW-ACT-R20',
        'QW-ACT-R21',
        'QW-ACT-R22',
        'QW-ACT-R23',
        'QW-ACT-R24',
        'QW-ACT-R25',
        'QW-ACT-R26',
        'QW-ACT-R27',
        'QW-ACT-R28',
        'QW-ACT-R29',
        'QW-ACT-R30',
        'QW-ACT-R31',
        'QW-ACT-R32',
        'QW-ACT-R33',
        'QW-ACT-R34',
        'QW-ACT-R35',
        'QW-ACT-R36',
        'QW-ACT-R38',
        'QW-ACT-R39',
        'QW-ACT-R9',
        'QW-ACT-R12',
        'QW-ACT-R37'
      ]});
      const report = await actRules.execute(sourceHtml, page, stylesheets);

      console.log(report);
    } catch (err) {
      console.error(err);
    } finally {
      await browser.close();
    }
  })
});