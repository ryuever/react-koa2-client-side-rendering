import { Schema } from 'mongoose';

const QuestionOptionValueSchema = new Schema({
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  language: { type: String },
  description: { type: String },
});

export default QuestionOptionValueSchema;