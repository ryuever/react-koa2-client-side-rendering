import { Schema } from 'mongoose';

const QuestionSchema = new Schema({
  type: {
    type: Schema.Types.ObjectId, 
    ref: 'Type', 
    required: true,
  },
  Category: {
    type: String,
  }
});

export default QuestionSchema;