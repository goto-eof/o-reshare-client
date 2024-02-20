import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import FileGroupMetadataBox from './FileGroupMetadataBox';
import FileGroupMetadataDTO from '../dto/FileGroupMetadataDTO';
import { useContext, useEffect, useRef, useState } from 'react';
import FileService from '../service/FileService';
import { FaDownload } from 'react-icons/fa';
import SectionHeader from './SectionHeader';
import { ApplicationContext } from './context/ContextProvider';

export default function () {
  const { groupId } = useParams();
  const [fileGroupMetadataDTO, setFileGroupMetadataDTO] =
    useState<FileGroupMetadataDTO>();
  const groupIdRef = useRef<HTMLInputElement>(null);
  const [isGroupIdError, setIsGroupIdError] = useState<boolean>(false);

  const { selectedMenu, updateState } = useContext(ApplicationContext);

  useEffect(() => {
    updateState({ selectedMenu: '/download' });

    setFileGroupMetadataDTO(undefined);
    loadMetadata();
  }, [groupId]);

  const loadMetadata = async () => {
    if (groupId) {
      setFileGroupMetadataDTO(
        await FileService.getGroupMetadata(Number(groupId))
      );
    }
  };
  const navigate = useNavigate();
  const handleGoToDownloadGroupPage = () => {
    const groupId = groupIdRef.current?.value;
    if (groupId) {
      navigate(`/download/${groupId}`);
      setIsGroupIdError(false);
    } else {
      setIsGroupIdError(true);
    }
  };

  return (
    <Container minH={'99vh'} pt={'20vh'}>
      <SectionHeader title={'Download'} icon={FaDownload}>
        Please insert bellow the id of the set of files that you want do
        download or paste the provided link in the address bar. Files will be
        downloaded from the server and then decrypted on the client side. If the
        password matches, then you will be able to open the files.
      </SectionHeader>
      {!groupId && (
        <FormControl>
          <FormLabel htmlFor="groupId">File group ID</FormLabel>
          <InputGroup size="md">
            <VStack width={'full'}>
              <Input size={'lg'} type="number" id="groupId" ref={groupIdRef} />
              <InputRightElement mt={1} width="5.5rem">
                <Button
                  size="lg"
                  variant={'outline'}
                  color={'green'}
                  onClick={handleGoToDownloadGroupPage}
                >
                  Submit
                </Button>
              </InputRightElement>
              {isGroupIdError && (
                <Text color={'red'} textAlign={'left'} fontSize={'0.7em'}>
                  Please insert the group ID in order to be able to proceed
                </Text>
              )}
            </VStack>
          </InputGroup>
        </FormControl>
      )}
      {fileGroupMetadataDTO && (
        <FileGroupMetadataBox fileGroupMetadataDTO={fileGroupMetadataDTO} />
      )}
    </Container>
  );
}
