var path = require('path');
var webpack = require('webpack');
if(typeof Promise === 'undefined') {
 // require('es6-promise').polyfill();
}

module.exports = {
  entry: {
    'index': './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: "tslint",
        emitErrors: true
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },

  tslint: {
    emitErrors: false
  }
};
