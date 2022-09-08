import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import User from '../schemas/User';
import AppError from '../errors/AppError';

import { UserInterface } from '../interfaces/user';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: UserInterface;
  token: string;
}

class AuthenticateUserService {
  public async store({ email, password }: Request): Promise<Response> {
    const user = await User.findOne({ email })

    if (!user) {
      throw new AppError('Incorret email/password combination', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user._id.toString(),
      expiresIn: expiresIn,
    });

    return {
      user,
      token,
    };
  }

}

export default new AuthenticateUserService();
