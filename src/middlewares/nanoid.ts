import { Context } from 'koa';
import { customAlphabet } from 'nanoid';

export const nanoidMiddleware = async (ctx: Context, next: () => Promise<any>) => {
  ctx.state.txId = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-',
    12,
  )();
  await next();
};
