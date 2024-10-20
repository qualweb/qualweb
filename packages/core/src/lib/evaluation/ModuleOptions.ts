import { Level } from './Level';
import { Principle } from './Principle';

export type ModuleOptions = {
  include?: string[];
  exclude?: string[];
  levels?: Level[];
  principles?: Principle[];
};
