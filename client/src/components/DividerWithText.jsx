import React from 'react';
import { Box, Divider, Flex, Text, useColorModeValue } from '@chakra-ui/react';

export default function DividerWithText({ children, ...flexProps }) {
  return (
    <Flex
      paddingRight="7"
      paddingLeft="7"
      align="center"
      color="gray.300"
      {...flexProps}
    >
      <Box flex="1">
        <Divider borderColor="currentcolor" />
      </Box>
      <Text
        as="span"
        px="3"
        color={useColorModeValue('gray.600', 'gray.400')}
        fontWeight="medium"
      >
        {children}
      </Text>
      <Box flex="1">
        <Divider borderColor="currentcolor" />
      </Box>
    </Flex>
  );
}
