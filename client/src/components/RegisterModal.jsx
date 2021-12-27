import React, { useState, useRef } from 'react';
import axios from 'axios';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Center,
  Text,
  useToast,
} from '@chakra-ui/react';
import { TiSocialTwitter } from 'react-icons/ti';
import { GoMarkGithub } from 'react-icons/go';
import { useState as useHookState } from '@hookstate/core';
import store from '../store';
import DividerWithText from './DividerWithText';
import AlertMessage from './AlertMessage';

export default function RegisterModal({
  isOpen,
  setRegisterModalOpen,
  history,
}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const initialRef = useRef();

  const { userDetails } = useHookState(store);

  const toast = useToast();

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        '/api/users/register',
        {
          username,
          email,
          password,
          first_name: '',
          last_name: '',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      userDetails.set(data);
      localStorage.setItem('userDetails', JSON.stringify(data));

      setUsername('');
      setEmail('');
      setPassword('');
      setError(null);

      setRegisterModalOpen(false);

      history.push('/dashboard');

      toast({
        title: 'Account created.',
        description: data.message,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
        setUsername('');
        setEmail('');
        setPassword('');
      }
    }
  };

  return (
    <Modal
      scrollBehavior={'inside'}
      isOpen={isOpen}
      onClose={() => {
        setRegisterModalOpen(false);
        setUsername('');
        setEmail('');
        setPassword('');
        setError(null);
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={2}>
          {error && <AlertMessage status="error" text={error} />}
          <FormControl mt={error && 4}>
            <FormLabel>Username</FormLabel>
            <Input
              ref={initialRef}
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl mt={6}>
            <Button
              type="submit"
              onClick={handleSubmit}
              bg={'red.400'}
              _hover={{
                bg: 'red.300',
              }}
              size="lg"
              fontSize="md"
              width="100%"
            >
              Sign up
            </Button>
          </FormControl>
          <FormControl mt={4}>
            <DividerWithText>or continue with</DividerWithText>
          </FormControl>
          <FormControl mt={4} mb={4}>
            <Button
              size="lg"
              fontSize="md"
              width="100%"
              colorScheme={'twitter'}
              leftIcon={<TiSocialTwitter />}
              onClick={() =>
                // toast({
                //   title: 'Under construction!',
                //   description: 'Currently working on implementing this',
                //   status: 'warning',
                //   duration: 9000,
                //   isClosable: true,
                // })
                console.log('Please try the other sign up options')
              }
            >
              <Center>
                <Text>Sign up with Twitter</Text>
              </Center>
            </Button>
            <Button
              mt={4}
              size="lg"
              fontSize="md"
              width="100%"
              colorScheme={'gray'}
              leftIcon={<GoMarkGithub />}
              onClick={() =>
                // toast({
                //   title: 'Under construction!',
                //   description: 'Currently working on implementing this',
                //   status: 'warning',
                //   duration: 9000,
                //   isClosable: true,
                // })
                console.log('Please try the other sign up options')
              }
            >
              <Center>
                <Text>Sign up with GitHub</Text>
              </Center>
            </Button>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
