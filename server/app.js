import app from './config/koa';
import initial from './initial';

// import './controllers/user';

app.listen(4000, () => {
  console.log('Listening on port 4000 ');
});