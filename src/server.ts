import 'reflect-metadata';
import 'dotenv/config';
import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as gracefulShutdown from 'http-graceful-shutdown';
import { globalRouter } from './routes/api';
import { db } from './lib/typeorm';
import { errorHandlerMiddleware, nanoidMiddleware, dependencyInjectorMiddleware } from './middlewares';
import apolloServer from './apollo-server'

(async () => {
  /**
   * DB connect
   */
  db.initialize().then(() => console.log('DB Connected'));
  const app = new Koa();
  const graphqlServer = await apolloServer()

  app.use(koaBody({ multipart: true, jsonLimit: 10 * 1024 * 1024 })); // 10MB

  /**
   * Route middleware
   */
  app.use(nanoidMiddleware);
  app.use(errorHandlerMiddleware);
  app.use(dependencyInjectorMiddleware);
  app.use(globalRouter.middleware());
  await graphqlServer.start()
  app.use(graphqlServer.getMiddleware()) // path: /graphql

  const server = app.listen(3000);

  gracefulShutdown(server, {
    signals: 'SIGINT SIGTERM',
    timeout: 30000,
    onShutdown: async () => {
      console.log('The server shuts down when the connection is cleaned up.');
      await db.destroy();
    },
    finally: () => {
      console.log('bye 👋');
      process.exit();
    },
  });

  console.log('Server running on port 3000');
})();
