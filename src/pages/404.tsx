import { Box, Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import { SmileySad } from "phosphor-react";

const PageNotFound: NextPage = () => {
  return (
    <Flex flex="1" flexDir="column" gap="1rem" justify="center" align="center" minH="100vh" px="1rem">
      <Text color="red.500" fontSize={{
        base: "5xl",
        lg: "7xl",
        xl: "9xl",
      }}>
        404
      </Text>

      <Flex align="center" justify="center" gap="1rem" flexDir={{
        base: "column",
        lg: "row",
      }}>
        <Text textAlign="center" fontSize={{
          base: "xl",
          lg: "2xl",
        }}>
          É uma pena, mas a pagina digitada não foi encontrada.
        </Text>

        <SmileySad weight="fill" size={40} />
      </Flex>

      <Text textAlign="center" >
        Retorne a pagina inicial e tente novamente
      </Text>

      <Link href="/" passHref>
        <ChakraLink>
          Pagina Inicial
        </ChakraLink>
      </Link>
    </Flex>
  )
}

export default PageNotFound;
