import Head from 'next/head';
import Link from 'next/link';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { Box, Button, Flex, Image, Input, Text, useToast, Spinner, Progress, Divider, Link as ChakraLink, Icon, IconButton } from '@chakra-ui/react';
import { useSession, signIn, signOut } from 'next-auth/react';

import { Logo } from '../components/Logo';
import { Footer } from '../components/Footer';
import { useCreateSubscriberMutation, useGetFirstLessonQuery } from '../graphql/generated';
import { GithubLogo, SignOut } from 'phosphor-react';

const Home: NextPage = () => {
  const toast = useToast();
  const { data: session } = useSession();

  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const {data} = useGetFirstLessonQuery();
  const [createSubscriber, { loading }] = useCreateSubscriberMutation();

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();

  //   if (!name || !email) {
  //     return (
  //       toast({
  //         position: 'top',
  //         render: () => (
  //           <Box bg="red.500" p={3} color="white" borderRadius="md">
  //             <Text>Nome e e-mail obrigatórios</Text>
  //           </Box>
  //         ),
  //       })
  //     );
  //   }

  //   await createSubscriber({
  //     variables: {
  //       name,
  //       email,
  //     },
  //   })
  //   .then(() => {
  //     router.push(`event/lesson/${data?.lessons[0].slug}`);
  //   });
  // }

 return (
  <>
    <Head>
      <title>Ignite Lab</title>
    </Head>

    <Progress size="xs" color="green" bg="gray.900" isIndeterminate={loading ? true : false} />

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
            <Text>
              {session?.user ? (
                "Você pode acessar todas as aulas disponíveis através desse botão"
              ) : (
                "Faça login com o Github para ter acesso a todas as aulas"
              )}
            </Text>

            {session?.user ? (
              <Link href={`event/lesson/${data?.lessons[0].slug}`}>
                <ChakraLink pointerEvents={loading || !data ? "none" : "auto"} opacity={loading ? ".5" : ""} h="3.5rem" border="1px solid" borderColor="blue.500" borderRadius="md" display="flex" alignItems="center" justifyContent="center" textTransform="uppercase" fontSize="sm" fontWeight="bold" color="blue.500" mt=".5rem" transitionDuration=".2s" _hover={{
                  textDecoration: 'none',
                  bgColor: 'blue.500',
                  color: 'gray.900',
                }}>
                  Acessar aulas
                </ChakraLink>
              </Link>
            ) : (
              <Button mt="1rem" p="1rem" fontSize="sm" fontWeight="bold" color="white" bgColor="green.500" h="3.5rem" textTransform="uppercase" display="flex" alignItems="center" justifyContent="center" gap=".5rem" onClick={() => signIn("github")} _hover={{
                bgColor: 'green.700',
              }} _focus={{
                bgColor: 'green.700',
              }}>
                <Icon as={GithubLogo} w="1.5rem" h="1.5rem" />
                <Text noOfLines={1}>
                  Github
                </Text>
              </Button>
            )}

            {session?.user && (
              <>
                <Divider my="1rem" />

                <Flex h="3.5rem" bgColor="gray.900" align="center" justify="space-between" gap=".5rem" p="1rem" borderRadius="md">
                  <Icon as={GithubLogo} w="1.5rem" h="1.5rem" />
                  <Text textAlign="center" noOfLines={1}>
                    {session.user.name}
                  </Text>
                  <IconButton aria-label="Sair" size="md" icon={<SignOut size={18} />} onClick={() => signOut()} colorScheme="red" />
                </Flex>
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
