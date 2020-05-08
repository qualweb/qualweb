const path = require('path')
const os = require('os')

module.exports = {
  entry: './dist/index.js',
  output: {
    filename: 'qwPage.js',
    path: path.resolve(__dirname, 'distWebPack'),
    libraryTarget: 'var',
    library: 'QWPage'
  }, 
target: 'node-webkit',


}
