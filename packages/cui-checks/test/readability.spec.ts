import { expect } from 'chai';
import {setBrowserFilePath, getCommonWords, extractWords, countLetters, calculateReadabilityScores, countComplexWordsPT, IReadibiltyScores, readability, getCounters } from '../src/lib/readability';

import * as fs from 'fs';
import * as path from 'path';

// Simulate a browser environment for file fetching
(global as any).fetch = async (url: string) => {

    const relativePath = url.replace(/^https?:\/\/[^/]+\//, '').replace(/^\/+/, '');
    const filePath = path.resolve(__dirname, relativePath);
    return {
        async text() {
            return fs.promises.readFile(filePath, 'utf8');
        },
        ok: true,
        status: 200
    };
};
describe('Readability Functions', () => {
    before(() => {
        setBrowserFilePath('https://localhost/palavras-mais-comuns-utf8.txt');
    }
    );
    describe('getCommonWords', () => {

        it('should identify commonWords in Portuguese file ', async () => {
            let commonWords =['de','para','praia','sol','música'];
            
            const result = await getCommonWords();   
            for(let word of commonWords){
             expect(result.includes(word)).to.be.true;
            }

        });

        
        // Non complex words are the ones that are in the first 5000 words of the file
        it('should identify non complex words in Portuguese file ', async() => {

            let commonWords =['de','para','praia','sol','música'];
            let commonWordsText  = await getCommonWords();
            
            for (let word of commonWords) { 
                expect(commonWordsText.includes(word)).to.be.true;
            }
         
        

        });
        // Complex words are those that are absent or after the first 5000 words of the file
        it('should identify complex words ', async () => {

            let commonWords =['Anticonstitucionalissimamente ',
                'Inconstitucionalissimamente ',
                'Pneumoultramicroscopicsilicovolcanoconiótico ',
                'Interdisciplinaridade ',
                'Substantivação','quântica'];
            
                
                for (let word of commonWords) {
                    
                     let wordsText = await getCommonWords();
                     expect(wordsText.includes(word)).to.be.false;
                      
                    
                  }

        });

        it('Count complex words in a phrase ', async () => {
            const textContent = 'O desenvolvimento de novas tecnologias, como a inteligência artificial e a computação quântica, está avançando rapidamente; mas, será que estamos preparados para lidar com seus impactos? Muitos especialistas afirmam que, se não houver regulamentação e uma abordagem ética, poderemos enfrentar sérias consequências, como a perda de empregos e a invasão da privacidade! Além disso, o que fazer com os dados que estamos constantemente gerando? Precisamos de mais transparência e controle sobre como essas informações são utilizadas!';
            const words = extractWords(textContent);   
            const expectedValue = 6;
            const result = await countComplexWordsPT(words);
            expect(result).to.equal(expectedValue);
        });


        



    });

    describe('extract words from phrase', () => {
        it('should extract words from text content', () => {
            const textContent = 'O desenvolvimento de novas tecnologias, como a inteligência artificial e a computação quântica, está avançando rapidamente; mas, será que estamos preparados para lidar com seus impactos? Muitos especialistas afirmam que, se não houver regulamentação e uma abordagem ética, poderemos enfrentar sérias consequências, como a perda de empregos e a invasão da privacidade! Além disso, o que fazer com os dados que estamos constantemente gerando? Precisamos de mais transparência e controle sobre como essas informações são utilizadas!';
            const palavras = [
                "O", "desenvolvimento", "de", "novas", "tecnologias", "como", "a", "inteligência", 
                "artificial", "e", "a", "computação", "quântica", "está", "avançando", "rapidamente", 
                "mas", "será", "que", "estamos", "preparados", "para", "lidar", "com", "seus", "impactos", 
                "Muitos", "especialistas", "afirmam", "que", "se", "não", "houver", "regulamentação", 
                "e", "uma", "abordagem", "ética", "poderemos", "enfrentar", "sérias", "consequências", 
                "como", "a", "perda", "de", "empregos", "e", "a", "invasão", "da", "privacidade", 
                "Além", "disso", "o", "que", "fazer", "com", "os", "dados", "que", "estamos", 
                "constantemente", "gerando", "Precisamos", "de", "mais", "transparência", "e", 
                "controle", "sobre", "como", "essas", "informações", "são", "utilizadas"
              ];

            const result = extractWords(textContent);
            expect(result).to.deep.equal(palavras);
        });
    });

    describe('countLetters', () => {
        it('should count letters in a string', () => {
            const str = 'O desenvolvimento de novas tecnologias, como a inteligência artificial e a computação quântica, está avançando rapidamente; mas, será que estamos preparados para lidar com seus impactos? Muitos especialistas afirmam que, se não houver regulamentação e uma abordagem ética, poderemos enfrentar sérias consequências, como a perda de empregos e a invasão da privacidade! Além disso, o que fazer com os dados que estamos constantemente gerando? Precisamos de mais transparência e controle sobre como essas informações são utilizadas!';

            const expectedCount = 442;

            const result = countLetters(str);
            expect(result).to.equal(expectedCount);
        });
    });

    describe('Readibilty Scores', () => {
        it('should calculate readability scores', () => {
            const counters = {
                letters: 100,
                words: 20,
                syllables: 30,
                complexWords: 5,
                phrases: 5
            };

            const result = calculateReadabilityScores(counters,'pt');


            expect(result).to.have.property('result');
        });
    
        it('should calculate readability scores with given counters', () => {
            const counters = {
                letters: 442,
                words: 76,
                syllables: 189,
                complexWords: 17,
                phrases: 4
            };

            const metrics = calculateReadabilityScores(counters,'pt');
            const expectedMetrics = {
                result: 15,
                resultGrade: "Média legibilidade",

                
            }as IReadibiltyScores;

            
            expect(metrics.result).to.be.closeTo(expectedMetrics.result,1);
            expect(metrics.resultGrade).to.equal(expectedMetrics.resultGrade);

        });


        it('should calculate counters of a text provided syllable-pt', async () => {
            const str = 'O desenvolvimento de novas tecnologias, como a inteligência artificial e a computação quântica, está avançando rapidamente; mas, será que estamos preparados para lidar com seus impactos? Muitos especialistas afirmam que, se não houver regulamentação e uma abordagem ética, poderemos enfrentar sérias consequências, como a perda de empregos e a invasão da privacidade! Além disso, o que fazer com os dados que estamos constantemente gerando? Precisamos de mais transparência e controle sobre como essas informações são utilizadas!';
                        
            const expectedCounters = {
                letters: 442,
                words: 76,
                syllables: 189,
                complexWords: 17,
                phrases: 4
            };
            const counters = await getCounters(str,'pt');

            expect(counters.letters).to.equal(expectedCounters.letters);
            expect(counters.words).to.equal(expectedCounters.words);
            expect(counters.syllables).to.be.closeTo(expectedCounters.syllables, 10);
            expect(counters.complexWords).to.be.closeTo(expectedCounters.complexWords, 15);



            
        });
        it('should calculate readability score of given phrase in Portuguse', async  () => {
            const str = 'O desenvolvimento de novas tecnologias, como a inteligência artificial e a computação quântica, está avançando rapidamente; mas, será que estamos preparados para lidar com seus impactos? Muitos especialistas afirmam que, se não houver regulamentação e uma abordagem ética, poderemos enfrentar sérias consequências, como a perda de empregos e a invasão da privacidade! Além disso, o que fazer com os dados que estamos constantemente gerando? Precisamos de mais transparência e controle sobre como essas informações são utilizadas!';
           
            const metrics = await readability(str,'pt');

            const expectedMetrics = {
                resultGrade: "Média legibilidade",
                result: 15
            } as IReadibiltyScores;
            
            expect(metrics.result).to.be.closeTo(expectedMetrics.result,1);
            expect(metrics.resultGrade).to.equal(expectedMetrics.resultGrade);


            
        });

        it('Low readability text test in Portuguese', async () => {
            const str = 'Os meandros da complexidade regem os constructos do saber. Percebe-se uma proliferação de nuances semânticas. Sua intrincada tessitura desafia a hermenêutica convencional. A intertextualidade subjacente gera significações polissêmicas. A decodificação exige um hermeneuta experiente. A dialética entre signos e referentes revela uma macroestrutura cognitiva.';

            const metrics = await readability(str,'pt');

            const expectedMetrics = {
                resultGrade: "Baixa legibilidade",
                result: 17
            } as IReadibiltyScores;
            
            expect(metrics.result).to.be.closeTo(expectedMetrics.result,1);
            expect(metrics.resultGrade).to.equal(expectedMetrics.resultGrade);

        });

        it('High readability text test in Portuguse',  async () => {
            const str = 'Com a internet, podemos aprender coisas novas, falar com amigos e brincar. Mas é bom usar com cuidado para não ficar tempo demais.';

            const metrics = await readability(str,'pt');

            const expectedMetrics = {
                resultGrade: "Alta legibilidade",
                result: 7
            } as IReadibiltyScores;
           
            
            expect(metrics.result).to.be.closeTo(expectedMetrics.result,1);
            expect(metrics.resultGrade).to.equal(expectedMetrics.resultGrade);

            
        });
        it('should calculate counters of a text in portuguse from real chatbot message', async () => {
            const str = 'O meu nome é CaTia e sou a assistente virtual da AT, Autoridade Tributária e Aduaneira. Em que posso ajudar?';
           
            const expectedCounters = {
                letters: 86,
                words: 20,
                syllables: 41,
                complexWords: 0,
                phrases: 2
            };
            const counters = await getCounters(str,'pt');

            expect(counters.letters).to.equal(expectedCounters.letters);
            expect(counters.words).to.equal(expectedCounters.words);
            expect(counters.syllables).to.be.closeTo(expectedCounters.syllables, 10);
            expect(counters.complexWords).to.be.closeTo(expectedCounters.complexWords, 10);


            
        });

        

    });    describe('Readability Scores - English', () => {
        it('should calculate counters of a text in English', async () => {
            const str = 'The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet!';
            const expectedCounters = {
                letters: 79,
                words: 17,
                syllables: 22,
                complexWords: 1,
                phrases: 2
            };
            const counters = await getCounters(str, 'en');
            expect(counters.letters).to.equal(expectedCounters.letters);
            expect(counters.words).to.equal(expectedCounters.words);
            expect(counters.syllables).to.be.closeTo(expectedCounters.syllables, 2);
            expect(counters.complexWords).to.equal(expectedCounters.complexWords);
            expect(counters.phrases).to.equal(expectedCounters.phrases);
        });

        it('should calculate readability score of a simple English phrase', async () => {
            const str = 'The cat sat on the mat. It was a sunny day.';
            const metrics = await readability(str, 'en');
            const expectedMetrics = {
                resultGrade: "Alta legibilidade",
                result: 5
            } as IReadibiltyScores;
            console.log(metrics);
            expect(metrics.resultGrade).to.equal(expectedMetrics.resultGrade);
            //expect(metrics.result).to.be.closeTo(expectedMetrics.result, 2);
        });

        it('should calculate readability score of a complex English phrase', async () => {
            const str = 'The proliferation of semantic nuances challenges conventional hermeneutics. Intertextuality generates polysemic meanings, requiring an experienced interpreter.';
            const metrics = await readability(str, 'en');
            const expectedMetrics = {
                resultGrade: "Baixa legibilidade",
                result: 22
            } as IReadibiltyScores;
            console.log(metrics);
            expect(metrics.resultGrade).to.equal(expectedMetrics.resultGrade);
            expect(metrics.result).to.be.closeTo(expectedMetrics.result, 4);
        });

        it('should calculate counters for a chatbot-like English message', async () => {
            const str = 'Hello! My name is Alex and I am your virtual assistant. How can I help you today?';
            const expectedCounters = {
                letters: 62,
                words: 17,
                syllables: 23,
                complexWords: 2,
                phrases: 3
            };
            const counters = await getCounters(str, 'en');
            expect(counters.letters).to.equal(expectedCounters.letters);
            expect(counters.words).to.equal(expectedCounters.words);
            expect(counters.syllables).to.be.closeTo(expectedCounters.syllables, 2);
            expect(counters.complexWords).to.equal(expectedCounters.complexWords);
            expect(counters.phrases).to.equal(expectedCounters.phrases);
        });

        it('should calculate readability score for a chatbot-like English message', async () => {
            const str = 'Hello! My name is Alex and I am your virtual assistant. How can I help you today?';
            const metrics = await readability(str, 'en');
            expect(metrics.resultGrade).to.equal('Alta legibilidade');
            expect(metrics.result).to.be.lessThan(13);
        });
    });
});