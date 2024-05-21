import type { QualwebOptions } from '@shared/types';
import type { Cluster } from 'puppeteer-cluster';
import { writeFile, unlink } from 'fs';
import path from 'path';

export class ErrorManager {
  private readonly log?: {
    console?: boolean;
    file?: boolean;
  };
  private readonly timestamp = new Date().getTime();
  private error = false;

  constructor(options: QualwebOptions) {
    this.log = options.log;
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
    if (this.log?.file) {
      const _path = path.resolve(process.cwd(), `qualweb-errors-${this.timestamp}.log`);
      const data = url + ' : ' + message + '\n';
      writeFile(_path, data, { flag: 'a', encoding: 'utf-8' }, (err) => {
        if (err) console.error(err);
      });
    }
    if (this.log?.console) {
      console.error(url + ' : ' + message + '\n');
    }
  }

  /**
   * Displays a message warning the user that errors ocurred.
   * If there are no errors the log file is deleted.
   */
  public showErrorsIfAny(): void {
    if (this.log?.file) {
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
    unlink(path.resolve(process.cwd(), `qualweb-errors-${this.timestamp}.log`), (err) => {
      if (err) {
        throw err;
      }
    });
  }
}
