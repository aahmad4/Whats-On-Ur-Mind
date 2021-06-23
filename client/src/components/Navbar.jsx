import React, { useState } from 'react';
import axios from 'axios';
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
  useToast,
} from '@chakra-ui/react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState as useHookState } from '@hookstate/core';
import store from '../store';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

export default function Navbar({ page, history }) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const bg = useColorModeValue('white', 'gray.800');
  const mobileNav = useDisclosure();

  const { userDetails } = useHookState(store);

  const toast = useToast();

  const handleLogout = async () => {
    try {
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

      const { data: logoutData } = await axios.post(
        '/api/users/logout',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.access_token}`,
          },
        }
      );

      userDetails.set(null);
      localStorage.removeItem('userDetails');

      history.push('/');

      toast({
        title: 'Account logged out.',
        description: logoutData.message,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

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
              title="Whats On Ur Mind Home Page"
              display="flex"
              alignItems="center"
            >
              <VisuallyHidden>Whats On Ur Mind</VisuallyHidden>
            </chakra.a>
            <chakra.h1
              as={Link}
              to="/"
              fontSize="xl"
              fontWeight="medium"
              ml="2"
            >
              Whats On Ur Mind?
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: 'none', md: 'inline-flex' }}
            >
              {page !== 'dashboard' && (
                <>
                  {' '}
                  <Button
                    variant="ghost"
                    onClick={() =>
                      window.scrollTo({
                        top: document.getElementById('features').offsetTop,
                        behavior: 'smooth',
                      })
                    }
                  >
                    Features
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      window.scrollTo({
                        top: document.getElementById('pricing').offsetTop,
                        behavior: 'smooth',
                      })
                    }
                  >
                    Pricing
                  </Button>
                </>
              )}
              {!userDetails.get() ? (
                <Button variant="ghost" onClick={() => setLoginModalOpen(true)}>
                  Sign in
                </Button>
              ) : (
                <Button variant="ghost">
                  Signed in as {userDetails.get().username}
                </Button>
              )}
            </HStack>
            {!userDetails.get() ? (
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
            ) : (
              <Button
                onClick={handleLogout}
                color={'white'}
                bg={'red.400'}
                href={'#'}
                _hover={{
                  bg: 'red.300',
                }}
              >
                Log out
              </Button>
            )}
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

                {page !== 'dashboard' && (
                  <>
                    <Button
                      w="full"
                      variant="ghost"
                      onClick={() =>
                        window.scrollTo({
                          top: document.getElementById('features').offsetTop,
                          behavior: 'smooth',
                        })
                      }
                    >
                      Features
                    </Button>
                    <Button
                      w="full"
                      variant="ghost"
                      onClick={() =>
                        window.scrollTo({
                          top: document.getElementById('pricing').offsetTop,
                          behavior: 'smooth',
                        })
                      }
                    >
                      Pricing
                    </Button>{' '}
                  </>
                )}
                {!userDetails.get() ? (
                  <Button
                    w="full"
                    variant="ghost"
                    onClick={() => setLoginModalOpen(true)}
                  >
                    Sign in
                  </Button>
                ) : (
                  <Button w="full" variant="ghost">
                    Signed in as {userDetails.get().username}
                  </Button>
                )}
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
      <RegisterModal
        isOpen={registerModalOpen}
        setRegisterModalOpen={setRegisterModalOpen}
        history={history}
      />
      <LoginModal
        isOpen={loginModalOpen}
        setLoginModalOpen={setLoginModalOpen}
        history={history}
      />
    </React.Fragment>
  );
}
