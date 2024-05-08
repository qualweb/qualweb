import type { ModuleOptions, TestingData } from '@shared/types';
import { EvaluationModule, ModuleReport } from '@shared/classes';
import type { QWElement } from '@packages/qw-element/src';
import type { ModuleTranslator } from '@packages/locale/src';
import type { DomUtils, AccessibilityUtils } from '@packages/util/src';
import type { QWPage } from '@packages/qw-page/src';
import { ACTRulesTester } from './lib/ACTRulesTester.object';
import type { Rule } from './lib/Rule.object';

declare global {
  interface Window {
    qwPage: QWPage;
    ModuleTranslator: typeof ModuleTranslator;
    DomUtils: typeof DomUtils;
    AccessibilityUtils: typeof AccessibilityUtils;
    disabledWidgets: QWElement[];
  }
}

class ACTRules extends EvaluationModule<Rule> {
  private readonly moduleTranslator = new window.ModuleTranslator('act-rules', this.locale);
  protected readonly report = new ModuleReport<Rule>('act-rules');
  protected readonly tester = new ACTRulesTester(this.report).init(this.moduleTranslator);

  public override configure(options: ModuleOptions): this {
    super.configure(options);
    this.tester.configureCompositeRules();
    return this;
  }

  public override test(data: TestingData): this {
    const metaElements = this.getMetaElements(data.sourceHtml);
    this.tester.validateMetaElements(metaElements);
    this.tester.execute();
    return this;
  }

  private getMetaElements(sourceHtml?: string): QWElement[] {
    if (sourceHtml) {
      const parser = new DOMParser();
      const sourceDoc = parser.parseFromString('', 'text/html');

      sourceDoc.documentElement.innerHTML = sourceHtml;

      const elements = sourceDoc.querySelectorAll('meta');
      const metaElements = new Array<QWElement>();
      elements.forEach((element) => metaElements.push(window.qwPage.createQWElement(element)));
      return metaElements;
    } else {
      return [];
    }
  }

  public override testSpecial(): this {
    this.tester.validateZoomedTextNodeNotClippedWithCSSOverflow();
    return this;
  }
}

export { ACTRules };
