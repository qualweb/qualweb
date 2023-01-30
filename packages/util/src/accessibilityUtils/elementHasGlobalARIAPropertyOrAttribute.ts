import ariaJSON from './ariaAttributesRoles.json';

function elementHasGlobalARIAPropertyOrAttribute(element: typeof window.qwElement): boolean {
  let elemAttribs = element.getElementAttributesName();
  elemAttribs = elemAttribs.filter((elem) => elem.startsWith('ar'));
  let result = false;
  let i = 0;
  while (!result && i < elemAttribs.length) {
    result = elemAttribs[i] in ariaJSON && ariaJSON[elemAttribs[i]].global === 'yes';
    i++;
  }
  return result;
}

export default elementHasGlobalARIAPropertyOrAttribute;
