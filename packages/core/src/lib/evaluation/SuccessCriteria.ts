import { Principle } from './Principle';
import { Level } from './Level';

export type SuccessCriteria = {
  name: string;
  level: Level;
  principle: Principle;
  url: string;
  url_tr?: string;
};