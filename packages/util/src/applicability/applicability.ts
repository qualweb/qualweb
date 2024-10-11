import type { QWElement } from '@qualweb/qw-element';

export function ElementExists(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    if (<QWElement>arguments[0]) {
      return method.apply(this, arguments);
    }
  };
}

export function ElementIsHTMLElement(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const element = <QWElement>arguments[0];
    if (element.isElementHTMLElement()) {
      return method.apply(this, arguments);
    }
  };
}

export function ElementHasAttributes(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const hasAttributes = (<QWElement>arguments[0]).elementHasAttributes();
    if (hasAttributes) {
      return method.apply(this, arguments);
    }
  };
}

export function ElementHasAttribute(attribute: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function () {
      const attr = (<QWElement>arguments[0]).elementHasAttribute(attribute);
      if (attr) {
        return method.apply(this, arguments);
      }
    };
  };
}

export function ElementHasNonEmptyAttribute(attribute: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function () {
      const attr = (<QWElement>arguments[0]).getElementAttribute(attribute);
      if (attr && attr.trim()) {
        return method.apply(this, arguments);
      }
    };
  };
}

export function ElementHasAttributeRole(role: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function () {
      const _role = window.AccessibilityUtils.getElementRole(<QWElement>arguments[0]);
      if (!_role || _role === role) {
        return method.apply(this, arguments);
      }
    };
  };
}

export function ElementHasAttributeValue(attribute: string, value: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function () {
      const attr = (<QWElement>arguments[0]).getElementAttribute(attribute);
      if (attr && attr === value) {
        return method.apply(this, arguments);
      }
    };
  };
}

export function IfElementHasTagNameMustHaveAttributeRole(tagName: string, role: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function () {
      const _tagName = (<QWElement>arguments[0]).getElementTagName();
      if (_tagName === tagName) {
        const _role = (<QWElement>arguments[0]).getElementAttribute('role'); // window.AccessibilityUtils.getElementRole(arguments[0], arguments[1]);
        if (!_role || _role === role) {
          return method.apply(this, arguments);
        }
      } else {
        return method.apply(this, arguments);
      }
    };
  };
}

export function ElementHasText(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const element = <QWElement>arguments[0];
    if (window.DomUtils.getTrimmedText(element) !== '') {
      return method.apply(this, arguments);
    }
  };
}

export function ElementHasTextNode(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const element = <QWElement>arguments[0];
    if (element.elementHasTextNode()) {
      return method.apply(this, arguments);
    }
  };
}

export function ElementIsInAccessibilityTree(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const isInAT = window.AccessibilityUtils.isElementInAT(<QWElement>arguments[0]);
    if (isInAT) {
      return method.apply(this, arguments);
    }
  };
}

export function ElementHasNegativeTabIndex(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const tabindex = (<QWElement>arguments[0]).getElementAttribute('tabindex');
    if (tabindex && parseInt(tabindex) <= -1) {
      return method.apply(this, arguments);
    }
  };
}

export function ElementIsNotHidden(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const notHidden = !window.DomUtils.isElementHidden(<QWElement>arguments[0]);
    if (notHidden) {
      return method.apply(this, arguments);
    }
  };
}

export function ElementSrcAttributeFilenameEqualsAccessibleName(
  _target: any,
  _propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value;
  descriptor.value = function () {
    const src = (<QWElement>arguments[0]).getElementAttribute('src');
    const srcSet = (<QWElement>arguments[0]).getElementAttribute('srcset');
    const parent = (<QWElement>arguments[0]).getElementParent();
    let filenameWithExtension = new Array<string>();
    if (src) {
      const filePath = src.split('/');
      filenameWithExtension = [filePath[filePath.length - 1].trim().toLowerCase()];
    }
    if (srcSet) {
      const srcSetElements = srcSet.split(',');
      for (const srcsetElement of srcSetElements || []) {
        const srcValue = srcsetElement.split(' ')[0];
        const fileSrc = srcValue.split('/');
        filenameWithExtension.push(fileSrc[fileSrc.length - 1].trim().toLowerCase());
      }
    }
    if (parent) {
      const parentTag = parent.getElementTagName();
      if (parentTag === 'picture') {
        const sourceElements = parent.getElements('source');
        for (const sourceElement of sourceElements) {
          const src = sourceElement.getElementAttribute('srcset');
          if (src) {
            const filePath = src.split('/');
            filenameWithExtension.push(filePath[filePath.length - 1].trim().toLowerCase());
          }
        }
      }
    }

    const accessibleName = window.AccessibilityUtils.getAccessibleName(<QWElement>arguments[0]);

    if (accessibleName && filenameWithExtension && filenameWithExtension.includes(accessibleName.toLowerCase())) {
      return method.apply(this, arguments);
    }
  };
}

