import express, { Express } from 'express';
import setupStaticFiles from '@main/config/static-files';
import setupMiddlewares from '@main/config/middlewares';
import setupSwagger from '@main/config/swagger';
import setupRoutes from '@main/config/routes';

export const setupApp = () => {
  const app: Express = express();
  setupStaticFiles(app);
  setupSwagger(app);
  setupMiddlewares(app);
  setupRoutes(app);

  return app;
};
