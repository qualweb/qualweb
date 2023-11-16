import { nameFromContentRoles, nameFromContentElements } from './constants';

function allowsNameFromContent(element: typeof window.qwElement): boolean {
  const name = element.getElementTagName();
  const role = element.getElementAttribute('role');

  return (!!role && nameFromContentRoles.indexOf(role) >= 0) || (!!name && nameFromContentElements.indexOf(name) >= 0);
}

export default allowsNameFromContent;
