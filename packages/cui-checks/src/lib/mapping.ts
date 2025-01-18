import { QWCUI_Selectors } from './selectors';

let mapping: { [key: string]: string[] } = {};

function   generateMappings(uiSelectors: QWCUI_Selectors): { [key: string]: string[] } {
  if (!uiSelectors) {
    return {};
  }

  return Object.entries(mapping).reduce((acc, [key, value]) => {
    acc[uiSelectors.QW_CC_WINDOW + ' > ' + key] = value;
    return acc;
  }, {
    [uiSelectors.QW_CC_MIC]: ['QW-CUI-C1']
  });
};

export { generateMappings, mapping };