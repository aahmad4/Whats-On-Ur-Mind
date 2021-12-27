import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  Heading,
  Text,
  Flex,
  Button,
  Wrap,
  WrapItem,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { ExternalLinkIcon, LinkIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import QuestionCard from '../components/DashboardScreen/QuestionCard';
import AnswerCard from '../components/DashboardScreen/AnswerCard';
import ModalCodeContainer from '../components/DashboardScreen/ModalCodeContainer';
import { useState as useHookState } from '@hookstate/core';
import store from '../store';

export default function DashboardScreen({ history }) {
  const { userDetails } = useHookState(store);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [codeModalOpen, setCodeModalOpen] = useState(false);

  useEffect(() => {
    if (userDetails.get()) {
      const fetchQuestions = async () => {
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

        const { data: questionData } = await axios.get(
          `/api/questions/${userDetails.get().username}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${data.access_token}`,
            },
          }
        );

        setQuestions(questionData.questions);
        setLoading(false);
      };
      fetchQuestions();
    } else {
      history.push('/');
    }
    // eslint-disable-next-line
  }, [history, rerender]);

  return (
    <>
      <Navbar page="dashboard" history={history} />
      <Container maxW="5xl">
        <Box p={8} borderRadius="lg" bg="blackAlpha.300" mt={8}>
          <Heading as="h1" fontSize="3xl">
            Welcome to your Whatsonurmind dashboard! 👋
          </Heading>
          <Text mt={2} color="gray.600" fontSize="1xl">
            Send out your link to others or embed your Q&A page to another
            website. Then wait for questions to start showing up here and you
            can answer them at your ease! Have fun!
          </Text>
          <Flex mt={8}>
            <Wrap>
              <WrapItem>
                <Button
                  onClick={() => setCodeModalOpen(true)}
                  color={'white'}
                  bg={'red.400'}
                  href={'#'}
                  _hover={{
                    bg: 'red.300',
                  }}
                  mr="3"
                >
                  Embed Widget <LinkIcon mx={2} />
                </Button>
              </WrapItem>
              <WrapItem>
                <Button
                  as={Link}
                  to={
                    userDetails.get()
                      ? `/ask/@${userDetails.get().username}`
                      : '/'
                  }
                  target="_blank"
                  color={'white'}
                  bg={'red.400'}
                  href={'#'}
                  _hover={{
                    bg: 'red.300',
                  }}
                >
                  Public Dashboard <ExternalLinkIcon mx={2} />
                </Button>
              </WrapItem>
            </Wrap>
          </Flex>
        </Box>
        <Heading as="h2" mt="5%" fontSize="4xl">
          Questions
        </Heading>
        <Tabs variant="soft-rounded" colorScheme="red" mt="5%">
          <TabList>
            <Tab>Received</Tab>
            <Tab>Answered</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
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
                  !question.answer_text && (
                    <QuestionCard
                      key={question.id}
                      question={question}
                      userDetails={userDetails}
                      rerender={rerender}
                      setRerender={setRerender}
                    />
                  )
                );
              })}
            </TabPanel>
            <TabPanel>
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
                    <AnswerCard
                      key={question.id}
                      question={question}
                      userDetails={userDetails}
                      rerender={rerender}
                      setRerender={setRerender}
                    />
                  )
                );
              })}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <ModalCodeContainer
        codeModalOpen={codeModalOpen}
        setCodeModalOpen={setCodeModalOpen}
        userDetails={userDetails}
      />
    </>
  );
}
