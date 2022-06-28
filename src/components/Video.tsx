import Youtube, { YouTubeProps } from 'react-youtube';
import { AspectRatio, Avatar, Box, Flex, Link, SimpleGrid, Skeleton, SkeletonText, Text } from "@chakra-ui/react";
import { CaretRight, DiscordLogo, FileArrowDown, Lightning, Image, Code } from "phosphor-react";

import { Footer } from "./Footer";
import { useGetLessonBySlugQuery } from '../graphql/generated';

interface VideoProps {
  lessonSlug: string;
}

export const Video = ({ lessonSlug }: VideoProps) => {
  const { data, loading, error } = useGetLessonBySlugQuery({
    variables: {
      slug: lessonSlug,
    },
  })

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      disablekb: 1,
      fs: 0,
    },
  };

  if (!data || !data.lesson || loading) {
    return (
      <Box flex="1" mt="2rem">
        <Flex justify="center">
          <AspectRatio w="full" h="full" maxW="1100px" maxH="60vh" ratio={16 / 9}>
            <Skeleton w="full" maxH="60vh" />
          </AspectRatio>
        </Flex>

        <Box p="2rem" maxW="1100px" gap="4rem" mx="auto">
          <SkeletonText h="3rem" noOfLines={5} spacing="1rem" />
        </Box>
      </Box>
    )
  }

  return (
    <>
      {error ? (
        <Box>
          <text>Erro ao carregar a aula</text>
        </Box>
      ) : (
        <Box flex="1" mt="2rem">
          <Flex justify="center">
            <AspectRatio w="full" h="full" maxW="1100px" maxH="60vh" ratio={16 / 9}>
              <Youtube videoId={data.lesson.videoId} id={data.lesson.videoId} opts={opts} onReady={onPlayerReady} />
            </AspectRatio>
          </Flex>
          
          <Box p="2rem" maxW="1100px" gap="4rem" mx="auto">
            <Flex align="start" gap="4rem" flexDir={{
              base: "column",
              xl: "row",
            }}>
              <Box flex="1">
                <Text as="h1" fontSize={{
                  base: "xl",
                  lg: "2xl",
                }} fontWeight="bold" color="gray.100">
                  {data.lesson.title}
                </Text>

                <Text mt="1rem" color="gray.200" lineHeight="1.625" textAlign="justify">
                  {data.lesson.description}
                </Text>

                <Flex align="center" justify={{
                  base: "center",
                  sm: "flex-start",
                }} flexDir={{
                  base: 'column',
                  sm: 'row'
                }} gap="1rem" mt="1.5rem">
                  <Avatar size="lg" name="Rudney Rodrigues" src="https://avatars.githubusercontent.com/u/68288226?v=4" />

                  {data.lesson.teacher && (
                    <Box lineHeight="1.625">
                      <Text fontSize="2xl" color="gray.100" fontWeight="bold" textAlign={{
                        base: "center",
                        sm: "left",
                      }}>
                        {data.lesson.teacher.name}
                      </Text>

                      <Text fontSize="sm" color="gray.200" textAlign={{
                        base: "center",
                        sm: "left",
                      }}>
                        {data.lesson.teacher.bio}
                      </Text>
                    </Box>
                  )}
                </Flex>
              </Box>

              <SimpleGrid w={{
                base: "full",
                xl: "auto"
              }} minChildWidth="237px" spacing="1rem">
                <Link href="https://www.fronteditor.dev/" isExternal p="1rem" fontSize="sm" fontWeight="bold" bg="green.500" display="flex" alignItems="center" justifyContent="center" gap=".5rem" borderRadius="md" textTransform="uppercase" w={{
                  base: "full",
                  lg: "auto",
                }} _hover={{
                  bg: "green.700",
                }}>
                  <Code size={24} />
                  Acesso o editor
                </Link>

                <Link cursor="not-allowed" isExternal p="1rem" fontSize="sm" fontWeight="bold" display="flex" alignItems="center" justifyContent="center" gap=".5rem" borderRadius="md" textTransform="uppercase" color="blue.500" border="1px solid" borderColor="blue.500" w={{
                  base: "full",
                  lg: "auto",
                }} _hover={{
                  bg: "blue.500",
                  color: "gray.900"
                }}>
                  <Lightning size={24} />
                  Acesso o desafio
                </Link>
              </SimpleGrid>
            </Flex>

            <SimpleGrid minChildWidth="250px" mt="5rem" spacing="1rem">
              <Link isExternal href="https://efficient-sloth-d85.notion.site/Material-complementar-86d4ef35af16471ebc3ae3eba1a378e5" display="flex" alignItems="stretch" justifyContent="space-between" bg="gray.700" borderRadius="md" overflow="hidden" flex={{
                base: "auto",
                xl: "1",
              }} _hover={{
                textDecoration: "none",
                bg: "gray.600",
              }}>
                <Flex bg="green.700" p={{
                  base: ".5rem",
                  xl: "1.5rem",
                }} align="center" color="gray.100">
                  <FileArrowDown size={40} />
                </Flex>

                <Box py="1.5rem" px=".5rem" lineHeight="1.625">
                  <Text fontWeight="bold" textAlign={{
                    base: "center",
                    xl: "left",
                  }} fontSize={{
                    base: "md",
                    lg: "xl",
                  }}>
                    Material complementar
                  </Text>
                  <Text fontSize="sm" display={{
                    base: "none",
                    xl: "block",
                  }}>
                    Acesse o material complementar para acelerar o seu desenvolvimento
                  </Text>
                </Box>

                <Flex p="1.5rem" align="center">
                  <CaretRight size={24} />
                </Flex>
              </Link>

              <Link isExternal href="https://drive.google.com/drive/folders/1mxWnvlqmH7MbVRv2Na9xFNgCQCygM1iR?usp=sharing" display="flex" alignItems="stretch" justifyContent="space-between" bg="gray.700" borderRadius="md" overflow="hidden" flex={{
                base: "auto",
                xl: "1",
              }} _hover={{
                textDecoration: "none",
                bg: "gray.600",
              }}>
                <Flex bg="green.700" align="center" color="gray.100" p={{
                  base: ".5rem",
                  xl: "1.5rem",
                }}>
                  <Image size={40} alt="Wallpapers" />
                </Flex>

                <Box py="1.5rem" px=".5rem" lineHeight="1.625">
                  <Text fontWeight="bold" textAlign={{
                    base: "center",
                    xl: "left",
                  }} fontSize={{
                    base: "md",
                    lg: "xl",
                  }}>
                    Wallpapers exclusivos
                  </Text>
                  <Text fontSize="sm" display={{
                    base: "none",
                    xl: "block",
                  }}>
                    Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina
                  </Text>
                </Box>

                <Flex p="1.5rem" align="center">
                  <CaretRight size={24} />
                </Flex>
              </Link>
            </SimpleGrid>
          </Box>

          <Footer />
        </Box>
      )}
    </>
  )
}
