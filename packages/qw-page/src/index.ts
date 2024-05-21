import { QWPage } from './QWPage.object';
declare global {
  interface Window {
    qwPage: QWPage;
  }
}

export { QWPage };
