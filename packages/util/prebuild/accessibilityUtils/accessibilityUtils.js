"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allowsNameFromContent_1 = __importDefault(require("./allowsNameFromContent"));
const getAccessibleName_1 = __importDefault(require("./getAccessibleName"));
const getAccessibleNameRecursion_1 = __importDefault(require("./getAccessibleNameRecursion"));
const getDefaultName_1 = __importDefault(require("./getDefaultName"));
const getAccessibleNameSVG_1 = __importDefault(require("./getAccessibleNameSVG"));
const isDataTable_1 = __importDefault(require("./isDataTable"));
const isElementControl_1 = __importDefault(require("./isElementControl"));
const isElementWidget_1 = __importDefault(require("./isElementWidget"));
const getElementRole_1 = __importDefault(require("./getElementRole"));
const getElementRoleAName_1 = __importDefault(require("./getElementRoleAName"));
const getImplicitRole_1 = __importDefault(require("./getImplicitRole"));
const isElementInAT_1 = __importDefault(require("./isElementInAT"));
const elementHasValidRole_1 = __importDefault(require("./elementHasValidRole"));
const isElementReferencedByAriaLabel_1 = __importDefault(require("./isElementReferencedByAriaLabel"));
const getDisabledWidgets_1 = __importDefault(require("./getDisabledWidgets"));
const getAccessibleNameSelector_1 = __importDefault(require("./getAccessibleNameSelector"));
const getLinkContext_1 = __importDefault(require("./getLinkContext"));
const getOwnerElement_1 = __importDefault(require("./getOwnerElement"));
const isElementChildPresentational_1 = __importDefault(require("./isElementChildPresentational"));
const isElementChildPresentationalAux_1 = __importDefault(require("./isElementChildPresentationalAux"));
const elementHasGlobalARIAPropertyOrAttribute_1 = __importDefault(require("./elementHasGlobalARIAPropertyOrAttribute"));
const isElementFocusableByDefault_1 = __importDefault(require("./isElementFocusableByDefault"));
const isElementFocusable_1 = __importDefault(require("./isElementFocusable"));
const isFocusableBrowser_1 = __importDefault(require("./isFocusableBrowser"));
const getOwnedElements_1 = __importDefault(require("./getOwnedElements"));
const isPartOfSequentialFocusNavigation_1 = __importDefault(require("./isPartOfSequentialFocusNavigation"));
const ariaAttributesRoles_json_1 = __importDefault(require("./ariaAttributesRoles.json"));
const _roles_json_1 = __importDefault(require("./_roles.json"));
const language_json_1 = __importDefault(require("./language.json"));
const cache_1 = require("../cache");
class AccessibilityUtils {
    static getLinkContext(element) {
        return getLinkContext_1.default(element);
    }
    static elementHasValidRole(element) {
        return elementHasValidRole_1.default(element);
    }
    static getAccessibleName(element) {
        return getAccessibleName_1.default(element);
    }
    static getAccessibleNameRecursion(element, recursion, isWidget) {
        return getAccessibleNameRecursion_1.default(element, recursion, isWidget);
    }
    static getAccessibleNameSVG(element) {
        return getAccessibleNameSVG_1.default(element);
    }
    static getOwnedElements(element) {
        return getOwnedElements_1.default(element);
    }
    static getElementRole(element) {
        return getElementRole_1.default(element);
    }
    static getElementRoleAName(element, aName) {
        return getElementRoleAName_1.default(element, aName);
    }
    static isDataTable(element) {
        return isDataTable_1.default(element);
    }
    static isElementControl(element) {
        return isElementControl_1.default(element);
    }
    static isElementInAT(element) {
        return isElementInAT_1.default(element);
    }
    static isElementReferencedByAriaLabel(element) {
        return isElementReferencedByAriaLabel_1.default(element);
    }
    static isElementWidget(element) {
        return isElementWidget_1.default(element);
    }
    static getImplicitRole(element, accessibleName) {
        return getImplicitRole_1.default(element, accessibleName);
    }
    static getOwnerElement(element) {
        return getOwnerElement_1.default(element);
    }
    static isElementChildPresentationalAux(element) {
        return isElementChildPresentationalAux_1.default(element);
    }
    static isElementChildPresentational(element) {
        return isElementChildPresentational_1.default(element);
    }
    static isElementFocusableByDefault(elementQW) {
        return isElementFocusableByDefault_1.default(elementQW);
    }
    static isElementFocusable(element) {
        return isElementFocusable_1.default(element);
    }
    static isPartOfSequentialFocusNavigation(element) {
        return isPartOfSequentialFocusNavigation_1.default(element);
    }
    static elementHasGlobalARIAPropertyOrAttribute(elementQW) {
        return elementHasGlobalARIAPropertyOrAttribute_1.default(elementQW);
    }
}
AccessibilityUtils.ariaAttributesRoles = ariaAttributesRoles_json_1.default;
AccessibilityUtils.roles = _roles_json_1.default;
AccessibilityUtils.languages = language_json_1.default;
AccessibilityUtils.allowsNameFromContent = allowsNameFromContent_1.default;
AccessibilityUtils.getAccessibleNameSelector = getAccessibleNameSelector_1.default;
AccessibilityUtils.getDefaultName = getDefaultName_1.default;
AccessibilityUtils.getDisabledWidgets = getDisabledWidgets_1.default;
AccessibilityUtils.isFocusableBrowser = isFocusableBrowser_1.default;
__decorate([
    cache_1.Cache('AcceUtils.getLinkContext'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Array)
], AccessibilityUtils, "getLinkContext", null);
__decorate([
    cache_1.Cache('AcceUtils.elementHasValidRole'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Boolean)
], AccessibilityUtils, "elementHasValidRole", null);
__decorate([
    cache_1.Cache('AcceUtils.getAccessibleName'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AccessibilityUtils, "getAccessibleName", null);
__decorate([
    cache_1.FullMethodCache('AcceUtils.getAccessibleNameRecursion'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean, Boolean]),
    __metadata("design:returntype", Object)
], AccessibilityUtils, "getAccessibleNameRecursion", null);
__decorate([
    cache_1.Cache('AcceUtils.getAccessibleNameSVG'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AccessibilityUtils, "getAccessibleNameSVG", null);
__decorate([
    cache_1.Cache('AcceUtils.getOwnedElements'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Array)
], AccessibilityUtils, "getOwnedElements", null);
__decorate([
    cache_1.Cache('AcceUtils.getElementRole'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AccessibilityUtils, "getElementRole", null);
__decorate([
    cache_1.Cache('AcceUtils.getElementRole'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AccessibilityUtils, "getElementRoleAName", null);
__decorate([
    cache_1.Cache('AcceUtils.isDataTable'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Boolean)
], AccessibilityUtils, "isDataTable", null);
__decorate([
    cache_1.Cache('AcceUtils.isElementControl'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Boolean)
], AccessibilityUtils, "isElementControl", null);
__decorate([
    cache_1.Cache('AcceUtils.isElementInAT'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Boolean)
], AccessibilityUtils, "isElementInAT", null);
__decorate([
    cache_1.Cache('AcceUtils.isElementReferencedByAriaLabel'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Boolean)
], AccessibilityUtils, "isElementReferencedByAriaLabel", null);
__decorate([
    cache_1.Cache('AcceUtils.isElementWidget'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Boolean)
], AccessibilityUtils, "isElementWidget", null);
__decorate([
    cache_1.Cache('AcceUtils.getImplicitRole'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AccessibilityUtils, "getImplicitRole", null);
__decorate([
    cache_1.Cache('AcceUtils.getOwnerElement'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AccessibilityUtils, "getOwnerElement", null);
__decorate([
    cache_1.Cache('AcceUtils.isElementChildPresentationalAux'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Boolean)
], AccessibilityUtils, "isElementChildPresentationalAux", null);
__decorate([
    cache_1.Cache('AcceUtils.isElementChildPresentational'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Boolean)
], AccessibilityUtils, "isElementChildPresentational", null);
__decorate([
    cache_1.Cache('AcceUtils.isElementFocusableByDefault'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Boolean)
], AccessibilityUtils, "isElementFocusableByDefault", null);
__decorate([
    cache_1.Cache('AcceUtils.isElementFocusable'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Boolean)
], AccessibilityUtils, "isElementFocusable", null);
__decorate([
    cache_1.Cache('AcceUtils.isPartOfSequentialFocusNavigation'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Boolean)
], AccessibilityUtils, "isPartOfSequentialFocusNavigation", null);
__decorate([
    cache_1.Cache('AcceUtils.elementHasGlobalARIAPropertyOrAttribute'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Boolean)
], AccessibilityUtils, "elementHasGlobalARIAPropertyOrAttribute", null);
exports.default = AccessibilityUtils;
