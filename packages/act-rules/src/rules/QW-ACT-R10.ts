'use strict';

import { ElementHandle, Page } from 'puppeteer';
import Rule from './Rule.object';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils, AccessibilityUtils } from '@qualweb/util';
import { createHash } from 'crypto';

class QW_ACT_R10 extends Rule {

  constructor() {
    super({
      name: '`iframe` elements with identical accessible names have equivalent purpose',
      code: 'QW-ACT-R10',
      mapping: '4b1c6c',
      description: 'This rule checks that iframe elements with identical accessible names embed the same resource or equivalent resources.',
      metadata: {
        target: {
          element: 'iframe',
          attributes: ['src']
        },
        'success-criteria': [{
          name: '4.1.2',
          level: 'A',
          principle: 'Robust',
          url: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html'
        }],
        related: [],
        url: 'https://act-rules.github.io/rules/4b1c6c',
        passed: 0,
        failed: 0,
        warning: 0,
        type: ['ACTRule', 'TestCase'],
        a11yReq: ['WCAG21:language'],
        outcome: '',
        description: ''
      },
      results: new Array < ACTRuleResult > ()
    });
  }

  async execute(element: ElementHandle | undefined, page: Page): Promise < void > {

    if (!element) {
      return;
    }

    const [iframes, iframesAll] = await Promise.all([
      element.$$('iframe[src]'),
      element.$$('iframe')
    ]);

    for (const iframe of iframesAll || []) {
      const frame = await iframe.contentFrame();
      if (frame !== null) {
        iframes.push(...(await frame.$$('iframe[src]')));
      }
    }

    const accessibleNames = new Array<string>();

    // add iframe contents
    for (const link of iframes || []) {
      const parent = await DomUtils.getElementParent(element);
      if (parent !== null && await DomUtils.getElementTagName(parent) !== 'svg') {
        const aName = await AccessibilityUtils.getAccessibleName(link, page);
        if (aName) {
          accessibleNames.push(aName);
        }
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
      } else if (accessibleName && accessibleName.trim() !== '') {
        const hasEqualAn = this.isInListExceptIndex(accessibleName, accessibleNames, counter);
        if (hasEqualAn.length > 0) {
          blacklist.push(...hasEqualAn);
          hasEqualAn.push(counter);

          const elements = new Array<ElementHandle>();
          for (const index of hasEqualAn || []) {
            elements.push(iframes[index]);
          }

          const hashArray = await this.getContentHash(elements, page);
          const firstHash = hashArray.pop();
          let result = true;
          for (const hash of hashArray || []) {
            if (!firstHash || !hashArray || hash !== firstHash) {
              result = false;
            }
          }
          if (result) { //passed
            evaluation.verdict = 'passed';
            evaluation.description = `Iframes with the same accessible name have equal content`;
            evaluation.resultCode = 'RC2';
          } else { //failed
            evaluation.verdict = 'warning';
            evaluation.description = `Iframes with the same accessible name have different content`;
            evaluation.resultCode = 'RC3';
          }
        } else { //inaplicable
          evaluation.verdict = 'inapplicable';
          evaluation.description = `There is no iframe with same the same accessible name`;
          evaluation.resultCode = 'RC4';
        }
      } else { //inaplicable
        evaluation.verdict = 'inapplicable';
        evaluation.description = `iframe doesnt have accessible name`;
        evaluation.resultCode = 'RC4';
      }
      super.addEvaluationResult(evaluation /*, iframes[counter]*/);
      counter++;
    }
    // Este if serve para que?
    /*if (iframes.length === 0) {
      evaluation.verdict = 'inapplicable';
      evaluation.description = `iframe doesnt have accessible name`;
      evaluation.resultCode = 'RC4';
      super.addEvaluationResult(evaluation);
    }*/
  }

  private async getContentHash(elements: ElementHandle[], page: Page): Promise<Array<string>> {
    const browser = await page.browser();
    const newPage = await browser.newPage();
    const content = new Array<string>();
    let hash;
    try {
      for (const element of elements || []) {
        const htmlContent = await element.contentFrame();
        if (htmlContent) {
          hash = createHash('md5').update(await htmlContent.content()).digest('hex'); //fixme md5
        }
        content.push(hash);
      }
    } catch (e) {};

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
export = QW_ACT_R10;