import * as path from 'path';

export const mode = 'production';
export const entry = './prebuild/locale/src/index.js';
export const output = {
  filename: 'locale.bundle.js',
  path: path.resolve(__dirname, 'dist'),
  library: {
    type: 'this'
  }
};
export const resolve = {
  alias: {
    '@shared': path.resolve(__dirname, './prebuild/shared'),
    '@shared/*': path.resolve(__dirname, './prebuild/shared/*')
  }
};
export const target = 'web';
