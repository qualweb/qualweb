const path = require('path')

module.exports = {
  mode: 'production',
  entry: './dist/index.js',
  output: {
    filename: 'act.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: 'ACTRules'
  },
  optimization: {
    minimize: false
  },
  target: 'node-webkit',
  

}
