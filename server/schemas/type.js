import { Schema } from 'mongoose';

const supportedLanguage = ['zh', 'en', 'jp'];

const TypeSchema = new Schema({
  name: { type: String, unique: true, lowercase: true },
  description: { type: String },
  supportedLanguages: { 
    type: [ String ], 
  },
});

export default TypeSchema;