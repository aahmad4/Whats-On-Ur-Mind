import React, { useRef } from 'react';
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
} from '@chakra-ui/react';
import { TiSocialTwitter } from 'react-icons/ti';
import { GoMarkGithub } from 'react-icons/go';
import DividerWithText from './DividerWithText';

export default function RegisterModal({ isOpen, setRegisterModalOpen }) {
  const initialRef = useRef();

  return (
    <Modal
      scrollBehavior={'inside'}
      isOpen={isOpen}
      onClose={() => setRegisterModalOpen(false)}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={2}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input ref={initialRef} placeholder="Username" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Email" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input placeholder="Password" type="password" />
          </FormControl>

          <FormControl mt={6}>
            <Button
              type="submit"
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
