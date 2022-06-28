import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';

import { client } from '../lib/apollo';
import { theme } from '../styles/theme';
import { Loading } from '../components/Loading';
import { SidebarDrawProvider } from '../context/SidebarDrawerContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <ApolloProvider client={client}>
          <SidebarDrawProvider>
            <Loading />
            <Component {...pageProps} />
          </SidebarDrawProvider>
        </ApolloProvider>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp;
