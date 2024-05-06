import type { TranslationOptions, Lang, Locale, Translate, TranslationObject } from '@shared/types';
import * as locales from './locales';

export class LocaleFetcher {
  static get(lang: Lang): Locale {
    return locales[lang];
  }

  static transform(options: TranslationOptions): Translate {
    if (options) {
      if (typeof options === 'string') {
        if (options in locales) {
          return {
            translate: locales[options],
            fallback: locales.en
          };
        } else {
          throw new Error(`Locale "${options}" not supported.`);
        }
      } else if ('translate' in options) {
        return this.verifyTranslationObject(options);
      } else {
        return {
          translate: options,
          fallback: locales.en
        };
      }
    } else {
      return {
        translate: locales.en,
        fallback: locales.en
      };
    }
  }

  private static verifyTranslationObject(object: TranslationObject): Translate {
    const translation: Translate = {
      translate: locales.en,
      fallback: locales.en
    };
    if (typeof object.translate === 'string') {
      if (object.translate in locales) {
        translation.translate = locales[object.translate as Lang];
      } else {
        throw new Error(`Locale "${object.translate}" not supported.`);
      }
    } else {
      translation.translate = object.translate;
    }
    if (typeof object.fallback === 'string') {
      if (object.fallback in locales) {
        translation.fallback = locales[object.fallback as Lang];
      } else {
        throw new Error(`Locale "${object.fallback}" not supported.`);
      }
    } else {
      translation.fallback = object.fallback;
    }
    return translation;
  }
}

window.LocaleFetcher = LocaleFetcher;
