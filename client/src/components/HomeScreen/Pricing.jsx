import React, { useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  Container,
  useToast,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState as useHookState } from '@hookstate/core';
import store from '../../store';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLIC_KEY ||
    'pk_live_51J5J3CBeiRoYwiWquyUr3n3YKXUPCgukHiEtbffmfQLWG8X1QpE6rcIk3po6uCk9zE2r1mgfafC9c2b36YMuw0sg00TFUFJgnH'
);

function PriceWrapper({ children }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}
    >
      {children}
    </Box>
  );
}

export default function Pricing() {
  const { userDetails } = useHookState(store);

  const toast = useToast();

  const createSubscription = async () => {
    const stripe = await stripePromise;

    const { data } = await axios.post(
      '/api/create-checkout-session',
      {
        priceId:
          process.env.REACT_APP_STRIPE_PRICE_ID ||
          'price_1J5foQBeiRoYwiWqGnEqXi9s',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    await stripe.redirectToCheckout({
      sessionId: data.sessionId,
    });
  };

  const cancelSubscription = async () => {
    if (window.confirm('Are you sure?')) {
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

      const { data: cancelData } = await axios.put(
        '/api/cancel-subscription',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.access_token}`,
          },
        }
      );

      userDetails.set(cancelData);
      localStorage.setItem('userDetails', JSON.stringify(cancelData));

      toast({
        title: 'Subscription status',
        description: cancelData.message,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    const capturePayment = async () => {
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

      const { data: paymentData } = await axios.post(
        '/api/create-subscription',
        {
          sessionId: sessionId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.access_token}`,
          },
        }
      );

      userDetails.set(paymentData);
      localStorage.setItem('userDetails', JSON.stringify(paymentData));

      toast({
        title: 'Subscription status',
        description: paymentData.message,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    };

    if (sessionId) {
      capturePayment();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Box py={12} id="pricing">
      <Stack spacing={4} as={Container} maxW={'5xl'} textAlign={'center'}>
        <Heading as="h1" fontSize="4xl">
          Pricing
        </Heading>
        <Text color={'gray.600'} fontSize={'xl'}>
          Start free. Subscribe when famous.
        </Text>
      </Stack>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}
      >
        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              Free
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                $
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                0
              </Text>
              <Text fontSize="3xl" color="gray.500">
                /month
              </Text>
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius={'xl'}
          >
            <List spacing={3} textAlign="start" px={12}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Five answers
              </ListItem>
              {/* <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Create account
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Share link with others
              </ListItem> */}
            </List>
            <Box w="80%" pt={7}>
              {userDetails.get() ? (
                <Button
                  w="full"
                  colorScheme="red"
                  variant="outline"
                  as={Link}
                  to="/dashboard"
                >
                  Get started
                </Button>
              ) : (
                <Button
                  w="full"
                  colorScheme="red"
                  variant="outline"
                  onClick={() =>
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    })
                  }
                >
                  Get started
                </Button>
              )}
            </Box>
          </VStack>
        </PriceWrapper>

        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              Fame
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                $
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                1
              </Text>
              <Text fontSize="3xl" color="gray.500">
                /month
              </Text>
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius={'xl'}
          >
            <List spacing={3} textAlign="start" px={12}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Unlimited answers
              </ListItem>
              {/* <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Customize account
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Embed on other media
              </ListItem> */}
            </List>
            <Box w="80%" pt={7}>
              {userDetails.get() && !userDetails.get().is_subscribed ? (
                <Button
                  w="full"
                  colorScheme="red"
                  variant="solid"
                  onClick={createSubscription}
                >
                  Subscribe
                </Button>
              ) : userDetails.get() && userDetails.get().is_subscribed ? (
                <Button
                  w="full"
                  colorScheme="red"
                  variant="solid"
                  onClick={cancelSubscription}
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  w="full"
                  colorScheme="red"
                  variant="solid"
                  onClick={() =>
                    toast({
                      title: 'Error',
                      description: 'Please log in first or sign up!',
                      status: 'error',
                      duration: 9000,
                      isClosable: true,
                    })
                  }
                >
                  Subscribe
                </Button>
              )}
            </Box>
          </VStack>
        </PriceWrapper>
      </Stack>
    </Box>
  );
}
