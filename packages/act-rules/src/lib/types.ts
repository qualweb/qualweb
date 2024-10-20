import { Verdict } from '@qualweb/core/evaluation';

export type RuleResult = {
  [verdict in Verdict]: { title: string; code: string };
};

export type ElementResult = {
  [code: string]: { title: string; code: string; verdict?: Verdict };
};
