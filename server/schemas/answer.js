import { Schema } from 'mongoose';

const AnswerSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: 'Type',
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
  },
  answer: { 
    type: String,
  },
});

export default AnswerSchema;