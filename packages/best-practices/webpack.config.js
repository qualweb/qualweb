const path = require('path')
const os = require('os')

module.exports = {
  entry: './dist/index.js',
  output: {
    filename: 'act.js',
    path: path.resolve(__dirname, 'distWebPack'),
    libraryTarget: 'var',
    library: 'BestPractices'
  }, 
target: 'node-webkit',


}
