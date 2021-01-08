const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './dist/index.js',
  output: {
    filename: 'act.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: 'ACTRules'
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
