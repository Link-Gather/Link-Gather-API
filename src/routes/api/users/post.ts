import * as Joi from 'joi';
import { Spec } from 'koa-joi-router';
import { providedByType } from '../../../services/users/domain/model';
import { DddContext } from '../../../lib/ddd';
import { UserService } from '../../../services/users/application/user-service';

const bodySchema = Joi.object({
  email: Joi.string().email().required().description('이메일'),
  name: Joi.string().required().description('이름'),
  password: Joi.string().required().description('패스워드'),
});

const outputSchema = Joi.object({
  email: Joi.string().email().required().description('이메일'),
  name: Joi.string().required().description('이름'),
  providedBy: Joi.string().valid(...providedByType),
}).options({ stripUnknown: true });

export default {
  path: '/users',
  method: 'post',
  validate: {
    type: 'json',
    body: bodySchema,
    output: {
      200: {
        body: {
          data: outputSchema,
        },
      },
      '400-599': {
        body: {},
      },
    },
  },
  handler: async (ctx) => {
    const { context } = ctx.state as { context: DddContext };

    const userService = context.get(UserService);
    const body  = ctx.request.body! as {email:string,name:string,password:string};

    const params: Parameters<UserService['register']> = [{...body,providedBy:'local'}];

    const account = await userService.register(...params);

    ctx.body = {
      data: account,
    };
  },
} as Spec;
