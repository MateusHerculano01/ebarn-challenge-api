import mongoose, { Schema, Model } from 'mongoose';

import { PushSubscriptionInterface } from '../interfaces/pushSubscription';

const PushSubscriptionSchema = new Schema<PushSubscriptionInterface, Model<PushSubscriptionInterface>>({
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  endpoint: { type: String, required: true },
  expirationTime: { type: Date },
  keys: {
    p256dh: { type: String },
    auth: { type: String },
  }
}, {
  timestamps: true,
})

const PushSubscription = mongoose.model('PushSubscription', PushSubscriptionSchema);

export default PushSubscription;
