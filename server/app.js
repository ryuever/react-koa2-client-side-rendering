import path from 'path';
import express from 'express';

import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack/webpack.config.client.dev.babel';

const app = express();
const compiler = webpack(webpackConfig);

app.use(devMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath
}));

app.use(hotMiddleware(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
})