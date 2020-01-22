'use strict';

import { DomElement } from 'htmlparser2';
import Rule from './Rule2.object';

import { ACTRuleResult } from '@qualweb/act-rules';

import { DomUtils } from '@qualweb/util';

class QW_ACT_R4 extends Rule {

  constructor() {
    super({
      name: 'Meta-refresh no delay',
      code: 'QW-ACT-R4',
      mapping: 'bc659a',
      description: 'This rule checks that the meta element is not used for delayed redirecting or refreshing.',
      metadata: {
        target: {
          element: 'meta'
        },
        'success-criteria': [{
            name: '2.1.1',
            level: 'A',
            principle: 'Operable',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/keyboard'
          },
          {
            name: '2.2.4',
            level: 'AAA',
            principle: 'Operable',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/interruptions'
          },
          {
            name: '3.2.5',
            level: 'AAA',
            principle: 'Understandable',
            url: 'https://www.w3.org/WAI/WCAG21/Understanding/change-on-request'
          }
        ],
        related: ['H76', 'F40', 'F41'],
        url: 'https://act-rules.github.io/rules/bc659a',
        passed: 0,
        warning: 0,
        failed: 0,
        type: ['ACTRule', 'TestCase'],
        outcome: '',
        description: ''
      },
      results: new Array<ACTRuleResult>()
    });
  }

  async execute(element: DomElement | undefined): Promise<void> {
  
    if (!element) { // if the element doesn't exist, there's nothing to test
      return;
    }

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const content = DomUtils.getElementAttribute2(element, 'content');
    const httpEquiv = DomUtils.getElementAttribute2(element, 'http-equiv');

    if (super.getNumberOfPassedResults() === 1 || super.getNumberOfFailedResults() === 1) { // only one meta needs to pass or fail, others will be discarded
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'Already exists one valid or invalid <meta> above';
      evaluation.resultCode = 'RC1';
    } else if (!element.attribs) { // not applicable
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'Inexistent attributes "content" and "http-equiv"';
      evaluation.resultCode = 'RC2';
    } else if (content === null) { // not applicable
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'Inexistent attribute "content"';
      evaluation.resultCode = 'RC3';
    } else if (httpEquiv === null) { // not applicable
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'Inexistent attribute "http-equiv"';
      evaluation.resultCode = 'RC4';
    } else if (content.trim() === '') { // not applicable
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'Attribute "content" is empty';
      evaluation.resultCode = 'RC5';
    } else {
      const indexOf = content.indexOf(';');

      if (indexOf === -1) { // if is a refresh
        if (this.checkIfIsNumber(content) && Number.isInteger(parseInt(content, 0))) {
          const n = Number(content);
          if (n < 0) { // not applicable
            evaluation.verdict = 'inapplicable';
            evaluation.description = `Time value can't be negative`;
            evaluation.resultCode = 'RC6';
          } else if (n === 0) { // passes because the time is 0
            evaluation.verdict = 'passed';
            evaluation.description = 'Refreshes immediately';
            evaluation.resultCode = 'RC7';
          } else if (n > 72000) { // passes because the time is bigger than 72000
            evaluation.verdict = 'passed';
            evaluation.description = 'Refreshes after more than 20 hours';
            evaluation.resultCode = 'RC8';
          } else { // fails because the time is in between 0 and 72000
            evaluation.verdict = 'failed';
            evaluation.description = `Refreshes after ${n} seconds`;
            evaluation.resultCode = 'RC9';
          }
        } else { // not applicable
          evaluation.verdict = 'inapplicable';
          evaluation.description = '"Content" attribute is invalid';
          evaluation.resultCode = 'RC10';
        }
      } else { // if is a redirect
        const split = content.split(';');

        if (split.length > 2) { // not applicable
          evaluation.verdict = 'inapplicable';
          evaluation.description = 'Malformated "Content" attribute';
          evaluation.resultCode = 'RC11';
        } else if (split[0].trim() === '' || split[1].trim() === '') { // not applicable
          evaluation.verdict = 'inapplicable';
          evaluation.description = '"Content" attribute is invalid';
          evaluation.resultCode = 'RC10';
        } else if (this.checkIfIsNumber(split[0]) && Number.isInteger(parseInt(split[0], 0))) {
          const n = Number(split[0]);
          if (n < 0) { // not applicable
            evaluation.verdict = 'inapplicable';
            evaluation.description = `Time value can't be negative`;
            evaluation.resultCode = 'RC6';
          }

          if (content[indexOf + 1] === ' ') { // verifies if the url is well formated
            let url: string | null = null;

            if (split[1].toLowerCase().includes('url=')) {
              url = split[1].split(`'`)[1].trim();
            } else {
              url = split[1].trim();
            }

            if (url && this.validURL(url)) {
              if (n === 0) { // passes because the time is 0 and the url exists
                evaluation.verdict = 'passed';
                evaluation.description = 'Redirects immediately';
                evaluation.resultCode = 'RC12';
              } else if (n > 72000) { // passes because the time is bigger than 72000 and the url exists
                evaluation.verdict = 'passed';
                evaluation.description = 'Redirects after more than 20 hours';
                evaluation.resultCode = 'RC13';
              } else { // fails because the time is in between 0 and 72000, but the url exists
                evaluation.verdict = 'failed';
                evaluation.description = `Redirects after ${n} seconds`;
                evaluation.resultCode = 'RC14';
              }
            } else { // not applicable
              evaluation.verdict = 'inapplicable';
              evaluation.description = 'Url is not valid';
              evaluation.resultCode = 'RC15';
            }
          } else { // not applicable
            evaluation.verdict = 'inapplicable';
            evaluation.description = 'Url is malformated';
            evaluation.resultCode = 'RC16';
          }
        } else { // not applicable
          evaluation.verdict = 'inapplicable';
          evaluation.description = '"Content" attribute is invalid"';
          evaluation.resultCode = 'RC10';
        }
      }
    }

    //evaluation.htmlCode = await DomUtils.getElementHtmlCode(element);
    //evaluation.pointer = await DomUtils.getElementSelector(element);

    super.addEvaluationResult(evaluation);
  }

  private validURL(url: string): boolean {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(url);
  }

  private checkIfIsNumber(num: string): boolean {
    let success = true;
    for (let n of num) {
      if (isNaN(parseInt(n, 0))) {
        success = false;
        break;
      }
    }

    return success;
  }
}

export = QW_ACT_R4;