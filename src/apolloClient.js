import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
  uri: 'https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clnct9ro5417601upfw0w7tg7/master',
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
  }
}),
  cache: new InMemoryCache()
});

export default client;
