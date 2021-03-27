import roles from './elementImplicitRoles.json';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import isElementADescendantOfExplicitRole from '../domUtils/isElementADescendantOfExplicitRole';
import isElementFocusable from './isElementFocusable';
import elementHasGlobalARIAPropertyOrAttribute from './elementHasGlobalARIAPropertyOrAttribute';

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
              role = getRoleHeaderFooter(elementQW, pageQW, roleValue);
            } else if (name === 'form' || name === 'section') {
              if (accessibleName !== undefined) {
                role = roleValue['role'];
              }
            } else if (heading.test(name)) {
              role = getRoleHeading(elementQW, roleValue);
            } else if (name === 'img') {
              role = getRoleImg(elementQW, pageQW, roleValue);
            } else if (name === 'input') {
              role = getRoleInput(elementQW, roleValue);
            } else if (name === 'li') {
              role = getRoleLi(elementQW, roleValue);
            } else if (name === 'option') {
              role = getRoleOption(elementQW, roleValue);
            } else if (name === 'select') {
              role = getRoleSelect(elementQW, roleValue);
            } else if (name === 'td') {
              if (isElementADescendantOfExplicitRole(elementQW, pageQW, ['table'], [])) {
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

function getRoleHeading(elementQW: QWElement, roleValue) {
  const ariaLevel = elementQW.getElementAttribute('aria-level');
  let role;
  if (ariaLevel === null || parseInt(ariaLevel) > 0) {
    role = roleValue['role'];
  }
  return role;
}

function getRoleSelect(elementQW: QWElement, roleValue) {
  const size = elementQW.getElementAttribute('size');
  const multiple = elementQW.getElementAttribute('multiple');
  let role;

  if (multiple !== null && size !== null && parseInt(size, 10) > 1) {
    role = 'listbox';
  } else {
    role = roleValue['role'];
  }
  return role;
}

function getRoleHeaderFooter(elementQW: QWElement, pageQW: QWPage, roleValue) {
  let role;
  if (
    isElementADescendantOfExplicitRole(
      elementQW,
      pageQW,
      ['article', 'aside', 'main', 'nav', 'section'],
      ['article', 'complementary', 'main', 'navigation', 'region']
    )
  ) {
    role = roleValue['role'];
  }

  return role;
}

function getRoleInput(elementQW: QWElement, roleValue) {
  const list = elementQW.getElementAttribute('list');
  const type = elementQW.getElementAttribute('type');
  let role;

  if (list !== null) {
    role = roleValue['role'];
  } else if (type === 'search') {
    role = 'searchbox';
  } else {
    role = 'textbox';
  }
  return role;
}

function getRoleOption(elementQW: QWElement, roleValue) {
  const parent = elementQW.getElementParent();
  let parentName;
  let role;
  if (parent !== null) parentName = parent.getElementTagName();

  if (parentName === 'datalist') {
    role = roleValue['role'];
  }
  return role;
}

function getRoleImg(elementQW: QWElement, pageQW: QWPage, roleValue) {
  const alt = elementQW.getElementAttribute('alt');
  let role;
  if (alt !== '') {
    role = roleValue['role'];
  } else if (
    elementQW.elementHasAttribute('alt') &&
    !(isElementFocusable(elementQW, pageQW) || elementHasGlobalARIAPropertyOrAttribute(elementQW))
  ) {
    role = 'presentation';
  }
  return role;
}

function getRoleLi(elementQW: QWElement, roleValue) {
  const parent = elementQW.getElementParent();
  let role;
  const parentNames = ['ol', 'ul', 'menu'];
  let parentName;
  if (parent !== null) parentName = parent.getElementTagName();

  if (parentName !== null && parentNames.includes(parentName)) {
    role = roleValue['role'];
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
