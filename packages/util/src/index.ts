'use strict';

import DomUtils from './domUtils/domUtils';
import BrowserUtils from './browserUtils/browserUtils';
import AccessibilityUtils from './accessibilityUtils/accessibilityUtils';
import CssUtils from './cssUtils/cssUtils';
enum Optimization {
  Performance = 1,
  ErrorDetection = 2
}

export { DomUtils, BrowserUtils, AccessibilityUtils, CssUtils, Optimization };
