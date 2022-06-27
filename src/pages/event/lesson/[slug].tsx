import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import { Flex } from "@chakra-ui/react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next";

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
  const { data, loading, error } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {
    variables: {
      slug,
    },
  })

  return (
    <>
      <Head>
        <title>{`${data?.lesson.title} | Ignite Lab`}</title>
      </Head>

      <Flex flexDir="column" minH="100vh">
        <Header />

        <Flex flex="1" w="full" maxW="container.xl" mx="auto" gap="1rem" display={{
          lg: "flex",
        }}>
          <Video lessonSlug={slug} />

          <Sidebar />
        </Flex>
      </Flex>
    </>
  )
}

export default Lesson;

// export const getServerSideProps: GetServerSideProps = async ({ params }: any) => {
//   const { slug } = params;

//   return {
//     props: {
//       slug,
//     },
//   }
// }

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const thirtyMinutes = 30 * 60;
  const { slug } = params;

  return {
    props: {
      slug,
    },
    revalidate: thirtyMinutes,
  }
}
