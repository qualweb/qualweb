'use strict';

const { access, readFile, writeFile, readdir, mkdir } = require('fs');
const { exec } = require('child_process');
const request = require('request');

exports.file_exists = path => {
  return new Promise((resolve, reject) => {
    access(path, (err) => {
      if (err) resolve(false);
      else resolve(true);
    });
  });
}

exports.get_file_content = path => {
  return new Promise((resolve, reject) => {
    readFile(path, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

exports.write_to_file = (path, data, options={flag: 'a'}) => {
  return new Promise((resolve, reject) => {
    writeFile(path, data, options, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

exports.get_directory_files = path => {
  return new Promise((resolve, reject) => {
    readdir(path, (err, files) => {
      if (err) reject(err);
      else if (files) resolve(files);
    });
  });
}

exports.create_directory = path => {
  return new Promise((resolve, reject) => {
    mkdir(path, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

exports.exec_command = command => {
  return new Promise((resolve, reject) => {
    exec(command, {maxBuffer: 1024 * 1024}, (error, stdout, stderr) => {
      if (error) reject(error);
      else if (stderr) reject(stderr);
      else if (stdout) resolve(stdout);
    });
  });
}

exports.get_request_data = options => {
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) reject(error);
      else if (!response || response.statusCode !== 200) reject(response);
      else if (body) resolve({ response, body });
    });
  });
}