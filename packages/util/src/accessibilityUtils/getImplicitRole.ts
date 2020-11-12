'use strict';
import roles from './elementImplicitRoles.json';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import { DomUtils, AccessibilityUtils } from '@qualweb/util';

function getImplicitRole(elementQW: QWElement, pageQW: QWPage, accessibleName: string | undefined): string | null {
  const name = elementQW.getElementTagName();
  let attributes, role;
  if (name) {
    const roleValues = roles[name.toLocaleLowerCase()];
    if (roleValues !== undefined) {
      for (const roleValue of roleValues) {
        const special = roleValue['special'];
        attributes = roleValue['attributes'];
        if (attributes.length === 0 || isInList(attributes, elementQW)) {
          if (!special) {
            role = roleValue['role'];
          } else {
            const heading = new RegExp('h[1-6]');
            if (name === 'footer' || name === 'header') {
              if (
                DomUtils.isElementADescendantOfExplicitRole(
                  elementQW,
                  pageQW,
                  ['article', 'aside', 'main', 'nav', 'section'],
                  ['article', 'complementary', 'main', 'navigation', 'region']
                )
              ) {
                role = roleValue['role'];
              }
            } else if (name === 'form' || name === 'section') {
              if (accessibleName !== undefined) {
                role = roleValue['role'];
              }
            } else if (heading.test(name)) {
              const ariaLevel = elementQW.getElementAttribute('aria-level');
              if (ariaLevel === null || parseInt(ariaLevel) > 0) {
                role = roleValue['role'];
              }
            } else if (name === 'img') {
              const alt = elementQW.getElementAttribute('alt');
              if (alt !== '') {
                role = roleValue['role'];
              } else if (
                elementQW.elementHasAttribute('alt') &&
                !(
                  AccessibilityUtils.isElementFocusable(elementQW, pageQW) ||
                  AccessibilityUtils.elementHasGlobalARIAPropertyOrAttribute(elementQW, pageQW)
                )
              ) {
                role = 'presentation';
              }
            } else if (name === 'input') {
              const list = elementQW.getElementAttribute('list');
              const type = elementQW.getElementAttribute('type');

              if (list !== null) {
                role = roleValue['role'];
              } else if (type === 'search') {
                role = 'searchbox';
              } else {
                role = 'textbox';
              }
            } else if (name === 'li') {
              const parent = elementQW.getElementParent();
              const parentNames = ['ol', 'ul', 'menu'];
              let parentName;
              if (parent !== null) parentName = parent.getElementTagName();

              if (parentName !== null && parentNames.includes(parentName)) {
                role = roleValue['role'];
              }
            } else if (name === 'option') {
              const parent = elementQW.getElementParent();
              let parentName;
              if (parent !== null) parentName = parent.getElementTagName();

              if (parentName === 'datalist') {
                role = roleValue['role'];
              }
            } else if (name === 'select') {
              const size = elementQW.getElementAttribute('size');
              const multiple = elementQW.getElementAttribute('multiple');

              if (multiple !== null && size !== null && parseInt(size, 10) > 1) {
                role = 'listbox';
              } else {
                role = roleValue['role'];
              }
            } else if (name === 'td') {
              if (DomUtils.isElementADescendantOfExplicitRole(elementQW, pageQW, ['table'], [])) {
                role = roleValue['role'];
              }
            }
          }
        }
      }
    }
  }
  return role;
}

function isInList(attributes, element: QWElement) {
  let result;
  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];
    const key = attribute[0];
    const value = attribute[1];
    const roleSpecificATT = element.getElementAttribute(key);
    if (roleSpecificATT === value || (value === '' && roleSpecificATT !== null)) result = true;
  }
  return result;
}

export default getImplicitRole;
