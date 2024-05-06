declare module '@qualweb/global' {
  import type { TestTranslator, AssertionTranslator, ModuleTranslator, LocaleFetcher } from '@packages/locale/src';
  import type { QWElement } from '@qualweb/qw-element';
  import type { QWPage } from '@qualweb/qw-page';
  import type { DomUtils, AccessibilityUtils } from '@qualweb/util';
  import type { executeCounter } from '@qualweb/counter';
  import type { ACTRules } from '@packages/act-rules/src';
  import type { WCAGTechniques } from '@packages/wcag-techniques/src';

  global {
    interface Window {
      qwPage: QWPage;
      qwElement: QWElement;
      act: ACTRules;
      wcag: WCAGTechniques;
      executeCounter: typeof executeCounter;
      DomUtils: typeof DomUtils;
      AccessibilityUtils: typeof AccessibilityUtils;
      TestTranslator: typeof TestTranslator;
      AssertionTranslator: typeof AssertionTranslator;
      ModuleTranslator: typeof ModuleTranslator;
      LocaleFetcher: typeof LocaleFetcher;
      disabledWidgets: QWElement[];
    }
  }
}
