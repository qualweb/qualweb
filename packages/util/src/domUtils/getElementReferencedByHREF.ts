'use strict';
import { QWPage } from '@qualweb/qw-page';
import { QWElement } from '@qualweb/qw-element';

function getElementReferencedByHREF(pageQW: QWPage, elementQW: QWElement): QWElement | null {
  if (!elementQW || !pageQW) {
    throw Error('Element is not defined');
  }

  let href = elementQW.getElementAttribute('href');
  let url = pageQW.getURL();
  let urlConcatWithId = url + '#';
  let lastSlash = url.lastIndexOf('/');
  let filename = url.substring(lastSlash + 1);
  let result;
  if (href && (href.startsWith('#') || href.startsWith(urlConcatWithId) ||
    href.startsWith(filename))) {
    let idSymbol = href.indexOf('#');
    if (idSymbol > -1) {
      let idReferenced = href.substring(idSymbol + 1);
      if (idReferenced.length > 0) {
        let idElementReferenced = pageQW.getElement('#' + idReferenced)
        result = idElementReferenced;
      }
    }
  }
  return result;
}

export default getElementReferencedByHREF;
