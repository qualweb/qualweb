import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R4 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const content = element.getElementAttribute('content');
    const httpEquiv = element.getElementAttribute('http-equiv');

    if (super.getNumberOfPassedResults() === 1 || super.getNumberOfFailedResults() === 1) {
      // only one meta needs to pass or fail, others will be discarded
      test.verdict = 'inapplicable';
      test.description = 'Already exists one valid or invalid test target.';
      test.resultCode = 'RC1';
    } else if (content === null && httpEquiv === null) {
      // not applicable
      test.verdict = 'inapplicable';
      test.description = `The test target doesn't have the attributes \`content\` and \`http-equiv\`.`;
      test.resultCode = 'RC2';
    } else if (content === null) {
      // not applicable
      test.verdict = 'inapplicable';
      test.description = `The test target doesn't have the attribute \`content\`.`;
      test.resultCode = 'RC3';
    } else if (httpEquiv === null) {
      // not applicable
      test.verdict = 'inapplicable';
      test.description = `The test target doesn't have the attribute \`http-equiv\`.`;
      test.resultCode = 'RC4';
    } else if (content.trim() === '') {
      // not applicable
      test.verdict = 'inapplicable';
      test.description = `The test target \`content\` attribute is empty ("").`;
      test.resultCode = 'RC5';
    } else {
      const indexOf = content.indexOf(';');
      if (indexOf === -1) {
        // if is a refresh
        if (this.checkIfIsNumber(content) && Number.isInteger(parseInt(content, 0))) {
          const n = Number(content);
          if (n < 0) {
            // not applicable
            test.verdict = 'inapplicable';
            test.description = `The test target \`content\` attribute is invalid.`;
            test.resultCode = 'RC6';
          } else if (n === 0) {
            // passes because the time is 0
            test.verdict = 'passed';
            test.description = 'The test target refreshes immediately.';
            test.resultCode = 'RC7';
          } else if (n > 72000) {
            // passes because the time is bigger than 72000
            test.verdict = 'passed';
            test.description = 'The test target refreshes after more than 20 hours.';
            test.resultCode = 'RC8';
          } else {
            // fails because the time is in between 0 and 72000
            test.verdict = 'failed';
            test.description = `The test target refreshes after ${n} seconds.`;
            test.resultCode = 'RC9';
          }
        } else {
          // not applicable
          test.verdict = 'inapplicable';
          test.description = `The test target \`content\` attribute is invalid.`;
          test.resultCode = 'RC10';
        }
      } else {
        // if is a redirect
        const split = content.split(';');

        if (split.length > 2) {
          // not applicable
          test.verdict = 'inapplicable';
          test.description = `The test target \`content\` attribute is invalid.`;
          test.resultCode = 'RC11';
        } else if (split[0].trim() === '' || split[1].trim() === '') {
          // not applicable
          test.verdict = 'inapplicable';
          test.description = `The test target \`content\` attribute is invalid.`;
          test.resultCode = 'RC10';
        } else if (this.checkIfIsNumber(split[0]) && Number.isInteger(parseInt(split[0], 0))) {
          const n = Number(split[0]);
          if (n < 0) {
            // not applicable
            test.verdict = 'inapplicable';
            test.description = `The test target \`content\` attribute is invalid.`;
            test.resultCode = 'RC6';
          }

          if (content[indexOf + 1] === ' ') {
            // verifies if the url is well formatted
            let url: string | null = null;

            if (split[1].toLowerCase().includes('url=') && split[1].split(`'`).length > 1) {
              url = split[1].split(`'`)[1].trim();
            } else {
              url = split[1].trim();
            }

            if (url && this.validURL(url)) {
              if (n === 0) {
                // passes because the time is 0 and the url exists
                test.verdict = 'passed';
                test.description = 'The test target redirects immediately.';
                test.resultCode = 'RC12';
              } else if (n > 72000) {
                // passes because the time is bigger than 72000 and the url exists
                test.verdict = 'passed';
                test.description = 'The test target redirects after more than 20 hours.';
                test.resultCode = 'RC13';
              } else {
                // fails because the time is in between 0 and 72000, but the url exists
                test.verdict = 'failed';
                test.description = `The test target redirects after ${n} seconds.`;
                test.resultCode = 'RC14';
              }
            } else {
              // not applicable
              test.verdict = 'inapplicable';
              test.description = 'The test target `content` attribute has an url that is valid.';
              test.resultCode = 'RC15';
            }
          } else {
            // not applicable
            test.verdict = 'inapplicable';
            test.description = `The test target \`content\` attribute has an url that isn't well formed.`;
            test.resultCode = 'RC16';
          }
        } else {
          // not applicable
          test.verdict = 'inapplicable';
          test.description = 'The test target `content` attribute is invalid.';
          test.resultCode = 'RC10';
        }
      }
    }

    test.addElement(element);
    super.addTestResult(test);
  }

  private validURL(url: string): boolean {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
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
