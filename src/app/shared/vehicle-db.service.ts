import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleDbService {

  constructor(
    public storage: AngularFireStorage,
    public db: AngularFirestore
  ) { }

  fetchProfileData() {
    return this.db.collection('profiles').doc('mainProfile')
      .valueChanges();
  }

  fetchAllVehicles() {
    return this.db.collection('vehicles', ref => ref
      .orderBy('timestamp', 'desc'))
      .snapshotChanges();
  }
  fetchMainPhoto(path: string) {
    return this.db.collection('vehicles').doc(`a${path}`).valueChanges();
  }

  // fetchAdditionalVehiclePhotos(path: string) {
  //   return this.db.collection(path)
  //     .snapshotChanges();
  // }
  fetchAdditionalVehiclePhotos(path: string) {
    return this.db.collection('vehicleAdditionalPhotos').doc(path).collection('photos')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => ({ type: a.type, payload: a.payload.doc.data() })))
      );
  }

  deleteMainPhotoInStorage(path: string) {
    return this.storage.ref(path).delete().toPromise();
  }

  deleteSecondaryPhotos(collectionId: number) {
    return this.db.collection(`${collectionId}`).get().toPromise();
  }

  deleteMainDocument(documentId: string) {
    return this.db.collection('vehicles').doc(documentId).delete();
  }

  deletePhotosURLs(collectionId: number) {
    return this.db.collection(`${collectionId}`).get().toPromise();
  }
}
