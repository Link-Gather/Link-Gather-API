import { GraphQLError } from 'graphql'

/**
 * NOTE: 서버가 의도적으로 발생시키는 에러인 경우 아폴로가 제공해주는 에러 핸들러는 사용하지 않는다. (서버 에러가 아닌 경우 이 포맷터를 거치지 않도록 해야한다는것)
 * 아래 문서에 적힌것처럼 데이터 핸들링을 제대로 하면서 원하는대로 동작하게 개발하기 위해서다.
 * @see https://itnext.io/the-definitive-guide-to-handling-graphql-errors-e0c58b52b5e1
 * @see https://ecubelabs.atlassian.net/wiki/spaces/SW/pages/436699342/gql+Server+Error+handling
 */
export const formatError = (err: GraphQLError): GraphQLError => {
  // NOTE: 일단 개발자가 의도적으로 던진 에러. Boom 객체라고 기대함.
  if (err.extensions?.exception?.data) {
    return err.extensions?.exception?.data
  }
  if (err.extensions?.code === 'GRAPHQL_VALIDATION_FAILED') {
    return {
      errorCode: 'UNHANDLED', // invalid는 그냥 무조건 이걸로...?
      errorMessage: err.message,
    } as any as GraphQLError
  }
  console.error('아무것도 처리되지 않은 에러. 확인하고 처리하세요.', err)
  return {
    errorCode: err.extensions?.code || 'UNEXPECTED',
    errorMessage: err.message || 'Internal Server Error',
  } as any as GraphQLError
}
