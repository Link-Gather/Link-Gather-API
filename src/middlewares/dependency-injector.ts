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

    // TODO: code below is deprecated
    ctx.state.container = container;
    container.set(DddContext, context);
    container.set(EntityManager, db.manager); //TODO: getManager 대체할 방법
    container.set('txId', txId);
    await next();
  } finally {
    if (context) {
      context.dispose();
    }
    // TODO: code below is deprecated
    Container.reset(txId);
  }
};
