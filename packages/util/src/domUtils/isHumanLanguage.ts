import franc from 'franc-min';

function isHumanLanguage(text: string): boolean {
  return franc(text) !== 'und';
}

export default isHumanLanguage;
