import env from '@main/config/env';

const init = async () => {
  const { setupApp } = await import('./config/app');
  const app = await setupApp();
  // eslint-disable-next-line no-console
  app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`));
};

init();
