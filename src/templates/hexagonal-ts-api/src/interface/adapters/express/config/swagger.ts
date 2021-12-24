import { Express } from 'express';
import { serve, setup } from 'swagger-ui-express';

import swaggerConfig from '@interface/adapters/express/docs';

export default (app: Express): void => {
  app.use('/api-docs', serve, setup(swaggerConfig));
};
