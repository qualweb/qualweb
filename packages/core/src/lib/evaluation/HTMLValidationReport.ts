export type Message = {
  url: string;
  type: 'error' | 'info';
  subType?: 'warning';
  message: string;
  extract: string;
  firstColumn?: number;
  lastColumn?: number;
  hiliteLength?: number;
  hiliteStart?: number;
  lastLine?: number;
};

export type HTMLValidationReport = {
  messages: Message[];
};
