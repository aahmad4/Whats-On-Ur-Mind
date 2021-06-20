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
  const { userDetails, questions } = useHookState(store);

  const [codeModalOpen, setCodeModalOpen] = useState(false);

  useEffect(() => {
    if (userDetails.get()) {
      const fetchQuestions = async () => {
        const { data } = await axios.get(
          `/api/questions/${userDetails.get().username}`
        );

        questions.set(data.questions);
      };

      fetchQuestions();
    } else {
      history.push('/');
    }
  }, [history, userDetails, questions]);

  return (
    <>
      <Navbar page="dashboard" history={history} />
      <Container maxW="5xl">
        <Box p={8} borderRadius="lg" bg="blackAlpha.300" mt={8}>
          <Heading as="h1" fontSize="3xl">
            Welcome to your AMA dashboard! 👋
          </Heading>
          <Text mt={2} color="gray.600" fontSize="1xl">
            Start collecting questions, by sharing a link to your public
            dashboard or embedding it to your personal website.
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
                  to={`/ask/@${userDetails.get().username}`}
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
              {questions.get().map(question => {
                return (
                  !question.answer_text && (
                    <QuestionCard
                      key={question.id}
                      question={question}
                      userDetails={userDetails}
                    />
                  )
                );
              })}
            </TabPanel>
            <TabPanel>
              {questions.get().map(question => {
                return (
                  question.answer_text && (
                    <AnswerCard
                      key={question.id}
                      question={question}
                      userDetails={userDetails}
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
