import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Text, useBreakpointValue } from "@chakra-ui/react";

import { LessonList } from "./LessonList";
import { useSidebarDrawer } from "../../context/SidebarDrawerContext";

export const Sidebar = () => {
  const { onClose, isOpen } = useSidebarDrawer();

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    xl: false,
  });

  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay>
          <DrawerContent bg="gray.700" p="1rem">
            <DrawerCloseButton mt="1.5rem" color="green.500" />

            <DrawerHeader>Cronograma de aulas</DrawerHeader>

            <DrawerBody>
              <LessonList />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }

  return (
    <Box w="348px" bg="gray.700" p="1.5rem" borderX="1px solid" borderColor="gray.500">
      <Text fontSize="2xl" fontWeight="bold" color="white" py="1.5rem" mb="1.5rem" borderBottom="1px solid" borderColor="gray.500">
        Cronograma de aulas
      </Text>

      <LessonList />
    </Box>
  )
}
