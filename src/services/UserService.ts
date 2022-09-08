import { hash } from 'bcryptjs';

import User from '../schemas/User';
import AppError from '../errors/AppError';
import { UserInterface } from '../interfaces/user';

interface Request extends UserInterface {
  userId?: string;
  avatarFilename?: string;
  token?: string;
}

class UserService {
  public async create({
    name,
    password,
    email,
  }: Request): Promise<UserInterface> {
    const checkUserExists = await User.findOne({ email });

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });


    return user;
  }

  public async getUserById({ userId }: Request): Promise<UserInterface> {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError('Usuário não encontrado.', 400);
    }

    return user;
  }
}

export default new UserService();
