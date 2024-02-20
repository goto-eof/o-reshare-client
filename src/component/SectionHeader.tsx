import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Icon,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { useNavigate } from 'react-router-dom';

export default function SectionHeader({
  title,
  children,
  icon,
}: {
  title: string;
  children?: React.ReactNode;
  icon?: IconType;
}) {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };
  return (
    <Card my={3}>
      <CardBody>
        <Flex alignContent={'space-between'}>
          {/* <IconButton
            mr={3}
            colorScheme="green"
            aria-label="go back"
            onClick={goToHome}
            icon={<Icon as={FaArrowAltCircleLeft} />}
          /> */}
          <Heading width={'full'} color={'gray.500'} textAlign={'center'}>
            <Icon as={icon} mr={2} />
            {title}
          </Heading>
        </Flex>
      </CardBody>
      <CardFooter color={'gray.500'}>{children}</CardFooter>
    </Card>
  );
}
