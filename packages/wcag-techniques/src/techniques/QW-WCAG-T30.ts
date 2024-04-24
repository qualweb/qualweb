import type { CSSProperties, CSSProperty, MediaProperties, QWElement } from '@qualweb/qw-element';
import { Technique } from '../lib/Technique.object';
import { ElementExists, Test } from '@qualweb/lib';

class QW_WCAG_T30 extends Technique {
  @ElementExists
  execute(element: QWElement): void {
    const test = new Test();

    if (element.elementHasAttribute('qw-css-rules')) {
      const cssRules = element.getCSSRules();

      const property = this.findTextDecorationWithBlink(cssRules);

      if (property !== undefined) {
        test.verdict = 'failed';
        test.resultCode = 'F1';
        test.elements.push({
          pointer: element.getElementSelector(),
          htmlCode: element.getElementHtmlCode(true, true),
          property: {
            name: 'text-decoration',
            value: 'blink'
          },
          stylesheetFile: property.pointer
        });

        this.addTestResult(test);
      }
    }
  }

  private findTextDecorationWithBlink(properties: CSSProperties | undefined): CSSProperty | undefined {
    for (const property in properties ?? {}) {
      if (properties?.[property]) {
        if (property === 'media') {
          const mediaRule = this.findInMediaRules(properties.media);
          if (mediaRule !== undefined) {
            return mediaRule;
          }
        } else if (property === 'text-decoration') {
          if (properties[property].value === 'blink') {
            return <CSSProperty>properties[property];
          }
        }
      }
    }

    return undefined;
  }

  private findInMediaRules(media: MediaProperties): CSSProperty | undefined {
    for (const condition in media ?? {}) {
      for (const property in media[condition] ?? {}) {
        if (property === 'text-decoration') {
          if (media[condition][property]['value'] === 'blink') {
            return <CSSProperty>media[condition][property];
          }
        }
      }
    }

    return undefined;
  }
}

export { QW_WCAG_T30 };
