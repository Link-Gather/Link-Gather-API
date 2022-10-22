import { Context } from 'koa';
import { Container } from 'typedi';
import { EntityManager, getManager } from 'typeorm';
import { DddContext } from '../lib/ddd/ddd-context';
import { db } from '../lib/typeorm';

export const dependencyInjectorMiddleware = async (ctx: Context, next: () => Promise<any>) => {
  const { txId } = ctx.state;
  const container = Container.of(txId);
  let context;

  try {
    context = new DddContext(txId);
    context.set(EntityManager, db.manager);

    ctx.state.context = context;

    ctx.state.container = container;
    container.set(DddContext, context);
    container.set('txId', txId);
    await next();
  } finally {
    if (context) {
      context.dispose();
    }
    Container.reset(txId);
  }
};
