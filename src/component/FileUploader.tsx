import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ChangeEvent, useRef, useState } from 'react';
import FileGroupMetadataDTO from '../dto/FileGroupMetadataDTO';
import FileService from '../service/FileService';
import EncryptionService from '../service/EncryptionService';
import SectionHeader from './SectionHeader';
import { FaUpload } from 'react-icons/fa';

export default function FileUploader() {
  const [files, setFiles] = useState<Array<File>>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const filesRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const [isPasswordError, setIsPasswordError] = useState<boolean>();
  const [fileGroupMetadataDTO, setFileGroupMetadataDTO] =
    useState<FileGroupMetadataDTO>();
  const [isFilesError, setIsFilesError] = useState<boolean>();

  const submitForm = async (e: any) => {
    e.preventDefault();
    if (!passwordRef.current?.value) {
      setIsPasswordError(true);
      return;
    } else {
      setIsPasswordError(false);
    }
    console.log(files);
    if (!files || files.length === 0) {
      setIsFilesError(true);
      return;
    } else {
      setIsFilesError(false);
    }
    const formData = new FormData();
    for (let element of files) {
      const enc = await new EncryptionService().encrypt(
        element,
        passwordRef.current!.value
      );
      const newFile: File = new File([enc], element.name, {
        type: element.type,
      });
      formData.append(element.name, newFile);
    }
    if (descriptionRef.current?.value) {
      formData.append('description', descriptionRef.current?.value);
    }
    formRef.current?.reset();
    setFiles([]);
    const fileGroupMetadataDTO = await FileService.uploadForm(formData);
    setFileGroupMetadataDTO(fileGroupMetadataDTO);
  };

  const selectFiles = ({
    currentTarget: { files: fileList },
  }: ChangeEvent<HTMLInputElement>) => {
    const length = fileList?.length || 0;
    for (let i = 0; i < length; i++) {
      setFiles((oldFiles) => [...oldFiles, fileList![i]]);
    }
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(urlRef.current!.value);
  };

  const selectFile = () => {
    filesRef.current?.click();
  };

  const resetForm = () => {
    formRef.current?.reset();
    setFiles([]);
    setFileGroupMetadataDTO(undefined);
  };

  return (
    <Container minH={'99vh'} mt={'20vh'}>
      <SectionHeader title={'Upload'} icon={FaUpload}>
        <Stack direction={'row'}>
          <Text>
            Select one or more files, fill the password input field and upload
            them. At the end of the procedure will be provided the link of
            uploaded files. In this way you can provide that link to another
            user that will download those files. I want to remind you that the
            files are encrypted on the client side, so that if you lose your
            password, then those file will be not recoverable.
          </Text>
        </Stack>
      </SectionHeader>
      <Box my={10}>
        {fileGroupMetadataDTO && (
          <Box>
            <FormLabel htmlFor="download-link">Download Link</FormLabel>

            <InputGroup>
              <Input
                size={'lg'}
                backgroundColor={'blackAlpha.100'}
                ref={urlRef}
                type="text"
                value={`http://localhost:3000/#download/${fileGroupMetadataDTO.id}`}
                readOnly
                pr="4.5rem"
                placeholder="Link"
              />
              <InputRightElement mt={1} width="5.5rem">
                <Button
                  colorScheme="blue"
                  variant={'outline'}
                  size="lg"
                  onClick={copyToClipboard}
                >
                  Copy
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        )}

        {!fileGroupMetadataDTO && (
          <form onSubmit={submitForm} ref={formRef}>
            <FormControl my={2}>
              <FormLabel htmlFor="file">
                File
                <Input
                  size={'lg'}
                  type="file"
                  onChange={selectFiles}
                  id="file"
                  name="file"
                  multiple={true}
                  ref={filesRef}
                  display={'none'}
                />
              </FormLabel>
              <Button
                variant={'outline'}
                onClick={selectFile}
                colorScheme="blue"
                w={'full'}
              >
                Select one or more files
              </Button>
              {isFilesError && (
                <Text color={'red'} textAlign={'left'} fontSize={'0.7em'}>
                  Choose at least one file
                </Text>
              )}
            </FormControl>
            {files &&
              files.map((file) => (
                <ShortFileInfo key={file.name} file={file} />
              ))}
            <SimpleGrid mt={5} columns={{ base: 1, md: 2 }} spacingX={5}>
              <FormControl my={2}>
                <FormLabel htmlFor="description">
                  Write down a Description
                </FormLabel>
                <Input
                  type="text"
                  size={'lg'}
                  ref={descriptionRef}
                  name="description"
                  id="description"
                />
              </FormControl>
              <FormControl my={2}>
                <FormLabel htmlFor="password">
                  Fill the Password filed
                </FormLabel>
                <Input
                  isInvalid={isPasswordError}
                  type="password"
                  size={'lg'}
                  name="password"
                  id="password"
                  ref={passwordRef}
                />
                {isPasswordError && (
                  <Text color={'red'} textAlign={'left'} fontSize={'0.7em'}>
                    Choose a password
                  </Text>
                )}
              </FormControl>
            </SimpleGrid>
            <HStack my={5} justifyContent={'space-between'}>
              <Button
                variant={'outline'}
                colorScheme="red"
                width={'18%'}
                onClick={resetForm}
              >
                Reset
              </Button>
              <Button
                variant={'outline'}
                colorScheme="green"
                width={'80%'}
                type="submit"
              >
                Upload
              </Button>
            </HStack>
          </form>
        )}
      </Box>
    </Container>
  );
}

function ShortFileInfo({ file }: { file: File }) {
  return (
    <Card px={3} textAlign={'left'} my={2} fontSize={'0.7em'}>
      {file.name}
    </Card>
  );
}
