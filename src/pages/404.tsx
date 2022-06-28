import { Box, Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import { SmileySad } from "phosphor-react";

const PageNotFound: NextPage = () => {
  return (
    <Flex flex="1" flexDir="column" gap="1rem" justify="center" align="center" minH="100vh" px="1rem" backgroundImage="url('/images/blur-background.png')" backgroundRepeat="no-repeat" backgroundSize="cover" backgroundPosition="top">
      <Flex align="center" justify="center" gap="1rem" flexDir="column">
        <Text bgGradient='linear(to-tr, blue.500, gray.900)' bgClip='text' fontWeight="bold" fontSize={{
          base: "5xl",
          lg: "7xl",
          xl: "9xl",
        }}>
          Oops!
        </Text>

        <Text fontWeight="bold" textAlign="center" color="green.500" fontSize={{
        base: "xl",
        lg: "2xl",
      }}>
        404 - Página não encontrada
      </Text>
      </Flex>

      <Text maxW="500px" textAlign={{
        base: "justify",
        sm: "center",
      }}>
        A página que você está procurando pode ter sido removida devido a mudança de nome ou está temporariamente indisponível
      </Text>

      <Link href="/" passHref>
        <ChakraLink py="1rem" px="1.5rem" mt="1rem" bgColor="green.500" borderRadius="full" fontWeight="bold" fontSize="sm" textTransform="uppercase" _hover={{
          textDecoration: "none",
          bgColor: "green.700",
        }}>
          Retornar a página inicial
        </ChakraLink>
      </Link>
    </Flex>
  )
}

export default PageNotFound;
