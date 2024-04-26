import * as path from 'path';
import TerserPlugin from 'terser-webpack-plugin';

export const mode = 'production';
export const entry = './prebuild/wcag-techniques/src/index.js';
export const output = {
  filename: 'wcag.bundle.js',
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
export const optimization = {
  minimize: true,
  usedExports: true,
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
