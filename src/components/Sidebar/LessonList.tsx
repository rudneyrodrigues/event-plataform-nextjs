import { Flex, Spinner, Text } from "@chakra-ui/react";

import { Lesson } from "./Lesson";
import { useGetLessonsQuery } from "../../graphql/generated";

export const LessonList = () => {
  const { loading, error, data } = useGetLessonsQuery();

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
