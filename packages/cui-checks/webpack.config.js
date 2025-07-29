const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

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
    fallback: {
    os: false,
    child_process: false,
    path:false,
    fs: false,
    },
  },
  optimization: {
    minimize: false,
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
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/lib/common-words-pt.txt', to: 'common-words-pt.txt' },
      ]
    })
  ],
  target: 'web'
}
