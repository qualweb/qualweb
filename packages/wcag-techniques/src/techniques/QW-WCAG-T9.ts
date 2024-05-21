import type { QWElement } from '@packages/qw-element/src';
import { ElementExists } from '@shared/applicability';
import { Test } from '@shared/classes';
import { Technique } from '../lib/Technique.object';

class QW_WCAG_T9 extends Technique {
  @ElementExists
  execute(element: QWElement): void {
    const headingList = window.qwPage.getElements('h1, h2, h3, h4, h5, h6, [role="heading"]');
    if (headingList.length === 0) {
      return;
    }
    const headingObjectList = [];
    for (const heading of headingList) {
      const tagName = heading.getElementTagName();
      let level;
      if (tagName.includes('h')) {
        level = +tagName.replace('h', '');
      } else {
        const ariaLevel = heading.getElementAttribute('aria-level');
        level = ariaLevel ? +ariaLevel : 1;
      }
      const selector = heading.getElementSelector();
      headingObjectList.push({ level, selector, heading });
    }

    const orderErrors: QWElement[] = [];
    for (const [i, element] of headingObjectList.entries()) {
      const nextIndex = i + 1;
      if (nextIndex < headingObjectList.length) {
        const level = element.level;
        const nextElement = headingObjectList[nextIndex];
        const nextLevel = nextElement.level;
        const levelDif = nextLevel - level;
        if (levelDif > 1 && !orderErrors.includes(element.heading)) {
          orderErrors.push(element.heading);
        }
      }
    }
    let test = new Test();

    if (orderErrors.length === 0) {
      // the heading elements are correctly used
      test.verdict = 'warning';
      test.resultCode = 'W1';
      test.addElement(element);
      this.addTestResult(test);
    } else {
      for (const error of orderErrors) {
        test.verdict = 'failed';
        test.resultCode = 'F1';
        test.addElement(error);
        this.addTestResult(test);
        test = new Test();
      }
    }
  }
}

export { QW_WCAG_T9 };
