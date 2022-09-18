import * as Router from 'koa-joi-router';
import { SwaggerAPI } from 'koa-joi-router-docs';
import { userRouter } from './users';

export const globalRouter = Router();

globalRouter.get('/ping', async (ctx) => {
  ctx.body = 'pong';
});

globalRouter.prefix('/api');
globalRouter.route([...userRouter]);

// const swag = new SwaggerAPI();
// swag.addJoiRouter(globalRouter);

// const swaggerSpec = swag.generateSpec({
//   info: {
//     title: 'Link-Gather',
//     description: 'API for Link-Gather',
//     version: '1',
//   },
//   basePath: '/',
//   tags: [
//     {
//       name: 'users',
//       description: '사용자',
//     },
//   ],
// });

// globalRouter.get('/swagger', async (ctx) => {
//   ctx.body = JSON.stringify(swaggerSpec);
// });
