import { Request, Response } from 'express';
import UserService from '../services/UserService';
import AppError from '../errors/AppError';

class UserController {
  public async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const user = await UserService.getUserById({ userId });

      const response = { _id: user._id, name: user.name, email: user.email };

      return res.json(response);

    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;

      let user = await UserService.create({
        name,
        email,
        password,
      });

      const response = { _id: user._id, name: user.name, email: user.email };

      return res.json(response);

    } catch (error) {
      throw new AppError(error.message, 400);
    }
  }
}

export default new UserController();
