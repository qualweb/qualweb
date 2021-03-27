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
const getElementReferencedByHREF_1 = __importDefault(require("./getElementReferencedByHREF"));
const isElementHiddenByCSS_1 = __importDefault(require("./isElementHiddenByCSS"));
const isElementHiddenByCSSAux_1 = __importDefault(require("./isElementHiddenByCSSAux"));
const objectElementisNonText_1 = __importDefault(require("./objectElementisNonText"));
const isElementHidden_1 = __importDefault(require("./isElementHidden"));
const isFocusableBrowser_1 = __importDefault(require("../accessibilityUtils/isFocusableBrowser"));
const isElementVisible_1 = __importDefault(require("./isElementVisible"));
const elementIDIsReferenced_1 = __importDefault(require("./elementIDIsReferenced"));
const isElementADescendantOf_1 = __importDefault(require("./isElementADescendantOf"));
const isElementADescendantOfExplicitRole_1 = __importDefault(require("./isElementADescendantOfExplicitRole"));
const getVideoMetadata_1 = __importDefault(require("./getVideoMetadata"));
const elementHasContent_1 = __importDefault(require("./elementHasContent"));
const getTrimmedText_1 = __importDefault(require("./getTrimmedText"));
const objectElementisNonText_2 = __importDefault(require("./objectElementisNonText"));
const qw_element_1 = require("@qualweb/qw-element");
const qw_page_1 = require("@qualweb/qw-page");
const decorator_1 = require("../decorator");
class DomUtils {
    static isElementHidden(elementQW, pageQW) {
        return isElementHidden_1.default(elementQW, pageQW);
    }
    static isElementHiddenByCSS(elementQW, pageQW) {
        return isElementHiddenByCSS_1.default(elementQW, pageQW);
    }
    static elementIDIsReferenced(elementQW, pageQW, id, attribute) {
        return elementIDIsReferenced_1.default(elementQW, pageQW, id, attribute);
    }
    static isElementADescendantOf(elementQW, pageQW, names, roles) {
        return isElementADescendantOf_1.default(elementQW, pageQW, names, roles);
    }
    static isElementADescendantOfExplicitRole(elementQW, pageQW, names, roles) {
        return isElementADescendantOfExplicitRole_1.default(elementQW, pageQW, names, roles);
    }
    static elementHasContent(elementQW, pageQW, checkChildren) {
        return elementHasContent_1.default(elementQW, pageQW, checkChildren);
    }
    static isElementHiddenByCSSAux(elementQW) {
        return isElementHiddenByCSSAux_1.default(elementQW);
    }
    static getTrimmedText(element) {
        return getTrimmedText_1.default(element);
    }
}
DomUtils.getVideoMetadata = getVideoMetadata_1.default;
DomUtils.getElementReferencedByHREF = getElementReferencedByHREF_1.default;
DomUtils.videoElementHasAudio = objectElementisNonText_1.default;
DomUtils.isFocusableBrowser = isFocusableBrowser_1.default;
DomUtils.objectElementisNonText = objectElementisNonText_2.default;
DomUtils.isElementVisible = isElementVisible_1.default;
__decorate([
    decorator_1.CacheDecorator('DomUtils.isElementHidden'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement, qw_page_1.QWPage]),
    __metadata("design:returntype", Boolean)
], DomUtils, "isElementHidden", null);
__decorate([
    decorator_1.CacheDecorator('DomUtils.isElementHiddenByCSS'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement, qw_page_1.QWPage]),
    __metadata("design:returntype", Boolean)
], DomUtils, "isElementHiddenByCSS", null);
__decorate([
    decorator_1.CacheDecorator('DomUtils.elementIDIsReferenced'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement, qw_page_1.QWPage, String, String]),
    __metadata("design:returntype", Boolean)
], DomUtils, "elementIDIsReferenced", null);
__decorate([
    decorator_1.CacheDecorator('DomUtils.isElementADescendantOf'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement,
        qw_page_1.QWPage, Array, Array]),
    __metadata("design:returntype", Boolean)
], DomUtils, "isElementADescendantOf", null);
__decorate([
    decorator_1.CacheDecorator('DomUtils.isElementADescendantOfExplicitRole'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement,
        qw_page_1.QWPage, Array, Array]),
    __metadata("design:returntype", Boolean)
], DomUtils, "isElementADescendantOfExplicitRole", null);
__decorate([
    decorator_1.CacheDecorator('DomUtils.elementHasContent'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement, qw_page_1.QWPage, Boolean]),
    __metadata("design:returntype", Boolean)
], DomUtils, "elementHasContent", null);
__decorate([
    decorator_1.CacheDecorator('DomUtils.isElementHiddenByCSSAux'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement]),
    __metadata("design:returntype", Boolean)
], DomUtils, "isElementHiddenByCSSAux", null);
__decorate([
    decorator_1.CacheDecorator('DomUtils.getTrimmedText'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement]),
    __metadata("design:returntype", String)
], DomUtils, "getTrimmedText", null);
exports.default = DomUtils;
