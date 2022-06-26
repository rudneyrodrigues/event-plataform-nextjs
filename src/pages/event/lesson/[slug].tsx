import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";
import { Flex } from "@chakra-ui/react";

import { Video } from "../../../components/Video";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";

interface LessonProps {
  slug: string;
}

const Lesson: NextPage<LessonProps> = ({slug} : LessonProps) => {
  return (
    <>
      <Head>
        <title>Eventos | Ignite Lab</title>
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

export const getServerSideProps: GetServerSideProps = async ({ params }: any) => {
  const { slug } = params;

  return {
    props: {
      slug,
    },
  }
}
