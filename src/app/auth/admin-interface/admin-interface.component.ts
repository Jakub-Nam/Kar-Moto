import { Component, OnInit } from '@angular/core';
import { AutomotiveDatabaseService } from 'src/app/shared/automotive-database.service';
import { AutomotiveFormService } from 'src/app/shared/automotive-form.service';
import { AngularFireStorage, createUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireUploadTask } from '@angular/fire/storage';
import { Observable, from } from 'rxjs';
import { tap, finalize, switchMap, timestamp } from 'rxjs/operators';


@Component({
  selector: 'app-admin-interface',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.css']
})
export class AdminInterfaceComponent implements OnInit {
  oneFile = false;
  isHovering: boolean;
  file: File[] = [];
  files: File[] = [];
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  form;
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
  onSelectPhotoes(event) {
    this.files.push(...event.addedFiles);
    console.log(this.files);
  }

  onSubmitPushVehicle() {
    const file = this.file[0];
    // the storage path
    const path = `test/${Date.now()}_${file.name}`;
    this.startUpload(file, path);
  }
  onRemove(event) {
    console.log(event);
    this.file.splice(this.file.indexOf(event), 1);
  }

  startUpload(file, path) {

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
        this.db.collection('admin').add(
          {
            name: this.form.value.name,
            brand: this.form.value.brand,
            price: this.form.value.price,
            carMileage: this.form.value.carMileage,
            downloadURL: this.downloadURL,
            timestamp: new Date()
          }
        );
      })
    );
  }
}
