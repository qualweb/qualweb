'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function getElementReferencedByHREF(pageQW, elementQW) {
    if (!elementQW || !pageQW) {
        throw Error('Element is not defined');
    }
    const href = elementQW.getElementAttribute('href');
    const url = pageQW.getURL();
    const urlConcatWithId = url + '#';
    const lastSlash = url.lastIndexOf('/');
    const filename = url.substring(lastSlash + 1);
    let result;
    if (href && (href.startsWith('#') || href.startsWith(urlConcatWithId) || href.startsWith(filename))) {
        const idSymbol = href.indexOf('#');
        if (idSymbol > -1) {
            const idReferenced = href.substring(idSymbol + 1);
            if (idReferenced.length > 0) {
                const idElementReferenced = pageQW.getElement('#' + idReferenced);
                result = idElementReferenced;
            }
        }
    }
    return result;
}
exports.default = getElementReferencedByHREF;
