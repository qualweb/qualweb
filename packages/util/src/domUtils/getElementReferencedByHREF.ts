import type { QWElement } from '@qualweb/qw-element';

function getElementReferencedByHREF(element: QWElement): QWElement | null {
  const href = element.getElementAttribute('href');
  const url = window.qwPage.getURL();
  const urlConcatWithId = url + '#';
  const lastSlash = url.lastIndexOf('/');
  const filename = url.substring(lastSlash + 1);
  let result: QWElement | null = null;
  if (href && (href.startsWith('#') || href.startsWith(urlConcatWithId) || (filename && filename !== '' && href.startsWith(filename)))) {
    const idSymbol = href.indexOf('#');
    if (idSymbol > -1) {
      const idReferenced = href.substring(idSymbol + 1);
      if (idReferenced.trim().length > 0) {
        const idElementReferenced = window.qwPage.getElement(`[id='${idReferenced}']` /*'#' + idReferenced*/);
        result = idElementReferenced;
      }
    }
  }
  return result;
}

export default getElementReferencedByHREF;
