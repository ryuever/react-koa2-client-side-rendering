import Koa from 'koa';
import serve from 'koa-static';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';

import path from 'path';
import fs from 'fs';

import webpack from 'webpack';
import devMiddleware from 'koa-webpack-dev-middleware';
import hotMiddleware from 'koa-webpack-hot-middleware';
import webpackConfig from '../../webpack/webpack.config.client.dev.babel';
import router from './routes';

const app = new Koa();
app.use(bodyParser());
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
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} ${ctx.path} - ${ms}ms`);
});

// error handler 
app.use(async (ctx, next) => {
  try{
    await next();
    
    if (ctx.status === 404) {
      ctx.throw(404);
    }
  } catch(err) {
    ctx.status = err.code;
    ctx.body = {
      message: err.message.en,
      code: err.code,
    };
  }
})

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

export default app;
