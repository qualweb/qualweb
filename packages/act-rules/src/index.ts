import type { DomUtils } from '@qualweb/util';
import type { QWPage } from '@qualweb/qw-page';
import type { QWElement } from '@qualweb/qw-element';
import { ModuleTranslator } from '@qualweb/core/locale';

import type {
  ExecutableModuleContext,
  ModuleOptions,
  TestingData,
} from '@qualweb/core/evaluation';

import {
  ModuleType,
  EvaluationModuleDefinition,
  ModuleReport,
} from '@qualweb/core/evaluation';

import { ACTRulesTester } from './lib/ACTRulesTester.object';
import { QualwebPage } from '@qualweb/core/lib';
import { ACTRulesModule } from './ACTRulesModule';

// TODO: this should be imported from the packages that actually set these
// global variables
declare global {
  interface Window {
    qwPage: QWPage;
    DomUtils: typeof DomUtils;
    // AccessibilityUtils: typeof AccessibilityUtils;
    disabledWidgets: QWElement[];
  }
}

export class ACTRules extends EvaluationModuleDefinition {
  protected readonly type = ModuleType.ACT_RULES;
  protected readonly report = new ModuleReport(this.type);
  // TODO: this used to use a constructor function that was expected to be
  // present on window.ModuleTranslator. Is it important that a global variable
  // be used here instead of just importing directly from locale?
  // protected readonly translator = new ModuleTranslator(this.type, this.translate);
  protected readonly translator = new ModuleTranslator(this.type, this.translate);
  protected readonly tester = new ACTRulesTester(this.report).init(this.translator);

  public override configure(options: ModuleOptions): this {
    super.configure(options);
    this.tester.configureCompositeRules();
    return this;
  }

  getInstance(page: QualwebPage): ExecutableModuleContext {
    console.warn('MISSING: PASS IN OPTIONS!');
    // FIXME: options aren't being set!
    return new ACTRulesModule(page, {});
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
