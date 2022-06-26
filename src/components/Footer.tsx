import { Flex, Text } from "@chakra-ui/react"
import { LogoRocket } from "./LogoRocket"

export const Footer = () => {
  return (
    <Flex borderTop="1px solid" borderColor="gray.500" bgColor="gray.900" px="1rem">
      <Flex w="full" maxW="container.xl" mx="auto" align="center" justify="center" gap="1.5rem" py="1.5rem" flexDir={{
      base: "column",
      md: "row",
    }}>
        <LogoRocket />

        <Text textAlign="center">
          Rocketseat - Todos os diretos reservados
        </Text>

        <Text ml={{
          base: "0",
          md: "auto",
        }}>
          Políticas de privacidade
        </Text>
      </Flex>
    </Flex>
  )
}
