import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';
import Tractor from '../schemas/Tractor';
import PushSubscription from '../schemas/PushSubscription';
import User from '../schemas/User';
import AppError from '../errors/AppError';
import { TractorInterface } from '../interfaces/tractor';
import { sendNotification } from '../config/webpush';
interface Request extends TractorInterface {
  userId: string;
  tractorId?: string | object;
}

class Tractorservice {
  public async create({ manufacturer, modelName, power, year, photo, userId }: Request): Promise<TractorInterface> {

    const user = await User.findById(userId);

    const newTractor = await Tractor.create({
      user: user._id,
      manufacturer,
      modelName,
      power,
      year,
      photo,
    });

    const subscriptions = await PushSubscription.find().populate('user');
    const photoUrl = photo ? process.env.URLFILES + photo : process.env.URLFILES + 'default.png';

    for await (const subscription of subscriptions) {
      await sendNotification(user._id === subscription.user._id
        ? 'Seu trator foi adicionado!'
        : `${user.email} adicionou um novo trator!`,
        `${manufacturer} ${modelName} ${year}`,
        subscription,
        photoUrl
      );
    }

    return newTractor;
  };

  public async getAllTractors({ modelName }): Promise<TractorInterface | TractorInterface[]> {
    const tractors = modelName ? await Tractor.find({ modelName: { $regex: modelName, $options: 'gi' } }).populate('user') : await Tractor.find().populate('user');

    return tractors;

  }

  public async getTractorsByUserId({ userId, modelName }): Promise<TractorInterface | TractorInterface[]> {
    const user = await User.findById(userId);
    const tractors = modelName ? await Tractor.find({ user: user._id, modelName: { $regex: modelName, $options: 'gi' } }) : await Tractor.find({ user: user._id });

    return tractors;

  };

  public async updateTractor({ tractorId, userId, manufacturer, modelName, power, year, photo }: Request): Promise<TractorInterface> {

    const user = await User.findById(userId);
    const tractor = await Tractor.findOne({ _id: tractorId, user: user._id });

    if (!tractorId) {
      throw new AppError('Id do trator obrigatório', 400);
    }

    if (!tractor) {
      throw new AppError('Trator não encontrado.', 401);
    }

    if (tractor.photo && photo) {
      const TractorPhotosFilePath = path.join(uploadConfig.directory, tractor.photo);
      const TractorPhotosFileExists = await fs.promises.stat(TractorPhotosFilePath);

      if (TractorPhotosFileExists) {
        await fs.promises.unlink(TractorPhotosFilePath);
      }
    }

    const newTractor = await Tractor.findOneAndUpdate({ _id: tractorId, user: user._id }, {
      $set: {
        manufacturer,
        modelName,
        power,
        year,
        photo,
      }
    }, { new: true });

    return newTractor;
  };

  public async deleteTractor({ userId, tractorId }: { userId: string, tractorId: string }): Promise<void> {
    const user = await User.findById(userId);
    const tractor = await Tractor.findOne({ _id: tractorId, user: user._id });

    if (!tractor) {
      throw new AppError('Nenhum trator encontrado', 400)
    }

    if (tractor.photo) {
      const TractorPhotosFilePath = path.join(uploadConfig.directory, tractor.photo);
      const TractorPhotosFileExists = await fs.promises.stat(TractorPhotosFilePath);

      if (TractorPhotosFileExists) {
        await fs.promises.unlink(TractorPhotosFilePath);
      }
    }

    await Tractor.findByIdAndRemove(tractorId);

  }

}

export default new Tractorservice();
