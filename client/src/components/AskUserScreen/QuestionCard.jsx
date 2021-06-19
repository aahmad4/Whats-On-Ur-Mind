import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import TimeAgo from 'timeago-react';

export default function QuestionCard({ question }) {
  return (
    <Box display={{ md: 'flex' }} mb={7} bg="gray.100" borderRadius="lg">
      <Box mt={{ base: 4, md: 0 }} p={4}>
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="sm"
          letterSpacing="wide"
          color="red.600"
        >
          Question
        </Text>
        <Text
          mt={1}
          display="block"
          fontSize="lg"
          lineHeight="normal"
          fontWeight="semibold"
        >
          {question.question_text}
        </Text>
        <Text mt={2} color="gray.500">
          {question.answer_text}
        </Text>
        {!question.answer_updated_on ? (
          <Text mt={2} color="gray.400" fontSize="sm">
            Answered <TimeAgo datetime={question.answered_on} />
          </Text>
        ) : (
          <Text mt={2} color="gray.400" fontSize="sm">
            Answer updated <TimeAgo datetime={question.answer_updated_on} />
          </Text>
        )}
      </Box>
    </Box>
  );
}
