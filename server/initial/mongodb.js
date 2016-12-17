import mongoose from 'mongoose';
import config from 'config';
import schemas from '../schemas';
import Promise from 'bluebird';

mongoose.connect('mongodb://localhost:27017/koa-test');

mongoose.Promise = Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected on port 22017');
});

const { 
  UserSchema,
  TypeSchema, 
  OptionSchema,
  // OptionValueSchema,
  QuestionSchema,
  // QuestionValueSchema,
  QuestionOptionSchema,
  // QuestionOptionValueSchema,
} = schemas;

export default {
  User: db.model('User', UserSchema),
  Type: db.model('Type', TypeSchema),
  
  Option: db.model('Option', OptionSchema),
  // OptionValue: db.model('OptionValue', OptionValueSchema),

  Question: db.model('Question', QuestionSchema),
  // QuestionValue: db.model('QuestionValue', QuestionValueSchema),

  QuestionOption: db.model('QuestionOption', QuestionOptionSchema),
  // QuestionOptionValue: db.model('QuestionOptionValue', QuestionOptionValueSchema),
};