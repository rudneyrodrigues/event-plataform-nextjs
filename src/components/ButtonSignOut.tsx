import { GithubLogo, SignOut } from "phosphor-react";
import { signOut, useSession } from "next-auth/react";
import { Avatar, Flex, Icon, IconButton, Spinner, Text, Tooltip } from '@chakra-ui/react';

export const ButtonSignOut = () => {
  const { data: session } = useSession();

  return (
    <Flex h="3.5rem" bgColor="gray.900" align="center" justify="space-between" gap=".5rem" p="1rem" borderRadius="md">
      {!session?.user ? (
        <Spinner size="sm" />
      ) : (
        <Avatar size="sm" name={String(session.user.name)} src={String(session.user.image)}  />
      )}
      
      <Text textAlign="center" noOfLines={1}>
        {session?.user?.name}
      </Text>
      <Tooltip label="Sair">
        <IconButton aria-label="Sair" size="md" icon={<SignOut size={18} />} onClick={() => signOut()} colorScheme="red" />
      </Tooltip>
    </Flex>
  )
}
