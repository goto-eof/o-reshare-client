import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { FaUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ApplicationContext } from './context/ContextProvider';

export default function Home() {
  const navigate = useNavigate();
  const { selectedMenu, updateState } = useContext(ApplicationContext);

  const goToUpload = () => {
    navigate('/upload');
    updateState({ selectedMenu: '/upload' });
  };

  // const goToDownload = () => {
  //   navigate('/download/1');
  // };

  return (
    <Box w={'6xl'}>
      <Flex w={'full'} justifyContent={'space-between'} mt={'30vh'}>
        <VStack>
          <Icon color={'green.400'} boxSize={'300px'} as={FaUpload} />
        </VStack>
        <VStack w={'full'} ml={'5vw'}>
          <Box textAlign={'left'}>
            <Heading textAlign={'center'} fontSize={'2em'} color={'gray.500'}>
              O-ReShare
            </Heading>
            <Heading textAlign={'center'} fontSize={'2em'} color={'gray.500'}>
              Simple, Secure File Sharing Platform
            </Heading>
            <Text mt={6} color={'gray.500'}>
              The file sharing platform, O-ReShare, provides a simple and secure
              way to share files between users. The files are encrypted on the
              client side with the password provided by the user and sent to
              server. So that if someone accesses to the files on the server
              side, the file he will not be able to open and visualize or use
              those files because they are encrypted.
            </Text>
            <Center>
              <Button
                fontSize={'1.3em'}
                width={'50%'}
                height={'64px'}
                colorScheme="green"
                onClick={goToUpload}
                variant={'outline'}
              >
                Upload and share files now!
              </Button>
            </Center>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
}
