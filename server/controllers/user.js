import app from '../config/koa';
import fs from 'fs';

// app.router.get("*", (ctx) => {
//   console.log('any request');
//   ctx.type = 'html';
//   ctx.body = fs.createReadStream(path.join(__dirname, '..', '..', 'dist', 'index.html'));
// })
// console.log('ceshig');
// app.use(ctx => {
//   console.log('testing ------------------');
//   ctx.type = 'html';
//   ctx.body = fs.createReadStream(path.join(__dirname, '..', '..', 'dist', 'index.html'));
// });