import { WCAGTechnique, WCAGTechniqueResult } from '@qualweb/wcag-techniques';
import { Translate } from '@qualweb/locale';
import techniques from './techniques.json';

function WCAGTechniqueClass<T extends { new (...args: any[]): {} }>(constructor: T) {
  const newConstructor: any = function () {
    const locales = <Translate>arguments[0];

    //@ts-ignore
    const technique = <WCAGTechnique>techniques[constructor.name];

    technique.metadata.passed = 0;
    technique.metadata.warning = 0;
    technique.metadata.failed = 0;
    technique.metadata.inapplicable = 0;
    technique.metadata.outcome = 'inapplicable';
    try {
      technique.name = <string>(
        (locales.translate['wcag-techniques']?.[technique.code]?.name ??
          locales.fallback['wcag-techniques']?.[technique.code]?.name)
      );
      technique.description = <string>(
        (locales.translate['wcag-techniques']?.[technique.code]?.description ??
          locales.fallback['wcag-techniques']?.[technique.code]?.description)
      );
      technique.metadata.description = <string>(
        (locales.translate['wcag-techniques']?.[technique.code]?.results?.I1 ??
          locales.fallback['wcag-techniques']?.[technique.code].results?.I1)
      );
    } catch (err) {
      console.error(err);
    }
    technique.results = new Array<WCAGTechniqueResult>();

    const func: any = function () {
      return new constructor(technique, locales);
    };
    func.prototype = constructor.prototype;
    return new func();
  };
  newConstructor.prototype = constructor.prototype;
  return newConstructor;
}

function ElementExists(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    if (<typeof window.qwElement>arguments[0]) {
      return method.apply(this, arguments);
    } else {
      return;
    }
  };
}

function ElementHasAttributes(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const hasAttributes = (<typeof window.qwElement>arguments[0]).elementHasAttributes();
    if (hasAttributes) {
      return method.apply(this, arguments);
    } else {
      return;
    }
  };
}

function ElementHasAttribute(attribute: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function () {
      const attr = (<typeof window.qwElement>arguments[0]).elementHasAttribute(attribute);
      if (attr) {
        return method.apply(this, arguments);
      }
    };
  };
}

function ElementIsInAccessibilityTree(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const isInAT = window.AccessibilityUtils.isElementInAT(<typeof window.qwElement>arguments[0]);
    if (isInAT) {
      return method.apply(this, arguments);
    }
  };
}

function ElementIsVisible(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const isInAT = window.DomUtils.isElementVisible(<typeof window.qwElement>arguments[0]);
    if (isInAT) {
      return method.apply(this, arguments);
    }
  };
}

function ElementIsDataTable(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const isDataTable = window.AccessibilityUtils.isDataTable(<typeof window.qwElement>arguments[0]);
    if (isDataTable) {
      return method.apply(this, arguments);
    }
  };
}

function ElementHasAccessibleName(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const accessibleName = window.AccessibilityUtils.getAccessibleName(<typeof window.qwElement>arguments[0]);
    if (accessibleName?.trim() !== '') {
      return method.apply(this, arguments);
    }
  };
}

export {
  WCAGTechniqueClass,
  ElementExists,
  ElementHasAttributes,
  ElementHasAttribute,
  ElementIsInAccessibilityTree,
  ElementIsVisible,
  ElementIsDataTable,
  ElementHasAccessibleName
};
