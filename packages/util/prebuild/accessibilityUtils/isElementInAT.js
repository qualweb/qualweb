"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const isElementChildPresentational_1 = __importDefault(require("./isElementChildPresentational"));
const getElementRole_1 = __importDefault(require("./getElementRole"));
const elementHasValidRole_1 = __importDefault(require("./elementHasValidRole"));
const isElementFocusable_1 = __importDefault(require("./isElementFocusable"));
const elementHasGlobalARIAPropertyOrAttribute_1 = __importDefault(require("./elementHasGlobalARIAPropertyOrAttribute"));
const isElementHidden_1 = __importDefault(require("../domUtils/isElementHidden"));
const elementIDIsReferenced_1 = __importDefault(require("../domUtils/elementIDIsReferenced"));
function isElementInAT(elementQW, pageQW) {
    const childPresentational = isElementChildPresentational_1.default(elementQW, pageQW);
    const isHidden = isElementHidden_1.default(elementQW, pageQW);
    let result = false;
    const role = getElementRole_1.default(elementQW, pageQW);
    const validRole = elementHasValidRole_1.default(elementQW, pageQW);
    if (!isHidden && !childPresentational && role !== 'presentation' && role !== 'none') {
        const name = elementQW.getElementTagName();
        const notExposedIfEmpyTag = constants_1.notExposedIfEmpy.includes(name);
        const needsToBeInsideDetailsTag = constants_1.needsToBeInsideDetails.includes(name);
        if (constants_1.notDefaultAT.includes(name) || notExposedIfEmpyTag || needsToBeInsideDetailsTag) {
            let specialCondition = false;
            if (notExposedIfEmpyTag) {
                const text = elementQW.getElementText();
                specialCondition = !!text && text.trim() !== '';
            }
            else if (needsToBeInsideDetailsTag) {
                const parent = elementQW.getElementParent();
                specialCondition = !!parent && parent.getElementTagName() === 'details';
            }
            else if (name === 'picture') {
                const child = elementQW.getElement('img');
                specialCondition = !!child;
            }
            const type = elementQW.getElementType();
            const focusable = isElementFocusable_1.default(elementQW, pageQW);
            const id = elementQW.getElementAttribute('id');
            let ariaActivedescendant = false;
            let ariaControls = false;
            let ariaDescribedby = false;
            let ariaDetails = false;
            let ariaErrormessage = false;
            let ariaFlowto = false;
            let ariaLabelledby = false;
            let ariaOwns = false;
            if (id !== null) {
                ariaActivedescendant = elementIDIsReferenced_1.default(elementQW, pageQW, id, 'aria-activedescendant');
                ariaControls = elementIDIsReferenced_1.default(elementQW, pageQW, id, ' aria-controls');
                ariaDescribedby = elementIDIsReferenced_1.default(elementQW, pageQW, id, ' aria-describedby');
                ariaDetails = elementIDIsReferenced_1.default(elementQW, pageQW, id, ' aria-details');
                ariaErrormessage = elementIDIsReferenced_1.default(elementQW, pageQW, id, 'aria-errormessage');
                ariaFlowto = elementIDIsReferenced_1.default(elementQW, pageQW, id, 'aria-flowto');
                ariaLabelledby = elementIDIsReferenced_1.default(elementQW, pageQW, id, 'aria-labelledby');
                ariaOwns = elementIDIsReferenced_1.default(elementQW, pageQW, id, 'aria-owns');
            }
            const globalWaiARIA = elementHasGlobalARIAPropertyOrAttribute_1.default(elementQW);
            result =
                specialCondition ||
                    type === 'text' ||
                    focusable ||
                    ariaActivedescendant ||
                    ariaControls ||
                    ariaDescribedby ||
                    ariaDetails ||
                    ariaErrormessage ||
                    ariaFlowto ||
                    ariaLabelledby ||
                    ariaOwns ||
                    validRole ||
                    globalWaiARIA;
        }
        else {
            result = true;
        }
    }
    return result;
}
exports.default = isElementInAT;
