import { adaptRoute } from '@main/adapters';
import { makeHealthCheckController } from '@main/factories';
import { Router } from 'express';

export default (router: Router): void => {
  router.get('/healthcheck', adaptRoute(makeHealthCheckController()));
};
