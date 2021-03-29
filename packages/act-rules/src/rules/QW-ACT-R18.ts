import { ACTRule } from '@qualweb/act-rules';
import AtomicRule from '../lib/AtomicRule.object';
import { ACTRuleDecorator, ElementExists } from '../lib/decorator';
import Test from '../lib/Test.object';

@ACTRuleDecorator
class QW_ACT_R18 extends AtomicRule {
  private readonly idMap: Map<string, boolean>;

  constructor(rule: ACTRule) {
    super(rule);
    this.idMap = new Map<string, boolean>();
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    let elementsWithSameId = new Array<typeof window.qwElement>();

    const id = element.getElementAttribute('id');

    if (id && !this.idMap.get(id)) {
      try {
        elementsWithSameId = window.qwPage.getElements(`[id="${id}"]`, element);

        if (elementsWithSameId.length > 1) {
          test.verdict = 'failed';
          test.description = `Several elements have the same \`id\` attribute (${id}).`;
          test.resultCode = 'RC1';
        } else {
          test.verdict = 'passed';
          test.description = 'The test target has a unique `id` attribute.';
          test.resultCode = 'RC2';
        }

        test.addElements(elementsWithSameId)
        super.addTestResult(test);
      } catch {
      }
      this.idMap.set(id, true);
    }
  }
}

export = QW_ACT_R18;
