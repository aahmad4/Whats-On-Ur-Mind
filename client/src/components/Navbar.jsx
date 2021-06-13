import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
} from '@chakra-ui/react';
import { AiOutlineMenu } from 'react-icons/ai';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

export default function Navbar() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const bg = useColorModeValue('white', 'gray.800');
  const mobileNav = useDisclosure();

  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              as={Link}
              to="/"
              title="Ask Me Anything Home Page"
              display="flex"
              alignItems="center"
            >
              <img
                src="https://hotemoji.com/images/dl/1/question-mark-emoji-by-twitter.png"
                width="30px"
                height="auto"
                alt="Ask Me Anything Question Mark Logo"
              />
              <VisuallyHidden>Ask Me Anything</VisuallyHidden>
            </chakra.a>
            <chakra.h1
              as={Link}
              to="/"
              fontSize="xl"
              fontWeight="medium"
              ml="2"
            >
              Ask Me Anything
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: 'none', md: 'inline-flex' }}
            >
              <Button variant="ghost">Features</Button>
              <Button variant="ghost">Pricing</Button>
              <Button variant="ghost" onClick={() => setLoginModalOpen(true)}>
                Sign in
              </Button>
            </HStack>
            <Button
              onClick={() => setRegisterModalOpen(true)}
              color={'white'}
              bg={'red.400'}
              href={'#'}
              _hover={{
                bg: 'red.300',
              }}
            >
              Sign up
            </Button>
            <Box display={{ base: 'inline-flex', md: 'none' }}>
              <IconButton
                display={{ base: 'flex', md: 'none' }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue('gray.800', 'inherit')}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? 'flex' : 'none'}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />

                <Button w="full" variant="ghost">
                  Features
                </Button>
                <Button w="full" variant="ghost">
                  Pricing
                </Button>
                <Button
                  w="full"
                  variant="ghost"
                  onClick={() => setLoginModalOpen(true)}
                >
                  Sign in
                </Button>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
      <RegisterModal
        isOpen={registerModalOpen}
        setRegisterModalOpen={setRegisterModalOpen}
      />
      <LoginModal
        isOpen={loginModalOpen}
        setLoginModalOpen={setLoginModalOpen}
      />
    </React.Fragment>
  );
}
