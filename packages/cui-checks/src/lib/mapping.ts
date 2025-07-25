import { QWCUI_Selectors } from './selectors';

let mapping: { [key: string]: string[] } = {
  QW_CC_MIC: ['QW-CUI-C1'],
  QW_CC_MESSAGES: ['QW-CUI-C2', 'QW-CUI-C4'],
  QW_QUESTIONS: ['QW-CUI-C5'],
  QW_CURRENCY: ['QW-CUI-C6'],
  QW_DATE: ['QW-CUI-C3'],
  QW_UNIT: ['QW-CUI-C7'],
};

function generateMappings(uiSelectors: QWCUI_Selectors): { [key: string]: string[] } {
  if (!uiSelectors) {
    return {};
  }

  return Object.entries(mapping).reduce(
    (acc, [key, value]) => {
      if (key in uiSelectors) {
        acc[uiSelectors.QW_CC_WINDOW + ' ' + uiSelectors[key as keyof QWCUI_Selectors]] = value;
      } else {
        acc[uiSelectors.QW_CC_WINDOW + ' ' + key] = value;
      }

      return acc;
    },
    {} as { [key: string]: string[] }
  );
}

export { generateMappings, mapping };
