function Cache(methodName: string) {
  return function (_target: unknown, _propertyKey: string, descriptor: PropertyDescriptor): void {
    const method = descriptor.value;
    descriptor.value = function () {
      const page = window.qwPage;
      const element = <typeof window.qwElement>arguments[0];
      const selector = element.getElementSelector();
      let result;
      if (page.isValueCached(selector, methodName)) {
        result = page.getCachedValue(selector, methodName);
      } else {
        result = method.apply(this, arguments);
        page.cacheValue(selector, methodName, result);
      }
      return result;
    };
  };
}

function FullMethodCache(methodName: string) {
  return function (_target: unknown, _propertyKey: string, descriptor: PropertyDescriptor): void {
    const method = descriptor.value;
    descriptor.value = function () {
      const page = window.qwPage;
      const element = <typeof window.qwElement>arguments[0];
      let selector = element.getElementSelector();
      for (let i = 2; i < arguments.length; i++) {
        selector += arguments[i];
      }
      let result: string | undefined;
      if (page.isValueCached(selector, methodName)) {
        result = page.getCachedValue(selector, methodName);
      } else {
        result = method.apply(this, arguments);
        page.cacheValue(selector, methodName, result);
      }
      return result;
    };
  };
}

export { Cache, FullMethodCache };
