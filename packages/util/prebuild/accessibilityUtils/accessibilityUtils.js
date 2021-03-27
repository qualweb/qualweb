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
const qw_element_1 = require("@qualweb/qw-element");
const qw_page_1 = require("@qualweb/qw-page");
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
const decorator_1 = require("../decorator");
class AccessibilityUtils {
    static getLinkContext(element, page) {
        return getLinkContext_1.default(element, page);
    }
    static elementHasValidRole(element, page) {
        return elementHasValidRole_1.default(element, page);
    }
    static getAccessibleName(element, page) {
        return getAccessibleName_1.default(element, page);
    }
    static getAccessibleNameRecursion(element, page, recursion, isWidget) {
        return getAccessibleNameRecursion_1.default(element, page, recursion, isWidget);
    }
    static getAccessibleNameSVG(element, page) {
        return getAccessibleNameSVG_1.default(element, page);
    }
    static getOwnedElements(element, page) {
        return getOwnedElements_1.default(element, page);
    }
    static getElementRole(element, page) {
        return getElementRole_1.default(element, page);
    }
    static getElementRoleAName(element, page, aName) {
        return getElementRoleAName_1.default(element, page, aName);
    }
    static isDataTable(element, page) {
        return isDataTable_1.default(element, page);
    }
    static isElementControl(element, page) {
        return isElementControl_1.default(element, page);
    }
    static isElementInAT(element, page) {
        return isElementInAT_1.default(element, page);
    }
    static isElementReferencedByAriaLabel(element, page) {
        return isElementReferencedByAriaLabel_1.default(element, page);
    }
    static isElementWidget(element, page) {
        return isElementWidget_1.default(element, page);
    }
    static getImplicitRole(element, page, accessibleName) {
        return getImplicitRole_1.default(element, page, accessibleName);
    }
    static getOwnerElement(element, page) {
        return getOwnerElement_1.default(element, page);
    }
    static isElementChildPresentationalAux(element, page) {
        return isElementChildPresentationalAux_1.default(element, page);
    }
    static isElementChildPresentational(elementQW, pageQW) {
        return isElementChildPresentational_1.default(elementQW, pageQW);
    }
    static isElementFocusableByDefault(elementQW) {
        return isElementFocusableByDefault_1.default(elementQW);
    }
    static isElementFocusable(elementQW, pageQW) {
        return isElementFocusable_1.default(elementQW, pageQW);
    }
    static isPartOfSequentialFocusNavigation(elementQW, pageQW) {
        return isPartOfSequentialFocusNavigation_1.default(elementQW, pageQW);
    }
    static elementHasGlobalARIAPropertyOrAttribute(elementQW) {
        return elementHasGlobalARIAPropertyOrAttribute_1.default(elementQW);
    }
}
AccessibilityUtils.allowsNameFromContent = allowsNameFromContent_1.default;
AccessibilityUtils.getAccessibleNameSelector = getAccessibleNameSelector_1.default;
AccessibilityUtils.getDefaultName = getDefaultName_1.default;
AccessibilityUtils.getDisabledWidgets = getDisabledWidgets_1.default;
AccessibilityUtils.isFocusableBrowser = isFocusableBrowser_1.default;
__decorate([
    decorator_1.CacheDecorator('AcceUtils.getLinkContext'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement, qw_page_1.QWPage]),
    __metadata("design:returntype", Array)
], AccessibilityUtils, "getLinkContext", null);
__decorate([
    decorator_1.CacheDecorator('AcceUtils.elementHasValidRole'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement, qw_page_1.QWPage]),
    __metadata("design:returntype", Boolean)
], AccessibilityUtils, "elementHasValidRole", null);
__decorate([
    decorator_1.CacheDecorator('AcceUtils.getAccessibleName'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement, qw_page_1.QWPage]),
    __metadata("design:returntype", Object)
], AccessibilityUtils, "getAccessibleName", null);
__decorate([
    decorator_1.FullMethodCacheDecorator('AcceUtils.getAccessibleNameRecursion'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement,
        qw_page_1.QWPage, Boolean, Boolean]),
    __metadata("design:returntype", Object)
], AccessibilityUtils, "getAccessibleNameRecursion", null);
__decorate([
    decorator_1.CacheDecorator('AcceUtils.getAccessibleNameSVG'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement, qw_page_1.QWPage]),
    __metadata("design:returntype", Object)
], AccessibilityUtils, "getAccessibleNameSVG", null);
__decorate([
    decorator_1.CacheDecorator('AcceUtils.getOwnedElements'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement, qw_page_1.QWPage]),
    __metadata("design:returntype", Array)
], AccessibilityUtils, "getOwnedElements", null);
__decorate([
    decorator_1.CacheDecorator('AcceUtils.getElementRole'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement, qw_page_1.QWPage]),
    __metadata("design:returntype", Object)
], AccessibilityUtils, "getElementRole", null);
__decorate([
    decorator_1.CacheDecorator('AcceUtils.getElementRole'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement, qw_page_1.QWPage, Object]),
    __metadata("design:returntype", Object)
], AccessibilityUtils, "getElementRoleAName", null);
__decorate([
    decorator_1.CacheDecorator('AcceUtils.isDataTable'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement, qw_page_1.QWPage]),
    __metadata("design:returntype", Boolean)
], AccessibilityUtils, "isDataTable", null);
__decorate([
    decorator_1.CacheDecorator('AcceUtils.isElementControl'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement, qw_page_1.QWPage]),
    __metadata("design:returntype", Boolean)
], AccessibilityUtils, "isElementControl", null);
__decorate([
    decorator_1.CacheDecorator('AcceUtils.isElementInAT'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement, qw_page_1.QWPage]),
    __metadata("design:returntype", Boolean)
], AccessibilityUtils, "isElementInAT", null);
__decorate([
    decorator_1.CacheDecorator('AcceUtils.isElementReferencedByAriaLabel'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement, qw_page_1.QWPage]),
    __metadata("design:returntype", Boolean)
], AccessibilityUtils, "isElementReferencedByAriaLabel", null);
__decorate([
    decorator_1.CacheDecorator('AcceUtils.isElementWidget'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement, qw_page_1.QWPage]),
    __metadata("design:returntype", Boolean)
], AccessibilityUtils, "isElementWidget", null);
__decorate([
    decorator_1.CacheDecorator('AcceUtils.getImplicitRole'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement, qw_page_1.QWPage, Object]),
    __metadata("design:returntype", Object)
], AccessibilityUtils, "getImplicitRole", null);
__decorate([
    decorator_1.CacheDecorator('AcceUtils.getOwnerElement'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement, qw_page_1.QWPage]),
    __metadata("design:returntype", Object)
], AccessibilityUtils, "getOwnerElement", null);
__decorate([
    decorator_1.CacheDecorator('AcceUtils.isElementChildPresentationalAux'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement, qw_page_1.QWPage]),
    __metadata("design:returntype", Boolean)
], AccessibilityUtils, "isElementChildPresentationalAux", null);
__decorate([
    decorator_1.CacheDecorator('AcceUtils.isElementChildPresentational'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement, qw_page_1.QWPage]),
    __metadata("design:returntype", Boolean)
], AccessibilityUtils, "isElementChildPresentational", null);
__decorate([
    decorator_1.CacheDecorator('AcceUtils.isElementFocusableByDefault'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement]),
    __metadata("design:returntype", Boolean)
], AccessibilityUtils, "isElementFocusableByDefault", null);
__decorate([
    decorator_1.CacheDecorator('AcceUtils.isElementFocusable'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement, qw_page_1.QWPage]),
    __metadata("design:returntype", Boolean)
], AccessibilityUtils, "isElementFocusable", null);
__decorate([
    decorator_1.CacheDecorator('AcceUtils.isPartOfSequentialFocusNavigation'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement, qw_page_1.QWPage]),
    __metadata("design:returntype", Boolean)
], AccessibilityUtils, "isPartOfSequentialFocusNavigation", null);
__decorate([
    decorator_1.CacheDecorator('AcceUtils.elementHasGlobalARIAPropertyOrAttribute'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement]),
    __metadata("design:returntype", Boolean)
], AccessibilityUtils, "elementHasGlobalARIAPropertyOrAttribute", null);
exports.default = AccessibilityUtils;
