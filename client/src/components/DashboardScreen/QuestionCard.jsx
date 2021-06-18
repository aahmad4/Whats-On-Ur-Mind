import React, { useState } from 'react';
import axios from 'axios';
import {
  Flex,
  Box,
  Text,
  Badge,
  Spacer,
  Button,
  Textarea,
} from '@chakra-ui/react';
import { EditIcon, ChevronUpIcon } from '@chakra-ui/icons';
import TimeAgo from 'timeago-react';

export default function QuestionCard({ question, userDetails }) {
  const [answerOpen, setAnswerOpen] = useState(false);
  const [answerText, setAnswerText] = useState('');

  const answerQuestion = async () => {
    try {
      const { data } = await axios.post(
        '/api/users/refresh',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userDetails.get().refresh_token}`,
          },
        }
      );

      const { data: updateData } = await axios.put(
        `/api/questions/${userDetails.get().id}/${question.id}`,
        {
          answer_text: answerText,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.access_token}`,
          },
        }
      );

      setAnswerText('');
      setAnswerOpen(false);
      console.log(updateData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box p={4} bg="gray.100" borderRadius="lg" mb={5}>
      <Box mt={{ base: 4, md: 0 }}>
        <Badge
          colorScheme="yellow"
          borderRadius="lg"
          fontSize="xx-small"
          p={1.5}
          mb={2}
          letterSpacing={1}
        >
          New Question
        </Badge>
        <Text
          mt={1}
          display="block"
          fontSize="lg"
          lineHeight="normal"
          fontWeight="semibold"
        >
          {question.question_text}
        </Text>
        {answerOpen && (
          <Textarea
            mt={3}
            bg="white"
            placeholder="Type your answer here..."
            value={answerText}
            onChange={e => setAnswerText(e.target.value)}
          />
        )}
        <Flex mt={3}>
          <Box>
            <Text mt={2} color="gray.400" fontSize="sm">
              Received <TimeAgo datetime={question.asked_on} />
            </Text>
          </Box>
          <Spacer />
          <Box>
            {!answerOpen ? (
              <Button
                onClick={() => setAnswerOpen(true)}
                color={'white'}
                bg={'red.400'}
                href={'#'}
                _hover={{
                  bg: 'red.300',
                }}
              >
                Answer <EditIcon mx={2} />
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => setAnswerOpen(false)}
                  color={'white'}
                  bg={'red.400'}
                  href={'#'}
                  _hover={{
                    bg: 'red.300',
                  }}
                  mr="2"
                >
                  Cancel
                </Button>
                <Button
                  onClick={answerQuestion}
                  color={'white'}
                  bg={'red.400'}
                  href={'#'}
                  _hover={{
                    bg: 'red.300',
                  }}
                >
                  Send <ChevronUpIcon mx={2} />
                </Button>
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
