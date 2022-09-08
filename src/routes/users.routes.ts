import { Router } from 'express';
import UserController from '../controllers/UserController';

const usersRouter = Router();

usersRouter.get('/:userId', UserController.getUserById);
usersRouter.post('/new', UserController.create);

export default usersRouter;
