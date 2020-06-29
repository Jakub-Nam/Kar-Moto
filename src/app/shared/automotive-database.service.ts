import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AutomotiveDatabaseService {

  constructor(private storage: AngularFireStorage,
    // tslint:disable-next-line: align
    private db: AngularFirestore
    // private authService: AuthService,

  ) { }

  fetchAutomotives() {
    return this.db.collection('mainData', ref => ref
    .limit(5)
    .orderBy('timestamp', 'desc'))
    .snapshotChanges();
  }
  fetchVehiclePhotos(timestamp) {
    return this.db.collection(timestamp).snapshotChanges();
  }

  deleteMainDocument(documentId) {

    // delete document in mainData in cloud firestore
    this.db.collection('mainData').doc(documentId).delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
    console.log('its okayyy');
  }

  deletePhotosURLs(collectionId) {

    // delete data (download URLs) from cloud firestore
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
    // delete main photo from storage firestore
    const storageRef = this.storage.ref(path);
    return storageRef;
  }
  deleteSecondaryPhotos(collectionId) {
    this.db.collection(`a${collectionId}`).get().toPromise()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // usun za pomoca adresow timestamp te image xd
          const path = doc.data().path;
          const storageRef = this.storage.ref(path);
          storageRef.delete();
        });
      });
  }
}
