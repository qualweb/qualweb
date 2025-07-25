import { detect, detectAll } from 'tinyld';

const languagesRange = ['en', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'ru', 'ja', 'zh', 'lt', 'pl'];
/**
 * Language detection response interface
 */
export interface ILanguageDetect {
  lang: string;
  accuracy: number;
}

/** Detects the language of a given text using tinyld library.
 *
 * @param text  the text to be analyzed
 * @returns language code
 */
function detectLanguage(text: string): string {
  const language = detect(text, { only: languagesRange });
  return language;
}

/** Detects all languages of a given text using tinyld library.
 * 
 * @param text  the text to be analyzed

 * @returns  array of language resposes with accuracy and language code
 */
function detectAllLanguages(text: string): ILanguageDetect[] {
  const language = detectAll(text, { only: languagesRange });
  return language;
}

/** Detects the main language of a given text using tinyld library.
 *
 * @param text  the text to be analyzed
 * @returns  language response with accuracy and language code
 */
function detectMainLanguage(text: string): ILanguageDetect {
  const language = detectAll(text, { only: languagesRange });
  let mostAccurate = language.reduce((prev, current) => (prev.accuracy > current.accuracy ? prev : current));
  return mostAccurate;
}

export { detectLanguage, detectAllLanguages, detectMainLanguage };
