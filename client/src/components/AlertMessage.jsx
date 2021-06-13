import React from 'react';
import { Alert, AlertIcon } from '@chakra-ui/react';

export default function AlertMessage({ status, text }) {
  return (
    <Alert status={status}>
      <AlertIcon />
      {text}
    </Alert>
  );
}
