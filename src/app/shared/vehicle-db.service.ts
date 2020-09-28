import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Vehicle } from '../vehicles/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleDbService {

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
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
  // fetchMainPhoto(path: string) {
  //   return this.db.collection('vehicles').doc(`a${path}`).valueChanges();
  // }
  fetchAdditionalVehiclePhotos(path: string) {
    return this.db.collection(path)
      .snapshotChanges();
  }

  deleteMainPhotoInStorage(path: string) {
    return this.storage.ref(path).delete().toPromise();
  }

  deleteSecondaryPhotos(collectionId: number) {
    return this.db.collection(`${collectionId}`).get().toPromise();
  }

  deleteMainDocument(documentId: string) {
    return this.db.collection('mainData').doc(documentId).delete();
  }

  deletePhotosURLs(collectionId: number) {
    return this.db.collection(`${collectionId}`).get().toPromise();
  }
}
