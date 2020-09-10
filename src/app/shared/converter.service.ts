import { Injectable } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  localCompressedURl: any;
  sizeOfOriginalImage: number;
  sizeOFCompressedImage: number;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  imageBlob: Blob;
  constructor(private imageCompress: NgxImageCompressService) { }


  compressFile(image) {
    const orientation = -1;
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
    console.warn('Size in bytes is now:', this.sizeOfOriginalImage);
    return this.imageCompress.compressFile(image, orientation, 50, 50)
      .then(
        result => {
          this.imgResultAfterCompress = result;
          this.localCompressedURl = result;
          this.sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024);
          console.warn('Size in bytes after compression:', this.sizeOFCompressedImage);
          // return this.imageBlob = 
          const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
          // this.compressedFile = imageBlob;
        });

  }
  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    this.imageBlob = blob;
    return blob;
  }
}
