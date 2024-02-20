import FileMetadataDTO from './FileMetadataDTO';

export default interface FileGroupMetadataDTO {
  id: number;
  description: string;
  createdDate: Date;
  fileMetadataDTOList: Array<FileMetadataDTO>;
}
