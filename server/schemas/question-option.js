import { Schema } from 'mongoose';
import QuestionOptionValueSchema from './question-option-value';

const QuestionOptionSchema = new Schema({
  type: { 
    type: Schema.Types.ObjectId, 
    ref: 'Type', 
    required: true,
  },
  question: {
    type: Schema.Types.ObjectId, 
    ref: 'Question', 
    required: true,    
  },
  option: {
    type: Schema.Types.ObjectId, 
    ref: 'Option', 
    required: true,
  },
  content: QuestionOptionValueSchema,
});

export default QuestionOptionSchema;