const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './prebuild/index.js',
  output: {
    filename: 'counter.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: 'Counter'
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
    ],
  },
  target: 'node-webkit'
}
