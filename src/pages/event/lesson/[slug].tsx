import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { gql, useQuery } from "@apollo/client";
import { Flex, Progress, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { Video } from "../../../components/Video";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";

const GET_LESSON_BY_SLUG_QUERY = gql`
  query GetLessonBySlug ($slug: String) {
    lesson(where: {slug: $slug}) {
      title
    }
  }
`

interface GetLessonBySlugResponse {
  lesson: {
    title: string;
  }
}

interface LessonProps {
  slug: string;
}

const Lesson: NextPage<LessonProps> = ({slug} : LessonProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  const { data, loading, error } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {
    variables: {
      slug,
    },
  })

  useEffect(() => {
    if (!session?.user) {
      router.push('/')
    }
  })

  return (
    <>
      <Head>
        <title>{`${data?.lesson.title} | Ignite Lab`}</title>
      </Head>

      <Flex flexDir="column" minH="100vh">
        <Header />

        {loading && (
          <Progress color="green" bgColor="gray.700" size="xs" isIndeterminate={loading ? true : false} />
        )}

        <Flex flex="1" w="full" maxW="container.xl" mx="auto" gap="1rem" display={{
          lg: "flex",
        }}>
          {error ? (
            <Flex flex="1" align="center" justify="center">
              <Text>Erro ao carregar aula</Text>
            </Flex>
          ) : (
            <Video lessonSlug={slug} />
          )}

          <Sidebar />
        </Flex>
      </Flex>
    </>
  )
}

export default Lesson;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = ({ params }: any) => {
  const thirtyMinutes = 30 * 60;

  const { slug } = params;

  return {
    props: {
      slug,
    },
    revalidate: thirtyMinutes,
  }
}
