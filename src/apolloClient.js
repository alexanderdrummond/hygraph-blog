import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clnct9ro5417601upfw0w7tg7/master',
  cache: new InMemoryCache()
});

export default client;
