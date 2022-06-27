import { useSession } from "next-auth/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useSidebarDrawer } from "../context/SidebarDrawerContext";
import { Box, Flex, IconButton, useBreakpointValue } from "@chakra-ui/react";

import { Logo } from "./Logo";
import { ButtonSignOut } from "./ButtonSignOut";

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
                  <ButtonSignOut />
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
