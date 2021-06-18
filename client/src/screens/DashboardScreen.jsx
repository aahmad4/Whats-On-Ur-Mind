import React, { useEffect } from 'react';
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
import Navbar from '../components/Navbar';
import { useState as useHookState } from '@hookstate/core';
import store from '../store';

export default function DashboardScreen({ history }) {
  const { userDetails, questions } = useHookState(store);

  useEffect(() => {
    if (!userDetails.get()) {
      history.push('/');
    } else {
      const fetchQuestions = async () => {
        const { data } = await axios.get(
          `/api/questions/${userDetails.get().id}`
        );

        questions.set(data.questions);
      };

      fetchQuestions();
    }
  }, [history, userDetails, questions]);

  return (
    <>
      <Navbar page="dashboard" history={history} />
      <Container maxW="container.sm">
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
                  color={'white'}
                  bg={'red.400'}
                  href={'#'}
                  _hover={{
                    bg: 'red.300',
                  }}
                  mr="3"
                >
                  Embed Widget <LinkIcon mx="4px" />
                </Button>
              </WrapItem>
              <WrapItem>
                <Button
                  color={'white'}
                  bg={'red.400'}
                  href={'#'}
                  _hover={{
                    bg: 'red.300',
                  }}
                >
                  Public Dashboard <ExternalLinkIcon mx="4px" />
                </Button>
              </WrapItem>
            </Wrap>
          </Flex>
        </Box>
        <Heading as="h2" mt="10%" fontSize="4xl">
          Questions
        </Heading>
        <Tabs variant="soft-rounded" colorScheme="red" mt="10%">
          <TabList>
            <Tab>Received</Tab>
            <Tab>Answered</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
}
