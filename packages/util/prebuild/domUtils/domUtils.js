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
const objectElementIsNonText_1 = __importDefault(require("./objectElementIsNonText"));
const isElementHidden_1 = __importDefault(require("./isElementHidden"));
const isFocusableBrowser_1 = __importDefault(require("../accessibilityUtils/isFocusableBrowser"));
const isElementVisible_1 = __importDefault(require("./isElementVisible"));
const elementIdIsReferenced_1 = __importDefault(require("./elementIdIsReferenced"));
const isElementADescendantOf_1 = __importDefault(require("./isElementADescendantOf"));
const isElementADescendantOfExplicitRole_1 = __importDefault(require("./isElementADescendantOfExplicitRole"));
const getVideoMetadata_1 = __importDefault(require("./getVideoMetadata"));
const elementHasContent_1 = __importDefault(require("./elementHasContent"));
const getTrimmedText_1 = __importDefault(require("./getTrimmedText"));
const objectElementIsNonText_2 = __importDefault(require("./objectElementIsNonText"));
const isHumanLanguage_1 = __importDefault(require("./isHumanLanguage"));
const getTextSize_1 = __importDefault(require("./getTextSize"));
const cache_1 = require("../cache");
class DomUtils {
    static isElementHidden(element) {
        return isElementHidden_1.default(element);
    }
    static isElementHiddenByCSS(element) {
        return isElementHiddenByCSS_1.default(element);
    }
    static elementIdIsReferenced(element, id, attribute) {
        return elementIdIsReferenced_1.default(element, id, attribute);
    }
    static isElementADescendantOf(element, names, roles) {
        return isElementADescendantOf_1.default(element, names, roles);
    }
    static isElementADescendantOfExplicitRole(element, names, roles) {
        return isElementADescendantOfExplicitRole_1.default(element, names, roles);
    }
    static elementHasContent(element, checkChildren) {
        return elementHasContent_1.default(element, checkChildren);
    }
    static isElementHiddenByCSSAux(element) {
        return isElementHiddenByCSSAux_1.default(element);
    }
    static getTrimmedText(element) {
        return getTrimmedText_1.default(element);
    }
}
DomUtils.getVideoMetadata = getVideoMetadata_1.default;
DomUtils.getElementReferencedByHREF = getElementReferencedByHREF_1.default;
DomUtils.videoElementHasAudio = objectElementIsNonText_1.default;
DomUtils.isFocusableBrowser = isFocusableBrowser_1.default;
DomUtils.objectElementIsNonText = objectElementIsNonText_2.default;
DomUtils.isHumanLanguage = isHumanLanguage_1.default;
DomUtils.getTextSize = getTextSize_1.default;
DomUtils.isElementVisible = isElementVisible_1.default;
__decorate([
    cache_1.Cache('DomUtils.isElementHidden'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Boolean)
], DomUtils, "isElementHidden", null);
__decorate([
    cache_1.Cache('DomUtils.isElementHiddenByCSS'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Boolean)
], DomUtils, "isElementHiddenByCSS", null);
__decorate([
    cache_1.Cache('DomUtils.elementIdIsReferenced'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Boolean)
], DomUtils, "elementIdIsReferenced", null);
__decorate([
    cache_1.Cache('DomUtils.isElementADescendantOf'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array,
        Array]),
    __metadata("design:returntype", Boolean)
], DomUtils, "isElementADescendantOf", null);
__decorate([
    cache_1.Cache('DomUtils.isElementADescendantOfExplicitRole'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array,
        Array]),
    __metadata("design:returntype", Boolean)
], DomUtils, "isElementADescendantOfExplicitRole", null);
__decorate([
    cache_1.Cache('DomUtils.elementHasContent'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean]),
    __metadata("design:returntype", Boolean)
], DomUtils, "elementHasContent", null);
__decorate([
    cache_1.Cache('DomUtils.isElementHiddenByCSSAux'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Boolean)
], DomUtils, "isElementHiddenByCSSAux", null);
__decorate([
    cache_1.Cache('DomUtils.getTrimmedText'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], DomUtils, "getTrimmedText", null);
exports.default = DomUtils;
