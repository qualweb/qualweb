import localeCurrency from 'locale-currency';
import { recognizeCurrency, Culture } from '@microsoft/recognizers-text-number-with-unit';


interface CultureMapping {
  [key: string]: typeof Culture[keyof typeof Culture];
}

export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
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
export function recognizeCurrencyByLocale(locale: string,text:string): boolean | null {
  const language = locale.split('-')[0]; // Extract the language part of the locale
  
  if (! (language in cultureMapping)) {
    return null;
  }
  // get Locale format 
  let symbolCodeCurrency  = localeCurrency.getCurrency(locale);
  console.log(`Recognizing currency for locale: ${locale}, symbolCodeCurrency: ${symbolCodeCurrency}`);
  if (!symbolCodeCurrency) {
    return null; 
  }
  // get Information about currency from INTL
  let currencyInfo:CurrencyInfo | null = getCurrencyInfo(locale,symbolCodeCurrency);
  if (!currencyInfo) {
    return null; // Return null if currency info is not found
  }
  // Recognize the currency in the text using microsoft recognizers
  const culture = cultureMapping[language];
  const results = recognizeCurrency(text, culture as string);
 
   // is there a recognized currency?
  if (results.length > 0) {

    const recognizedCurrency = results[0].resolution.unit;
    const isoCurrency = results[0].resolution?.isoCurrency ?? '';

    return (
      currencyInfo.name.toLowerCase().includes(recognizedCurrency.toLowerCase()) ||
      currencyInfo.code.toLowerCase().includes(isoCurrency.toLowerCase())
    );
  }

  return null;
}

export function getCurrencyInfo(locale: string, currencyCode: string): CurrencyInfo | null {
  try {
    // Obtain currency name
    const nameParts = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'name'
    }).formatToParts(0);
    // Obtain currency symbol
    const symbolParts = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode
    }).formatToParts(0);
    // Extract the currency code, name, and symbol

    const currencyName = nameParts.find(part => part.type === 'currency')?.value || '';
    const currencySymbol = symbolParts.find(part => part.type === 'currency')?.value || '';
    if (!currencyName || !currencySymbol) {
      return null; // Return null if currency name or symbol is not found
    }

    return {
      code: currencyCode,
      name: currencyName,
      symbol: currencySymbol
    };

  } catch (error) {
    console.error(`Error getting currency info for ${locale} and ${currencyCode}:`, error);
    return null;
  }
}
