import { Schema } from 'mongoose';

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
});

export default QuestionOptionSchema;