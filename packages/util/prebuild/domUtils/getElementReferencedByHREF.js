"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getElementReferencedByHREF(element) {
    const href = element.getElementAttribute('href');
    const url = window.qwPage.getURL();
    const urlConcatWithId = url + '#';
    const lastSlash = url.lastIndexOf('/');
    const filename = url.substring(lastSlash + 1);
    let result = null;
    if (href && (href.startsWith('#') || href.startsWith(urlConcatWithId) || href.startsWith(filename))) {
        const idSymbol = href.indexOf('#');
        if (idSymbol > -1) {
            const idReferenced = href.substring(idSymbol + 1);
            if (idReferenced.length > 0) {
                const idElementReferenced = window.qwPage.getElement('#' + idReferenced);
                result = idElementReferenced;
            }
        }
    }
    return result;
}
exports.default = getElementReferencedByHREF;
