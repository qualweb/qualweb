'use strict';

import { ElementHandle, Page } from 'puppeteer';
import Rule from './Rule.object';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils, AccessibilityUtils } from '@qualweb/util';
import { createHash } from 'crypto';

class QW_ACT_R9 extends Rule {

  constructor() {
    super({
      name: 'Links with identical accessible names have equivalent purpose',
      code: 'QW-ACT-R9',
      mapping: 'b20e66',
      description: 'This rule checks that links with identical accessible names resolve to the same resource or equivalent resources.',
      metadata: {
        target: {
          element: 'a,[role="link"]'
        },
        'success-criteria': [{
          name: '2.4.9',
          level: 'AAA',
          principle: 'Operable',
          url: 'https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-link-only.html'
        }],
        related: [],
        url: 'https://act-rules.github.io/rules/b20e66',
        passed: 0,
        failed: 0,
        warning: 0,
        type: ['ACTRule', 'TestCase'],
        a11yReq: ['WCAG21:language'],
        outcome: '',
        description: ''
      },
      results: new Array<ACTRuleResult>()
    });
  }

  async execute(element: ElementHandle | undefined, page: Page): Promise<void> {

    if (!element) {
      return;
    }

    const [links, iframes] = await Promise.all([
      element.$$('a[href], [role="link"]'),
      element.$$('iframe')
    ]);

    for (const iframe of iframes || []) {
      const frame = await iframe.contentFrame();
      if (frame !== null) {
        links.push(...(await frame.$$('a[href], [role="link"]')));
      }
    }

    const accessibleNames = new Array<string>();
    const hrefList = new Array<string>();

    for (const link of links || []) {
      let aName, href;
      if (await DomUtils.isElementADescendantOf(link, page, ['svg'], [])) {
        aName = await AccessibilityUtils.getAccessibleNameSVG(link, page);
      } else if(await AccessibilityUtils.isElementInAT(link, page)){
        aName = await AccessibilityUtils.getAccessibleName(link, page);
      }
      href = await DomUtils.getElementAttribute(link, 'href');

      if (!!aName) {
        hrefList.push(href);
        accessibleNames.push(aName);
      }
    }

    let counter = 0;
    const blacklist = new Array<number>();
    for (const accessibleName of accessibleNames || []) {
      const evaluation: ACTRuleResult = {
        verdict: '',
        description: '',
        resultCode: ''
      };

      if (blacklist.indexOf(counter) >= 0) {
        //element already evaluated
      } else if (!!accessibleName && accessibleName !== '') {
        const hasEqualAn = this.isInListExceptIndex(accessibleName, accessibleNames, counter);
        
        if (hasEqualAn.length > 0) {
          blacklist.push(...hasEqualAn);
          let hasEqualHref = true;
          for (let index of hasEqualAn) {
            hasEqualHref = hrefList[index] === hrefList[counter] && hrefList[counter] !== null;
          }
          hasEqualAn.push(counter);
          let result = true;

          if (!hasEqualHref) {
            const selector = new Array<string>();
            for (const index of hasEqualAn || []) {
              selector.push(await DomUtils.getElementSelector(links[index]));
            }
            const hashArray = await this.getContentHash(selector, page);
            const firstHash = hashArray.pop();

            for (const hash of hashArray || []) {
              if (!firstHash || !hashArray || hash !== firstHash) {
                result = false;
              }
            }
            if(hashArray.length=== 0){
              result = false;
              }
          }
          if (result) {//passed
            evaluation.verdict = 'passed';
            evaluation.description = `The \`links\` with the same accessible name have equal content.`;
            evaluation.resultCode = 'RC2';
          } else { //warning
            evaluation.verdict = 'warning';
            evaluation.description = `The \`links\` with the same accessible name have different content. Verify is the content is equivalent.`;
            evaluation.resultCode = 'RC3';
          }
        } else {//inaplicable
          evaluation.verdict = 'inapplicable';
          evaluation.description = `Doesn't exist any other \`link\` with the same accessible name.`;
          evaluation.resultCode = 'RC4';
        }
      } else {//inaplicable
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The \`link\` doesn't have an accessible name.`;
        evaluation.resultCode = 'RC4';
      }

      await super.addEvaluationResult(evaluation, links[counter]);
      counter++;
    }
  }

  private async getContentHash(selectors: string[], page: Page): Promise<Array<string>> {
    const browser = await page.browser();
    const newPage = await browser.newPage();
    const content = new Array<string>();
    let hash, htmlContent;
    try {
      for (const selector of selectors || []) {
        await newPage.goto(await page.url(), { 'waitUntil': 'networkidle2' });
        await Promise.all([
          newPage.waitForNavigation({ 'waitUntil': 'networkidle0' }),
          newPage.click(selector)
        ]);
        htmlContent = await newPage.evaluate(() => {
          return document.documentElement.innerHTML;
        });
        if (htmlContent) {
          hash = createHash('md5').update(htmlContent).digest('hex');
        }
        content.push(hash);
      }
    } catch (e) {
    }

    await newPage.close();
    return content;
  }

  private isInListExceptIndex(accessibleName: string, accessibleNames: string[], index: number): Array<number> {
    const result = new Array<number>();
    let counter = 0;

    for (const accessibleNameToCompare of accessibleNames || []) {
      if (accessibleNameToCompare === accessibleName && counter !== index) {
        result.push(counter);
      }
      counter++;
    }

    return result;
  }
}

export = QW_ACT_R9;
