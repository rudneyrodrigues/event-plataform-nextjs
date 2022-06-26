import { HamburgerIcon } from "@chakra-ui/icons";
import { Flex, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { useSidebarDrawer } from "../context/SidebarDrawerContext";

import { Logo } from "./Logo";

export const Header = () => {
  const { onOpen } = useSidebarDrawer();

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    xl: false,
  });

  return (
    <Flex w="full" py="1.25rem" px="1rem" align="center" justify="center" bgColor="gray.700" borderBottom="1px solid" borderColor="gray.500" gap=".5rem">
      <Logo />

      {isDrawerSidebar && (
        <IconButton aria-label="Sidebar" icon={<HamburgerIcon fontSize="2xl" color="green.500" />} variant="ghost" ml="auto" colorScheme="whiteAlpha" onClick={onOpen} />
      )}
    </Flex>
  )
}
