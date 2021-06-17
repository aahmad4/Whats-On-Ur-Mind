import React from 'react';
import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  Container,
  Heading,
} from '@chakra-ui/react';
import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc';

function Feature({ title, text, icon }) {
  return (
    <Stack textAlign={'center'} alignItems={'center'}>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
}

export default function Features() {
  return (
    <Container maxW={'5xl'} py={24} id="features">
      <Stack
        spacing={4}
        as={Container}
        maxW={'3xl'}
        textAlign={'center'}
        mb={4}
      >
        <Heading as="h1" fontSize="4xl">
          Features
        </Heading>
        <Text color={'gray.600'} fontSize={'xl'}>
          Some core reasons as to why you should choose our platform
        </Text>
      </Stack>
      <Box p={4}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Feature
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            title={'Lifetime support'}
            text={
              'We are constantly monitoring the platform and listening to our customers for any bugs'
            }
          />
          <Feature
            icon={<Icon as={FcDonate} w={10} h={10} />}
            title={'Pay as you go'}
            text={
              'Our platform starts out free with complete access. Start paying once you grow your following.'
            }
          />
          <Feature
            icon={<Icon as={FcInTransit} w={10} h={10} />}
            title={'Instant communication'}
            text={
              'Response times are instant. Immediately check your new questions and answer them without wait.'
            }
          />
        </SimpleGrid>
      </Box>
    </Container>
  );
}
