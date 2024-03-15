import { resolve } from 'path';
import TerserPlugin from 'terser-webpack-plugin';

export const mode = 'production';
export const entry = './prebuild/index.js';
export const output = {
  filename: 'wcag.bundle.js',
  path: resolve(__dirname, 'dist'),
  library: {
    type: 'this'
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
