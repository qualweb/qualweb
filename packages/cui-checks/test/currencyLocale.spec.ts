import { expect } from 'chai';
import { recognizeCurrencyByLocale } from '../src/lib/currency';

describe('Get currency info by locale', () => {
    
    it('Recognizing Currency with Microsoft Text suite', function () {
        this.timeout(50000);
        const input = "I paid 2 dollars";
        const results = recognizeCurrencyByLocale("en-US", input);
        expect(results).to.be.true;
        console.log(`Recognized currency for input "${input}": ${results}`);
        const input2 = "I paid 2 euros";
        const results2 = recognizeCurrencyByLocale("en-US", input2);
        expect(results2).to.be.false;
        console.log(`Recognized currency for input "${input2}": ${results2}`);
        const input3 = "I paid 2 euros";
        const results3 = recognizeCurrencyByLocale("fr-FR", input3);
        expect(results3).to.be.true;
        console.log(`Recognized currency for input "${input3}": ${results3}`);
        const input4 = "No mês passado, após muita pesquisa e comparação de preços, finalmente comprei um computador novo por 1200€. Ele veio com um processador de última geração, bastante memória RAM e uma placa gráfica excelente, o que tornou o investimento bastante vantajoso para o meu trabalho diário.";
        const results4 = recognizeCurrencyByLocale("pt-PT", input4);
        expect(results4).to.be.true;

        



    });

});