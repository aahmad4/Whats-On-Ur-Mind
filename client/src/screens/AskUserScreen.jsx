import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Heading,
  Textarea,
  Text,
  Button,
  useToast,
  Box,
  Spinner,
  Center,
} from '@chakra-ui/react';
import QuestionCard from '../components/AskUserScreen/QuestionCard';
import Footer from '../components/AskUserScreen/Footer';

export default function AskUserScreen({ history, match }) {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(`/api/questions/${match.params.name}`);

        setQuestions(data.questions);

        setLoading(false);
      } catch (error) {
        history.push('/');
        toast({
          title: 'Error',
          description: error.response.data.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    };

    fetchQuestions();
  }, [history, match, toast]);

  const handleSubmit = async () => {
    try {
      if (!questionText.trim().length) {
        return toast({
          title: 'Could not send',
          description: 'Please enter a question!',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }

      const { data } = await axios.post(
        `/api/questions/${match.params.name}`,
        {
          question_text: questionText,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      toast({
        title: 'Question sent!',
        description: data.question_text,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      setQuestionText('');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response.data.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md">
      <Heading as="h1" fontSize="4xl" mt="10%">
        Ask{' '}
        <Text as={'span'} color={'red.400'}>
          {match.params.name}
        </Text>{' '}
        anything
      </Heading>
      <Text color="gray.500" fontSize="1.4rem" my={2} mb={4}>
        Once the question is answered, both the question and answer will show
        here
      </Text>
      <Textarea
        rows="6"
        bg="gray.100"
        placeholder="Type your question here..."
        value={questionText}
        onChange={e => setQuestionText(e.target.value)}
      />
      <Button
        onClick={handleSubmit}
        mt={2}
        px={5}
        float="right"
        color={'white'}
        bg={'red.400'}
        href={'#'}
        _hover={{
          bg: 'red.300',
        }}
      >
        Submit
      </Button>
      <Heading as="h2" mt="5%" fontSize="3xl">
        Answers
      </Heading>
      <Box mt="5%">
        {loading && (
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
        )}
        {questions.map(question => {
          return (
            question.answer_text && (
              <QuestionCard key={question.id} question={question} />
            )
          );
        })}
      </Box>
      <Footer />
    </Container>
  );
}
