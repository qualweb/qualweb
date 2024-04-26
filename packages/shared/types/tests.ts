import { HTMLValidationReport } from '.';

export type TestingData = {
  newTabWasOpen?: boolean;
  sourceHtml?: string;
  validation?: HTMLValidationReport;
};
