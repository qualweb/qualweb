'use strict';

function CacheDecorator(methodName: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function () {
      let pageQW= arguments[1]
      let elementQW = arguments[0]
      let selector = elementQW.getElementSelector();
      let result;
      if(pageQW.isValueCached(selector,methodName)){
         result = pageQW.getCachedValue(selector,methodName);
      }else{
        let result = method.apply(this, arguments);
        pageQW.cacheValue(selector,methodName,result);
      }
      return result;
     
    };
  };
}


export {
  CacheDecorator
};
