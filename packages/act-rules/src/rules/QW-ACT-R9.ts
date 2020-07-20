'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import { DomUtils, AccessibilityUtils } from '@qualweb/util';
import Rule from '../lib/Rule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import { QWElement } from "@qualweb/qw-element";
import { QWPage } from "@qualweb/qw-page";

@ACTRuleDecorator
class QW_ACT_R9 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  execute(element: QWElement, page: QWPage): void {

    const links = element.getElements('a[href], [role="link"]');
    const iframesAll = element.getElements('iframe');
    let iframeContent,frame;

    for (const iframe of iframesAll || []) {
      try{
      frame = iframe.getContentFrame();}
      catch(e){
      }
      if (frame) {
        iframeContent = new QWPage(frame,frame.defaultView);
        links.push(...(iframeContent.getElements('a[href], [role="link"]')));
      }
      frame = null;
    }
  

    const accessibleNames = new Array<string>();
    const hrefList = new Array<string>();

    for (const link of links || []) {
      let aName, href;
      if (DomUtils.isElementADescendantOf(link, page, ['svg'], [])) {
        aName = AccessibilityUtils.getAccessibleNameSVG(link, page);
      } else if(AccessibilityUtils.isElementInAT(link, page)){
        aName = AccessibilityUtils.getAccessibleName(link, page);
      }
      href = link.getElementAttribute('href');

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
          if (!hasEqualHref) {
            /*const selector = new Array<string>();
            for (const index of hasEqualAn || []) {
              selector.push(links[index].getElementSelector());
            }
            const hashArray = this.getContentHash(selector, page);
            const firstHash = hashArray.pop();

            for (const hash of hashArray || []) {
              if (!firstHash || !hashArray || hash !== firstHash) {
                result = false;
              }
            }
            if(hashArray.length=== 0){
              result = false;
              }*/
          }
          if (hasEqualHref) {//passed
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

      super.addEvaluationResult(evaluation, links[counter]);
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
