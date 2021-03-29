const path = require('path');

module.exports = {
  entry: './prebuild/index.js',
  output: {
    filename: 'util.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'Utility',
      type: 'this'
    }
  },
  target: 'web'
}
