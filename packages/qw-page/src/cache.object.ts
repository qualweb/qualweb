'use strict';


class Cache {

  private cache: object;


  constructor() {
    this.cache = {};
  }

  public get(key: string): string|undefined {
    return this.cache[key];
  }

  public put(key:string,value:string|undefined): void {
    this.cache[key] = value;
  }

  public exists(key: string): boolean {
    return key in this.cache;
  }

 
}

export = Cache;