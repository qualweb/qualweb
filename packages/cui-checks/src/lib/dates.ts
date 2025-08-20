import { DateTime } from 'luxon';

// TypeChecks
type DateFormat = Record<Locale, string[]>;
type Locale =
  | 'pt-PT'
  | 'pt-BR'
  | 'en-US'
  | 'fr-FR'
  | 'es-ES'
  | 'de-DE'
  | 'it-IT'
  | 'ja-JP'
  | 'zh-CN'
  | 'ko-KR'
  | 'ru-RU';

// Date formats for different locales
const localeFormats: DateFormat = {
  'pt-PT': ["d 'de' MMMM 'de' yyyy", "d 'de' MMMM", "MMMM 'de' yyyy", 'dd/MM/yyyy', 'd/MM/yyyy'],
  'pt-BR': ["d 'de' MMMM 'de' yyyy", "d 'de' MMMM", "MMMM 'de' yyyy", 'dd/MM/yyyy', 'd/M/yy'],
  'en-US': ['MMMM d, yyyy', 'MMMM d', 'MM/dd/yyyy', 'M/d/yy', 'MMM d, yy'],
  'fr-FR': ['d MMMM yyyy', 'd MMMM', 'MMMM yyyy', 'dd/MM/yyyy', 'd/M/yy'],
  'es-ES': ["d 'de' MMMM 'de' yyyy", "d 'de' MMMM", "MMMM 'de' yyyy", 'dd/MM/yyyy', 'd/M/yy'],
  'de-DE': ['d. MMMM yyyy', 'd. MMMM', 'MMMM yyyy', 'dd.MM.yyyy', 'd.M.yy'],
  'it-IT': ['d MMMM yyyy', 'd MMMM', 'MMMM yyyy', 'dd/MM/yyyy', 'd/M/yy'],
  'ja-JP': ['yyyy年M月d日', 'yyyy年M月d日', 'yyyy年M月', 'yy/MM/dd', 'y/M/d'],
  'zh-CN': ['yyyy年M月d日', 'yyyy年M月d日', 'yyyy年M月', 'yy/MM/dd', 'y/M/d', 'yyyy/MM/dd'],
  'ko-KR': ['yyyy년 M월 d일', 'yyyy년 M월 d일', 'yyyy년 M월', 'yy.MM.dd', 'y.M.d'],
  'ru-RU': ["d MMMM yyyy 'г.'", 'd MMMM', "MMMM yyyy 'г.'", 'dd.MM.yyyy', 'd.M.yy']
};

export function detectLocaleFromDateString(text: string, systemLocale: string):Record<string,boolean> | null{
  if (!(systemLocale in localeFormats)) {
    throw new Error(`Locale ${systemLocale} not supported`);
  }
  let dates:string[] = getDatesFromText(text);

  if(dates.length === 0) return null;
  
  const dateResult:Record<string,boolean> = Object.fromEntries(dates.map((date) => ([date.trim(),false])));
  for(const  [date, _ ] of Object.entries(dateResult)){

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


function getMonthNamesForLocales(
  locales: string[],
  format: 'long' | 'short' = 'long'
): string[] {
  const monthNames = new Set<string>();

  locales.forEach(locale => {
    const formatter = new Intl.DateTimeFormat(locale, { month: format });
    for (let i = 0; i < 12; i++) {
      let month = formatter.format(new Date(2020, i, 1));
      month = month.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      monthNames.add(month.toLowerCase().replace('.', ''));
    }
  });

  return Array.from(monthNames);
}


function buildMultiLangDateRegex(locales = ['pt-PT', 'en-US', 'fr-FR', 'es-ES', 'de-DE']) {
  // Obtem todos os nomes dos meses (long + short) numa lista única
  const months = getMonthNamesForLocales(locales, 'long').concat(getMonthNamesForLocales(locales, 'short'));
  
  // Criar padrão regex para meses separados por |
  const monthsPattern = months.map(m => m.replace('.', '')).join('|'); 

  // Formatos de data para cada idioma
  const datePatterns = {
    'pt-PT':  `\\b(?:` +
  `(\\d{1,2})(\\s*(de)\\s*)(${monthsPattern})(\\s*(de)\\s*)(\\d{4})?` +
  `|` +
  `(${monthsPattern})(\\s*(de)\\s*)(\\d{4})` +
`)\\b`,
    'en-US': `\\b(${monthsPattern})\\s*(\\d{1,2})(,?\\s*)(\\d{4})?\\b|(\\d{1,2})(th)?(\\s*(of)?\\s*)(${monthsPattern})(\\s*(of)?\\s*)(\\d{4})?\\b`,
    'fr-FR': `\\b(\\d{1,2})\\s*(de)?\\s*(${monthsPattern})(\\s*(de)?\\s*)(\\d{4})?\\b`,
    'es-ES': `\\b(\\d{1,2})(\\s*(de)?\\s*)(${monthsPattern})(\\s*(de)?\\s*)(\\d{4})?\\b`,
    'de-DE': `\\b(\\d{1,2})(\\s*(von)?\\s*)(${monthsPattern})(\\s*(von)?\\s*)(\\d{4})?\\b`
  };

  const combinedPattern = Object.values(datePatterns).join('|');
  return new RegExp(combinedPattern, 'igu');
}




function getDatesFromText(text:string):string[] {
  const dateRegex = buildMultiLangDateRegex(['pt-PT', 'en-US', 'fr-FR', 'es-ES', 'de-DE']);
  const numericDateRegex = /\b(\d{1,2})([\/\-.])(\d{1,2})\2(\d{4})\b/g;

  const textDates = [...text.matchAll(dateRegex)].map(m => m[0]);
  const numericDates = [...text.matchAll(numericDateRegex)].map(m => m[0]);

  return [...textDates, ...numericDates];
}

