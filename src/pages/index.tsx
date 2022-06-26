import Head from 'next/head';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Box, Button, Flex, Image, Input, Text, useToast, Spinner } from '@chakra-ui/react';

import { Logo } from '../components/Logo';
import { Footer } from '../components/Footer';

const CREATE_SUBSCRIBER_MUTATION = gql`
  mutation CreateSubscriber ($name: String!, $email: String!) {
    createSubscriber(data: {name: $name, email: $email}) {
      id
    }
  }
`;

const Home: NextPage = () => {
  const toast = useToast();

  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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
      router.push('/event');
    });
  }

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

            <Button disabled={loading} type="submit" mt="1rem" p="1rem" fontSize="sm" fontWeight="bold" color="white" bgColor="green.500" h="3.5rem" textTransform="uppercase" opacity={loading ? ".5" : ""} _hover={{
              bgColor: 'green.700',
            }} _focus={{
              bgColor: 'green.700',
            }}>
              {loading ? <Spinner size="md" /> : 'Garantir minha vaga'}
            </Button>
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
