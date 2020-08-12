import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { finalize, tap } from 'rxjs/operators';
import { VehicleDbService } from 'src/app/shared/vehicle-db.service';
import { VehicleFormService } from 'src/app/shared/vehicle-form.service';
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
  snapshot: Observable<any>;

  constructor(public automotiveDbService: VehicleDbService,
              public formService: VehicleFormService,
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

    const photoTimestamp = Date.now();

    const path = `test/${photoTimestamp}_${file.name}`;

    const ref = this.storage.ref(path);

    const task: AngularFireUploadTask  = this.storage.upload(path, file);

    const snapshot: Observable<any> = task.snapshotChanges();
    snapshot.pipe(
      tap(console.log),

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
  clearDropZone(){
    this.files = [];
  }
}
