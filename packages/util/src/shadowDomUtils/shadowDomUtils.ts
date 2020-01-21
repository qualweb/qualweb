'use strict';

import processShadowDomFunction from './processShadowDom';
import areElementsInTheSameTreeFunction from'./areElementsInTheSameTree';
import getTreeSelectorFunction from './getTreeSelector';

namespace ShadowDomUtils {
  export const processShadowDom = processShadowDomFunction;
  export const areElementsInTheSameTree = areElementsInTheSameTreeFunction;
  export const getTreeSelector = getTreeSelectorFunction;
}

export = ShadowDomUtils;