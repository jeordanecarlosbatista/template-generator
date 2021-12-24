import { PostgresHelper } from '@infrastructure/adapters/postgresql';

import env from '@interface/adapters/express/config/env';

PostgresHelper.connect().then(async () => {
  const { setupApp } = await import('./config/app');
  const app = await setupApp();
  // eslint-disable-next-line no-console
  app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`));
});
