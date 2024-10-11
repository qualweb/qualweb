import path from 'path';
import { writeFile, unlink } from 'fs';
import type { Cluster } from 'puppeteer-cluster';
import type { LogOptions } from './LogOptions';

export class ErrorManager {
  private readonly logOptions?: LogOptions;
  private readonly timestamp = new Date().getTime();
  private readonly fileName = `qualweb-errors-${this.timestamp}.log`;
  private error = false;

  constructor(logOptions?: LogOptions) {
    this.logOptions = logOptions;
    const formattedDate = new Date(this.timestamp).toISOString().replace(/T/, ' ').replace(/\..+/, '');
    this.writeErrorToFile('Evaluation errors', `${formattedDate}\n-----------`);
  }

  public handle(cluster?: Cluster): void {
    cluster?.on('taskerror', (err, data) => {
      this.error = true;
      this.writeErrorToFile(data.url, `${err.message}\n-----------`);
    });
  }

  /**
   * Logs evaluation errors to a error log file.
   *
   * @param {string} url - Url that failed to evaluate.
   * @param {string} message - Error message of the evaluation.
   */
  private writeErrorToFile(url: string, message: string): void {
    if (this.logOptions?.file) {
      const _path = path.resolve(process.cwd(), this.fileName);
      const data = url + ' : ' + message + '\n';
      writeFile(_path, data, { flag: 'a', encoding: 'utf-8' }, (err) => {
        if (err) console.error(err);
      });
    }
    if (this.logOptions?.console) {
      console.error(url + ' : ' + message + '\n');
    }
  }

  /**
   * Displays a message warning the user that errors ocurred.
   * If there are no errors the log file is deleted.
   */
  public showErrorsIfAny(): void {
    if (this.logOptions?.file) {
      if (this.error) {
        console.warn('One or more urls failed to evaluate. Check the error.log for more information.'.yellow);
      } else {
        this.deleteErrorLogFile();
      }
    }
  }

  /**
   * Deletes the error log file created at the beginning of the evaluation.
   */
  private deleteErrorLogFile(): void {
    unlink(path.resolve(process.cwd(), this.fileName), (err) => {
      if (err) {
        throw err;
      }
    });
  }
}
