import CryptoJS from 'crypto-js';
export default class EncryptionService {
  public static async encrypt(file: File, password: string): Promise<string> {
    var reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = (e) => {
        if (reader.result != null) {
          const res = e.target!.result! as ArrayBuffer;
          var wordArray = CryptoJS.lib.WordArray.create(res);
          var encrypted = CryptoJS.AES.encrypt(wordArray, password).toString();
          resolve(encrypted);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }

  public static async decrypt(
    file: File,
    password: string
  ): Promise<Uint8Array> {
    var reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = (e) => {
        if (reader.result != null) {
          const res = e.target!.result! as ArrayBuffer;
          var string = new TextDecoder().decode(res);
          var decrypted = CryptoJS.AES.decrypt(string, password);
          resolve(EncryptionService.convertWordArrayToUint8Array(decrypted));
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }

  public static convertWordArrayToUint8Array(wordArray: any) {
    var len = wordArray.words.length,
      u8_array = new Uint8Array(len << 2),
      offset = 0,
      word,
      i;
    for (i = 0; i < len; i++) {
      word = wordArray.words[i];
      u8_array[offset++] = word >> 24;
      u8_array[offset++] = (word >> 16) & 0xff;
      u8_array[offset++] = (word >> 8) & 0xff;
      u8_array[offset++] = word & 0xff;
    }
    return u8_array;
  }
}
