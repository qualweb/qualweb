class Cache {
  private readonly cache: Map<string, string | undefined>;

  constructor() {
    this.cache = new Map<string, string | undefined>();
  }

  public get(key: string): string | undefined {
    return this.cache.get(key);
  }

  public put(key: string, value?: string): void {
    this.cache.set(key, value);
  }

  public exists(key: string): boolean {
    return this.cache.has(key);
  }
}

export = Cache;
