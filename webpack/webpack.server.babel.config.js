import fs from 'fs';
import path from 'path';
import webpack from 'webpack';

export default {
  entry: path.resolve(__dirname, '..', 'server', 'app.js'),

  output: {
    path: 'build',
    filename: 'server.bundle.js'
  },

  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, '..', 'node_modules')).concat([
    'react-dom/server', 'react/addons', 'moment'
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),

  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },

  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ] : [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],  

  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'eslint', exclude: /node_modules/ }
    ],
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader',
      }
    ]
  },
  
  // eslint: {
  //   configFile: '.eslintrc.yml'
  // },
}