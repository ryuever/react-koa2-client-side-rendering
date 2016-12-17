import { Schema } from 'mongoose';

const OptionValueSchema = new Schema({
  language: { type: String, required: true },
  description: { type: String },
});

export default OptionValueSchema;