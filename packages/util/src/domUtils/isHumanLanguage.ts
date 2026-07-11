import { franc } from 'franc-min';

export default function isHumanLanguage(text: string): boolean {
  return franc(text, { minLength: 2 }) !== 'und';
}
