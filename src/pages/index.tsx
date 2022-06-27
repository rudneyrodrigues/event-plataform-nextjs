import Head from 'next/head';
import Link from 'next/link';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Box, Button, Flex, Image, Input, Text, useToast, Spinner, Progress, Divider, Link as ChakraLink } from '@chakra-ui/react';

import { Logo } from '../components/Logo';
import { Footer } from '../components/Footer';

const GET_FIRST_LESSON_QUERY = gql`
  query GetFirstLesson {
    lessons(first: 1) {
      slug
    }
  }
`;

const CREATE_SUBSCRIBER_MUTATION = gql`
  mutation CreateSubscriber ($name: String!, $email: String!) {
    createSubscriber(data: {name: $name, email: $email}) {
      id
    }
  }
`;

interface LessonProps {
  lessons: [
    {
      slug: string;
    }
  ]
}

const Home: NextPage = () => {
  const toast = useToast();

  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const {data} = useQuery<LessonProps>(GET_FIRST_LESSON_QUERY);
  const [createSubscriber, { loading }] = useMutation(CREATE_SUBSCRIBER_MUTATION);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      return (
        toast({
          position: 'top',
          render: () => (
            <Box bg="red.500" p={3} color="white" borderRadius="md">
              <Text>Nome e e-mail obrigatórios</Text>
            </Box>
          ),
        })
      );
    }

    await createSubscriber({
      variables: {
        name,
        email,
      },
    })
    .then(() => {
      router.push(`event/lesson/${data?.lessons[0].slug}`);
    });
  }

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
          <Text as="strong" fontSize={{
            base: 'lg',
            md: 'xl',
            lg: '2xl',
          }} textAlign={{
            base: 'center',
            lg: 'left',
          }}>
            Inscreva-se gratuitamente
          </Text>

          <Flex as="form" onSubmit={handleSubmit} flexDir="column" gap=".5rem" w="full" mt="1.5rem">
            <Input type="text" name="name" placeholder="Seu nome completo" bgColor="gray.900" px="1.25rem" h="3.5rem"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input type="text" name="email" placeholder="Digite seu email" bgColor="gray.900" px="1.25rem" h="3.5rem"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button disabled={loading || !data} type="submit" mt="1rem" p="1rem" fontSize="sm" fontWeight="bold" color="white" bgColor="green.500" h="3.5rem" textTransform="uppercase" opacity={loading ? ".5" : ""} _hover={{
              bgColor: 'green.700',
            }} _focus={{
              bgColor: 'green.700',
            }}>
              {loading ? <Spinner size="md" /> : 'Receber notificações'}
            </Button>

            <Divider my="1rem" />
            
            <Text fontSize="sm" textAlign="center" mb=".5rem">
              Ou acesse direto as aulas
            </Text>

            <Link href={`event/lesson/${data?.lessons[0].slug}`}>
              <ChakraLink pointerEvents={loading || !data ? "none" : "auto"} opacity={loading ? ".5" : ""} h="3.5rem" border="1px solid" borderColor="blue.500" borderRadius="md" display="flex" alignItems="center" justifyContent="center" textTransform="uppercase" fontSize="sm" fontWeight="bold" color="blue.500" transitionDuration=".2s" _hover={{
                textDecoration: 'none',
                bgColor: 'blue.500',
                color: 'gray.900',
              }}>
                Acessar aulas
              </ChakraLink>
            </Link>
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
