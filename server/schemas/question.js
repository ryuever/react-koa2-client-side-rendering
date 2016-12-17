import { Schema } from 'mongoose';
import QuestionValueSchema from './question-value';

const QuestionSchema = new Schema({
  type: {
    type: Schema.Types.ObjectId, 
    ref: 'Type', 
    required: true,
  }, Category: {
    type: String,
  }, Content: [QuestionValueSchema],
});

export default QuestionSchema;