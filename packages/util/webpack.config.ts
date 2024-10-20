import * as path from 'path';

export const mode = 'production';
export const entry = './dist/index.js';
export const output = {
  filename: 'util.bundle.js',
  path: path.resolve(__dirname, 'dist/__webpack'),
  library: {
    type: 'this'
  }
};

export const target = 'web';