export function IsInMainContext(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const differentContext = (<QWElement>arguments[0]).getElementAttribute('_documentSelector');
    if (!differentContext || !differentContext.includes('>')) {
      return method.apply(this, arguments);
    }
  };
}

export function ElementIsVisible(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const isVisible = window.DomUtils.isElementVisible(<QWElement>arguments[0]);
    if (isVisible) {
      return method.apply(this, arguments);
    }
  };
}

export function ElementIsNot(names: string[]) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function () {
      const name = (<QWElement>arguments[0]).getElementTagName();
      if (name && !names.includes(name)) {
        return method.apply(this, arguments);
      }
    };
  };
}

export function ElementHasOneOfTheFollowingRoles(roles: string[]) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function () {
      const role = window.AccessibilityUtils.getElementRole(<QWElement>arguments[0]);
      if (!!role && roles.includes(role)) {
        return method.apply(this, arguments);
      }
    };
  };
}

export function ElementIsWidget(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const isWidget = window.AccessibilityUtils.isElementWidget(<QWElement>arguments[0]);
    if (isWidget) {
      return method.apply(this, arguments);
    }
  };
}

export function ElementIsNotWidget(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const isWidget = window.AccessibilityUtils.isElementWidget(<QWElement>arguments[0]);
    if (!isWidget) {
      return method.apply(this, arguments);
    }
  };
}

export function ElementAllowsNameFromContent(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const supportsNameFromContent = window.AccessibilityUtils.allowsNameFromContent(
      <QWElement>arguments[0]
    );
    if (supportsNameFromContent) {
      return method.apply(this, arguments);
    }
  };
}

export function ElementHasCSSRules(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const element = <QWElement>arguments[0];
    if (element.getCSSRules()) {
      return method.apply(this, arguments);
    }
  };
}

export function IsLangSubTagValid(attribute: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function () {
      const attr = (<QWElement>arguments[0]).getElementAttribute(attribute);
      if (attr && isSubTagValid(attr.split('-')[0])) {
        return method.apply(this, arguments);
      }
    };
  };
}

function isSubTagValid(subTag: string): boolean {
  const languages = window.AccessibilityUtils.languages;
  return subTag.toLowerCase() in languages;
}

export function ElementIsImage(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const element = <QWElement>arguments[0];
    const role = window.AccessibilityUtils.getElementRole(element);
    if (element.getElementTagName() === 'img' || role === 'img') {
      return method.apply(this, arguments);
    }
  };
}

export function ElementIsNonText(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const element = <QWElement>arguments[0];
    const isNonText = window.DomUtils.objectElementIsNonText(element);
    if (isNonText) {
      return method.apply(this, arguments);
    }
  };
}

const semanticLinkRoles = ['link', 'doc-backlink', 'doc-biblioref', 'doc-glossref', 'doc-noteref'];

export function ElementIsSemanticLink(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const element = <QWElement>arguments[0];
    const role = window.AccessibilityUtils.getElementRole(element);
    if (!!role && semanticLinkRoles.includes(role)) {
      return method.apply(this, arguments);
    }
  };
}

export function ElementIsDataTable(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const isDataTable = window.AccessibilityUtils.isDataTable(<QWElement>arguments[0]);
    if (isDataTable) {
      return method.apply(this, arguments);
    }
  };
}

export function ElementHasAccessibleName(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const accessibleName = window.AccessibilityUtils.getAccessibleName(<QWElement>arguments[0]);
    if (accessibleName?.trim() !== '') {
      return method.apply(this, arguments);
    }
  };
}

export function ElementHasChild(child: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function () {
      const children = (<QWElement>arguments[0]).getElements(child);
      if (children.length !== 0) {
        return method.apply(this, arguments);
      }
    };
  };
}

export function ElementHasVisibleChild(child: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function () {
      const children = (<QWElement>arguments[0]).getElements(child);
      if (children.length !== 0) {
        let isVisible = false;
        for (const child of children ?? []) {
          isVisible ||= window.DomUtils.isElementVisible(child);
        }

        if (isVisible) {
          return method.apply(this, arguments);
        }
      }
    };
  };
}

export function ElementDoesNotHaveChild(child: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function () {
      const children = (<QWElement>arguments[0]).getElements(child);
      if (children.length === 0) {
        return method.apply(this, arguments);
      }
    };
  };
}

export function ElementHasParent(parent: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function () {
      const element = (<QWElement>arguments[0]).elementHasParent(parent);
      if (element) {
        return method.apply(this, arguments);
      }
    };
  };
}

export function ElementIsNotChildOf(parent: string) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function () {
      const hasParent = (<QWElement>arguments[0]).elementHasParent(parent);
      if (!hasParent) {
        return method.apply(this, arguments);
      }
    };
  };
}
