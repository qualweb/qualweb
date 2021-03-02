'use strict';

function CacheDecorator(methodName: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function () {
      const pageQW = arguments[1];
      const elementQW = arguments[0];
      const selector = elementQW.getElementSelector();
      let result;
      if (pageQW.isValueCached(selector, methodName)) {
        result = pageQW.getCachedValue(selector, methodName);
      } else {
        result = method.apply(this, arguments);
        pageQW.cacheValue(selector, methodName, result);
      }
      return result;
    };
  };
}
function FullMethodCacheDecorator(methodName: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function () {
      const pageQW = arguments[1];
      const elementQW = arguments[0];
      let selector = elementQW.getElementSelector();
      for(let i = 2; i < arguments.length; i++){
        selector += arguments[i];
      }
      let result;
      if (pageQW.isValueCached(selector, methodName)) {
        result = pageQW.getCachedValue(selector, methodName);
      } else {
        result = method.apply(this, arguments);
        pageQW.cacheValue(selector, methodName, result);
      }
      return result;
    };
  };
}

export { CacheDecorator,FullMethodCacheDecorator };
