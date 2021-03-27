"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullMethodCacheDecorator = exports.CacheDecorator = void 0;
function CacheDecorator(methodName) {
    return function (_target, _propertyKey, descriptor) {
        const method = descriptor.value;
        descriptor.value = function () {
            const pageQW = arguments[1];
            const elementQW = arguments[0];
            const selector = elementQW.getElementSelector();
            let result;
            if (pageQW.isValueCached(selector, methodName)) {
                result = pageQW.getCachedValue(selector, methodName);
            }
            else {
                result = method.apply(this, arguments);
                pageQW.cacheValue(selector, methodName, result);
            }
            return result;
        };
    };
}
exports.CacheDecorator = CacheDecorator;
function FullMethodCacheDecorator(methodName) {
    return function (_target, _propertyKey, descriptor) {
        const method = descriptor.value;
        descriptor.value = function () {
            const pageQW = arguments[1];
            const elementQW = arguments[0];
            let selector = elementQW.getElementSelector();
            for (let i = 2; i < arguments.length; i++) {
                selector += arguments[i];
            }
            let result;
            if (pageQW.isValueCached(selector, methodName)) {
                result = pageQW.getCachedValue(selector, methodName);
            }
            else {
                result = method.apply(this, arguments);
                pageQW.cacheValue(selector, methodName, result);
            }
            return result;
        };
    };
}
exports.FullMethodCacheDecorator = FullMethodCacheDecorator;
