const path = require('path')

module.exports = {
  entry: './dist/index.js',
  output: {
    filename: 'bp.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: 'BestPractices'
  },
  target: 'node-webkit'
}