import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, ElementHasOneOfTheFollowingRoles } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R41 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  @ElementHasOneOfTheFollowingRoles([
    'checkbox',
    'combobox',
    'listbox',
    'menuitemcheckbox',
    'menuitemradio',
    'radio',
    'searchbox',
    'slider',
    'spinbutton',
    'switch',
    'textbox'
  ])
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    test.verdict = 'warning';
    test.description =
      ' Check that text error messages provided, identify the cause of the error or how to fix the error.';
    test.resultCode = 'RC1';

    test.addElement(element);
    super.addTestResult(test);
  }
}

export = QW_ACT_R41;
