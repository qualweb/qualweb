import type { DomUtils, AccessibilityUtils } from '@qualweb/util';
import type { QWPage } from '@qualweb/qw-page';
import type { QWElement } from '@qualweb/qw-element';
import type { ModuleTranslator } from '@qualweb/locale';

import type {
  ModuleOptions,
  TestingData,
} from '@qualweb/core';

import {
  ModuleType,
  EvaluationModule,
  ModuleReport,
} from '@qualweb/core';

import { ACTRulesTester } from './lib/ACTRulesTester.object';

declare global {
  interface Window {
    qwPage: QWPage;
    DomUtils: typeof DomUtils;
    AccessibilityUtils: typeof AccessibilityUtils;
    disabledWidgets: QWElement[];
    ModuleTranslator: typeof ModuleTranslator;
  }
}

export class ACTRules extends EvaluationModule {
  protected readonly type = ModuleType.ACT_RULES;
  protected readonly report = new ModuleReport(this.type);
  protected readonly translator = new window.ModuleTranslator(this.type, this.translate);
  protected readonly tester = new ACTRulesTester(this.report).init(this.translator);

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
    if (!sourceHtml) {
      return [];
    }

    const parser = new DOMParser();
    const sourceDoc = parser.parseFromString('', 'text/html');

    sourceDoc.documentElement.innerHTML = sourceHtml;

    const elements = sourceDoc.querySelectorAll('meta');
    const metaElements = new Array<QWElement>();
    elements.forEach((element) => metaElements.push(window.qwPage.createQWElement(element)));
    return metaElements;
  }

  public testSpecial(): this {
    this.tester.validateZoomedTextNodeNotClippedWithCSSOverflow();
    return this;
  }
}
