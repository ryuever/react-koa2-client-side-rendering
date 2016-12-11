import { Schema } from 'mongoose';

const QuestionValueSchema = new Schema({
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  language: { type: String },
  description: { type: String },
});

export default QuestionValueSchema;