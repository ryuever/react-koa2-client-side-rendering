import { Schema } from 'mongoose';

const QuestionValueSchema = new Schema({
  language: { type: String },
  description: { type: String },
});

export default QuestionValueSchema;