const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './prebuild/index.js',
  output: {
    filename: 'act.bundle.js',
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
}
