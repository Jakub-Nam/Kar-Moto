import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { finalize, tap } from 'rxjs/operators';
import { VehicleDbService } from 'src/app/shared/vehicle-db.service';
import { VehicleFormService } from 'src/app/shared/vehicle-form.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-additional-photos',
  templateUrl: './additional-photos.component.html',
  styleUrls: ['./additional-photos.component.css']
})
export class AdditionalPhotosComponent implements OnInit {
  @Input()
  set inputTimestamp(inputTimestamp: string) {
    this._inputTimestamp = `${inputTimestamp}`;
  }
  get inputTimestamp(): string {
    return this._inputTimestamp;
  }
  _inputTimestamp = '';
  isHovering: boolean;
  files: File[] = [];
  snapshot: Observable<any>;
  errorAlert;
  file;

  imageBlob;
  compressedFiles;
  localUrl: any;
  localCompressedURl: any;
  sizeOfOriginalImage: number;
  sizeOFCompressedImage: number;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  constructor(
    public automotiveDbService: VehicleDbService,
    public formService: VehicleFormService,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private imageCompress: NgxImageCompressService
  ) { }

  ngOnInit(): void {
  }

  onRemovePhotoes(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  onSelectPhotos(event) {
    this.files.push(...event.addedFiles);
  }
  async pushPhotos() {
    await this.compressAndPushPhotos();
  }

  compressAndPushPhotos() {
    for (const file of this.files) {
      this.selectFileToCompress(file);
    }
  }
  selectFileToCompress(file) {
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev: any) => {
        this.localUrl = ev.target.result;
        this.compressFile(this.localUrl);
      };
      reader.readAsDataURL(file);
    }
  }

  compressFile(image) {
    const orientation = -1;
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
    this.imageCompress.compressFile(image, orientation, 50, 50)
      .then(
        async result => {
          this.imgResultAfterCompress = result;
          this.localCompressedURl = result;
          this.sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024);

          this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);

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
    this.startUpload(blob);
  }

  startUpload(file) {

    const photoTimestamp = Date.now();

    const path = `test/${photoTimestamp}_${file.name}`;

    const ref = this.storage.ref(path);

    const task: AngularFireUploadTask = this.storage.upload(path, file);

    const snapshot: Observable<any> = task.snapshotChanges();
    snapshot.pipe(
      finalize(async () => {
        const downloadURL = await ref.getDownloadURL().toPromise();

        this.db.collection(this.inputTimestamp).add(
          {
            downloadURL,
            path
          }
        );
      })
    ).subscribe();
  }
  clearDropZone() {
    this.files = [];
  }

}
