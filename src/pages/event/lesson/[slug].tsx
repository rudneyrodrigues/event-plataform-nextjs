import Head from "next/head";
import { Flex } from "@chakra-ui/react";
import { getSession } from "next-auth/react";
import { GraphQLClient } from "graphql-request";
import { GetServerSideProps, NextPage } from "next";

import { Video } from "../../../components/Video";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";

interface LessonProps {
  slug: string;
  lesson: {
    title: string;
  }
}

const Lesson: NextPage<LessonProps> = ({ slug, lesson } : LessonProps) => {
  return (
    <>
      <Head>
        <title>{`${lesson?.title} | Ignite Lab`}</title>
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

export const getServerSideProps: GetServerSideProps = async ({req, params}: any) => {
  const session = await getSession({ req });

  const { slug } = params;

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      }
    }
  }

  const graphcms = new GraphQLClient(
    "https://api-sa-east-1.graphcms.com/v2/cl4p2rqg81knf01xshxd9dcah/master",
  );

  const { lesson } = await graphcms.request(
    `
      query GetLessonBySlug ($slug: String) {
        lesson(where: {slug: $slug}) {
          title
        }
      }
    `, {
    slug,
  })

  return {
    props: {
      slug,
      lesson,
    }
  }
}
