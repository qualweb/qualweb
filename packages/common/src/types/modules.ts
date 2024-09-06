import { Level, Principle } from './reports';

export type ModuleOptions = {
  include?: string[];
  exclude?: string[];
  levels?: Level[];
  principles?: Principle[];
};
