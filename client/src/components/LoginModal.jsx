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
  ModalFooter,
  Center,
  Text,
} from '@chakra-ui/react';
import { TiSocialTwitter } from 'react-icons/ti';
import { GoMarkGithub } from 'react-icons/go';
import DividerWithText from './DividerWithText';

export default function LoginModal({ isOpen, setLoginModalOpen }) {
  const initialRef = useRef();

  return (
    <Modal isOpen={isOpen} onClose={() => setLoginModalOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log in to your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={2}>
          <FormControl>
            <FormLabel>Username or Email</FormLabel>
            <Input ref={initialRef} placeholder="Username or Email" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input placeholder="Password" type="password" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
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
            Sign in
          </Button>
        </ModalFooter>
        <DividerWithText>or continue with</DividerWithText>
        <ModalFooter mb={2} display="flex" flexDirection="column">
          <Button
            size="lg"
            fontSize="md"
            width="100%"
            colorScheme={'twitter'}
            leftIcon={<TiSocialTwitter />}
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
          >
            <Center>
              <Text>Sign in with GitHub</Text>
            </Center>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
