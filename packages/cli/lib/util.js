'use strict';

const fs = require('fs');

module.exports.read_file = async file => {
  return new Promise((reject, resolve) => {
    fs.readFile(file, (err, data) => {
      if (err)
        reject(err);
      else
        resolve(data);
    });
  });
}