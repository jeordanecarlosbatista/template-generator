import { Router } from 'express';
import { adaptRoute } from '@interface/adapters/express/middlewares/express-route-adapter';
import { makeSignUpController, makeLoginController } from '../factories';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()));
  router.post('/login', adaptRoute(makeLoginController()));
};
