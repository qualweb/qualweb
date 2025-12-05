import { Level } from './Level';
import { Principle } from './Principle';

export type ModuleOptions = {
  include?: string[];
  exclude?: string[];
  levels?: Level[];
  principles?: Principle[];
  selectors?: { [key: string]: string };
  settings?: { [key: string]: string | number | boolean; }
};
