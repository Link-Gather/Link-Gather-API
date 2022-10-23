import { Context } from 'koa';
import { Container } from 'typedi';
import { EntityManager } from 'typeorm';
import { DddContext } from '../lib/ddd/ddd-context';
import { db } from '../lib/typeorm';

export const dependencyInjectorMiddleware = async (ctx: Context, next: () => Promise<any>) => {
  const { txId } = ctx.state;
  const context = new DddContext(txId);
  context.set(EntityManager, db.manager);

  ctx.state.context = context;
  
  try {
    await next();
  } finally {
      context.dispose();
  }
};