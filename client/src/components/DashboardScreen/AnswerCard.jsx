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
  IconButton,
} from '@chakra-ui/react';
import { EditIcon, ChevronUpIcon, DeleteIcon } from '@chakra-ui/icons';
import TimeAgo from 'timeago-react';

export default function QuestionCard({ question, userDetails }) {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateText, setUpdateText] = useState(question.answer_text);

  const updateQuestion = async () => {
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
        `/api/questions/${userDetails.get().username}/${question.id}`,
        {
          update_text: updateText,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.access_token}`,
          },
        }
      );

      setUpdateText(updateData.answer_text);
      setUpdateOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box p={4} bg="gray.100" borderRadius="lg" mb={5}>
      <Box mt={{ base: 4, md: 0 }}>
        <Badge
          colorScheme="blue"
          borderRadius="lg"
          fontSize="xx-small"
          p={1.5}
          mb={2}
          letterSpacing={1}
        >
          Answered
        </Badge>
        <IconButton
          size="sm"
          float="right"
          mb={2}
          bg="red.100"
          borderRadius="xl"
          aria-label="Delete question"
          icon={<DeleteIcon color="red.700" fontSize="small" />}
        />
        <Text
          mt={1}
          display="block"
          fontSize="lg"
          lineHeight="normal"
          fontWeight="semibold"
        >
          {question.question_text}
        </Text>
        {!updateOpen && (
          <Text mt={2} color="gray.500">
            {question.answer_text}
          </Text>
        )}
        {updateOpen && (
          <Textarea
            mt={3}
            bg="white"
            placeholder="Update your answer here..."
            value={updateText}
            onChange={e => setUpdateText(e.target.value)}
          />
        )}
        <Flex mt={3}>
          <Box>
            {!question.answer_updated_on ? (
              <Text mt={2} color="gray.400" fontSize="sm">
                Sent <TimeAgo datetime={question.answered_on} />
              </Text>
            ) : (
              <Text mt={2} color="gray.400" fontSize="sm">
                Updated <TimeAgo datetime={question.answer_updated_on} />
              </Text>
            )}
          </Box>
          <Spacer />
          <Box>
            {!updateOpen ? (
              <Button
                onClick={() => setUpdateOpen(true)}
                color={'white'}
                bg={'red.400'}
                href={'#'}
                _hover={{
                  bg: 'red.300',
                }}
              >
                Update <EditIcon mx={2} />
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => setUpdateOpen(false)}
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
                  onClick={updateQuestion}
                  color={'white'}
                  bg={'red.400'}
                  href={'#'}
                  _hover={{
                    bg: 'red.300',
                  }}
                >
                  Update <ChevronUpIcon mx={2} />
                </Button>
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
