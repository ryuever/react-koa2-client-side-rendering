import { Schema } from 'mongoose';

const OptionSchema = new Schema({
  type: {
    type: Schema.Types.ObjectId, 
    ref: 'Type', 
    required: true,
  },
})

export default OptionSchema;