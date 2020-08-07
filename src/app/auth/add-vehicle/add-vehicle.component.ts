import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { VehicleDbService } from 'src/app/shared/vehicle-db.service';
import { VehicleFormService } from 'src/app/shared/vehicle-form.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { AdditionalPhotosComponent } from './additional-photos/additional-photos.component';


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
  file: File[] = [];
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  form;
  timestamp: number;
  brandList: string[] = ['BMW', 'Honda', 'Junak', 'KAWASAKI', 'KTM', 'KYMCO', 'Suzuki', 'Romet', 'Yamaha', 'Zipp'];
  errorMessage: any;

  constructor(
    public vehicleDbService: VehicleDbService,
    public formService: VehicleFormService,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    ) { }

  ngOnInit(): void {
    this.form = this.formService.automotiveForm;
  }

  onSelectPhoto(event) {
    this.file.push(...event.addedFiles);
  }

  async onSubmitPushVehicle(myForm) {
    await this.startUpload(this.file[0], myForm);
    this.file = [];
    this.additionalPhotos.clearDropZone();

  }

  onRemove(event) {
    this.file.splice(this.file.indexOf(event), 1);
  }

  startUpload(file, myForm) {

    const timestamp = Date.now();
    this.timestamp = timestamp;

    const storagePath = `test/${timestamp}_${file.name}`;


    const storageReference = this.storage.ref(storagePath);

    this.task = this.storage.upload(storagePath, file);

    this.snapshot = this.task.snapshotChanges().pipe(

      finalize(async () => {

        this.downloadURL = await storageReference.getDownloadURL().toPromise();

        await this.db.collection('mainData').add(
          {
            name: this.form.value.name,
            brand: this.form.value.brand,
            price: this.form.value.price,
            carMileage: this.form.value.carMileage,
            downloadURL: this.downloadURL,
            timestamp,
            storagePath
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
