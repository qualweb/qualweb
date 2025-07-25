const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './dist/index.js',
  output: {
    filename: 'cui.bundle.js',
    path: path.resolve(__dirname, 'dist/__webpack'),
    library: {
      type: 'this'
    }
  },
    resolve: {
      alias: {
     "@microsoft/recognizers-text-number-with-unit": path.resolve(
        __dirname,
        "../../node_modules/@microsoft/recognizers-text-number-with-unit/dist/recognizers-text-number-with-unit.es5.js"
      ),
    },
  },
  optimization: {
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
  },
  target: 'web'
}
