import  {detectLocaleFromDateString} from '../src/lib/dates';
import { expect } from 'chai';




describe('parsing date', () => {

  it('should parse date in string in differente locales',() => {
          
            let test = "25 de abril de 2025"; 
            let answer = detectLocaleFromDateString(test, 'pt-PT');

            expect(Object.values(answer!).some(Boolean)).to.be.true;

            test = "April 25, 2025";
            answer = detectLocaleFromDateString(test, 'en-US');
            expect(Object.values(answer!).some(Boolean)).to.be.true;

            test = "25 de abril";
            answer = detectLocaleFromDateString(test, 'pt-PT');
            expect(Object.values(answer!).some(Boolean)).to.be.true;
            const testInput4 = "April 25";
            let answer4 = detectLocaleFromDateString(testInput4, 'en-US');
            expect(Object.values(answer4!).some(Boolean)).to.be.true;

            const testInput5 = "25/04/2025";
            let answer5 = detectLocaleFromDateString(testInput5, 'pt-PT');
            expect(Object.values(answer5!).some(Boolean)).to.be.true;

            const testInput6 = "04/25/2025";
            let answer6 = detectLocaleFromDateString(testInput6, 'pt-PT');
            expect(Object.values(answer6!).some(Boolean)).to.be.false;

            const testInput7 = `A data exata para a inauguração das iluminações natalinas nas principais cidades de Portugal não é mencionada. No entanto, as fontes indicam que os mercados de Natal e eventos festivos começam geralmente no final de novembro ou início de dezembro. As decorações natalinas são inauguradas em diferentes datas dependendo da cidade, mas a maioria delas ocorre entre o dia 1º e o dia 15 de dezembro.

      Aqui estão algumas das principais cidades portuguesas com suas respectivas datas aproximadas para as iluminações natalinas:
      Lisboa: 25 de novembro
      Porto: 15 de novembro
      Coimbra: 1 de dezembro
      É importante notar que essas datas podem variar dependendo da cidade e do evento específico. É recomendável verificar as fontes locais para obter informações atualizadas sobre os eventos natalinos em cada localidade.
             `;
            let answer7 = detectLocaleFromDateString(testInput7, 'pt-PT');
            expect(Object.values(answer7!).some(Boolean)).to.be.true;
})


});

