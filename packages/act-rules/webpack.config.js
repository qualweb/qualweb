const path = require('path')
const os = require('os')

module.exports = {
  entry: './dist/index.js',
  node: {
    crypto: true,  },
  output: {
    filename: 'act.js',
    path: path.resolve(__dirname, 'distWebPack'),
    libraryTarget: 'var',
    library: 'ACTRules'
  }, 
target: 'node-webkit',


}
