import * as path from 'path';

export const mode = 'production';
export const entry = './prebuild/qw-page/src/index.js';
export const output = {
  filename: 'qw-page.bundle.js',
  path: path.resolve(__dirname, 'dist'),
  library: {
    type: 'this'
  }
};
export const resolve = {
  alias: {
    '@shared': path.resolve(__dirname, './prebuild/shared'),
    '@shared/*': path.resolve(__dirname, './prebuild/shared/*'),
    '@packages/qw-element/src': path.resolve(__dirname, './prebuild/qw-element/src')
  }
};
export const target = 'web';
