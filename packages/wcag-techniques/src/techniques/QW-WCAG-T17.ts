import { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementIsVisible } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { Technique } from '../lib/Technique.object';

const TEXT_POSITION:Record<string, string[]> = {
  'radio': ['right'],
  'checkbox': ['right'],
  'default': ['up','left']
};


class QW_WCAG_T17 extends Technique {
  @ElementExists
  @ElementIsVisible
  execute(element: QWElement): void {
    const test = new Test();
    const id = (element.getElementAttribute('id') || "").trim();
    const type = element.getElementAttribute('type') || 'text';
    const allowed = TEXT_POSITION[type] || TEXT_POSITION['default'];

    let label = id ? window.qwPage.getElement(`label[for="${id}"]`) : null;

    if (!label){
      label = element.getClosestAncestor('label');
      if (!label) {
        test.verdict = Verdict.FAILED;
        test.resultCode = 'F1'; 
        return this.addResult(test, element);
      }
    }

    const textNodes = label.getDescendantTextNodes(); 
    

    if (!textNodes || textNodes.length === 0) {
      const children = label.getElement('svg[alt], svg[aria-label], img[alt], img[aria-label], img[role],svg[role]');
      if (children != null) {
        test.verdict = Verdict.PASSED;
        test.resultCode = 'P1';
        return this.addResult(test, element);
      }else{
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F2';
      return this.addResult(test, element);
      }
    }


    const textNode = textNodes.find(node => node.isVisible());
    if (!textNode) {
      
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F2';
      return this.addResult(test, element);
    }

    const orientation = element.visualOrientationTo(textNode);
    const position = orientation.primary;

    const isCorrect = allowed.includes(position);

    test.verdict = isCorrect ? Verdict.PASSED : Verdict.FAILED;
    test.resultCode = isCorrect ? 'P1' : 'F1';
    this.addResult(test, element);
  }

  private addResult(test: Test, element: QWElement): void {
    test.addElement(element);
    this.addTestResult(test);
  }

}




export { QW_WCAG_T17 };
