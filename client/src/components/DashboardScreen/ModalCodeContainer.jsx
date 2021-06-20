import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from '@chakra-ui/react';

export default function ModalCodeContainer({
  codeModalOpen,
  setCodeModalOpen,
}) {
  return (
    <Modal isOpen={codeModalOpen} onClose={() => setCodeModalOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Embed Widget</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="1rem">
            To embed your AMA dashboard on your website, just add the following
            3 lines of code to your HTML. If you have any troubles with the
            integration just contact us and we will sort it out!
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button
            bg={'red.400'}
            _hover={{
              bg: 'red.300',
            }}
            colorScheme="red"
            mr={3}
            onClick={() => setCodeModalOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
