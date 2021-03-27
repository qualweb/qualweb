'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function isElementFocusableByDefault(elementQW) {
    if (!elementQW) {
        throw Error('Element is not defined');
    }
    const draggableAttribute = elementQW.getElementAttribute('draggable');
    if (draggableAttribute && draggableAttribute === 'true') {
        return true;
    }
    else {
        const elementName = elementQW.getElementTagName();
        const hasHref = elementQW.elementHasAttribute('href');
        const elementAttributeType = elementQW.getElementAttribute('type');
        const parent = elementQW.getElementParent();
        let parentName;
        let parentChildren;
        if (parent) {
            parentName = parent.getElementTagName();
            parentChildren = parent.getElementChildren();
        }
        switch (elementName) {
            case 'a':
                if (hasHref) {
                    return true;
                }
                break;
            case 'area':
            case 'link':
                if (hasHref) {
                    return true;
                }
                break;
            case 'input':
                return !(elementAttributeType && elementAttributeType === 'hidden');
            case 'summary':
                return !!(parent &&
                    parentName === 'details' &&
                    parentChildren &&
                    elementQW.getElementSelector() === parentChildren[0].getElementSelector());
            case 'textarea':
            case 'select':
            case 'button':
            case 'iframe':
                return true;
        }
        return false;
    }
}
exports.default = isElementFocusableByDefault;
