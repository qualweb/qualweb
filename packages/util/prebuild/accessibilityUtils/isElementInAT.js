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
const elementIdIsReferenced_1 = __importDefault(require("../domUtils/elementIdIsReferenced"));
function isElementInAT(element) {
    const childPresentational = isElementChildPresentational_1.default(element);
    const isHidden = isElementHidden_1.default(element);
    let result = false;
    const role = getElementRole_1.default(element);
    const validRole = elementHasValidRole_1.default(element);
    if (!isHidden && !childPresentational && role !== 'presentation' && role !== 'none') {
        const name = element.getElementTagName();
        const notExposedIfEmpyTag = constants_1.notExposedIfEmpty.includes(name);
        const needsToBeInsideDetailsTag = constants_1.needsToBeInsideDetails.includes(name);
        if (constants_1.notDefaultAT.includes(name) || notExposedIfEmpyTag || needsToBeInsideDetailsTag) {
            let specialCondition = false;
            if (notExposedIfEmpyTag) {
                const text = element.getElementText();
                specialCondition = !!text && text.trim() !== '';
            }
            else if (needsToBeInsideDetailsTag) {
                const parent = element.getElementParent();
                specialCondition = !!parent && parent.getElementTagName() === 'details';
            }
            else if (name === 'picture') {
                const child = element.getElement('img');
                specialCondition = !!child;
            }
            const type = element.getElementType();
            const focusable = isElementFocusable_1.default(element);
            const id = element.getElementAttribute('id');
            let ariaActivedescendant = false;
            let ariaControls = false;
            let ariaDescribedby = false;
            let ariaDetails = false;
            let ariaErrormessage = false;
            let ariaFlowto = false;
            let ariaLabelledby = false;
            let ariaOwns = false;
            if (id !== null) {
                ariaActivedescendant = elementIdIsReferenced_1.default(element, id, 'aria-activedescendant');
                ariaControls = elementIdIsReferenced_1.default(element, id, ' aria-controls');
                ariaDescribedby = elementIdIsReferenced_1.default(element, id, ' aria-describedby');
                ariaDetails = elementIdIsReferenced_1.default(element, id, ' aria-details');
                ariaErrormessage = elementIdIsReferenced_1.default(element, id, 'aria-errormessage');
                ariaFlowto = elementIdIsReferenced_1.default(element, id, 'aria-flowto');
                ariaLabelledby = elementIdIsReferenced_1.default(element, id, 'aria-labelledby');
                ariaOwns = elementIdIsReferenced_1.default(element, id, 'aria-owns');
            }
            const globalWaiARIA = elementHasGlobalARIAPropertyOrAttribute_1.default(element);
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
