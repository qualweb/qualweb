'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import Rule from '../lib/Rule2.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';

@ACTRuleDecorator
class QW_ACT_R4 extends Rule {

  constructor(rule?: any) {
    super(rule);
  }

  @ElementExists
  execute(element: any): void {

    const evaluation: ACTRuleResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const content = element.content;
    const httpEquiv = element.httpEquiv;

    if (super.getNumberOfPassedResults() === 1 || super.getNumberOfFailedResults() === 1) { // only one meta needs to pass or fail, others will be discarded
      evaluation.verdict = 'inapplicable';
      evaluation.description = 'Already exists one valid or invalid test target.';
      evaluation.resultCode = 'RC1';
    } else if (content === null && httpEquiv === null) { // not applicable
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target does not have the attributes \`content\` and \`http-equiv\`.`;
      evaluation.resultCode = 'RC2';
    } else if (content === null) { // not applicable
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target does not have the attribute \`content\`.`;
      evaluation.resultCode = 'RC3';
    } else if (httpEquiv === null) { // not applicable
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target does not have the attribute \`http-equiv\`.`;
      evaluation.resultCode = 'RC4';
    } else if (content.trim() === '') { // not applicable
      evaluation.verdict = 'inapplicable';
      evaluation.description = `The test target's \`content\` attribute is empty ("").`;
      evaluation.resultCode = 'RC5';
    } else {
      const indexOf = content.indexOf(';');
      if (indexOf === -1) { // if is a refresh
        if (this.checkIfIsNumber(content) && Number.isInteger(parseInt(content, 0))) {
          const n = Number(content);
          if (n < 0) { // not applicable
            evaluation.verdict = 'inapplicable';
            evaluation.description = `The test target's \`content\` attribute is invalid.`;
            evaluation.resultCode = 'RC6';
          } else if (n === 0) { // passes because the time is 0
            evaluation.verdict = 'passed';
            evaluation.description = 'The test target refreshes immediately.';
            evaluation.resultCode = 'RC7';
          } else { // fails because the time is in between 0 and 72000
            evaluation.verdict = 'failed';
            evaluation.description = `The test target refreshes after ${n} seconds.`;
            evaluation.resultCode = 'RC8';
          }
        } else { // not applicable
          evaluation.verdict = 'inapplicable';
          evaluation.description = `The test target's \`content\` attribute is invalid.`;
          evaluation.resultCode = 'RC9';
        }
      } else { // if is a redirect
        const split = content.split(';');

        if (split.length > 2) { // not applicable
          evaluation.verdict = 'inapplicable';
          evaluation.description = `The test target's \`content\` attribute is invalid.`;
          evaluation.resultCode = 'RC10';
        } else if (split[0].trim() === '' || split[1].trim() === '') { // not applicable
          evaluation.verdict = 'inapplicable';
          evaluation.description = `The test target \`content\` attribute is invalid.`;
          evaluation.resultCode = 'RC9';
        } else if (this.checkIfIsNumber(split[0]) && Number.isInteger(parseInt(split[0], 0))) {
          const n = Number(split[0]);
          if (n < 0) { // not applicable
            evaluation.verdict = 'inapplicable';
            evaluation.description = `The test target \`content\` attribute is invalid.`;
            evaluation.resultCode = 'RC6';
          }

          if (content[indexOf + 1] === ' ') { // verifies if the url is well formated
            let url: string | null = null;

            if (split[1].toLowerCase().includes('url=') && split[1].split(`'`).length > 1) {
              url = split[1].split(`'`)[1].trim();
            } else {
              url = split[1].trim();
            }

            if (url && this.validURL(url)) {
              if (n === 0) { // passes because the time is 0 and the url exists
                evaluation.verdict = 'passed';
                evaluation.description = 'The test target redirects immediately.';
                evaluation.resultCode = 'RC11';
              } else { // fails because the time is in between 0 and 72000, but the url exists
                evaluation.verdict = 'failed';
                evaluation.description = `The test target redirects after ${n} seconds.`;
                evaluation.resultCode = 'RC12';
              }
            } else { // not applicable
              evaluation.verdict = 'inapplicable';
              evaluation.description = `The test target's \`content\` attribute has an url that is valid.`;
              evaluation.resultCode = 'RC13';
            }
          } else { // not applicable
            evaluation.verdict = 'inapplicable';
            evaluation.description = `The test target's \`content\` attribute has an url that is not well formed.`;
            evaluation.resultCode = 'RC14';
          }
        } else { // not applicable
          evaluation.verdict = 'inapplicable';
          evaluation.description = `The test target's \`content\` attribute is invalid.`;
          evaluation.resultCode = 'RC9';
        }
      }
    }
    super.addEvaluationResult(evaluation, element);
  }

  private validURL(url: string): boolean {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(url);
  }

  private checkIfIsNumber(num: string): boolean {
    let success = true;
    for (const n of num || []) {
      if (isNaN(parseInt(n, 0))) {
        success = false;
        break;
      }
    }

    return success;
  }
}

export = QW_ACT_R4;
