import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const filename = 'assets/[name].[ext]';

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
      'cUtils': path.join(__dirname, '..', 'app', 'utils'),
      'sUtils': path.join(__dirname, '..', 'server', 'utils'),
      'actions': path.join(__dirname, '..', 'app', 'actions'),
      'reducers': path.join(__dirname, '..', 'app', 'reducers'),
      'wall-e': path.join(__dirname, '..', 'wall-e', 'stylesheets', 'scaffold'),
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
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: `url?limit=2048?name=${filename}!image-webpack` },
      { test: /\.woff((\?|\#)[\?\#\w\d_-]+)?$/, loader: 'url', query: { limit: 100, minetype: 'application/font-woff', name: filename } },
      { test: /\.woff2((\?|\#)[\?\#\w\d_-]+)?$/, loader: 'url', query: { limit: 100, minetype: 'application/font-woff2', name: filename } },
      { test: /\.ttf((\?|\#)[\?\#\w\d_-]+)?$/, loader: 'url', query: { limit: 100, minetype: 'application/octet-stream', name: filename } },
      { test: /\.eot((\?|\#)[\?\#\w\d_-]+)?$/, loader: 'url', query: { limit: 100, name: filename } },
      { test: /\.svg((\?|\#)[\?\#\w\d_-]+)?$/, loader: 'url', query: { limit: 10000, minetype: 'image/svg+xml', name: filename }, exclude: /\.svg$/ },      
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
    new webpack.DefinePlugin({
      __DEV__: true
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