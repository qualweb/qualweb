'use strict';

import { access, readFile, writeFile, readdir, mkdir } from 'fs';
import { exec } from 'child_process';
import request, { UriOptions } from 'request';

const file_exists = (path: string): Promise<boolean> => {
  return new Promise((resolve) => {
    access(path, (err: any) => {
      if (err) resolve(false);
      else resolve(true);
    });
  });
}

const get_file_content = (path: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    readFile(path, (err: any, data: any) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

const write_to_file = (path: string, data: any, options: any={flag: 'a'}): Promise<void> => {
  return new Promise((resolve: any, reject: any) => {
    writeFile(path, data, options, (err: any) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

const get_directory_files = (path: string): Promise<any> => {
  return new Promise((resolve: any, reject: any) => {
    readdir(path, (err: any, files: any) => {
      if (err) reject(err);
      else if (files) resolve(files);
    });
  });
}

const create_directory = (path: string): Promise<void> => {
  return new Promise((resolve: any, reject: any) => {
    mkdir(path, (err: any) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

const exec_command = (command: string): Promise<any> => {
  return new Promise((resolve: any, reject: any) => {
    exec(command, {maxBuffer: 1024 * 1024}, (error: any, stdout: any, stderr: any) => {
      if (error) reject(error);
      else if (stderr) reject(stderr);
      else if (stdout) resolve(stdout);
    });
  });
}

const get_request_data = (options: UriOptions): Promise<{ response: any, body: any }> => {
  return new Promise((resolve, reject) => {
    request(options, (error: any, response: any, body: any): void => {
      if (error) reject(error);
      else if (!response || response.statusCode !== 200) reject(response);
      else if (body) resolve({ response, body });
    });
  });
}

export {
  file_exists,
  get_file_content,
  write_to_file,
  get_directory_files,
  create_directory,
  exec_command,
  get_request_data
};