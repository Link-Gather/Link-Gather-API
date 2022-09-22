import * as Koa from 'koa'
import { ApolloServer } from 'apollo-server-koa'
import { buildSchema, ResolverData } from 'type-graphql'
import { formatError } from './lib/apollo-server'
import {UserResolver} from './routes/gql/resolvers'


export default async () => {
  /**
   * type-graphql
   */
  const gqlSchema = await buildSchema({
    resolvers:[UserResolver],
  })

  /**
   * apollo
   */
  return new ApolloServer({
    schema: gqlSchema,
    formatError,
    debug: true,
  })
}
