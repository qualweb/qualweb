const path = require('path');

module.exports = {
  entry: './dist/index.js',
  output: {
    filename: 'qwPage.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: 'QWPage'
  },
  target: 'node-webkit'
}