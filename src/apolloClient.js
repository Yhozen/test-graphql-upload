import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { createUploadLink } from 'apollo-upload-client'

const apiUrl = `http://192.168.0.23:3001/graphql`

const cache = new InMemoryCache()
const uploadLink = new createUploadLink({
  uri: apiUrl
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) graphQLErrors.map(({ message, locations, path }) => console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`))

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, uploadLink])
})

// const API_URL = `http://${
//   Platform.OS === 'ios' ? 'localhost' : '192.168.0.28'
// }:3000/graphql`

// // Create the apollo client
// const client = new ApolloClient({
//   uri: API_URL,
// })

export default client
