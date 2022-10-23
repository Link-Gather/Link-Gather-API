import { GraphQLError } from 'graphql'

export const formatError = (err: GraphQLError): GraphQLError => {
  // NOTE: 일단 개발자가 의도적으로 던진 에러. Boom 객체라고 기대함.
  if (err.extensions?.exception?.data) {
    return err.extensions?.exception?.data
  }
  if (err.extensions?.code === 'GRAPHQL_VALIDATION_FAILED') {
    return {
      errorCode: 'UNHANDLED',
      errorMessage: err.message,
    } as any as GraphQLError
  }
  console.error('아무것도 처리되지 않은 에러. 확인하고 처리하세요.', err)
  return {
    errorCode: err.extensions?.code || 'UNEXPECTED',
    errorMessage: err.message || 'Internal Server Error',
  } as any as GraphQLError
}
