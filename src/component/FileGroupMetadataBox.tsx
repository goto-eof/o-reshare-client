import {
  Box,
  Button,
  Card,
  CardBody,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Tag,
  Text,
} from '@chakra-ui/react';
import FileGroupMetadataDTO from '../dto/FileGroupMetadataDTO';
import FileComponent from './FileComponent';
import EncryptionService from '../service/EncryptionService';
import FileService from '../service/FileService';
import FileMetadataDTO from '../dto/FileMetadataDTO';
import { useRef, useState } from 'react';

export default function FileGroupMetadataBox({
  fileGroupMetadataDTO,
}: {
  fileGroupMetadataDTO: FileGroupMetadataDTO;
}) {
  const [password, setPassword] = useState<string>('');
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isPasswordFieldDisabled, setIsPasswordFieldDisabled] =
    useState<boolean>();

  const downloadFile = async (file: FileMetadataDTO) => {
    const bytes = await FileService.downloadFile(file.id);

    const newFile: File = new File([bytes], file.filename, {
      type: 'application/octet-stream',
    });

    const decrypted = await new EncryptionService().decrypt(
      newFile,
      passwordRef.current!.value
    );
    const fileBlob = new Blob([decrypted], {
      type: 'application/octet-stream',
    });
    const downloadUrl = URL.createObjectURL(fileBlob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = file.filename;
    link.click();
    URL.revokeObjectURL(downloadUrl);
  };

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmitPassword = (e: any) => {
    if (isPasswordFieldDisabled) {
      setIsPasswordFieldDisabled(false);
      return;
    }
    setIsPasswordFieldDisabled(true);
  };

  return (
    <Box>
      {fileGroupMetadataDTO.description && (
        <Card>
          <CardBody>
            <HStack>
              <Tag>{fileGroupMetadataDTO.id}</Tag>
              <Text>{fileGroupMetadataDTO.description}</Text>
            </HStack>
          </CardBody>
        </Card>
      )}
      <FormLabel htmlFor="password">Password</FormLabel>
      <InputGroup>
        <Input
          size={'lg'}
          type="password"
          name="password"
          id="password"
          ref={passwordRef}
          onChange={handleChangePassword}
          readOnly={isPasswordFieldDisabled}
          bgColor={isPasswordFieldDisabled ? 'blackAlpha.100' : ''}
        />
        <InputRightElement mt={1} width="5.5rem">
          <Button
            colorScheme={isPasswordFieldDisabled ? 'green' : 'blue'}
            size="lg"
            onClick={handleSubmitPassword}
            variant={'outline'}
          >
            {isPasswordFieldDisabled ? 'Change' : 'Submit'}
          </Button>
        </InputRightElement>
      </InputGroup>
      {isPasswordFieldDisabled && fileGroupMetadataDTO.fileMetadataDTOList && (
        <Box mt={10}>
          {fileGroupMetadataDTO.fileMetadataDTOList.map((file) => (
            <FileComponent
              downloadFile={downloadFile}
              key={`meta_file_${fileGroupMetadataDTO.id}_${file.id}`}
              file={file}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
