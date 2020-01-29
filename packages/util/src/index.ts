'use strict';

import DomUtils from './domUtils/domUtils';
import BrowserUtils from './browserUtils/browserUtils';
import AccessibilityUtils from './accessibilityUtils/accessibilityUtils';
import CssUtils from './cssUtils/cssUtils';
import ShadowDomUtils from './shadowDomUtils/shadowDomUtils';

class Optimization {
  public static Performance = 1;
  public static ErrorDetection = 2;
};

export {
  DomUtils,
  BrowserUtils,
  AccessibilityUtils,
  CssUtils,
  ShadowDomUtils,
  Optimization
};
