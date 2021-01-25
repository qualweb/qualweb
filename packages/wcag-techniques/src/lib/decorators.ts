import { WCAGTechniqueResult } from "@qualweb/wcag-techniques";
import techniques from "./techniques.json";
import cloneDeep from "lodash.clonedeep";
import { AccessibilityUtils, DomUtils } from "@qualweb/util";

function WCAGTechnique<T extends { new (...args: any[]): {} }>(constructor: T) {
  const technique = techniques[constructor.name];

  technique.metadata.passed = 0;
  technique.metadata.warning = 0;
  technique.metadata.failed = 0;
  technique.metadata.outcome = "";
  technique.metadata.description = "";
  technique.results = new Array<WCAGTechniqueResult>();

  const newConstructor: any = function () {
    let func: any = function () {
      return new constructor(cloneDeep(technique));
    };
    func.prototype = constructor.prototype;
    return new func();
  };
  newConstructor.prototype = constructor.prototype;
  return newConstructor;
}

function ElementExists(
  _target: any,
  _propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value;
  descriptor.value = function () {
    if (arguments[0]) {
      return method.apply(this, arguments);
    } else {
      return;
    }
  };
}

function ElementHasAttributes(
  _target: any,
  _propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value;
  descriptor.value = function () {
    const hasAttributes = arguments[0].elementHasAttributes();
    if (hasAttributes) {
      return method.apply(this, arguments);
    } else {
      return;
    }
  };
}

function ElementHasAttribute(attribute: string) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const method = descriptor.value;
    descriptor.value = function () {
      const attr = arguments[0].elementHasAttribute(attribute);
      if (attr) {
        return method.apply(this, arguments);
      }
    };
  };
}

function ElementIsInAccessibilityTree(
  _target: any,
  _propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value;
  descriptor.value = function () {
    const isInAT = AccessibilityUtils.isElementInAT(arguments[0], arguments[1]);
    if (isInAT) {
      return method.apply(this, arguments);
    }
  };
}
function ElementIsVisible(
  _target: any,
  _propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value;
  descriptor.value = function () {
    const isInAT = DomUtils.isElementVisible(arguments[0], arguments[1]);
    if (isInAT) {
      return method.apply(this, arguments);
    }
  };
}

export {
  WCAGTechnique,
  ElementExists,
  ElementHasAttributes,
  ElementHasAttribute,
  ElementIsInAccessibilityTree,
  ElementIsVisible,
};
