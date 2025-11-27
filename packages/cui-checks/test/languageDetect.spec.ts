// build boilerplate for test
import { expect } from 'chai';
import { detectLanguage, detectAllLanguages, detectMainLanguage, ILanguageDetect } from '../src/lib/language';

describe('detectLanguage', () => {

        it('should return "en" for "Hello World"', () => {
            let englishText = "Hello World, have a nice day!";
            let detectedLanguage = detectLanguage(englishText);
            expect(detectedLanguage).to.equal('en');
        });

        it('should return "es" for "¡Hola mundo"', () => {
            let spanishText = "¡Hola mundo, que tengas un buen día! Hablo inglés, ¿y tú?";
            let detectedLanguage = detectLanguage(spanishText);
            expect(detectedLanguage).to.equal('es');
        });

        it('should return "fr" for "Bonjour le monde"', () => {
            let frenchText = "Bonjour le monde, passez une bonne journée ! Je parle anglais, et toi ?";
            let detectedLanguage = detectLanguage(frenchText);
            expect(detectedLanguage).to.equal('fr');
        });

        it('should return "de" for "Hallo Welt"', () => {
            let germanText = "Hallo Welt, einen schönen Tag! Ich spreche Englisch, und du?";
            let detectedLanguage = detectLanguage(germanText);
            expect(detectedLanguage).to.equal('de');
        });

        it('should return "it" for "Ciao mondo"', () => {
            let italianText = "Ciao mondo, buona giornata! Parlo inglese, tu?";
            let detectedLanguage = detectLanguage(italianText);
            expect(detectedLanguage).to.equal('it');
        });

        it('should return "pt" for "Olá Mundo"', () => {
            let portugueseText = "Olá mundo, tenha um bom dia! Eu falo inglês, você fala?";
            let detectedLanguage = detectLanguage(portugueseText);
            expect(detectedLanguage).to.equal('pt');
        });

        it('should return "nl" for "Hallo Wereld"', () => {
            let dutchText = "Hallo wereld, een fijne dag! Ik spreek Engels, jij?";
            let detectedLanguage = detectLanguage(dutchText);
            expect(detectedLanguage).to.equal('nl');
        });

        it('should return "ru" for "Привет мир"', () => {
            let russianText = "Привет мир, хорошего дня! Я говорю по-английски, а ты?";
            let detectedLanguage = detectLanguage(russianText);
            expect(detectedLanguage).to.equal('ru');
        });

        it('should return "ja" for "こんにちは世界"', () => {
            let japaneseText = "こんにちは、世界、良い一日を！私は英語を話します、あなたは？";
            let detectedLanguage = detectLanguage(japaneseText);
            expect(detectedLanguage).to.equal('ja');
        });

        it('should return "en" for phrase with orthographic error "Helo Wrold"', () => {
            let englishTextWithErrors = "Helo Wrold, have a ncie day!";
            let detectedLanguages:ILanguageDetect[] = detectAllLanguages(englishTextWithErrors);
            let mostAccurate = detectedLanguages.reduce((prev, current) => (prev.accuracy > current.accuracy) ? prev : current);
            expect(mostAccurate.lang).to.equal('en');
        });

        it('should return "es" for phrase with orthographic error  "¡Hloa mndo"', () => {
            let spanishTextWithErrors = "¡Hloa mndo, que tengas un buen día! Hablo inglés, ¿y tú?";
            let detectedLanguages:ILanguageDetect[] = detectAllLanguages(spanishTextWithErrors);
            let mosAccurate = detectedLanguages.reduce((prev, current) => (prev.accuracy > current.accuracy) ? prev : current);

            expect(mosAccurate.lang).to.equal('es');
        });

        it('should return "en" for mixed languages with majority English', () => {
            let mixedText = "Hello World, have a nice day! Hola mundo día, i hope you have a good day!";
            let detectedLanguages:ILanguageDetect[]  = detectAllLanguages(mixedText);
         
            let mostAccurate = detectedLanguages.reduce((prev, current) => (prev.accuracy > current.accuracy) ? prev : current);
            expect(mostAccurate.lang).to.equal('en');
        });

        it('should return "es" for mixed languages with majority Spanish', () => {
            let mixedText = "¡Hola mundo, que tengas un buen día! Hello World, have a nice day!";
            let detectedLanguages:ILanguageDetect[]  = detectAllLanguages(mixedText);
            let mostAccurate = detectedLanguages.reduce((prev, current) => (prev.accuracy > current.accuracy) ? prev : current);
            expect(mostAccurate.lang).to.equal('es');
        });

        it('should return "es" for mixed languages with majority Spanish using detect Main language function', () => {
            let mixedText = "¡Hola mundo, que tengas un buen día! Hello World, have a nice day!";
            let detectedLanguage:ILanguageDetect = detectMainLanguage(mixedText);
            expect(detectedLanguage.lang).to.equal('es');
        });
        it('Test for portuguese', () => {
            let portugueseText = "25 de julho de 2025.";
            let detectedLanguage = detectLanguage(portugueseText); 
            expect(detectedLanguage).to.equal('pt');
        });
        it('Test for date portuguese', () => {
            let portugueseText = "julho";
            let detectedLanguage = detectLanguage(portugueseText); 
            expect(detectedLanguage).to.equal('pt');
        });


});