import { DateTime } from 'luxon';

import utf8 from 'utf8';

// TypeChecks
type DateFormat = Record<Locale, string[]>;
// Supported locales
type Locale =
  | 'pt-PT'
  | 'en-US';

// Date formats for different locales
const localeFormats: DateFormat = {
  'pt-PT': ["d 'de' MMMM 'de' yyyy", "d 'de' MMMM", "MMMM 'de' yyyy", 'dd/MM/yyyy', 'd/MM/yyyy',
    "d 'de' LLL 'de' yyyy",    
"dd 'de' LLL 'de' yyyy",
"d 'de' LLL",
"dd 'de' LLL",
"LLL 'de' yyyy" 
  ],
    'en-US': [ "d 'of' MMMM yyyy",
    "d 'of' MMMM",
    "d 'of' LLL yyyy",
    "d 'of' LLL",
    // Without "of"
    "d MMMM yyyy",
    "d MMMM",
    "d LLL yyyy",
    "d LLL",
      // Traditional formats
    "MMMM d',' yyyy",
    'MMMM d',
    'MM/dd/yyyy',
    'M/d/yy',
    "MMM d',' yy",
    'd LLL yyyy',
    'dd LLL yyyy',
    'd LLL',
    'LLL yyyy'
  ],
};
function normalizeOrdinalDate(dateStr: string): string {
  // Remove "the" prefix
  let cleaned = dateStr.replace(/\bthe\s+/gi, '');
  
  // Remove ordinal suffixes: 1st -> 1, 2nd -> 2
  cleaned = cleaned.replace(/\b(\d{1,2})(st|nd|rd|th)\b/gi, '$1');
  
  return cleaned.trim();
}
export function detectLocaleFromDateString(text: string, systemLocale: string):Record<string,boolean> | null{
  if (!(systemLocale in localeFormats)) {
    throw new Error(`Locale ${systemLocale} not supported`);
  }
  let dates:string[] = getDatesFromText(text);
  if(systemLocale === 'en-US'){
    dates = dates.map(date => normalizeOrdinalDate(date));
  }

  if(dates.length === 0) return null;
  
  const dateResult:Record<string,boolean> = Object.fromEntries(dates.map((date) => ([date.trim(),false])));
  for(const  [date, _ ] of Object.entries(dateResult)){
    console.log(`Validating date "${date}" for locale ${systemLocale}`);

    const locale = systemLocale;
    const format = localeFormats[systemLocale as keyof typeof localeFormats];
  
    for (const pattern of format) {
      const dt = DateTime.fromFormat(date, pattern, { locale });
      if (dt.isValid) {
        dateResult[date] = true;
        break;
      }
    }
}

  return dateResult;
}


function buildMultiLangDateRegex() {

  const allMonthsPattern = "(" +
    "janeiro|jan|fevereiro|fev|março|mar|abril|abr|maio|mai|junho|jun|julho|jul|agosto|ago|setembro|set|outubro|out|novembro|nov|dezembro|dez|" +
    "january|jan|february|feb|march|mar|april|apr|may|jun|july|jul|august|aug|september|sep|october|oct|november|nov|december|dec|" +
    "janvier|janv|février|févr|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre|" +
    "enero|ene|febrero|feb|marzo|may|junio|jun|julio|jul|septiembre|sep|octubre|oct|noviembre|nov|diciembre|dic|" +
    "januar|jan|februar|feb|märz|mär|april|mai|juni|jun|juli|jul|august|aug|september|sep|oktober|okt|dezember|dez" +
  ")";

  const ordinal = "(1st|2nd|3rd|[4-9]th|1[0-9]th|2[0-9]th|3[0-1]th|21st|22nd|23rd|31st)";
  const day = "\\d{1,2}";

  return new RegExp(
    // 1. English ordinals: "1st of January 2023" or "1st January 2023"
    `\\b${ordinal}\\b\\s+(?:\\bof\\b\\s+)?${allMonthsPattern}\\b(?:\\s+\\bof\\b)?\\s+\\d{4}\\b|` +

    // 2. Ordinals without year: "1st of January" or "1st January"
    `\\b${ordinal}\\b\\s+(?:of\\s+)?${allMonthsPattern}\\b|` +

    // 3.  Day + Month + Year: "1 de março de 2021"
    `\\b${day}\\b\\s+(?:de\\s+|of\\s+|von\\s+)?${allMonthsPattern}\\s+(?:de\\s+|of\\s+|von\\s+)?\\d{4}\\b|` +

    // 4. Day + Month (without year): "15 de março"
    `\\b${day}\\b\\s+(?:de\\s+|of\\s+|von\\s+)?${allMonthsPattern}\\b|` +

    // 5. Month + Year (without day): "dezembro de 2025"
    `\\b${allMonthsPattern}\\s+(?:de\\s+|of\\s+|von\\s+)?\\d{4}\\b|` +

    // 6. Month + Day + Year (English format): "March 15, 2023"
    `\\b${allMonthsPattern}\\s+${day}(?:,?\\s*\\d{4})?\\b`,
    "giu"
  );
}


function getDatesFromText(text: string): string[] {

    console.log('Original text:', text);
  // Try to normalize encoding
  let textFixedEncoding: string;
  try {

    textFixedEncoding = utf8.decode(text);
  } catch {
    // Fallback:  native Unicode normalization
    textFixedEncoding = text.normalize('NFC');
  }
  console.log('Fixed encoding text:', textFixedEncoding);
  

  
  const dateRegex = buildMultiLangDateRegex();
  const numericDateRegex = /\b(\d{1,2})([\/\-.])(\d{1,2})\2(\d{4}|\d{2})\b/g;


  const textDates = [...textFixedEncoding.matchAll(dateRegex)].map(m => m[0]);
  const numericDates = [...textFixedEncoding.matchAll(numericDateRegex)].map(m => m[0]);
  
  return [...textDates, ...numericDates];
}
