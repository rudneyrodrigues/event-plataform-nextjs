import { HamburgerIcon } from "@chakra-ui/icons";
import { GithubLogo, SignOut } from "phosphor-react";
import { signOut, useSession } from "next-auth/react";
import { useSidebarDrawer } from "../context/SidebarDrawerContext";
import { Box, Flex, Icon, IconButton, Text, useBreakpointValue } from "@chakra-ui/react";

import { Logo } from "./Logo";

export const Header = () => {
  const { onOpen } = useSidebarDrawer();
  const { data: session } = useSession();

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    xl: false,
  });

  return (
    <Box bgColor="gray.700" borderBottom="1px solid" borderColor="gray.500" py="1.25rem" px="1rem">
      <Flex w="full" maxW="container.xl" mx="auto" align="center" justify="center" gap=".5rem">
        <Logo />

        <Flex align="center" justify="center" gap=".5rem" ml="auto">
          <>
            {!isDrawerSidebar && (
              <>
                {session?.user && (
                  <Flex h="3.5rem" bgColor="gray.900" align="center" justify="space-between" gap=".5rem" p="1rem" borderRadius="md">
                    <Icon as={GithubLogo} w="1.5rem" h="1.5rem" />
                    <Text textAlign="center" noOfLines={1}>
                      {session.user.name}
                    </Text>
                    <IconButton aria-label="Sair" size="md" icon={<SignOut size={18} />} onClick={() => signOut()} colorScheme="red" />
                  </Flex>
                )}
              </>
            )}
          </>

          {isDrawerSidebar && (
            <IconButton aria-label="Sidebar" icon={<HamburgerIcon fontSize="2xl" color="green.500" />} variant="ghost" colorScheme="whiteAlpha" onClick={onOpen} />
          )}
        </Flex>
      </Flex>
    </Box>
  )
}
