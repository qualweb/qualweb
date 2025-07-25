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

export function detectLocaleFromDateString(dateString: string, systemLocale: string) {
  if (!(systemLocale in localeFormats)) {
    throw new Error(`Locale ${systemLocale} not supported`);
  }
  const locale = systemLocale;
  const format = localeFormats[systemLocale as keyof typeof localeFormats];
  for (const pattern of format) {
    const dt = DateTime.fromFormat(dateString, pattern, { locale });
    if (dt.isValid) {
      return systemLocale;
    }
  }

  return null;
}
