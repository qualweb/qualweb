import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, IsHTMLDocument, isInMainContext } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R2 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  @IsHTMLDocument
  @isInMainContext
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const lang = element.getElementAttribute('lang');

    if (lang && lang.trim()) {
      test.verdict = 'passed';
      test.description = `The \`lang\` attribute exists and has a value.`;
      test.resultCode = 'RC1';
    } else {
      test.verdict = 'failed';
      test.description = `The \`lang\` attribute doesn't exist or is empty ("").`;
      test.resultCode = 'RC2';
    }

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_ACT_R2;
