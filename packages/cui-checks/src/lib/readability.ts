import syllablePT from 'syllable-pt';
import { hyphenate } from 'hyphen/en';

/* Verify what is the environment cui-checks is running on */

let browserFilePath = '';

export function setBrowserFilePath(pathStr: string) {
  browserFilePath = pathStr;
}
/**Depending on the environment, read the file with the appropriate method
 * for the browser, it uses fetch
 * for node, it uses fs
 *
 * @param path
 * @returns
 */
export async function getCommonWords(): Promise<string> {
  try {
    const response = await fetch(browserFilePath);
    if (!response.ok) {
      console.error('Error reading file:', response.statusText);
      throw new Error(response.statusText);
    }
    return await response.text();
  } catch (error) {
    console.error('Error fetching file:', error);
    throw error;
  }
}

/**Extract words from a text content ignoring special characters
 *
 * @param textContent
 * @returns
 */
export function extractWords(textContent: string): string[] {
  const pattern = /[a-zA-Zá-úÁ-ÚüÜçÇ]+(?:-[a-zA-Zá-úÁ-ÚüÜçÇ]+)*/gu;
  return textContent.match(pattern) || [];
}

function getPhrases(textContent: string): string[] {
  const regexPhrases = /[.!?]/g;
  return textContent.split(regexPhrases);
}

function isNotComplexHeuristicPT(word: string): boolean {
  // is acronym?
  if (/\b[A-Z]{2,}(?:\d+)?(?:\.[A-Z]+)*\b/.test(word)) {
    return true;
  }
  if (word[0].toUpperCase() === word[0]) {
    return true;
  }
  return false;
}

export async function countComplexWordsPT(phrases: string[]): Promise<number> {
  const commonWords = await getCommonWords();
  const commonWordsArray = commonWords.split('\n');
  let complexWords = 0;

  for (let phrase of phrases) {
    let words = extractWords(phrase);
    for (let i = 0; i < words.length; i++) {
      for (let j = 0; j < commonWordsArray.length; j++) {
        if (i !== 0) {
          if (isNotComplexHeuristicPT(words[i])) {
            break;
          }
        }

        if (j + 1 > 10929) {
          complexWords += 1;
          break;
        }
        if (commonWordsArray[j].toLowerCase() === words[i].toLowerCase()) {
          break;
        }
      }
    }
  }

  return complexWords;
}

export function countLetters(str: string): number {
  return [...str].filter((char) => /\p{L}/u.test(char)).length;
}

interface ITextCounters {
  letters: number;
  words: number;
  syllables: number;
  complexWords: number;
  phrases: number;
}

type Grade = 'Alta legibilidade' | 'Média legibilidade' | 'Baixa legibilidade' | '';

export interface IReadibiltyScores {
  resultGrade: Grade;
  result: number;
}

/** Calculate readability scores based on text counters with formulas for each metric
 *
 * @param counters
 * @returns
 */
export function calculateReadabilityScores(counters: ITextCounters, language: string): IReadibiltyScores {
  const metrics = {
    resultGrade: '' as Grade, // readability grade
    result: 0
  };

  metrics['result'] = readabilityFormulas[language](counters);

  if (metrics['result'] < 13) {
    metrics['resultGrade'] = 'Alta legibilidade';
  } else if (metrics['result'] >= 13 && metrics['result'] < 17) {
    metrics['resultGrade'] = 'Média legibilidade';
  } else {
    metrics['resultGrade'] = 'Baixa legibilidade';
  }

  return metrics;
}

