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
const elementHasOnePixel_1 = __importDefault(require("./elementHasOnePixel"));
const isElementHiddenByCSS_1 = __importDefault(require("./isElementHiddenByCSS"));
const elementHasContent_1 = __importDefault(require("./elementHasContent"));
const qw_page_1 = require("@qualweb/qw-page");
const decorator_1 = require("../decorator");
function isElementVisible(elementQW, pageQW) {
    if (!elementQW) {
        throw Error('Element is not defined');
    }
    const offScreen = elementQW.isOffScreen();
    const cssHidden = isElementHiddenByCSS_1.default(elementQW, pageQW);
    const hasContent = elementHasContent_1.default(elementQW, pageQW, true);
    const hasOnePixelHeight = elementHasOnePixel_1.default(elementQW);
    const opacityProperty = elementQW.getElementStyleProperty('opacity', '');
    let opacity;
    if (opacityProperty) {
        opacity = parseInt(opacityProperty);
    }
    return !(offScreen || hasOnePixelHeight || cssHidden || !hasContent || (opacity && opacity === 0));
}
class Utility {
    static isElementVisible(elementQW, pageQW) {
        return isElementVisible(elementQW, pageQW);
    }
}
__decorate([
    decorator_1.CacheDecorator('DomUtils.isElementVisible'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qw_element_1.QWElement, qw_page_1.QWPage]),
    __metadata("design:returntype", Boolean)
], Utility, "isElementVisible", null);
exports.default = Utility.isElementVisible;
