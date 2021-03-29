import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, IsHTMLDocument } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R1 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }
  
  @IsHTMLDocument
  execute(element: typeof window.qwElement | undefined): void {
    const test = new Test();
    
    //the first title element was already tested
    if (super.getNumberOfPassedResults() > 0 || super.getNumberOfFailedResults() > 0) {
      test.verdict = 'inapplicable';
      test.description = `There's already a \`title\` element that passes or fails the rule.`;
      test.resultCode = 'RC4';
    } else {
      // the first title element was not tested yet
      if (!element) {
        //the title element does not exit
        test.verdict = 'failed';
        test.description = `The \`title\` element doesn't exist.`;
        test.resultCode = 'RC1';
      }
      //the title element is empty
      else if (!element.getElementText() || element.getElementText().trim() === '') {
        test.verdict = 'failed';
        test.description = 'The `title` element is empty ("").';
        test.resultCode = 'RC2';
      } else if (element.getElementAttribute('_documentSelector')) {
        test.verdict = 'failed';
        test.description = 'The `title` element is not in the same context.';
        test.resultCode = 'RC3';
      } else {
        //the title element exists and it's not empty
        test.verdict = 'passed';
        test.description = `The \`title\` element exists and it's not empty ("").`;
        test.resultCode = 'RC4';
      }
    }
    if (element) {
      test.addElement(element);
    }

    super.addTestResult(test);
  }
}

export = QW_ACT_R1;
