'use strict';

import { DomElement } from 'htmlparser2';
import _ from 'lodash';
import Rule from './Rule.object';
const stew = new (require('stew-select')).Stew();

import { ACTRule, ACTRuleResult } from '@qualweb/act-rules';
import { AccessibilityTreeUtils} from '@qualweb/util';

import {
  getElementSelector,
  transform_element_into_html,
  getContentHash
} from '../util';


const rule: ACTRule = {
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
    inapplicable: 0,
    failed: 0,
    warning: 0,
    type: ['ACTRule', 'TestCase'],
    a11yReq: ['WCAG21:language'],
    outcome: '',
    description: ''
  },
  results: new Array<ACTRuleResult>()
};

class QW_ACT_R9 extends Rule {

  constructor() {
    super(rule);
  }



  async execute(element: DomElement | undefined, processedHTML: DomElement[], url: string): Promise<void> {
    let evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    let splittedUrl = url.split("://");
    let baseUrl ="http://"+splittedUrl[1].split("/")[0];


    if (element === undefined) { // if the element doesn't exist, there's nothing to test
      evaluation.verdict = 'inapplicable';
      evaluation.description = `body element doesn't exist`;
      evaluation.resultCode = 'RC1';
    } else {
      let links = stew.select(element, 'a[href],[role="link"]');
      let accessibleNames: string[] = [];

      for (let link of links) {
        if(link.parent.name!== 'svg')
          accessibleNames.push(AccessibilityTreeUtils.getAccessibleName(link, processedHTML,false));//trim
      }

      let counter = 0;
      let hasEqualAn: number[];
      let blacklist: number[] = [];
      for (let accessibleName of accessibleNames) {
        hasEqualAn = [];
        if(blacklist.indexOf(counter) >= 0){
          //element already evaluated
        }
        else if (accessibleName && accessibleName !== "") {
          hasEqualAn = this.isInListExceptIndex(accessibleName, accessibleNames, counter);
          if (hasEqualAn.length > 0) {
            blacklist.push(...hasEqualAn);
            let result = true;
            let resource = this.getAboluteUrl(this.getReferenceURl(links[counter]), baseUrl);
            let resourceHash = await getContentHash(resource);//get resource hash do counter

            for (let index of hasEqualAn) {
              let currentLinkUrl = this.getAboluteUrl(this.getReferenceURl(links[index]), baseUrl);
              if (result && (resource !== currentLinkUrl && await getContentHash(currentLinkUrl) !== resourceHash)) {
                result = false;
              }
            }
            if (result) {//passed
              evaluation.verdict = 'passed';
              evaluation.description = `Links with the same accessible name have equal content`;
              evaluation.resultCode = 'RC2';

            } else { //warning
              evaluation.verdict = 'warning';
              evaluation.description = `Links with the same accessible name have different content.Verify is the content is equivalent`;
              evaluation.resultCode = 'RC3';

            }

          } else {//inaplicable
            evaluation.verdict = 'inapplicable';
            evaluation.description = `There is no link with same the same accessible name`;
            evaluation.resultCode = 'RC4';
          }
          evaluation.code = transform_element_into_html(links[counter]);
          evaluation.pointer = getElementSelector(links[counter]);
          super.addEvaluationResult(evaluation);
          evaluation = {
            verdict: '',
            description: '',
            resultCode: ''
          };
        } else {//inaplicable
          evaluation.verdict = 'inapplicable';
          evaluation.description = `link doesnt have accessible name`;
          evaluation.resultCode = 'RC4';

          evaluation.code = transform_element_into_html(links[counter]);
          evaluation.pointer = getElementSelector(links[counter]);
          super.addEvaluationResult(evaluation);
          evaluation = {
            verdict: '',
            description: '',
            resultCode: ''
          };

        }

        counter++;
      }


    }


  }

  private getReferenceURl(element: DomElement) {
    if (!element.attribs)//fixme mudar para funcao do util
      return "";
    let hRef = element.attribs['href'];//fixme mudar para funcao do util
    let onClick = element.attribs['onclick'];//fixme mudar para funcao do util
    let onkeypress = element.attribs['onkeypress'];//fixme mudar para funcao do util
    let result;

    if (hRef)
      result = hRef;
    else if (onClick){
      let splittedValue = onClick.replace("'","").split("location=");
      result = splittedValue[1];
    }
    else if (onkeypress){
      let splittedValue = onkeypress.replace("'","").split("location=");
      result = splittedValue[1];
    }
    return result;
  }

  private isInListExceptIndex(accessibleName: string, accessibleNames: string[], index: number) {
    let counter = 0;
    let result: number[] = [];
    for (let accessibleNameToCompare of accessibleNames) {
      if (accessibleNameToCompare === accessibleName && counter !== index) {
        result.push(counter);
      }
      counter++;
    }

    return result;
  }
  
  private getAboluteUrl(relativeUrl: string, baseUrl: string) {
    let reg = new RegExp("^/");
    let result = relativeUrl;
    if (reg.test(relativeUrl)) {
      result = baseUrl + relativeUrl;
    }

    return result;
  }
}

export = QW_ACT_R9;
