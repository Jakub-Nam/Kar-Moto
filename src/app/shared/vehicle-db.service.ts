import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class VehicleDbService {

  constructor(
    public storage: AngularFireStorage,
    public db: AngularFirestore
  ) { }

  fetchProfileData() {
    return this.db.collection('mainData').doc('profileData')
      .valueChanges();
  }

  fetchAllVehicles() {
    return this.db.collection('mainData', ref => ref
      .orderBy('timestamp', 'desc'))
      .snapshotChanges();
  }

  fetchAdditionalVehiclePhotos(timestamp) {
    return this.db.collection(timestamp)
      .snapshotChanges();
  }

  deleteMainPhotoInStorage(path) {
    return this.storage.ref(path).delete().toPromise();
  }

  deleteSecondaryPhotos(collectionId) {
    return this.db.collection(`a${collectionId}`).get().toPromise();
  }

  deleteMainDocument(documentId) {
    return this.db.collection('mainData').doc(documentId).delete();
  }

  deletePhotosURLs(collectionId) {
    return this.db.collection(`a${collectionId}`).get().toPromise();
  }
}
