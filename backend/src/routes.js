import { Router } from 'express';

import UserController from './app/controllers/user.controller';
import SessionController from './app/controllers/session.controller';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);

routes.post('/sessions', SessionController.store);

export default routes;
