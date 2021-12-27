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
            To embed your custom Q&A page on another website, simply hit the
            copy button and then paste this into your HTML. If there are any
            bugs you face during the integration, please contact me and I will
            try to resolve the issue.
          </Text>
          {userDetails.get() && (
            <CopyBlock
              text={`<script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.1/iframeResizer.min.js"></script>
<iframe src="https://whatsonurmind.herokuapp.com/ask/@${
                userDetails.get().username
              }" id="whatsonurmind-dashboard" frameborder="0" scrolling="no" width="100%"></iframe>
<script type="text/javascript">iFrameResize({log: false, checkOrigin: false}, "#whatsonurmind-dashboard");</script>`}
              showLineNumbers
              codeBlock
              language="html"
              theme={solarizedLight}
            />
          )}
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
