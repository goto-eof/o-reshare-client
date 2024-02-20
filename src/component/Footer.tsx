import {
  Box,
  Center,
  Heading,
  ListItem,
  SimpleGrid,
  UnorderedList,
  VStack,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import Logo from './Logo';

export default function Footer() {
  return (
    <Box
      // position="fixed"
      // w="100%"
      // bottom={0}
      // left={0}
      // zIndex={1000}
      minH={'20vh'}
      p={10}
      backgroundColor={useColorModeValue('gray.100', 'gray.900')}
    >
      <SimpleGrid columns={{ base: 1, md: 3, lg: 5 }} spacingX={5} spacingY={8}>
        <Box>
          <VStack justifyContent={'center'}>
            <Logo />
            <Box fontWeight={'bold'} color={'gray.700'}>
              A secure file sharing platform
            </Box>
            <Box fontSize={'0.8em'}>© O-ReShare All rights reserved</Box>
            <Box fontSize={'0.8em'}>
              developed by{' '}
              <Link textDecoration={'underline'} href="https://www.andre-i.eu">
                Andrei Dodu
              </Link>
            </Box>
          </VStack>
        </Box>
        <Box>
          <Heading size={'md'}>Products</Heading>
          <UnorderedList>
            <ListItem color={'gray.500'}>Cloud storage</ListItem>
            <ListItem color={'gray.500'}>Synchronize</ListItem>
            <ListItem color={'gray.500'}>Backup</ListItem>
            <ListItem color={'gray.500'}>Share</ListItem>
          </UnorderedList>
        </Box>
        <Box>
          <Heading size={'md'}>Platforms</Heading>
          <UnorderedList>
            <ListItem color={'gray.500'}>Mobile App</ListItem>
            <ListItem color={'gray.500'}>Desktop App</ListItem>
            <ListItem color={'gray.500'}>Browser extensions</ListItem>
            <ListItem color={'gray.500'}>Command line</ListItem>
          </UnorderedList>
        </Box>{' '}
        <Box>
          <Heading size={'md'}>Help</Heading>
          <UnorderedList>
            <ListItem color={'gray.500'}>Assistance</ListItem>
            <ListItem color={'gray.500'}>Contact me</ListItem>
            <ListItem color={'gray.500'}>Support</ListItem>
          </UnorderedList>
        </Box>
        <Box>
          <Heading size={'md'}>Company</Heading>
          <UnorderedList>
            <ListItem color={'gray.500'}>About</ListItem>
            <ListItem color={'gray.500'}>Career</ListItem>
            <ListItem color={'gray.500'}>Media</ListItem>
          </UnorderedList>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
