import { parse } from 'date-fns'; 
import { enUS, pt } from 'date-fns/locale';
import  {detectLocaleFromDateString} from '../src/lib/dates';
import { expect } from 'chai';




describe('parsing date', () => {

        it('should return "en" for "Hello World"', () => {
            const testInput = "Hoje é dia 25 de abril de 2025"; 
            console.log(evaluateDate(testInput))
        });

        it('should parse date in string in differente locales',() => {
          
            const testInput = "25 de abril de 2025"; 
            let locale = detectLocaleFromDateString(testInput, 'pt-PT');
            expect(locale).to.equal('pt-PT');
            const testInput2 = "April 25, 2025";
            let locale2 = detectLocaleFromDateString(testInput2, 'en-US');
            expect(locale2).to.equal('en-US');
            const testInput3 = "25 de abril";
            let locale3 = detectLocaleFromDateString(testInput3, 'pt-PT');
            expect(locale3).to.equal('pt-PT');
            const testInput4 = "April 25";
            let locale4 = detectLocaleFromDateString(testInput4, 'en-US');
            expect(locale4).to.equal('en-US');
            const testInput5 = "25/04/2025";
            let locale5 = detectLocaleFromDateString(testInput5, 'pt-PT');
            expect(locale5).to.equal('pt-PT');
            const testInput6 = "04/25/2025";
            let locale6 = detectLocaleFromDateString(testInput6, 'pt-PT');
            expect(locale6).to.be.null;
          })



});


function parseDateInput(input: string, locale: string): Date | null {
    // Define possible date formats for each locale
    const localeFormats: { [key: string]: string[] } = {
      'pt-PT': ['dd MMMM yyyy', 'd MMMM yyyy', 'dd/MM/yyyy', 'd/MM/yyyy'],
      'en-US': ['MMMM d, yyyy', 'MM/dd/yyyy'],
      // Add other locale formats as necessary
    };
  
    const formats = localeFormats[locale] || localeFormats['pt-PT']; // Default to Portuguese if unknown locale
    const localeObject = locale === 'pt-PT' ? pt : enUS; // Map locale string to date-fns locale object
  
    for (const format of formats) {
      const parsedDate = parse(input, format, new Date(), { locale: localeObject });
      
      // Check if the date is valid
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate; // Return valid date
      }
    }
  
    return null; // Return null if no valid date is found
  }
  
  function extractLocaleFromNavigator(): string {
    // Extract locale from navigator.language
    const navigatorLanguage =  'pt-PT'; // Default to en-US if not available
    return navigatorLanguage.toLowerCase();
  }
  
  // Main function
  function evaluateDate(input: string): string {
    const locale = extractLocaleFromNavigator();
    const date = parseDateInput(input, locale);
    
    if (date) {
      return `Parsed date: ${date.toLocaleString(locale)}`;
    } else {
      return 'Invalid date format or parsing failed';
    }
  }