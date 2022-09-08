import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import tractorRouter from './tractor.routes';
import pushSubscriptionRouter from './pushSubscription.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/tractors', tractorRouter);
routes.use('/push-subscription', pushSubscriptionRouter);

export default routes;
