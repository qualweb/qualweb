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
const elementHasOnePixel_1 = __importDefault(require("./elementHasOnePixel"));
const isElementHiddenByCSS_1 = __importDefault(require("./isElementHiddenByCSS"));
const elementHasContent_1 = __importDefault(require("./elementHasContent"));
const cache_1 = require("../cache");
function isElementVisible(element) {
    const offScreen = element.isOffScreen();
    const cssHidden = isElementHiddenByCSS_1.default(element);
    const hasContent = elementHasContent_1.default(element, true);
    const hasOnePixelHeight = elementHasOnePixel_1.default(element);
    const opacityProperty = element.getElementStyleProperty('opacity', '');
    let opacity;
    if (opacityProperty) {
        opacity = parseInt(opacityProperty);
    }
    return !(offScreen || hasOnePixelHeight || cssHidden || !hasContent || (opacity && opacity === 0));
}
class Utility {
    static isElementVisible(element) {
        return isElementVisible(element);
    }
}
__decorate([
    cache_1.Cache('DomUtils.isElementVisible'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Boolean)
], Utility, "isElementVisible", null);
exports.default = Utility.isElementVisible;
