import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: path.resolve(__dirname, '..', 'app', 'client.js'),

  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js'    
  },

  // import from cdn
  // externals: {
  //   'react': 'React', 
  //   'react-dom': 'ReactDOM',
  //   'moment': 'moment',
  // },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      warning: false,
    }),    
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        WEBPACK: true
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Custom template using Handlebars',    
      template: 'index.pug',
      filename: 'index.html',
    }),    
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
      },
      {
        test: /\.pug$/,
        loader: 'pug-html-loader',
      },      
    ]
  },
  
  eslint: {
    configFile: '.eslintrc.yml'
  },

  postcss: function() {
    return [autoprefixer];
  },  
}