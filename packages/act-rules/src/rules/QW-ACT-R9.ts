'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils, AccessibilityUtils } from '@qualweb/util';
import Rule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, isInMainContext } from '../lib/decorator';
import { QWElement } from '@qualweb/qw-element';
import { QWPage } from '@qualweb/qw-page';

@ACTRuleDecorator
class QW_ACT_R9 extends Rule {
  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  @isInMainContext
  execute(_element: QWElement, page: QWPage): void {
    const links = page.getElements('a[href], [role="link"]');

    const accessibleNames = new Array<string>();
    const hrefList = new Array<string | null>();
    const aplicableLinks = new Array<QWElement>();

    for (const link of links || []) {
      let aName, href;
      if (DomUtils.isElementADescendantOf(link, page, ['svg'], [])) {
        aName = AccessibilityUtils.getAccessibleNameSVG(link, page);
      } else if (AccessibilityUtils.isElementInAT(link, page)) {
        aName = AccessibilityUtils.getAccessibleName(link, page);
      }
      href = link.getElementAttribute('href');

      if (aName) {
        hrefList.push(href);
        accessibleNames.push(aName);
        aplicableLinks.push(link);
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
      const elementList = new Array<QWElement>();

      if (blacklist.indexOf(counter) >= 0) {
        //element already evaluated
      } else if (!!accessibleName && accessibleName !== '') {
        const hasEqualAn = this.isInListExceptIndex(accessibleName, accessibleNames, counter);

        if (hasEqualAn.length > 0) {
          blacklist.push(...hasEqualAn);
          let hasEqualHref = true;
          for (const index of hasEqualAn) {
            hasEqualHref = hrefList[index] === hrefList[counter] && hrefList[counter] !== null;
            elementList.push(aplicableLinks[index]);
          }
          elementList.push(aplicableLinks[counter]);
          hasEqualAn.push(counter);
          if (hasEqualHref) {
            //passed
            evaluation.verdict = 'passed';
            evaluation.description = `The \`links\` with the same accessible name have equal content.`;
            evaluation.resultCode = 'RC2';
          } else {
            //warning
            evaluation.verdict = 'warning';
            evaluation.description = `The \`links\` with the same accessible name have different content. Verify is the content is equivalent.`;
            evaluation.resultCode = 'RC3';
          }
        } else {
          //inaplicable
          evaluation.verdict = 'inapplicable';
          evaluation.description = `Doesn't exist any other \`link\` with the same accessible name.`;
          evaluation.resultCode = 'RC4';
        }
        super.addMultipleElementEvaluationResult(evaluation, elementList, true, false, true, page);
      } else {
        //inaplicable
        evaluation.verdict = 'inapplicable';
        evaluation.description = `The \`link\` doesn't have an accessible name.`;
        evaluation.resultCode = 'RC4';
        super.addMultipleElementEvaluationResult(evaluation, elementList);
      }
      counter++;
    }
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
