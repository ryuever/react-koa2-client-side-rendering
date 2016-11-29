import Koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import convert from 'koa-convert';
import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import devMiddleware from 'koa-webpack-dev-middleware';
import hotMiddleware from 'koa-webpack-hot-middleware';
import webpackConfig from '../../webpack/webpack.config.client.dev.babel';

const app = new Koa();
const router = new Router();

app.use(convert(serve(path.join(__dirname, '..', '..', 'dist'))));

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(convert(devMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  })));

  app.use(convert(hotMiddleware(compiler)));
}

// x-response-time
app.use(async function (ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async function (ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.use(ctx => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

app
  .use(router.routes())
  .use(router.allowedMethods());

export default app;