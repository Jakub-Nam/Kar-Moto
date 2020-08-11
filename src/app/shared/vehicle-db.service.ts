import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class VehicleDbService {

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
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


  deleteMainDocument(documentId) {
    this.db.collection('mainData').doc(documentId).delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
  }

  deletePhotosURLs(collectionId) {
    this.db.collection(`a${collectionId}`).get().toPromise()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.db.collection(`a${collectionId}`).doc(doc.id).delete()
            .then(() => {
              console.log('Document successfully deleted!');
            })
            .catch(error => {
              console.error('Error removing document: ', error);
            });
        });
      });
  }

  deleteMainPhotoInStorage(path) {

    const storageRef = this.storage.ref(path);
    return storageRef;
  }

  deleteSecondaryPhotos(collectionId) {
    this.db.collection(`a${collectionId}`).get().toPromise()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const path = doc.data().path;
          const storageRef = this.storage.ref(path);
          storageRef.delete();
        });
      });
      // tslint:disable-next-line: align
    //   .catch (error => {
    //   console.error('Error removing document: ', error);
    // });
  }
}
