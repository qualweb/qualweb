import { HTMLValidationReport } from './reports';

export type TestingData = {
  newTabWasOpen?: boolean;
  sourceHtml?: string;
  validation?: HTMLValidationReport;
};
