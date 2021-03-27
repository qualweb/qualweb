'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function isElementReferencedByAriaLabel(elementQW, pageQW) {
    const id = elementQW.getElementAttribute('id');
    let result = false;
    try {
        if (id !== null) {
            const referencedByAriaLabel = pageQW.getElements(`[aria-labelledby~="${id}"]`, elementQW);
            let i = 0;
            while (i < referencedByAriaLabel.length) {
                const ariaLabelBy = referencedByAriaLabel[i].getElementAttribute('aria-labelledby');
                if (ariaLabelBy !== null) {
                    const ids = ariaLabelBy.split(' ');
                    if (ids.includes(id)) {
                        result = true;
                    }
                }
                i++;
            }
        }
    }
    catch (_a) { }
    return result;
}
exports.default = isElementReferencedByAriaLabel;
