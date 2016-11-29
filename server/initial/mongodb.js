import mongoose from 'mongoose';
import config from 'config';

// mongoose.connect(config.mongodb);
mongoose.connect('mongodb://localhost:27017/koa-test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected on port 22017');
});
