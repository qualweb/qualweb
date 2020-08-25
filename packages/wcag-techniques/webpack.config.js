const path = require('path')

module.exports = {
  entry: './dist/index.js',
  node: {
    net: true
  },
  output: {
    filename: 'wcag.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: 'WCAGTechniques'
  },
  target: 'node-webkit',
}
