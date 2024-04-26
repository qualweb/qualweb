import { Level, Principle } from '.';

export type Module = 'act-rules' | 'wcag-techniques' | 'best-practices';

export type ModuleOptions = {
  include?: string[];
  exclude?: string[];
  levels?: Level[];
  principles?: Principle[];
};
