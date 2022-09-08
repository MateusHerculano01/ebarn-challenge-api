import { Request, Response } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';
import AppError from '../errors/AppError';

class SessionsController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const { user, token } = await AuthenticateUserService.store({
        email,
        password,
      });

      const response = { _id: user._id, name: user.name, email: user.email };

      return res.json({
        response,
        token,
      });
    } catch (error) {
      throw new AppError(error.message, 400);
    }

  }
}

export default new SessionsController();
