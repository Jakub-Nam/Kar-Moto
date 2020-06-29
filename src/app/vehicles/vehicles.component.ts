import { Component, OnInit } from '@angular/core';
import { AutomotiveDatabaseService } from '../shared/automotive-database.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: any = [];
  showVehicle = false;
  config: any;
  vehicle: [];
  faTrash = faTrash;
  hideTrash = false;
  filters = {
    brand: undefined,
    priceLow: undefined,
    highestPrice: undefined,
    lowestMileage: undefined,
    highestMileage: undefined
  };
  // save first document in snapshot of items received
  firstInResponse: any = [];

  // save last document in snapshot of items received
  lastInResponse: any = [];

  // keep the array of first document of previous pages
  prevStrtAt: any = [];

  // maintain the count of clicks on Next Prev button
  paginationClickedCount = 0;

  // disable next and prev buttons
  disableNext = true;
  disablePrev = true;
  // user = this.auth.user;
  // brandList: string[] = ['BMW', 'Honda', 'Junak', 'KAWASAKI', 'KTM', 'KYMCO', 'Suzuki', 'Romet', 'Yamaha', 'Zipp'];
  constructor(public automotiveService: AutomotiveDatabaseService, private authService: AuthService,
    // tslint:disable-next-line: align
    private route: ActivatedRoute, private router: Router, private db: AngularFirestore) {
  }

  ngOnInit(): void {
    this.fetchAutomotives();
    this.authService.user.subscribe(
      user => {
        if (user.email !== 'kubanam1995@gmail.com') { return null; }
        else { this.hideTrash = true; }
      });

  }
  // pageChange(newPage: number) {
  //   this.router.navigate(['/'], {queryParams: { page: newPage }});
  //  }
  fetchAutomotives() {
    this.automotiveService.fetchAutomotives()
      .subscribe
      (response => {
        if (!response.length) {
          console.log('No Data Available');
          return false;
        }
        this.firstInResponse = response[0];
        this.lastInResponse = response[response.length - 1];
        this.vehicles = [];
        for (const vehicle of response) {
          this.vehicles.push(vehicle);
        }

        // initialize values
        this.prevStrtAt = [];
        this.paginationClickedCount = 0;
        this.disableNext = false;
        this.disablePrev = true;

        // push first item to use for Previous action
        this.pushPrevStartAt(this.firstInResponse);
      }, error => {
        console.log(error);
      });
  }

  filtr($event) {
    // console.log($event.brand);
    this.filters.brand = $event.brand;
    this.filters.priceLow = $event.priceLow;
    this.filters.highestPrice = $event.highestPrice;
    this.filters.lowestMileage = $event.lowestMileage;
    this.filters.highestMileage = $event.highestMileage;
    // console.log($event.brand);
    // console.log(this.filters.brand, 'filter');
  }
  showOneVehicle(vehicle) {
    this.vehicle = vehicle;
    this.showVehicle = true;
  }

  hideOneVehicle($event) {
    this.showVehicle = false;
  }

  deleteVehicle(vehicle) {

    // delete main === first photo in storage firestore
    const path = vehicle.payload.doc.data().path;
    this.automotiveService.deleteMainPhotoInStorage(path)
      .delete()
      .subscribe();

    // delete all secondary photos in storage firestore
    const collectionId = vehicle.payload.doc.data().timestamp;
    this.automotiveService.deleteSecondaryPhotos(collectionId);

    // delete document in mainData collection in cloud firestore
    const documentId = vehicle.payload.doc.id;
    this.automotiveService.deleteMainDocument(documentId);

    // delete all documents in collection of photos URL
    this.automotiveService.deletePhotosURLs(collectionId);
  }

  // pagination functions below
  // add a document
  pushPrevStartAt(prevFirstDoc) {
    this.prevStrtAt.push(prevFirstDoc);
  }
  // remove non required document
  popPrevStartAt(prevFirstDoc) {
    console.log(prevFirstDoc, 'aSdasdas');
    this.prevStrtAt.forEach(element => {
      console.log(prevFirstDoc.id, 'AAAAAAAAA');
      if (prevFirstDoc.id === element.id) {
        element = null;
      }
    });
  }
  // return the Doc rem where previous page will startAt
  getPrevStartAt() {
    if (this.prevStrtAt.length > (this.paginationClickedCount + 1)) {
      this.prevStrtAt.splice(this.prevStrtAt.length - 2, this.prevStrtAt.length - 1);
    }
    return this.prevStrtAt[this.paginationClickedCount - 1];
  }
  nextPage() {
    this.disableNext = true;
    console.log('last in response - next', this.lastInResponse.payload.doc);
    this.db.collection('mainData', ref => ref
      .limit(5)
      .orderBy('timestamp', 'desc')
      .startAfter(this.lastInResponse.payload.doc))
      .snapshotChanges()
      .subscribe(
        response => {
          console.log('response', response, 'response-length', response.length);
          // if (!response.length) {
          if (!response.length) {
            console.log('No More Data Available');
            this.disableNext = true;
            return;
          }
          this.firstInResponse = response[0];
          this.lastInResponse = response[response.length - 1];

          this.vehicles = []; // emit vehicules
          for (const item of response) {
            this.vehicles.push(item);
          }
          this.paginationClickedCount++;
          this.pushPrevStartAt(this.firstInResponse);

          if (response.length < 1) {
            this.disableNext = true;
          } else {
            this.disableNext = false;
          }
          this.disablePrev = false;
          // }
        }, error => {
          this.disableNext = false;
          console.log('error', error);
        });
  }
  prevPage() {
    this.disablePrev = true;
    console.log(this.getPrevStartAt().payload.doc);
    this.db.collection('mainData', ref => ref
      .orderBy('timestamp', 'desc')
      .startAt(this.getPrevStartAt().payload.doc)
      .endBefore(this.firstInResponse.payload.doc)
      .limit(5))
      .snapshotChanges()
      .subscribe(response => {
        this.firstInResponse = response[0];
        this.lastInResponse = response[response.length - 1];

        this.vehicles = [];
        for (const vehicle of response) {
          this.vehicles.push(vehicle);
        }

        // maintaing page no.
        this.paginationClickedCount--;
        console.log('liczba', this.paginationClickedCount);

        // pop not required value in array
        this.popPrevStartAt(this.firstInResponse);

        // enable buttons again
        if (this.paginationClickedCount === 0) {
          this.disablePrev = true;
        } else {
          this.disablePrev = false;
        }
        this.disableNext = false;
      },
        error => {
          this.disablePrev = false;
        });
  }
}

