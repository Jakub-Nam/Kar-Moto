import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireUploadTask } from '@angular/fire/storage/task';
// import {  } from '@angular/fire/storage/task';
import { AngularFireStorage} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutomotiveDatabaseService {

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore,
              // private authService: AuthService,

              ) { }
  fetchAutomotives() {
    return this.db.collection('admin').valueChanges();
  }
}

