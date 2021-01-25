const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './prebuild/index.js',
  output: {
    filename: 'wcag.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: 'WCAGTechniques'
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
  target: 'node-webkit',
}
