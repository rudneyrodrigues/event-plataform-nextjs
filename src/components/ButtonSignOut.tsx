import { GithubLogo, SignOut } from "phosphor-react";
import { signOut, useSession } from "next-auth/react";
import { Flex, Icon, IconButton, Text, Tooltip } from '@chakra-ui/react';

export const ButtonSignOut = () => {
  const { data: session } = useSession();

  return (
    <Flex h="3.5rem" bgColor="gray.900" align="center" justify="space-between" gap=".5rem" p="1rem" borderRadius="md">
      <Icon as={GithubLogo} w="1.5rem" h="1.5rem" />
      <Text textAlign="center" noOfLines={1}>
        {session?.user?.name}
      </Text>
      <Tooltip label="Sair">
        <IconButton aria-label="Sair" size="md" icon={<SignOut size={18} />} onClick={() => signOut()} colorScheme="red" />
      </Tooltip>
    </Flex>
  )
}
