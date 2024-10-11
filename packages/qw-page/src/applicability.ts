// moved from @qualweb/common

import { QWElement } from '@qualweb/qw-element';

export function ElementIsNotInert(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    let notInert: boolean = true;
    const hasInert = (<QWElement>arguments[0]).elementHasAttribute('inert');
    if (hasInert) {
      const inert = (<QWElement>arguments[0]).getElementAttribute('inert');
      if (inert !== 'false') {
        notInert = false;
      }
      if (!notInert) {
        return;
      }
    }
    let noParentInert: boolean = true;
    let parent = (<QWElement>arguments[0]).getElementParent();
    while (parent) {
      const inert = parent.getElementAttribute('inert');
      if (inert && inert === 'true') {
        noParentInert = false;
      }
      parent = parent.getElementParent();
    }
    if (!noParentInert) {
      return;
    }
    if (window.qwPage.pageHasOpenDialog()) {
      return;
    }
    return method.apply(this, arguments);
  };
}

export function ElementIsVisibleOrInAccessibilityTree(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const page = <typeof window.qwPage>window.qwPage;
    const elements = page.getElements('*').filter((element: QWElement) => {
      return (
        element.hasTextNode() &&
        (window.DomUtils.isElementVisible(element) || window.AccessibilityUtils.isElementInAT(element))
      );
    });
    if (elements.length > 0) {
      return method.apply(this, arguments);
    }
  };
}

export function IsHTMLDocument(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    let IsNonHTMLDocument = false;
    const htmlElement = window.qwPage.getElement('html');
    if (htmlElement) IsNonHTMLDocument = htmlElement.getElementAttribute('nonHTMLPage') === 'true';
    if (!IsNonHTMLDocument) {
      return method.apply(this, arguments);
    }
  };
}