const getCountersMap: Record<string, (text: string) => Promise<ITextCounters>> = {
  pt: async (text: string): Promise<ITextCounters> => {
    const counters = { letters: 0, words: 0, syllables: 0, complexWords: 0, phrases: 0 };

    let words = extractWords(text);
    let phrases = getPhrases(text);
    counters['phrases'] = countPhrases(text);
    counters['letters'] += countLetters(text);
    counters['complexWords'] = await countComplexWordsPT(phrases);

    for (let word of words) {
      let countSyllable: string = await syllablePT(word);
      counters['words']++;
      counters['syllables'] += countSyllable.split(' ').length;
    }
    return counters;
  },
  en: async (text: string): Promise<ITextCounters> => {
    const counters = { letters: 0, words: 0, syllables: 0, complexWords: 0, phrases: 0 };

    let words = extractWords(text);
    counters['phrases'] = countPhrases(text);
    counters['letters'] += countLetters(text);

    counters['complexWords'] = 0;
    for (let word of words) {
      counters['words']++;
      const hyphenated = await hyphenate(word);
      let syllableCount = hyphenated.split('\u00AD').length;
      // For English, complex words are usually those with 3+ syllables and not proper nouns/acronyms
      if (syllableCount >= 3) {
        counters['complexWords']++;
      }
      counters['syllables'] += syllableCount;
    }
    return counters;
  }
};

export async function getCounters(text: string, language: string): Promise<ITextCounters> {
  const fn = getCountersMap[language] || getCountersMap[language];
  return fn(text);
}

export function countPhrases(textContent: string): number {
  const regexPhrases = /[.!?]/g;
  let phrases = textContent.match(regexPhrases);

  return phrases != null ? phrases.length : 1;
}

export async function readability(text: string, language: string): Promise<IReadibiltyScores> {
  if (!(language in readabilityFormulas) || !(language in getCountersMap)) {
    throw new Error(`Unsupported language: ${language}`);
  }
  const counters = await getCounters(text, language);

  let score = calculateReadabilityScores(counters, language);
  return score;
}

const readabilityFormulas: Record<string, (counters: ITextCounters) => number> = {
  pt: (counters: ITextCounters) => {
    //  let fleschReadingEaseScore =  parseFloat((226 - 1.04 * (counters.words / counters.phrases) - 72 * (counters.syllables / counters.words)).toFixed(1));
    // let indexGulpeaseScore = parseFloat((89 + (300 * counters.phrases - 10 * counters.letters) / counters.words).toFixed(1));
    let fleschKincaidGradeLevel = parseFloat(
      (0.36 * (counters.words / counters.phrases) + 10.4 * (counters.syllables / counters.words) - 18).toFixed(1)
    );
    let gunningFogIndexScore = parseFloat(
      (0.49 * (counters.words / counters.phrases) + 19 * (counters.complexWords / counters.words)).toFixed(1)
    );
    let automatedReadabilityIndex = parseFloat(
      (4.6 * (counters.letters / counters.words) + 0.44 * (counters.words / counters.phrases) - 20).toFixed(1)
    );
    let colemanLiauIndexScore = parseFloat(
      (5.4 * (counters.letters / counters.words) - 21 * (counters.phrases / counters.words) - 14).toFixed(1)
    );

    return Math.round(
      (fleschKincaidGradeLevel + gunningFogIndexScore + automatedReadabilityIndex + colemanLiauIndexScore) / 4
    );
  },

  en: (counters: ITextCounters) => {
    //   let fleschEaseScore = parseFloat((206.835 - 1.015 * (counters.words / counters.phrases) - 84.6 * (counters.syllables / counters.words)).toFixed(1));
    let fleschKincaidGradeLevel = parseFloat(
      (0.39 * (counters.words / counters.phrases) + 11.8 * (counters.syllables / counters.words) - 15.59).toFixed(1)
    );
    let gunningFogIndexScore = parseFloat(
      (0.4 * (counters.words / counters.phrases) + 100 * (counters.complexWords / counters.words)).toFixed(1)
    );
    let automatedReadabilityIndex = parseFloat(
      (4.71 * (counters.letters / counters.words) + 0.5 * (counters.words / counters.phrases) - 21.43).toFixed(1)
    );
    let colemanLiauIndexScore = parseFloat(
      (
        0.0588 * (counters.letters / counters.words) -
        0.296 * ((counters.phrases * 100) / counters.words) -
        15.8
      ).toFixed(1)
    );
    return Math.round(
      (fleschKincaidGradeLevel + gunningFogIndexScore + automatedReadabilityIndex + colemanLiauIndexScore) / 4
    );
  }
};
