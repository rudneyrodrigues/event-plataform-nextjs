import Head from 'next/head';
import Link from 'next/link';
import type { GetServerSideProps, NextPage } from 'next';
import { GithubLogo, GoogleLogo } from 'phosphor-react';
import { useSession, signIn, getSession } from 'next-auth/react';
import { Box, Button, Flex, Image, Text, Divider, Link as ChakraLink, Icon } from '@chakra-ui/react';

import { Logo } from '../components/Logo';
import { Footer } from '../components/Footer';
import { ButtonSignOut } from '../components/ButtonSignOut';
import { useGetFirstLessonQuery } from '../graphql/generated';
import { GraphQLClient } from 'graphql-request';

const Home: NextPage = () => {
  const { data: session } = useSession();

  const {data} = useGetFirstLessonQuery();

  return (
    <>
      <Head>
        <title>Ignite Lab</title>
      </Head>

      <Flex minH="100vh" flexDir="column" align="center" px="1rem" backgroundImage="url('/images/blur-background.png')" backgroundRepeat="no-repeat" backgroundSize="cover" backgroundPosition="top">
        <Flex w="full" maxW="1100px" align="center" justify="space-between" gap="1rem" mt="5rem" mx="auto" flexDir={{
          base: 'column',
          lg: 'row',
        }}>
          <Box maxW="640px">
            <Flex justify={{
              base: 'center',
              lg: 'flex-start',
            }}>
              <Logo />
            </Flex>

            <Text mt="2rem" lineHeight="1.25" color="gray.100" fontWeight="bold" fontSize={{
              base: '2xl',
              lg: '2.5rem',
            }} textAlign={{
              base: 'center',
              lg: 'left',
            }}>
              Construa uma <Text as="strong" color="blue.500">aplicação completa</Text>, do zero, com <Text as="strong" color="blue.500">React</Text>
            </Text>

            <Text mt="1.5rem" color="gray.200" lineHeight="1.625" textAlign={{
              'base': 'center',
              'lg': 'left',
            }}>
              Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
            </Text>
          </Box>

          <Box p="2rem" bgColor="gray.700" border="1px solid" borderColor="gray.500" borderRadius="md" w={{
            base: 'full',
            lg: 'auto',
          }} mt={{
            base: '1.5rem',
            lg: 'auto',
          }}>
            <Text as="strong" noOfLines={2} fontSize={{
              base: 'lg',
              md: 'xl',
              lg: '2xl',
            }} textAlign={{
              base: 'center',
              lg: 'left',
            }}>
              {session?.user ? (
                `Bem vindo ${session.user.name}`
              ) : (
                "Inscreva-se gratuitamente"
              )}
            </Text>
            
            <Flex flexDir="column" gap=".5rem" w="full" mt="1.5rem">
              <Text textAlign={{
                base: 'center',
                lg: 'left',
              }}>
                {session?.user ? (
                  "Você pode acessar todas as aulas disponíveis através desse botão"
                ) : (
                  "Faça login com o Github ou Google para ter acesso a todas as aulas"
                )}
              </Text>

              {session ? (
                <Link href={`event/lesson/${data?.lessons[0].slug}`}>
                  <ChakraLink pointerEvents={!data ? "none" : "auto"} h="3.5rem" border="1px solid" borderColor="blue.500" borderRadius="md" display="flex" alignItems="center" justifyContent="center" textTransform="uppercase" fontSize="sm" fontWeight="bold" color="blue.500" mt=".5rem" transitionDuration=".2s" _hover={{
                    textDecoration: 'none',
                    bgColor: 'blue.500',
                    color: 'gray.900',
                  }}>
                    Acessar aulas
                  </ChakraLink>
                </Link>
              ) : (
                <Flex flexDir="column" gap=".5rem">
                  <Button mt="1rem" p="1rem" fontSize="sm" fontWeight="bold" color="white" bgColor="green.500" h="3.5rem" textTransform="uppercase" display="flex" alignItems="center" justifyContent="center" gap=".5rem" onClick={() => signIn("github")} _hover={{
                    bgColor: 'green.700',
                  }} _focus={{
                    bgColor: 'green.700',
                  }}>
                    <Icon as={GithubLogo} w="1.5rem" h="1.5rem" />
                    <Text noOfLines={1}>
                      Acessar com o Github
                    </Text>
                  </Button>

                  <Button mt="1rem" p="1rem" fontSize="sm" fontWeight="bold" color="white" bgColor="transparent" h="3.5rem" textTransform="uppercase" display="flex" alignItems="center" border="1px solid" borderColor="blue.500" justifyContent="center" gap=".5rem" onClick={() => signIn("google")} _hover={{
                    bgColor: 'blue.500',
                    color: 'gray.900'
                  }} _focus={{
                    bgColor: 'blue.500',
                    color: 'gray.900'
                  }}>
                    <Icon as={GoogleLogo} w="1.5rem" h="1.5rem" />
                    <Text noOfLines={1}>
                    Acessar com o Google
                    </Text>
                  </Button>
                </Flex>
              )}

              {session?.user && (
                <>
                  <Divider my="1rem" />

                  <ButtonSignOut />
                </>
              )}
            </Flex>
          </Box>
        </Flex>

        <Image src="/images/code-mockup.png" alt="Ignite Lab" mt="2.5rem" maxW="1100px" w="full" />
      </Flex>
      
      <Footer />
    </>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps = async ({req}: any) => {
  const session = await getSession({ req });

  const graphcms = new GraphQLClient(
    "https://api-sa-east-1.graphcms.com/v2/cl4p2rqg81knf01xshxd9dcah/master",
  );

  const data = await graphcms.request(`
    query GetFirstLesson {
      lessons(first: 1) {
        slug
      }
    }
  `)

  if (session) {
    return {
      redirect: {
        destination: `/event/lesson/${data?.lessons[0].slug}`,
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}
