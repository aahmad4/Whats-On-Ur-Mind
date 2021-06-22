import React from 'react';
import { Box, Text, Center, Link, useColorModeValue } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      color={useColorModeValue('gray.700', 'gray.200')}
      mb={8}
      mt={20}
    >
      <Center>
        <Text mb="50px">
          © 2021 Powered by{' '}
          <Link color="red.500" href="/" target="_blank">
            Whats On Ur Mind? <ExternalLinkIcon mx="2px" />
          </Link>
        </Text>
      </Center>
    </Box>
  );
}
