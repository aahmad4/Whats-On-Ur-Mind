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
import { CopyBlock, solarizedLight } from 'react-code-blocks';

export default function ModalCodeContainer({
  codeModalOpen,
  setCodeModalOpen,
  userDetails,
}) {
  return (
    <Modal
      scrollBehavior={'inside'}
      isOpen={codeModalOpen}
      onClose={() => setCodeModalOpen(false)}
    >
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
          <CopyBlock
            text={`<script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.1/iframeResizer.min.js"></script>
<iframe src="https://askmesomethingapp.herokuapp.com/ask/${
              userDetails.get().username
            }" id="ama-dashboard" frameborder="0" scrolling="no" width="100%"></iframe>
<script type="text/javascript">iFrameResize({log: false, checkOrigin: false}, "#ama-dashboard");</script>`}
            showLineNumbers
            codeBlock
            language="html"
            theme={solarizedLight}
          />
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
