import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  blobToFile(theBlob: Blob, fileName: string): File {
    const b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName;
    return (theBlob as File);
  }

  blobToB64(blob: Blob, prefix?: string): Promise<string> { // 'data:image/jpeg;base64,'
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const tmpBase64 = String(reader.result);
        resolve((prefix ?? '') + tmpBase64.substring(tmpBase64.indexOf(',') + 1));
      };
      reader.readAsDataURL(blob);
    });
  }
  constructor() { }
}
