import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost'
// import { Config } from 'App/Config'
import {Config} from 'App/Config/index.js'

/**
 * I store the Apollo client here so that I can use it directly without any <Query> component
 *
 */
let client = new ApolloClient({
  link: new HttpLink({
    uri: Config.GRAPHQL_API_URL,
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
})

export default {
  client,
}
