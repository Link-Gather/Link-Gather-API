import * as Joi from '@hapi/joi';
import { Spec } from 'koa-joi-router';
import { DddContext } from '../../../lib/ddd';
import { UserService } from '../../../services/users/application/user-service';

const bodySchema = Joi.object({
  email: Joi.string().email().required().description('이메일'),
  name: Joi.string().required().description('이름'),
  password: Joi.string().required().description('패스워드'),
});

export default {
  path: '/users',
  method: 'post',
  validate: {
    type: 'json',
    body: bodySchema,
  },
  handler: async (ctx) => {
    const { context } = ctx.state as { context: DddContext };

    const userService = context.get(UserService);
    const body = ctx.request.body!;

    const params: Parameters<UserService['register']> = [body];

    const account = await userService.register(...params);

    ctx.body = {
      data: account,
    };
  },
} as Spec;
