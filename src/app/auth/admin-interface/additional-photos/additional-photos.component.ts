import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { finalize, tap } from 'rxjs/operators';
import { AutomotiveDatabaseService } from 'src/app/shared/automotive-database.service';
import { AutomotiveFormService } from 'src/app/shared/automotive-form.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-additional-photos',
  templateUrl: './additional-photos.component.html',
  styleUrls: ['./additional-photos.component.css']
})
export class AdditionalPhotosComponent implements OnInit {
  @Input()
  set inputTimestamp(inputTimestamp: string) {
    this._inputTimestamp =  `a${inputTimestamp}`;
  }
  get inputTimestamp(): string { return this._inputTimestamp; }
  _inputTimestamp = '';
  isHovering: boolean;
  files: File[] = [];
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  constructor(public automotiveDatabaseService: AutomotiveDatabaseService,
              public formService: AutomotiveFormService,
              private storage: AngularFireStorage,
              private db: AngularFirestore) { }

  ngOnInit(): void {
  }

  onRemovePhotoes(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  onSelectPhotoes(event) {
    this.files.push(...event.addedFiles);
    console.log(this.files);
  }
  pushPhotos() {
    for (const file of this.files) {
      this.startUpload(file);
    }
  }
  startUpload(file) {
    console.log(this.inputTimestamp, 'INPUCIK');
    const photoTimestamp = new Date();
    // the storage path
    const path = `test/${photoTimestamp}_${file.name}`;

    // reference to storage bucket
    const ref = this.storage.ref(path);

    // the main task
    this.task = this.storage.upload(path, file);

    // UPLOAD DATA ();
    // progress monitoring
    // this.percentage = this.task.percentageChanges();
    console.log(this.inputTimestamp);
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      // the file's download URL
      finalize(async () => {
        console.log('pierwszy raaaz 1');
        this.downloadURL = await ref.getDownloadURL().toPromise();

        // add data to cloud database
        this.db.collection(this.inputTimestamp).add(
          {
            downloadURL: this.downloadURL,
          }
        );
      })
    );
  }
}
