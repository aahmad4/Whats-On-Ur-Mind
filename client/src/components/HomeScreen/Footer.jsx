import React from 'react';
import { Box, Text, Center, useColorModeValue } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      color={useColorModeValue('gray.700', 'gray.200')}
      mb={8}
    >
      <Center>
        <Text>© 2021 Whats On Ur Mind?</Text>
      </Center>
    </Box>
  );
}
