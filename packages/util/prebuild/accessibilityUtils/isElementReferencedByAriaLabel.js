"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isElementReferencedByAriaLabel(element) {
    const id = element.getElementAttribute('id');
    let result = false;
    try {
        if (id !== null) {
            const referencedByAriaLabel = window.qwPage.getElements(`[aria-labelledby~="${id}"]`, element);
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
