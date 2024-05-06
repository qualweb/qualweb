import type { Translate } from '@shared/types';

export class Translator {
  private readonly locale: Translate;

  constructor(locale: Translate) {
    this.locale = locale;
  }

  public get(path: string | string[]): string | undefined {
    let translation: string | undefined;

    const _path = Array.isArray(path) ? path : path.split('.');

    let traverse: any = this.locale.translate;
    _path.forEach((part) => (traverse = traverse?.[part]));
    translation = traverse;

    if (typeof translation !== 'string') {
      traverse = this.locale.fallback;
      _path.forEach((part) => (traverse = traverse?.[part]));
      translation = traverse;
    }

    return typeof translation === 'string' ? translation : undefined;
  }
}
