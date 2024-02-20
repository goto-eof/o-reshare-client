import { Button, Card, CardBody, Flex, Text } from '@chakra-ui/react';
import FileMetadataDTO from '../dto/FileMetadataDTO';

export default function FileComponent({
  file,
  downloadFile,
}: {
  file: FileMetadataDTO;
  downloadFile: (file: FileMetadataDTO) => Promise<void>;
}) {
  return (
    <Card my={2}>
      <CardBody>
        <Flex justifyContent={'space-between'}>
          <Text>{file.filename}</Text>
          <Button colorScheme="blue" onClick={() => downloadFile(file)}>
            Download
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
}
