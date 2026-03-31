import { QWElement } from '@qualweb/qw-element';
import { ElementExists, ElementIsVisible } from '@qualweb/util/applicability';
import { Test, Verdict } from '@qualweb/core/evaluation';
import { Technique } from '../lib/Technique.object';
import { QWTextNode } from '@qualweb/qw-element';

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
    const validTextNodes = this.getValidTextNode(textNodes);
    
    if (!validTextNodes || validTextNodes.length === 0) {
      const children = label.getElements('svg, img');
      const validChildren = children.filter(child => {
        return allowed.includes(element.visualOrientationTo(child).primary);
      });
      const accessibleChildren = this.getAccessibleImages(validChildren);

      test.verdict = accessibleChildren.length > 0 ? Verdict.PASSED : Verdict.FAILED;
      test.resultCode = accessibleChildren.length > 0 ? 'P2' : 'F2';
      return this.addResult(test, element);
    }

    const textNode = validTextNodes.find(node => node.isVisible());
    if (!textNode) {
      
      test.verdict = Verdict.FAILED;
      test.resultCode = 'F1';
      return this.addResult(test, element);
    }

    const orientation = element.visualOrientationTo(textNode);
    const position = orientation.primary;    
    const isCorrect = allowed.includes(position);

    test.verdict = isCorrect ? Verdict.PASSED : Verdict.FAILED;
    test.resultCode = isCorrect ? 'P1' : 'F1';
    this.addResult(test, element);
  }

  private getValidTextNode(textNodes: QWTextNode[] | null) {
    return textNodes?.filter(node => {
      const parent = node.getParentElement();
      if (!parent) return false;

      const tagName = parent.getElementTagName().toLowerCase();

      const blacklist = ['svg', 'script', 'style', 'template', 'noscript'];
      if (blacklist.includes(tagName)) {
        return false;
      }

      if (parent.getClosestAncestor('svg' as any)) {
        return false;
      }
      return true;
    });
  }

private getAccessibleImages(elements: QWElement[]): QWElement[] {
    if (!elements || elements.length === 0) return [];
    return elements.filter(el => {
      const tagName = el.getElementTagName().toLowerCase();
      const attrs = el.getElementAttributes();
      const hasValue = (v: string | undefined) => !!v?.trim();

      if (hasValue(attrs["aria-label"]) || hasValue(attrs["aria-labelledby"])) return true;

      if (tagName === 'img') return hasValue(attrs["alt"]) || hasValue(attrs["title"]);

      if (tagName === 'svg') {
        const titleText = el.getElement('title')?.getElementText()?.trim();

        return !!titleText;
      }
      return false;
    });
  }

  private addResult(test: Test, element: QWElement): void {
    test.addElement(element);
    this.addTestResult(test);
  }

}




export { QW_WCAG_T17 };
