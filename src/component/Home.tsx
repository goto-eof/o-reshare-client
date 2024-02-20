import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Heading,
  Icon,
  SimpleGrid,
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

  return (
    <Box width={'full'} justifyItems={'center'} minH={'99vh'} pt={'20vh'}>
      <Center>
        <SimpleGrid maxW={'5xl'} columns={{ base: 1, md: 2 }} spacing={0}>
          <Box>
            <Icon color={'green.400'} boxSize={'300px'} as={FaUpload} />
          </Box>
          <Box>
            <Box textAlign={'left'}>
              <Heading textAlign={'center'} fontSize={'2em'} color={'gray.500'}>
                O-ReShare
              </Heading>
              <Heading textAlign={'center'} fontSize={'2em'} color={'gray.500'}>
                Simple, Secure File Sharing Platform
              </Heading>
              <Text mt={6} color={'gray.500'}>
                The file sharing platform, O-ReShare, provides a simple and
                secure way to share files between users. The files are encrypted
                on the client side with the password provided by the user and
                sent to server. So that if someone accesses to the files on the
                server side, the file he will not be able to open and visualize
                or use those files because they are encrypted.
              </Text>
              <Center>
                <Button
                  fontSize={'1.3em'}
                  height={'64px'}
                  colorScheme="green"
                  onClick={goToUpload}
                  variant={'outline'}
                  mt={10}
                >
                  Upload and share files now!
                </Button>
              </Center>
            </Box>
          </Box>
        </SimpleGrid>
      </Center>
    </Box>
  );
}
