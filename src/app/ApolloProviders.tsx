'use client';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import React from 'react';

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache(),
});

export default function ApolloProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ReduxProvider>
  );
}
