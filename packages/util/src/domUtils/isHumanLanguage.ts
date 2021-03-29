import LanguageDetect from 'languagedetect';

function isHumanLanguage(text: string): boolean {
  const detector = new LanguageDetect();
  return detector.detect(text).length > 0;
}

export default isHumanLanguage;
