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
  useToast,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { EditIcon, ChevronUpIcon, DeleteIcon } from '@chakra-ui/icons';
import TimeAgo from 'timeago-react';

export default function QuestionCard({
  question,
  userDetails,
  rerender,
  setRerender,
}) {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateText, setUpdateText] = useState(question.answer_text);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const updateQuestion = async () => {
    try {
      setLoading(true);

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
      setLoading(false);

      setRerender(!rerender);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response.data.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });

      setLoading(false);
    }
  };

  const deleteQuestion = async () => {
    try {
      if (window.confirm('Are you sure?')) {
        setLoading(true);

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

        const { data: deleteData } = await axios.delete(
          `/api/questions/${userDetails.get().username}/${question.id}`,
          {
            headers: {
              Authorization: `Bearer ${data.access_token}`,
            },
          }
        );

        toast({
          title: 'Success',
          description: deleteData.message,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });

        setLoading(false);

        setRerender(!rerender);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response.data.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });

      setLoading(false);
    }
  };

  return !loading ? (
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
          onClick={deleteQuestion}
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
  ) : (
    <Center>
      <Spinner
        thickness="2px"
        speed="0.65s"
        emptyColor="gray.200"
        color="red.400"
        w={50}
        h={50}
      />
    </Center>
  );
}
