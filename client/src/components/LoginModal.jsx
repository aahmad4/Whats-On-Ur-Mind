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

export default function LoginModal({ isOpen, setLoginModalOpen, history }) {
  const [usernameEmail, setUsernameEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const initialRef = useRef();

  const { userDetails } = useHookState(store);

  const toast = useToast();

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        '/api/users/login',
        {
          username: usernameEmail,
          email: usernameEmail,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      userDetails.set(data);
      localStorage.setItem('userDetails', JSON.stringify(data));

      setUsernameEmail('');
      setPassword('');
      setError(null);

      setLoginModalOpen(false);

      history.push('/dashboard');

      toast({
        title: 'Account authenticated.',
        description: data.message,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      setError(error.response.data.message);
      setUsernameEmail('');
      setPassword('');
    }
  };

  return (
    <Modal
      scrollBehavior={'inside'}
      isOpen={isOpen}
      onClose={() => {
        setLoginModalOpen(false);
        setUsernameEmail('');
        setPassword('');
        setError(null);
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log in to your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={2}>
          {error && <AlertMessage status="error" text={error} />}
          <FormControl mt={error && 4}>
            <FormLabel>Username or Email</FormLabel>
            <Input
              ref={initialRef}
              placeholder="Username or Email"
              value={usernameEmail}
              onChange={e => setUsernameEmail(e.target.value)}
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
              Sign in
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
                console.log('Please try the other login options')
              }
            >
              <Center>
                <Text>Sign in with Twitter</Text>
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
                console.log('Please try the other login options')
              }
            >
              <Center>
                <Text>Sign in with GitHub</Text>
              </Center>
            </Button>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
