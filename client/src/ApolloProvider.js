// Added directly in the index.js file

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink
    // useQuery,
    // gql
  } from "@apollo/client";
 
  import App from './App'

  const httpLink=createHttpLink({
    uri: 'http://localhost:8000/graphql',
  })

  // uri:"http://localhost:8000/graphql",
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
  });

export default(
<ApolloProvider client={client}>
<App />
</ApolloProvider>
)