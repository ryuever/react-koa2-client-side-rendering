import { Schema } from 'mongoose';

const OptionValueSchema = new Schema({
  option: {
    type: Schema.Types.ObjectId,
    ref: 'Option', 
    required: true,
  },
  language: { type: String, required: true },
  description: { type: String },
});

export default OptionValueSchema;