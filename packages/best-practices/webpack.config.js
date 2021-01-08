const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
  entry: './dist/index.js',
  output: {
    filename: 'bp.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: 'BestPractices'
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