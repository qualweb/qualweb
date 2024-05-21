import * as path from 'path';

export const mode = 'production';
export const entry = './prebuild/counter/src/index.js';
export const resolve = {
  alias: {
    '@shared': path.resolve(__dirname, './prebuild/shared'),
    '@shared/*': path.resolve(__dirname, './prebuild/shared/*'),
    '@packages/util/src': path.resolve(__dirname, './prebuild/util/src')
  }
};
export const output = {
  filename: 'counter.bundle.js',
  path: path.resolve(__dirname, 'dist'),
  library: {
    type: 'this'
  }
};
export const target = 'web';
