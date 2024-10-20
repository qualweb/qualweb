import { Url } from './Url';
import { DomData } from './DomData';

export type SystemData = {
  name: string;
  description: string;
  version: string;
  homepage: string;
  date: string;
  hash: string;
  url?: Url;
  page: {
    viewport: {
      mobile?: boolean;
      landscape?: boolean;
      userAgent: string;
      resolution?: {
        width?: number;
        height?: number;
      };
    };
    dom: DomData;
  };
};
