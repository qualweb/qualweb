import { ACTRuleResult } from '@qualweb/act-rules';
import rules from './rules.json';
import { DomUtils, AccessibilityUtils } from '@qualweb/util';
import languages from './language.json';
import cloneDeep from 'lodash.clonedeep';
import { QWElement } from '@qualweb/qw-element';

function ACTRuleDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
  //@ts-ignore
  const rule = rules[constructor.name];

  rule.metadata.passed = 0;
  rule.metadata.warning = 0;
  rule.metadata.failed = 0;
  rule.metadata.outcome = '';
  rule.metadata.description = '';
  rule.results = new Array<ACTRuleResult>();

  const newConstructor: any = function () {
    let func: any = function () {
      return new constructor(cloneDeep(rule));
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
    if (arguments[0]) {
      return method.apply(this, arguments);
    }
  };
}

function ElementHasAttributes(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const hasAttributes = arguments[0].elementHasAttributes();
    if (hasAttributes) {
      return method.apply(this, arguments);
    }
  };
}

function ElementHasAttribute(attribute: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function () {
      const attr = arguments[0].elementHasAttribute(attribute);
      if (attr) {
        return method.apply(this, arguments);
      }
    };
  };
}

function ElementHasNonEmptyAttribute(attribute: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function () {
      const attr = arguments[0].getElementAttribute(attribute);
      if (attr && attr.trim()) {
        return method.apply(this, arguments);
      }
    };
  };
}

function ElementHasAttributeRole(role: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function () {
      const _role = AccessibilityUtils.getElementRole(arguments[0], arguments[1]);
      if (!_role || _role === role) {
        return method.apply(this, arguments);
      }
    };
  };
}

function ElementHasAttributeValue(attribute: string, value: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function () {
      const attr = arguments[0].getElementAttribute(attribute); // AccessibilityUtils.getElementRole(arguments[0], arguments[1]);
      if (attr && attr === value) {
        return method.apply(this, arguments);
      }
    };
  };
}

function IfElementHasTagNameMustHaveAttributeRole(tagName: string, role: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function () {
      const _tagName = arguments[0].getElementTagName();
      if (_tagName === tagName) {
        const _role = arguments[0].getElementAttribute('role'); // AccessibilityUtils.getElementRole(arguments[0], arguments[1]);
        if (!_role || _role === role) {
          return method.apply(this, arguments);
        }
      } else {
        return method.apply(this, arguments);
      }
    };
  };
}

function ElementIsInAccessibilityTree(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const isInAT = AccessibilityUtils.isElementInAT(arguments[0], arguments[1]);
    if (isInAT) {
      return method.apply(this, arguments);
    }
  };
}

function ElementHasNegativeTabIndex(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const tabindex = arguments[0].getElementAttribute('tabindex');
    if (tabindex && parseInt(tabindex) <=-1) {
      return method.apply(this, arguments);
    }
  };
}

function ElementIsVisibleOrInAccessibilityTree(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    let page = arguments[1];
    let elements = arguments[1].getElements('*').filter((element: QWElement) => {
      return (
        element.hasTextNode() &&
        (DomUtils.isElementVisible(element, page) || AccessibilityUtils.isElementInAT(element, page))
      );
    });
    if (elements.length > 0) {
      return method.apply(this, arguments);
    }
  };
}

function ElementNotHidden(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const notHidden = !DomUtils.isElementHidden(arguments[0], arguments[1]);
    if (notHidden) {
      return method.apply(this, arguments);
    }
  };
}

function ElementSrcAttributeFilenameEqualsAccessibleName(
  _target: any,
  _propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value;
  descriptor.value = function () {
    const src = arguments[0].getElementAttribute('src');
    const srcSet = arguments[0].getElementAttribute('srcset');
    const parent = arguments[0].getElementParent();
    let filenameWithExtension = new Array<string>();
    if (src) {
      const filePath = src.split('/');
      filenameWithExtension = [filePath[filePath.length - 1].trim().toLowerCase()];
    }
    if (srcSet) {
      let srcSetElements = srcSet.split(',');
      for (const srcsetElement of srcSetElements || []) {
        const srcValue = srcsetElement.split(' ')[0];
        const fileSrc = srcValue.split('/');
        filenameWithExtension.push(fileSrc[fileSrc.length - 1].trim().toLowerCase());
      }
    }
    if (parent) {
      let parentTag = parent.getElementTagName();
      if (parentTag === 'picture') {
        let sourceElements = parent.getElements('source');
        for (let sourceElement of sourceElements) {
          let src = sourceElement.getElementAttribute('srcset');
          if (!!src) {
            const filePath = src.split('/');
            filenameWithExtension.push(filePath[filePath.length - 1].trim().toLowerCase());
          }
        }
      }
    }

    const accessibleName = AccessibilityUtils.getAccessibleName(arguments[0], arguments[1]);

    if (accessibleName && filenameWithExtension && filenameWithExtension.includes(accessibleName.toLowerCase())) {
      return method.apply(this, arguments);
    }
  };
}

function isInMainContext(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const differentContext = arguments[0].getElementAttribute('_documentSelector');
    if (!differentContext || !differentContext.includes('>')) {
      return method.apply(this, arguments);
    }
  };
}

function ElementIsVisible(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const isVisible = DomUtils.isElementVisible(arguments[0], arguments[1]);
    if (isVisible) {
      return method.apply(this, arguments);
    }
  };
}

function ElementHasOneOfTheFollowingRoles(roles: string[]) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function () {
      const role = AccessibilityUtils.getElementRole(arguments[0], arguments[1]);
      if (!!role && roles.includes(role)) {
        return method.apply(this, arguments);
      }
    };
  };
}

function ElementIsWidget(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const isWidget = AccessibilityUtils.isElementWidget(arguments[0], arguments[1]);
    if (isWidget) {
      return method.apply(this, arguments);
    }
  };
}

function ElementAllowsNameFromContent(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const supportsNameFromContent = AccessibilityUtils.allowsNameFromContent(arguments[0]);
    if (supportsNameFromContent) {
      return method.apply(this, arguments);
    }
  };
}

function IsHTMLDocument(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    let IsNonHTMLDocument = false;
    let htmlElement = arguments[1].getElement('html');
    if (htmlElement) IsNonHTMLDocument = htmlElement.getElementAttribute('nonHTMLPage') === 'true';
    if (!IsNonHTMLDocument) {
      return method.apply(this, arguments);
    }
  };
}

function IsLangSubTagValid(attribute: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function () {
      const attr = arguments[0].getElementAttribute(attribute);
      if (attr && isSubTagValid(attr.split('-')[0])) {
        return method.apply(this, arguments);
      }
    };
  };
}

function isSubTagValid(subTag: string): boolean {
  return languages.hasOwnProperty(subTag.toLowerCase());
}

export {
  ACTRuleDecorator,
  ElementExists,
  ElementHasAttributes,
  ElementHasAttribute,
  ElementHasAttributeRole,
  ElementHasAttributeValue,
  IfElementHasTagNameMustHaveAttributeRole,
  ElementHasNonEmptyAttribute,
  ElementIsInAccessibilityTree,
  ElementSrcAttributeFilenameEqualsAccessibleName,
  ElementIsVisible,
  ElementHasOneOfTheFollowingRoles,
  ElementIsWidget,
  ElementAllowsNameFromContent,
  IsHTMLDocument,
  IsLangSubTagValid,
  isInMainContext,
  ElementNotHidden,
  ElementIsVisibleOrInAccessibilityTree,
  ElementHasNegativeTabIndex
};
