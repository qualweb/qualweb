import { ACTRules } from '@packages/act-rules/src';
import { WCAGTechniques } from '@packages/wcag-techniques/src';
import { executeCounter } from '@packages/counter/src';

declare global {
  interface Window {
    act: ACTRules;
    wcag: WCAGTechniques;
    executeCounter: typeof executeCounter;
  }
}

export * from './qualweb';
