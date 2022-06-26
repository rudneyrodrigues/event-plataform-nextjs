import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '../styles/theme';
import { SidebarDrawProvider } from '../context/SidebarDrawerContext';
import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apollo';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <SidebarDrawProvider>
          <Component {...pageProps} />
        </SidebarDrawProvider>
      </ApolloProvider>
    </ChakraProvider>
  )
}

export default MyApp;
