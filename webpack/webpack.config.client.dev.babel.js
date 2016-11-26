import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, '..', 'app', 'client.js'),
  ],

  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/static/',
    filename: 'bundle.js',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
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
    // preLoaders: [
    //   { test: /\.js$/, loader: 'eslint', exclude: /node_modules/ }
    // ],
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loaders: ['react-hot', 'babel'],
      },
      {
        test: /\.pug$/,
        loader: 'pug-html-loader',
      },
    ]
  },
  
  // eslint: {
  //   configFile: '.eslintrc.yml'
  // },

  // postcss: function() {
  //   return [autoprefixer];
  // },  
}