import { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, unique: true, lowercase: true },
  gender: { type: String },
  age: { type: String },
  disabled: { type: String },
  nationality: { type: String },
});

export default UserSchema;