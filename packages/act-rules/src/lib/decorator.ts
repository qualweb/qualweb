'use strict';

import { ACTRuleResult } from '@qualweb/act-rules';
import rules from './rules.json';
import { DomUtils } from '@qualweb/util';

function ACTRule<T extends { new (...args: any[]): {} }>(constructor: T) {
  const rule = rules[constructor.name];
  
  rule.metadata.passed = 0;
  rule.metadata.warning = 0;
  rule.metadata.failed = 0;
  rule.metadata.outcome = '';
  rule.metadata.description = '';
  rule.results = new Array<ACTRuleResult>();
  
  const newConstructor: any = function () {
    let func: any = function () {
      return new constructor(rule);
    }
    func.prototype = constructor.prototype;
    return new func();
  }
  newConstructor.prototype = constructor.prototype;
  return newConstructor;
}

function ElementExists(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function() {
    if (arguments[0]) {
      return method.apply(this, arguments);
    } else {
      return;
    }
  };
}

function ElementHasAttributes(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = async function() {
    const hasAttributes = await DomUtils.elementHasAttributes(arguments[0]);
    if (hasAttributes) {
      return method.apply(this, arguments);
    } else {
      return;
    }
  };
}

export { ACTRule, ElementExists, ElementHasAttributes };