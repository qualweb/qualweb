const path = require('path')
const os = require('os')

module.exports = {
  entry: './dist/index.js',
  output: {
    filename: 'accUtil.js',
    path: path.resolve(__dirname, 'distWebPack'),
    libraryTarget: 'var',
    library: 'AccessibilityUtils'
  }, 
target: 'node-webkit',


}
