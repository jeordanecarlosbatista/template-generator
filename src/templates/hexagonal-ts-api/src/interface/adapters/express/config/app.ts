import express, { Express } from 'express';
import setupStaticFiles from './static-files';
import setupMiddleware from './middlewares';
import setupSwagger from './swagger';
import setupRoutes from './routes';

export const setupApp = async (): Promise<Express> => {
  const app: Express = express();
  setupStaticFiles(app);
  setupSwagger(app);
  setupMiddleware(app);
  setupRoutes(app);

  return app;
};
