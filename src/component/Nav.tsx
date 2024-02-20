import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import MainMenu from '../data/main-menu.json';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { AppState, ApplicationContext } from './context/ContextProvider';

const NavLink = ({
  item,
  selected,
  updateState,
}: {
  item: any;
  selected: string;
  updateState: (item: Partial<AppState>) => void;
}) => {
  const navigate = useNavigate();

  const goToPageSection = (item: any) => {
    updateState({ selectedMenu: item.navigate });
    navigate(item.navigate);
    window.scroll(0, 0);
  };

  return (
    <Box
      cursor={'pointer'}
      px={3}
      mx={2}
      py={1}
      // fontWeight={'bold'}
      onClick={() => goToPageSection(item)}
      backgroundColor={
        selected === item.navigate ? 'green.200' : 'whiteAlpha.50'
      }
      borderWidth={selected === item.navigate ? '1px' : '0'}
      borderColor={'green.300'}
      color={selected === item.navigate ? 'gray.900' : ''}
      // textShadow=" #000000 0px 0 1px;"
      rounded={'md'}
      boxShadow={'sm'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
        colo: 'whiteAlpha.50',
      }}
    >
      {item.title}
    </Box>
  );
};

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMainMenuItem, setSelectedMainMenuItem] = useState<any>(
    MainMenu[0]
  );

  const { selectedMenu, updateState } = useContext(ApplicationContext);

  return (
    <Box position="fixed" w="100%" top={0} left={0} zIndex={1000}>
      <Box
        bg={useColorModeValue('gray.100', 'gray.900')}
        px={4}
        boxShadow={'md'}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Logo />
          <Flex>
            {MainMenu &&
              MainMenu.map((mainMenu) => (
                <NavLink
                  key={mainMenu.title}
                  item={mainMenu}
                  selected={selectedMenu}
                  updateState={updateState}
                />
              ))}
            {/* <Button
              ml={4}
              size="sm"
              leftIcon={<FaUser />}
              variant="solid"
              colorScheme="blue"
            >
              Contact Me
            </Button> */}
            {/* <ButtonGroup
              ml={8}
              colorScheme="blue"
              size="sm"
              isAttached
              variant={'outline'}
            >
              <IconButton aria-label="Add to friends" icon={<FaUser />} />
              <Button fontWeight={'bold'} mr="-px">
                Contact me
              </Button>
            </ButtonGroup> */}
          </Flex>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

function UserMenu() {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={'full'}
        variant={'link'}
        cursor={'pointer'}
        minW={0}
      >
        <Avatar
          size={'sm'}
          src={'https://avatars.dicebear.com/api/male/username.svg'}
        />
      </MenuButton>
      <MenuList alignItems={'center'}>
        <br />
        <Center>
          <Avatar
            size={'2xl'}
            src={'https://avatars.dicebear.com/api/male/username.svg'}
          />
        </Center>
        <br />
        <Center>
          <p>Username</p>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem>Your Servers</MenuItem>
        <MenuItem>Account Settings</MenuItem>
        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}
