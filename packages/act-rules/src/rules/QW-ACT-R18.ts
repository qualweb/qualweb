import { ACTRule } from '@qualweb/act-rules';
import { Translate } from '@qualweb/locale';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R18 extends AtomicRule {
  private readonly idMap: Map<string, boolean>;

  constructor(rule: ACTRule, locale: Translate) {
    super(rule, locale);
    this.idMap = new Map<string, boolean>();
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    const id = element.getElementAttribute('id');

    if (id && !this.idMap.get(id)) {
      try {
        const elementsWithSameId = window.qwPage.getElements(`[id="${id}"]`, element);

        if (elementsWithSameId.length > 1) {
          test.verdict = 'failed';
          test.resultCode = 'F1';
        } else {
          test.verdict = 'passed';
          test.resultCode = 'P1';
        }

        test.addElements(elementsWithSameId);
        super.addTestResult(test);
      } catch {}
      this.idMap.set(id, true);
    }
  }
}

export = QW_ACT_R18;
