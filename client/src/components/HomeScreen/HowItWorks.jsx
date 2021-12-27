import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  RiFileCopy2Fill,
  RiQuestionnaireFill,
  RiQuestionAnswerFill,
} from 'react-icons/ri';
import HowItWorksImage from '../../assets/HowItWorksImage.svg';

function Feature({ text, icon, iconBg }) {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
}

export default function HowItWorks() {
  return (
    <Container maxW={'5xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}
          >
            Get connected with your followers
          </Text>
          <Heading>How it works</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            Simple, straightforward, and easy to use!
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.100', 'gray.700')}
              />
            }
          >
            <Feature
              icon={
                <Icon as={RiFileCopy2Fill} color={'yellow.500'} w={5} h={5} />
              }
              iconBg={useColorModeValue('yellow.100', 'yellow.900')}
              text={'Create an account, then copy and share your custom link'}
            />
            <Feature
              icon={
                <Icon
                  as={RiQuestionnaireFill}
                  color={'green.500'}
                  w={5}
                  h={5}
                />
              }
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'Wait for the questions to roll in'}
            />
            <Feature
              icon={
                <Icon
                  as={RiQuestionAnswerFill}
                  color={'purple.500'}
                  w={5}
                  h={5}
                />
              }
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text={'Answer them upon receiving in your dashboard'}
            />
          </Stack>
        </Stack>
        <Flex>
          <Image rounded={'md'} alt={'feature image'} src={HowItWorksImage} />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
