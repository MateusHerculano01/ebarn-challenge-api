import mongoose, { Schema, Model } from 'mongoose';

import { UserInterface } from '../interfaces/user';

const UserSchema = new Schema<UserInterface, Model<UserInterface>>({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: true,
})

const User = mongoose.model('User', UserSchema);

export default User;
