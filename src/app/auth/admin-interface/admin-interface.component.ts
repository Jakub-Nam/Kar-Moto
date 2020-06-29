import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { AutomotiveDatabaseService } from 'src/app/shared/automotive-database.service';
import { AutomotiveFormService } from 'src/app/shared/automotive-form.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { AdditionalPhotosComponent } from './additional-photos/additional-photos.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-interface',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.css']
})
export class AdminInterfaceComponent implements OnInit {
  @ViewChild('AdditionalPhotosComponent') additionalPhotos: AdditionalPhotosComponent;

  // oneFile = false;
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

  async onSubmitPushVehicle(myForm: NgForm) {
    // const file = this.file[0];
    await this.startUpload(this.file[0], myForm);
    // this.startUploadPhotoes(this.files, path);
    this.file = [];
    this.additionalPhotos.clearDropZone();

  }
  onRemove(event) {
    console.log(event);
    this.file.splice(this.file.indexOf(event), 1);
  }

  startUpload(file, myForm) {

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
        await this.db.collection('mainData').add(
          {
            name: this.form.value.name,
            brand: this.form.value.brand,
            price: this.form.value.price,
            carMileage: this.form.value.carMileage,
            downloadURL: this.downloadURL,
            timestamp, // shorthand
            path // shorthand
          });
        myForm.reset();
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
