'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils, AccessibilityUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRule, ElementExists } from '../lib/decorator';
import { QWElement } from "@qualweb/qw-element";
import { QWPage } from "@qualweb/qw-page";

@ACTRule
class QW_ACT_R10 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  execute(element: QWElement, page: QWPage): void {

    const iframes = element.getElements('iframe[src]');
    const iframesAll = element.getElements('iframe');
    let iframeContent,frame;

    for (const iframe of iframesAll || []) {
      try{
      frame = iframe.getContentFrame();}
      catch(e){
      }
      if (frame) {
        iframeContent = new QWPage(frame,frame.defaultView);
        iframes.push(...(iframeContent.getElements('iframe[src]')));
      }
      frame = null;
    }

    const accessibleNames = new Array<string>();

    // add iframe contents
    for (const link of iframes || []) {
      if (!(DomUtils.isElementADescendantOf(link, page, ['svg'], [])) && !(DomUtils.isElementHidden(link,page)) /*await AccessibilityUtils.isElementInAT(link,page)*/) {
        const aName = AccessibilityUtils.getAccessibleName(link, page);
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

      const elements = new Array<QWElement>();

      if (blacklist.indexOf(counter) >= 0) {
        //element already evaluated
      } else if (accessibleName && accessibleName.trim() !== '') {
        const hasEqualAn = this.isInListExceptIndex(accessibleName, accessibleNames, counter);
        if (hasEqualAn.length > 0) {
          blacklist.push(...hasEqualAn);
          hasEqualAn.push(counter);

          for (const index of hasEqualAn || []) {
            elements.push(iframes[index]);
          }
          const hashArray = this.getContentHash(elements);
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
          } else {
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
      super.addMultipleElementEvaluationResult(evaluation, elements);
      counter++;
    }
    /* if (iframes.length === 0) {
       evaluation.verdict = 'inapplicable';
       evaluation.description = `iframe doesnt have accessible name`;
       evaluation.resultCode = 'RC4';
       super.addEvaluationResult(evaluation);
     }*/
  }

  private getContentHash(elements: QWElement[]): Array<string> {
    let content: string[] = [];
    let htmlContent;
    try {
      for (const element of elements) {
        htmlContent = element.getContentFrame()
        if (htmlContent!== null) {
          let page = new QWPage(htmlContent,htmlContent.defaultView)
          content.push(page.getHTMLContent());
        }
      }
    } catch (e) {
    };
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
