const path = require('path');

module.exports = {
  mode: 'production',
  entry: './prebuild/index.js',
  output: {
    filename: 'counter.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'window'
    }
  },
  target: 'web'
}
