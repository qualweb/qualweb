const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './prebuild/index.js',
  output: {
    filename: 'bp.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'this'
    }
  },
  optimization: {
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
  },
  target: 'web'
};
