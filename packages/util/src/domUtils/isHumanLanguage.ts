import franc from 'franc-min';

function isHumanLanguage(text: string): boolean {
  return franc(text, { minLength: 2 }) !== 'und';
}

export default isHumanLanguage;
