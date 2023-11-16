import { BestPractice } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists } from '../lib/applicability';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';
@BestPracticeClass
class QW_BP18 extends BestPracticeObject {
  private readonly containers = [
    'span',
    'article',
    'section',
    'nav',
    'aside',
    'hgroup',
    'header',
    'footer',
    'address',
    'p',
    'hr',
    'blockquote',
    'div',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'li',
    'ul',
    'ol',
    'dd',
    'dt',
    'dl',
    'figcaption'
  ];

  constructor(bestPractice: BestPractice, locale: Translate) {
    super(bestPractice, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    if (element.getElementTagName() === 'style') {
      const sheet = <any>element.getElementProperty('sheet');

      for (const rule of sheet.cssRules || []) {
        if (rule?.style?.cssText?.includes('width:') && this.checkIfCssSelectorIsApplicable(rule)) {
          const style = rule?.style?.cssText;
          if (style) {
            this.checkCssProperty(style, element);
          }
        }
      }
    } else {
      const style = <string>element.getElementAttribute('style');
      this.checkCssProperty(style, element);
    }
  }

  private checkIfCssSelectorIsApplicable(rule: any): boolean {
    const selectors = rule.selectorText
      .split(new RegExp(/(?![^)(]*\([^)(]*?\)\)),(?![^\(]*\))/gm))
      .map((s: string) => s.trim()) || [rule.selectorText.trim()];
    const hasContainers = this.hasContainers(selectors);
    if (hasContainers.length > 0) {
      return true;
    }

    let affectsContainers = false;
    for (const selector of selectors || []) {
      if (selector.startsWith('.') || selector.startsWith('#')) {
        console.log(selector);
        const elements = window.qwPage.getElements(selector);
        for (const element of elements || []) {
          if (this.containers.includes(element.getElementTagName())) {
            affectsContainers = true;
            break;
          }
        }
      }
    }

    return affectsContainers;
  }

  private checkCssProperty(style: string, element: typeof window.qwElement): void {
    const test = new Test();

    const properties = style.split(';').filter((p) => p.trim() !== '') || [style];

    for (const property of properties || []) {
      if (property?.includes('width')) {
        const width = property.split(':')[1];
        const hasImportant = width?.includes('!important');

        if (hasImportant) {
          if (width.endsWith('%')) {
            test.verdict = 'passed';
            test.resultCode = 'P1';
          } else {
            test.verdict = 'failed';
            if (width.endsWith('px')) {
              test.resultCode = 'F1';
            } else {
              test.resultCode = 'F2';
            }
          }

          test.attributes.push(property);
          test.addElement(element);
          super.addTestResult(test);
        }
      }
    }
  }

  private hasContainers(selectors: Array<string>): Array<string> {
    const common = new Array<string>();

    for (const selector of selectors ?? []) {
      for (const container of this.containers ?? []) {
        if (selector === container) {
          common.push(selector);
        }
      }
    }

    return common;
  }
}

export = QW_BP18;
