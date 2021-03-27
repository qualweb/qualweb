import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';
import isElementInAT from './isElementInAT';

function getAriaOwner(elementQW: QWElement, pageQW: QWPage): QWElement | null {
  const id = elementQW.getElementAttribute('id');
  const ariaOwns = pageQW.getElements('[aria-owns]', elementQW);
  let index = 0;
  let ariaOwner;
  while (id && index < ariaOwns.length && !!ariaOwns) {
    const ariaElement = ariaOwns[index];
    const ariaOwnsAttribute = ariaElement.getElementAttribute('aria-owns');
    if (ariaOwnsAttribute) {
      const idArray = ariaOwnsAttribute.split(' ');
      if (idArray.includes(id) && isElementInAT(ariaElement, pageQW)) {
        ariaOwner = ariaElement;
      }
    }
    index++;
  }
  return ariaOwner || null;
}

export default getAriaOwner;
