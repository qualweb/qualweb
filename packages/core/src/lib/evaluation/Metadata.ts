import { Verdict } from './Verdict';

export type Metadata = {
  [verdict in Verdict]: number;
};