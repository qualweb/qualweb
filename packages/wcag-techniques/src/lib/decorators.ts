import { WCAGTechniqueResult } from '@qualweb/wcag-techniques';
import techniques from './techniques.json';
import cloneDeep from 'lodash.clonedeep';

function WCAGTechnique<T extends { new(...args: any[]): {} }>(constructor: T) {
  const technique = techniques[constructor.name];

  technique.metadata.passed = 0;
  technique.metadata.warning = 0;
  technique.metadata.failed = 0;
  technique.metadata.outcome = '';
  technique.metadata.description = '';
  technique.results = new Array<WCAGTechniqueResult>();

  const newConstructor: any = function () {
    let func: any = function () {
      return new constructor(cloneDeep(technique));
    }
    func.prototype = constructor.prototype;
    return new func();
  }
  newConstructor.prototype = constructor.prototype;
  return newConstructor;
}

function ElementExists(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    if (arguments[0]) {
      return method.apply(this, arguments);
    } else {
      return;
    }
  };
}

function ElementHasAttributes(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  descriptor.value = function () {
    const hasAttributes = arguments[0].elementHasAttributes();
    if (hasAttributes) {
      return method.apply(this, arguments);
    } else {
      return;
    }
  };
}

export { WCAGTechnique, ElementExists, ElementHasAttributes };