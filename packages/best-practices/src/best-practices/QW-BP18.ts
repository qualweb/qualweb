import { BestPractice, BestPracticeResult } from '@qualweb/best-practices';
import BestPracticeObject from '../lib/BestPractice.object';
import { BestPracticeClass, ElementExists } from '../lib/decorator';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import intersection from 'lodash.intersection';

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

  constructor(bestPractice: BestPractice) {
    super(bestPractice);
  }

  @ElementExists
  execute(element: QWElement, page: QWPage): void {
    if (element.getElementTagName() === 'style') {
      const sheet = <any>element.getElementProperty('sheet');

      for (const rule of sheet.cssRules || []) {
        if (rule?.style?.cssText?.includes('width:') && this.checkIfCssSelectorIsApplicable(rule, page)) {
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

  private checkIfCssSelectorIsApplicable(rule: any, page: QWPage): boolean {
    const selectors = rule.selectorText.split(',').map((s: string) => s.trim()) || [rule.selectorText.trim()];
    const hasContainers = intersection(selectors, this.containers);

    if (hasContainers.length > 0) {
      return true;
    }

    let affectsContainers = false;
    for (const selector of selectors || []) {
      if (selector.startsWith('.') || selector.startsWith('#')) {
        const elements = page.getElements(selector);
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

  private checkCssProperty(style: string, element: QWElement): void {
    const evaluation: BestPracticeResult = {
      verdict: '',
      description: '',
      resultCode: ''
    };

    const properties = style.split(';').filter((p) => p.trim() !== '') || [style];

    for (const property of properties || []) {
      if (property.includes('width')) {
        const width = property.split(':')[1];
        const hasImportant = width.includes('!important');

        if (hasImportant) {
          if (width.endsWith('%')) {
            evaluation.verdict = 'passed';
            evaluation.description =
              'This test target has a `width` css property using percentage value with the important flag.';
            evaluation.resultCode = 'RC1';
          } else {
            evaluation.verdict = 'failed';
            evaluation.description =
              'This test target has a `width` css property not using percentage value with the important flag.';
            if (width.endsWith('px')) {
              evaluation.resultCode = 'RC2';
            } else {
              evaluation.resultCode = 'RC3';
            }
          }

          evaluation.attributes = property;

          super.addEvaluationResult(evaluation, element);
        }
      }
    }
  }
}

export = QW_BP18;
