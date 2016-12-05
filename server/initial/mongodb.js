import mongoose from 'mongoose';
import config from 'config';
import schemas from '../schemas';

mongoose.connect('mongodb://localhost:27017/koa-test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected on port 22017');
});

const { UserSchema } = schemas;

export default {
  User: db.model('User', UserSchema),
};