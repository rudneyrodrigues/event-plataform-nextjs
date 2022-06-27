import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '../styles/theme';
import { SidebarDrawProvider } from '../context/SidebarDrawerContext';
import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apollo';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <ApolloProvider client={client}>
          <SidebarDrawProvider>
            <Component {...pageProps} />
          </SidebarDrawProvider>
        </ApolloProvider>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp;
