import { Router } from 'express';
import PushSubscriptionController from '../controllers/PushSubscriptionController';
import EnsureAuthenticated from '../middlewares/EnsureAuthenticated';

const pushSubscriptionRouter = Router();

pushSubscriptionRouter.use(EnsureAuthenticated);

pushSubscriptionRouter.post('/new', PushSubscriptionController.store);

export default pushSubscriptionRouter;
