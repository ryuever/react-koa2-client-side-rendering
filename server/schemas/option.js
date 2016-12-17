import { Schema } from 'mongoose';
import OptionValueSchema from './option-value';

const OptionSchema = new Schema({
  type: {
    type: Schema.Types.ObjectId, 
    ref: 'Type', 
    required: true,
  },
  content: [OptionValueSchema],
})

export default OptionSchema;