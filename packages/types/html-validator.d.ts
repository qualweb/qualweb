declare module '@qualweb/html-validator' {

  interface Message {
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
  }

  interface HTMLValidationReport {
    messages: Message[];
  }

  export {
    Message,
    HTMLValidationReport
  };
}