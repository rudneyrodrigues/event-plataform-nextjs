import { Flex, Spinner, Text } from "@chakra-ui/react";
import { gql, useQuery } from '@apollo/client';

import { Lesson } from "./Lesson";

const GET_LESSONS_QUERY = gql`
  query MyQuery {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
      id
      lessonType
      availableAt
      title
      slug
    }
  }
`;

interface LessonProps {
  id: string;
  lessonType: "live" | "class";
  availableAt: string;
  title: string;
  slug: string;
}

interface GetLessonsQueryResponse {
  lessons: LessonProps[];
}

export const LessonList = () => {
  const { loading, error, data } = useQuery<GetLessonsQueryResponse>(GET_LESSONS_QUERY);

  return (
    <>
      <Flex flexDir="column" gap="2rem">
        {loading ? (
          <Flex flex="1" justify="center" align="center" gap=".5rem">
            <Text>Carregando aulas</Text>
            <Spinner size="sm" />
          </Flex>
        ) : (
          <>
            {error ? (
              <Flex flex="1" justify="center" align="center">
                <Text>Error ao carregar as aulas</Text>
              </Flex>
            ) : (
              <>
                {data?.lessons.map((lesson) => {
                  return (
                    <Lesson
                      key={lesson.id}
                      availableAt={new Date(lesson.availableAt)}
                      title={lesson.title}
                      to={lesson.slug}
                      type={lesson.lessonType}
                    />
                  )
                })}
              </>
            )}
          </>
        )}
      </Flex>
    </>
  )
}
