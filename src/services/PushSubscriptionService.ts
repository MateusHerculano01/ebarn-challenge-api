
import PushSubscription from '../schemas/PushSubscription';
import User from '../schemas/User';
import { PushSubscriptionInterface } from '../interfaces/pushSubscription';

interface PushSubscriptionResponse extends PushSubscriptionInterface {
  userId?: string;
}

class PushSubscriptionService {
  public async create({ userId, endpoint, expirationTime, keys }: PushSubscriptionResponse): Promise<PushSubscriptionResponse> {
    const user = await User.findById(userId)
    console.log(user);
    const pushSubscription = await PushSubscription.findOneAndUpdate(
      { endpoint },
      {
        $set: {
          user: user?._id,
          endpoint,
          expirationTime: expirationTime ? expirationTime : undefined,
          keys,
        }
      },
      { new: true, upsert: true }
    );

    return pushSubscription;

  }

}

export default new PushSubscriptionService();
