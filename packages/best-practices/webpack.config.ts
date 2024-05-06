import * as path from 'path';
import TerserPlugin from 'terser-webpack-plugin';

export const mode = 'production';
export const entry = './prebuild/best-practices/src/index.js';
export const output = {
  filename: 'bp.bundle.js',
  path: path.resolve(__dirname, 'dist'),
  library: {
    type: 'this'
  }
};
export const resolve = {
  alias: {
    '@shared': path.resolve(__dirname, './prebuild/shared'),
    '@shared/*': path.resolve(__dirname, './prebuild/shared/*'),
    '@packages/qw-page/src': path.resolve(__dirname, './prebuild/qw-page/src'),
    '@packages/qw-element/src': path.resolve(__dirname, './prebuild/qw-element/src'),
    '@packages/util/src': path.resolve(__dirname, './prebuild/util/src'),
    '@packages/locale/src': path.resolve(__dirname, './prebuild/locale/src')
  }
};
export const optimization = {
  minimize: true,
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        compress: {
          keep_classnames: true
        },
        mangle: {
          keep_classnames: true
        }
      }
    })
  ]
};
export const target = 'web';
