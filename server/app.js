import app from './config/koa';
import initial from './initial';

app.listen(3000, () => {
  console.log('Listening on port 3000 ');
});