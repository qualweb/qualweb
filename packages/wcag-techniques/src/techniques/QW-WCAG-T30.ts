import { WCAGTechnique } from '@qualweb/wcag-techniques';
import Technique from '../lib/Technique.object';
import { WCAGTechniqueClass, ElementExists } from '../lib/applicability';
import { CSSProperties, CSSProperty, MediaProperties } from '@qualweb/qw-element';
import Test from '../lib/Test.object';
import { Translate } from '@qualweb/locale';

@WCAGTechniqueClass
class QW_WCAG_T30 extends Technique {
  constructor(technique: WCAGTechnique, locale: Translate) {
    super(technique, locale);
  }

  @ElementExists
  execute(element: typeof window.qwElement): void {
    const test = new Test();

    if (element.elementHasAttribute('_cssRules')) {
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

        super.addTestResult(test);
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

export = QW_WCAG_T30;
