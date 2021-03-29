import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists, ElementHasOneOfTheFollowingRoles } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R65 extends AtomicRule {
  constructor(rule: ACTRule) {
    super(rule);
  }

  @ElementExists
  @ElementHasOneOfTheFollowingRoles([
    'button',
    'checkbox',
    'img',
    'math',
    'menuitemcheckbox',
    'menuitemradio',
    'option',
    'progressbar',
    'radio',
    'scrollbar',
    'separator',
    'slider',
    'switch',
    'tab'
  ])
  execute(element: typeof window.qwElement): void {
    //sem ShadowDom ou iframes
    const elementList = element.getElements('*');
    const inSequentialFocusList = elementList.filter((element) => {
      return window.AccessibilityUtils.isPartOfSequentialFocusNavigation(element);
    });

    const test = new Test();

    if (inSequentialFocusList.length === 0) {
      test.verdict = 'passed';
      test.description =
        " The doesn't element have descendants in the flat tree that are part of sequential focus navigation.";
      test.resultCode = 'RC1';
      test.addElement(element);
    } else {
      test.verdict = 'failed';
      test.description =
        'The element have descendants in the flat tree that are part of sequential focus navigation.';
      test.resultCode = 'RC2';
      test.addElement(element, false);
    }

    super.addTestResult(test);
  }
}

export = QW_ACT_R65;
