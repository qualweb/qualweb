function Cache(methodName: string) {
  return function (_target: unknown, _propertyKey: string, descriptor: PropertyDescriptor): void {
    const method = descriptor.value;
    descriptor.value = function () {
      const pageQW = window.qwPage;
      const elementQW = <typeof window.qwElement>arguments[0];
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

function FullMethodCache(methodName: string) {
  return function (_target: unknown, _propertyKey: string, descriptor: PropertyDescriptor): void {
    const method = descriptor.value;
    descriptor.value = function () {
      const pageQW = window.qwPage;
      const elementQW = <typeof window.qwElement>arguments[0];
      let selector = elementQW.getElementSelector();
      for (let i = 2; i < arguments.length; i++) {
        selector += arguments[i];
      }
      let result: string | undefined;
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

export { Cache, FullMethodCache };
