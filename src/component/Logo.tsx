import { Box, HStack, Icon } from '@chakra-ui/react';
import { useContext } from 'react';
import { FaShare } from 'react-icons/fa';
import { ApplicationContext } from './context/ContextProvider';
import { useNavigate } from 'react-router-dom';

export default function Logo() {
  const navigate = useNavigate();
  const { selectedMenu, updateState } = useContext(ApplicationContext);
  const handleOnClick = () => {
    updateState({ selectedMenu: '/' });
    window.scroll(0, 0);
    navigate('/');
  };
  return (
    <HStack cursor={'pointer'} onClick={handleOnClick}>
      <Icon boxSize={10} as={FaShare} />
      <HStack spacing={0} fontSize={'1.5em'} fontWeight={'bold'}>
        <Box as="span">O</Box>
        <Box as="span">-</Box>
        <Box fontWeight={'bold'} as="span" color={'green.400'}>
          Re
        </Box>
        <Box>Share</Box>
      </HStack>
    </HStack>
  );
}
