import { Component, OnInit, ViewChild } from '@angular/core';
import { AutomotiveDatabaseService } from 'src/app/shared/automotive-database.service';
import { AutomotiveFormService } from 'src/app/shared/automotive-form.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { AdditionalPhotosComponent } from './additional-photos/additional-photos.component';

@Component({
  selector: 'app-admin-interface',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.css']
})
export class AdminInterfaceComponent implements OnInit {
  @ViewChild('AdditionalPhotosComponent') additionalPhotos: AdditionalPhotosComponent;
  oneFile = false;
  isHovering: boolean;
  file: File[] = [];

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  form;
  timestamp: number;
  constructor(public automotiveDatabaseService: AutomotiveDatabaseService,
              public formService: AutomotiveFormService,
              private storage: AngularFireStorage,
              private db: AngularFirestore) { }

  ngOnInit(): void {
    this.form = this.formService.automotiveForm;
  }

  onSelectPhoto(event) {
    this.file.push(...event.addedFiles);
  }

  onSubmitPushVehicle() {
    const file = this.file[0];
    this.startUpload(file);
    // this.startUploadPhotoes(this.files, path);
  }
  onRemove(event) {
    console.log(event);
    this.file.splice(this.file.indexOf(event), 1);
  }

  startUpload(file) {

    const timestamp = Date.now();
    this.timestamp = timestamp;

    // the storage path
    const path = `test/${timestamp}_${file.name}`;

    // reference to storage bucket
    const ref = this.storage.ref(path);

    // the main task
    this.task = this.storage.upload(path, file);

    // progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      // the file's download URL
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();

        // add data to cloud database
        this.db.collection('mainData').add(
          {
            name: this.form.value.name,
            brand: this.form.value.brand,
            price: this.form.value.price,
            carMileage: this.form.value.carMileage,
            downloadURL: this.downloadURL,
            timestamp, // shorthand
            path // shorthand
          }
        );
      })
    );
    this.additionalPhotos.pushPhotos();
  }
}

 // @Input()
  // set inputTimestamp(inputTimestamp: number) {
  //   this.inputTimestamp =  inputTimestamp;
  // }
  // get inputTimestamp(): number { return this.inputTimestamp; }
