import Koa from 'koa';
import serve from 'koa-static';
import convert from 'koa-convert';
import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import devMiddleware from 'koa-webpack-dev-middleware';
import hotMiddleware from 'koa-webpack-hot-middleware';
import webpackConfig from '../../webpack/webpack.config.client.dev.babel';
// import router from './routes';

const app = new Koa();
app.use(convert(serve(path.join(__dirname, '..', '..', 'dist'))));

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(convert(devMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  })));

  app.use(convert(hotMiddleware(compiler)));
}

import Router from 'koa-router';
// import { Questionnaire } from '../controllers'; 
// console.log('questionnaire ', Questionnaire);
const router = new Router();
console.log('router ', router);

// x-response-time
app.use(async function (ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  console.log('set reponse', ms);
});

app.use(async function (ctx, next) {
  console.log('pp00+++++');
  const start = new Date();
  await next();
  console.log('finish');
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} ${ctx.path} - ${ms}ms`);
});

// router.post('/questionnaire', (ctx) => {
//   console.log('any request');
//   ctx.body = 'hello world';
// });
// router.post('/questionnaire', Questionnaire.postQuestionnaire);

// app.use(ctx => {
//   console.log('ping ------------');
//   ctx.body = "hello world";
//   // ctx.type = 'html';
//   // ctx.body = fs.createReadStream(path.join(__dirname, '..', '..', 'dist', 'index.html'));
// });

// router.get("*", (ctx) => {
//   // console.log('any request ------- ');
//   // ctx.body = 'bingo';
//   ctx.type = 'html';
//   ctx.body = fs.createReadStream(path.join(__dirname, '..', '..', 'dist', 'index.html'));
// })

// import Router from 'koa-router';
import { Questionnaire } from '../controllers'; 
// console.log('questionnaire ', Questionnaire);
// const router = new Router();
// const router = new Router({
//   prefix: '/v1',
// });
// app.use(Questionnaire.postQuestionnaire);

// router.post('/', Questionnaire.postQuestionnaire);
router.post('/questionnaire', Questionnaire.postQuestionnaire);
// router.post('/questionnaire', Questionnaire.postQuestionnaire);

// export default router;

console.log('route routes ', router.routes());
console.log('router ----------- ', router);
app
  .use(router.routes())
  .use(router.allowedMethods());

export default app;
