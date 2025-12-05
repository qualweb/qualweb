import { recognizeDimension, Culture } from '@microsoft/recognizers-text-number-with-unit';


interface CultureMapping {
  [key: string]: typeof Culture[keyof typeof Culture];
}


const cultureMapping: CultureMapping = {
  'en': Culture.English,
  'fr': Culture.French,
  'de': Culture.German,
  'it': Culture.Italian,
  'es': Culture.Spanish,
  'pt': Culture.Portuguese,
  'nl': Culture.Dutch,
};

/** Function to recognize if a text contains a currency that matches the locale.
 * 
 * @param locale locale string, e.g. 'en-US', 'fr-FR
 * @param text  text to analyze for currency recognition
 * @returns  boolean | null
 * - Returns true if a currency is recognized and matches the locale.
 * - Returns false if a currency is recognized but does not match the locale.
 * - Returns null if no currency is recognized or if the locale is not supported.
 */
export function recognizeUnitByLocale(locale: string,text:string): boolean | null {
  const language = locale.split('-')[0]; // Extract the language part of the locale
  
  if (! (language in cultureMapping)) {
    return null;
  }

  // get Information about currency from INTL
  let results = recognizeDimension(text, cultureMapping[language] as string);
  console.log('Recognized dimensions:', JSON.stringify(results));
  if (results.length  >0) {
    return true; // Return null if no dimension is recognized
  }
  // does it belong to another culture?
  for (const lang in cultureMapping) {
    if (lang !== language) {
      results = recognizeDimension(text, cultureMapping[lang] as string);
      if (results.length > 0) {
        return false; // Return false if a dimension is recognized but does not match the locale
      }
    }
  }
  
  return null; // Return null if no dimension is recognized
  
}

