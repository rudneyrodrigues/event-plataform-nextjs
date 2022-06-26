import Head from "next/head";
import { NextPage } from "next";
import { Flex, Text } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

const Event: NextPage = () => {
  return (
    <>
      <Head>
        <title>Eventos | Ignite Lab</title>
      </Head>

      <Flex flexDir="column" minH="100vh">
        <Header />

        <Flex flex="1" w="full" maxW="container.xl" mx="auto" gap="1rem">
          <Flex flex="1" flexDir="column" justify="center" gap="1rem" px="1rem">
            <Text textAlign="center" fontSize={{
              base: "md",
              xl: "2xl"
            }}>
              Selecione uma aula no menu para assistir
            </Text>
          </Flex>

          <Sidebar />
        </Flex>
      </Flex>
    </>
  )
}

export default Event;
