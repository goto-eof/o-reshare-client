import axios from 'axios';
import FileGroupMetadataDTO from '../dto/FileGroupMetadataDTO';
const BASE_URL = `http://localhost:8081`;
const BASE_API_URL = `${BASE_URL}/api/v1/fileGroup`;

export default class FileService {
  public static async uploadForm(
    formData: FormData
  ): Promise<FileGroupMetadataDTO> {
    return (
      await axios.post<FileGroupMetadataDTO>(`${BASE_API_URL}/upload`, formData)
    ).data;
  }

  public static async getGroupMetadata(
    groupId: number
  ): Promise<FileGroupMetadataDTO> {
    return (
      await axios.get<FileGroupMetadataDTO>(`${BASE_API_URL}/id/${groupId}`)
    ).data;
  }

  public static async downloadFile(fileId: number): Promise<any> {
    return (
      await axios.get(`${BASE_API_URL}/download/fileId/${fileId}`, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      })
    ).data;
  }
}
