import * as path from 'path';
import TerserPlugin from 'terser-webpack-plugin';

export const mode = 'production';
export const entry = './dist/index.js';
export const output = {
  filename: 'bp.bundle.js',
  path: path.resolve(__dirname, 'dist/__webpack'),
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
