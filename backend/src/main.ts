import { getApp, bootstrap, start } from './bootstrap';

const init = async () => {
  const app = await getApp();
  await bootstrap(app);
  await start(app);
};

init();
