import Koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import convert from 'koa-convert';

const app = new Koa();
const router = new Router();

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
  ctx.body = 'Hello Koa';
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Listening on port 3000 ');
});
