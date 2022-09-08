import { Request, Response } from 'express';
import PushSubscriptionService from '../services/PushSubscriptionService';
import AppError from '../errors/AppError';

class PushSubscriptionController {
  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { endpoint, expirationTime, keys } = req.body;

      const response = await PushSubscriptionService.create({
        userId: req.user.id,
        endpoint,
        expirationTime,
        keys
      });
      console.log(req.body, response)
      return res.json(response);
    } catch (error) {
      throw new AppError(error.message, 400);
    }

  }
}

export default new PushSubscriptionController();
