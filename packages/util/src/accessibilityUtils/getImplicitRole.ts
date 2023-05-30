import roles from './elementImplicitRoles.json';

function getImplicitRole(element: typeof window.qwElement, accessibleName: string | undefined): string | null {
  const name = element.getElementTagName();
  let attributes, role;
  if (name) {
    const roleValues = roles[name.toLocaleLowerCase()];
    if (roleValues !== undefined) {
      for (const roleValue of roleValues) {
        const special = roleValue['special'];
        attributes = roleValue['attributes'];
        if (attributes.length === 0 || isInList(attributes, element)) {
          if (!special) {
            role = roleValue['role'];
          } else {
            const heading = new RegExp('h[1-6]');
            if (name === 'footer' || name === 'header') {
              role = getRoleHeaderFooter(element, roleValue);
            } else if (name === 'form' || name === 'section') {
              if (accessibleName !== undefined) {
                role = roleValue['role'];
              }
            } else if (heading.test(name)) {
              role = getRoleHeading(element, roleValue);
            } else if (name === 'img') {
              role = getRoleImg(element, roleValue);
            } else if (name === 'a') {
              role = getRoleA(element, roleValue);
            } else if (name === 'input') {
              role = getRoleInput(element, roleValue);
            } else if (name === 'li') {
              role = getRoleLi(element, roleValue);
            } else if (name === 'option') {
              role = getRoleOption(element, roleValue);
            } else if (name === 'select') {
              role = getRoleSelect(element, roleValue);
            } else if (name === 'td') {
              if (window.DomUtils.isElementADescendantOfExplicitRole(element, ['table'], [])) {
                role = roleValue['role'];
              } else if (window.DomUtils.isElementADescendantOfExplicitRole(element, ['grid', 'treegrid'], [])) {
                role = 'gridcell';
              }
            } else if (name === 'th') {
              if (window.DomUtils.isElementADescendantOfExplicitRole(element, ['table', 'grid', 'treegrid'], [])) {
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

function getRoleHeading(element: typeof window.qwElement, roleValue) {
  const ariaLevel = element.getElementAttribute('aria-level');
  let role;
  if (ariaLevel === null || parseInt(ariaLevel) > 0) {
    role = roleValue['role'];
  }
  return role;
}

function getRoleSelect(element: typeof window.qwElement, roleValue) {
  const size = element.getElementAttribute('size');
  const multiple = element.getElementAttribute('multiple');
  let role;

  if (multiple !== null && size !== null && parseInt(size, 10) > 1) {
    role = 'listbox';
  } else {
    role = roleValue['role'];
  }
  return role;
}

function getRoleHeaderFooter(element: typeof window.qwElement, roleValue) {
  let role;
  if (
    window.DomUtils.isElementADescendantOfExplicitRole(
      element,
      ['article', 'aside', 'main', 'nav', 'section'],
      ['article', 'complementary', 'main', 'navigation', 'region']
    )
  ) {
    role = roleValue['role'];
  } else {
    role = 'generic';
  }

  return role;
}

function getRoleInput(element: typeof window.qwElement, roleValue) {
  const list = element.getElementAttribute('list');
  const type = element.getElementAttribute('type');
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

function getRoleOption(element: typeof window.qwElement, roleValue) {
  const parent = element.getElementParent();
  let parentName;
  let role;
  if (parent !== null) parentName = parent.getElementTagName();

  if (parentName === 'datalist') {
    role = roleValue['role'];
  }
  return role;
}

function getRoleImg(element: typeof window.qwElement, roleValue) {
  const alt = element.getElementAttribute('alt');
  const ariaLabelledBy = element.getElementAttribute('aria-labelledby');
  const id = element.getElementAttribute('id');

  let role;
  if (alt !== '' || (ariaLabelledBy !== null && verifyAriaLabel(ariaLabelledBy, id))) {
    role = roleValue['role'];
  } else if (
    element.elementHasAttribute('alt') &&
    !(
      window.AccessibilityUtils.isElementFocusable(element) ||
      window.AccessibilityUtils.elementHasGlobalARIAPropertyOrAttribute(element)
    )
  ) {
    role = 'presentation';
  }
  return role;
}

function getRoleA(element: typeof window.qwElement, roleValue) {
  let role;
  if (element.elementHasAttribute('href')) {
    role = roleValue['role'];
  } else {
    role = 'generic';
  }
  return role;
}

function getRoleLi(element: typeof window.qwElement, roleValue) {
  const parent = element.getElementParent();
  let role;
  const parentNames = ['ol', 'ul', 'menu'];
  let parentName;
  if (parent !== null) parentName = parent.getElementTagName();

  if (parentName !== null && parentNames.includes(parentName)) {
    role = roleValue['role'];
  }
  return role;
}

function isInList(attributes, element: typeof window.qwElement) {
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

function verifyAriaLabel(ariaLabelBy: string, elementID: string | null) {
  const elementIds = ariaLabelBy.split(' ');
  let result = false;
  for (const id of elementIds) {
    if (!result && id !== '' && elementID !== id) {
      result = window.qwPage.getElementByID(id) !== null;
    }
  }

  return result;
}

export default getImplicitRole;
