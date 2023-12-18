import { Pipe, type PipeTransform } from '@angular/core';
import { FileService } from 'src/app/core/services/common/file.service';

@Pipe({
  name: 'blobToB64',
  standalone: true,
})
export class BlobToBase64Pipe implements PipeTransform {

  constructor(private fileSvc: FileService) { }

  transform(blob: Blob | File | null, prefix?: string): Promise<string> {
    if (blob) {
      return this.fileSvc.blobToB64(blob as Blob, prefix);
    } else {
      return new Promise((resolve) => resolve(''));
    }
  }

}
