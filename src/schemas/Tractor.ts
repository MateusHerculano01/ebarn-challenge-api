import mongoose, { Schema, Model } from 'mongoose';

import { TractorInterface } from '../interfaces/tractor';

const TractorSchema = new Schema<TractorInterface, Model<TractorInterface>>({
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  manufacturer: { type: String, required: false },
  modelName: { type: String, required: true },
  power: { type: String, required: true },
  year: { type: Number, required: true },
  photo: { type: String },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  }
});

TractorSchema.virtual('photoUrl').get(function () {
  if (this.photo === undefined || this.photo === '') {
    return process.env.URLFILES + 'default.png';
  }
  return process.env.URLFILES + this.photo;
})

TractorSchema.pre('save', function (next) {
  this.modelName = this.modelName.toLowerCase().trim();
  this.manufacturer = this.manufacturer.toLowerCase().trim();
  next();
});

TractorSchema.pre('updateOne', function (next) {
  this.modelName = this.modelName.toLowerCase().trim();
  this.manufacturer = this.manufacturer.toLowerCase().trim();
  next();
});

const Tractor = mongoose.model('Tractor', TractorSchema);
export default Tractor;
