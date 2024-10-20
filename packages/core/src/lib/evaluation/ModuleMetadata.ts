import { Verdict } from './Verdict';

export type ModuleMetadata = {
  [verdict in Verdict]: number;
};