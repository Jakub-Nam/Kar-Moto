import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { VehicleDbService } from 'src/app/shared/vehicle-db.service';
import { VehicleFormService } from 'src/app/shared/vehicle-form.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { AdditionalPhotosComponent } from './additional-photos/additional-photos.component';
import { NgxImageCompressService } from 'ngx-image-compress';


@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  @ViewChild('AdditionalPhotosComponent') additionalPhotos: AdditionalPhotosComponent;
  vehicleWasSent = false;
  error;
  oneFile = false;
  isHovering: boolean;

  file: File[];
  compressedFile: any;

  task: AngularFireUploadTask;
  snapshot: Observable<any>;
  downloadURL: string;
  form;
  timestamp: number;
  brandList: string[] = ['BMW', 'Honda', 'Junak', 'KAWASAKI', 'KTM', 'KYMCO', 'Suzuki', 'Romet', 'Yamaha', 'Zipp'];
  errorMessage: any;

  localUrl: any;
  localCompressedURl: any;
  sizeOfOriginalImage: number;
  sizeOFCompressedImage: number;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;

  constructor(
    public vehicleDbService: VehicleDbService,
    public formService: VehicleFormService,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private imageCompress: NgxImageCompressService
  ) { }

  ngOnInit(): void {
    this.form = this.formService.automotiveForm;
  }

  onSelectPhoto(event) {
    this.file = event.addedFiles;
    this.selectFile();
  }


  selectFile() {
    if (this.file && this.file[0]) {
      const reader = new FileReader();
      reader.onload = (ev: any) => {
        this.localUrl = ev.target.result;
        this.compressFile(this.localUrl);
      };
      reader.readAsDataURL(this.file[0]);
    }
  }

  async compressFile(image) {
    const orientation = -1;
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
    this.imageCompress.compressFile(image, orientation, 50, 50)
      .then(
        async result => {
          this.imgResultAfterCompress = result;
          this.localCompressedURl = result;
          this.sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024);
          const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
          this.compressedFile = imageBlob;
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
    return blob;
  }



  async onSubmitPushVehicle(myForm) {
    await this.startUpload(this.compressedFile, myForm);
    this.file = [];
    this.additionalPhotos.clearDropZone();

  }

  onRemove(event) {
    this.file.splice(this.file.indexOf(event), 1);
  }

  startUpload(file, myForm) {

    const timestamp = Date.now();
    this.timestamp = timestamp;

    const path = `test/${timestamp}_${file.name}`;

    const ref = this.storage.ref(path);

    this.task = this.storage.upload(path, file);

    this.snapshot = this.task.snapshotChanges().pipe(

      finalize(async () => {

        this.downloadURL = await ref.getDownloadURL().toPromise();

        await this.db.collection('mainData').add(
          {
            name: this.form.value.name,
            brand: this.form.value.brand,
            price: this.form.value.price,
            carMileage: this.form.value.carMileage,
            downloadURL: this.downloadURL,
            timestamp,
            path
          });
        myForm.reset();
        this.vehicleWasSent = true;
      }),
      catchError(err => {
        this.errorMessage = err;
        return throwError(this.errorMessage);
      }),
    );
    this.additionalPhotos.pushPhotos();
  }

  hideVehicleWasSentAlert() {
    this.vehicleWasSent = false;
  }

  hideErrorAlert() {
    this.error = null;
  }
}
