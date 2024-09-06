import type { ModuleTranslator } from '@qualweb/locale';
import type { DomUtils, AccessibilityUtils } from '@qualweb/util';
import type { QWPage } from '@qualweb/qw-page';

declare global {
  interface Window {
    qwPage: QWPage;
    ModuleTranslator: typeof ModuleTranslator;
    DomUtils: typeof DomUtils;
    AccessibilityUtils: typeof AccessibilityUtils;
  }
}

export * from './applicability';
