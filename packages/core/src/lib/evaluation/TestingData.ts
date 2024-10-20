import { HTMLValidationReport } from './HTMLValidationReport';

export type TestingData = {
  newTabWasOpen?: boolean;
  sourceHtml?: string;
  validation?: HTMLValidationReport;
};
