import { Level, Principle } from '.';

export enum ModuleType {
  ACT_RULES = 'act-rules',
  WCAG_TECHNIQUES = 'wcag-techniques',
  BEST_PRACTICES = 'best-practices',
  COUNTER = 'counter'
}

export type ModuleOptions = {
  include?: string[];
  exclude?: string[];
  levels?: Level[];
  principles?: Principle[];
};
