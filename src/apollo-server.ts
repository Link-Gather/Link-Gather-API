import * as Koa from 'koa'
import { ApolloServer } from 'apollo-server-koa'
import { buildSchema, ResolverData } from 'type-graphql'
import { formatError } from './lib/apollo-server'
import {UserResolver} from './routes/gql/resolvers'
import Container, { ContainerInstance } from 'typedi'
interface TContext {
  txId: string;
  container: ContainerInstance;
  request: Koa.Request;
}

class Context implements TContext {
  txId!: string;

  container!: ContainerInstance;

  request!: Koa.Request;

  constructor(args: TContext) {
      Object.assign(this, args);
  }
}


export default async () => {
  /**
   * type-graphql
   */
  const gqlSchema = await buildSchema({
    resolvers:[UserResolver],
    container:({context}:ResolverData<TContext>)=> Container.of(context.txId)
  })

  /**
   * apollo
   */
  return new ApolloServer({
    schema: gqlSchema,
    context: async ({ctx}: {ctx: Koa.Context}) => ctx.state as Context,
    formatError,
    debug: true,
  })
}
