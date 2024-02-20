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
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import mainMenu from '../data/main-menu.json';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { AppState, ApplicationContext } from './context/ContextProvider';
interface NavProps {
  selectedMenu: string;
  updateState: (item: Partial<AppState>) => void;
  colorMode: string;
  toggleColorMode: (e: any) => void;
}
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
  const [isSelected, setIsSelected] = useState<boolean>(
    item.navigate === selected
  );
  useEffect(() => {
    setIsSelected(item.navigate === selected);
  }, [selected]);

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
      onClick={() => goToPageSection(item)}
      backgroundColor={isSelected ? 'green.200' : 'whiteAlpha.50'}
      borderWidth={isSelected ? '1px' : '0'}
      borderColor={'green.300'}
      color={isSelected ? 'gray.900' : ''}
      rounded={'md'}
      py={selected === item.navigate ? '2px' : 1}
      boxShadow={isSelected ? 'md' : 'sm'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('green.200', 'green.700'),
        color: 'blackAlpha.900',
        borderColor: 'blackAlpha.500',
      }}
      verticalAlign={'middle'}
      lineHeight={'2em'}
    >
      {item.title}
    </Box>
  );
};

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedMenu, updateState } = useContext(ApplicationContext);
  const [isBigScreen] = useMediaQuery('(min-width: 600px)');
  if (isBigScreen) {
    return (
      <BigScreenNav
        colorMode={colorMode}
        selectedMenu={selectedMenu}
        toggleColorMode={toggleColorMode}
        updateState={updateState}
      />
    );
  }
  return (
    <SmallScreenNav
      colorMode={colorMode}
      selectedMenu={selectedMenu}
      toggleColorMode={toggleColorMode}
      updateState={updateState}
    />
  );
}

function BigScreenNav(props: NavProps) {
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
            {mainMenu &&
              mainMenu.map((mainMenu) => (
                <NavLink
                  key={mainMenu.title}
                  item={mainMenu}
                  selected={props.selectedMenu}
                  updateState={props.updateState}
                />
              ))}
          </Flex>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={props.toggleColorMode}>
                {props.colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

function SmallScreenNav(props: NavProps) {
  return (
    <Box position="fixed" w="100%" top={0} left={0} zIndex={1000}>
      <VStack
        bg={useColorModeValue('gray.100', 'gray.900')}
        px={4}
        py={3}
        boxShadow={'md'}
      >
        <Logo />
        <Flex>
          {mainMenu &&
            mainMenu.map((mainMenu) => (
              <NavLink
                key={mainMenu.title}
                item={mainMenu}
                selected={props.selectedMenu}
                updateState={props.updateState}
              />
            ))}
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={props.toggleColorMode}>
                {props.colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </VStack>
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
