import {HttpLink} from '@apollo/client';

import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client-integration-nextjs';

export const {getClient} = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache({addTypename: false}),
    link: new HttpLink({
      // this needs to be an absolute url, as relative urls cannot be used in SSR
      uri: 'https://rickandmortyapi.com/graphql',
    }),
  });
});
