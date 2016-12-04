import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, '..', 'app', 'client.js'),
  ],

  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },

  resolve: {
    root: [path.join(__dirname, '..')],
    modulesDirectories: ['node_modules'],
    extensions: ['.js', '.css', '.pug', ''],
    alias: {
     'react-eva': path.join(__dirname, '..', 'components'),
      'lib': path.join(__dirname, '..', 'lib'),     
    }    
  },

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
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', `css!postcss?modules=true&localIdentname=[name]__[local]__[__hash:base64:5]`) },
      {
        test: /\.pug$/,
        loader: 'pug-html-loader',
      },
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('test.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        WEBPACK: true
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Custom template using Handlebars',    
      template: './index.pug',
      filename: 'index.html',
    }),
  ],  
  
  postcss: (webpack) => [
    // require('postcss-import')({
    //   addDependencyTo: webpack,
    //   root: path.resolve(__dirname, '..'),
    // }),
    require('precss'),
    require('postcss-cssnext')({
      // https://github.com/ai/browserslist#queries
      browsers: ['Android 2.3', 'Android >= 4', 'Chrome >= 16', 'Firefox >= 31', 'Explorer >= 9', 'iOS >= 7', 'Opera >= 12', 'Safari >= 7.1'],
    }),
  ],

  // eslint: {
  //   configFile: '.eslintrc.yml'
  // },

  // postcss: function() {
  //   return [autoprefixer];
  // },  
}