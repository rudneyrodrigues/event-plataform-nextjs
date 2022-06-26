import Link from "next/link";
import { ptBR } from 'date-fns/locale';
import { useRouter } from "next/router";
import { isPast, format } from 'date-fns';
import { CheckCircle, LockKey } from "phosphor-react";
import { Badge, Box, Flex, Link as ChakraLink, Text } from '@chakra-ui/react';

interface LessonProps {
  title: string;
  to: string;
  availableAt: Date;
  type: "live" | "class";
}

export const Lesson = ({
  title,
  to,
  availableAt,
  type,
}: LessonProps) => {
  const { asPath } = useRouter();

  const isLessonAvailable = isPast(availableAt);
  const availableDateFormatted = format(availableAt, "EEEE' • 'dd' de 'MMMM' • 'k'h'mm", { locale: ptBR });

  const isActiveLesson = asPath.includes(to);

  return (
    <Flex flexDir="column" gap=".5rem">
      <Text color="gray.300">
        {availableDateFormatted}
      </Text>

      <Link href={`/event/lesson/${to}`} passHref>
        <ChakraLink opacity={isLessonAvailable ? "" : ".5"} pointerEvents={!isLessonAvailable ? "none" : "auto"} _hover={!isLessonAvailable ? {
          textDecoration: "none",
          cursor: "not-allowed",
        } : {
          textDecoration: "none",
        }}>
          <Box borderRadius="md" border="1px solid" borderColor="gray.500" p="1rem" transitionDuration=".2s" bgColor={isActiveLesson ? "green.500" : ""} _hover={{
            borderColor: "green.500",
          }}>
            <Flex as="header" align="center" justify="space-between" gap="2">
              {isLessonAvailable ? (
                <Text display="flex" align="center" justifyContent="center" gap=".5rem" fontSize="sm" fontWeight="medium" color={isActiveLesson ? "white" : "blue.500"}>
                  <CheckCircle size={20} />
                  Conteúdo liberado
                </Text>
              ) : (
                <Text display="flex" align="center" justifyContent="center" gap=".5rem" fontSize="sm" fontWeight="medium" color="orange.500">
                  <LockKey size={20} />
                  Em breve
                </Text>
              )}
              
              <Badge fontSize="xs" variant="outline" colorScheme={isActiveLesson ? "whiteAlpha" : "green"} px=".5rem" py=".125rem">
                {type === "live" ? "Ao vivo" : "Prática"}
              </Badge>
            </Flex>

            <Text mt="1.25rem" color={isActiveLesson ? "white" : "gray.200"}>
              {title}
            </Text>
          </Box>
        </ChakraLink>
      </Link>
    </Flex>
  )
}
