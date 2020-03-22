'use strict';

import { ElementHandle, Page } from 'puppeteer';
import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils, AccessibilityUtils } from '@qualweb/util';
import { createHash } from 'crypto';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';

@ACTRule
class QW_ACT_R10 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  async execute(element: ElementHandle, page: Page): Promise<void> {

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
      if (!(await DomUtils.isElementADescendantOf(link, page, ['svg'], [])) && !(await DomUtils.isElementHidden(link)) /*await AccessibilityUtils.isElementInAT(link,page)*/) {
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
            evaluation.description = `The \`iframes\` with the same accessible name have equal content.`;
            evaluation.resultCode = 'RC2';
          } else { //failed
            evaluation.verdict = 'warning';
            evaluation.description = `The \`iframes\` with the same accessible name have different content.`;
            evaluation.resultCode = 'RC3';
          }
        } else { //inaplicable
          evaluation.verdict = 'inapplicable';
          evaluation.description = `Doesn't exist any other \`iframe\` with same the same accessible name.`;
          evaluation.resultCode = 'RC4';
        }
      } else { //inaplicable
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The \`iframe\` doesn't have an accessible name.`;
        evaluation.resultCode = 'RC4';
      }
      await super.addEvaluationResult(evaluation , iframes[counter]);
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
    const browser = page.browser();
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
