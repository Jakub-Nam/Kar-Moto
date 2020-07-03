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
  zeroVehicles = false;
  allVehicles: any = [];
  beginSlice = 0;
  endSlice = 2;
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

  // maintain the count of clicks on Next Prev button
  paginationClickedCount = 0;

  // disable next and prev buttons
  disableNext = false;
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
    this.emptyAllVehiclesArray();

  }
  emptyAllVehiclesArray() {
    if (this.allVehicles.length === 0) { this.zeroVehicles = true; }

  }

  fetchAutomotives() {
    this.automotiveService.fetchAutomotives()
      .subscribe
      (response => {
        if (!response.length) {
          console.log('No Data Avconsoailable'); // dasz tutaj component ze brak towaru, jesli hcecie wiedziec kiedy bedzie, zalogujcie sie
          return false;
        }
        for (const vehicle of response) {
          this.allVehicles.push(vehicle);
          this.vehicles = this.allVehicles;
          // this.vehicles = this.allVehicles.slice(this.beginSlice, this.endSlice);
          console.log(vehicle);
        }
        // push first item to use for Previous action
      }, error => {
        console.log(error);
      });
  }


  nextPage() {
    if (this.paginationClickedCount >= 0) {
      this.beginSlice += 2,
        this.endSlice += 2,
        this.disablePrev = false;
    }
    this.vehicles = this.allVehicles.slice(this.beginSlice, this.endSlice);
    this.paginationClickedCount++;
    if (this.endSlice > this.allVehicles.length) { return this.disableNext = true; }


  }
  prevPage() {
    if (this.paginationClickedCount > 0) {
      this.beginSlice -= 2,
        this.endSlice -= 2,
        this.disableNext = false;
    }
    this.vehicles = this.allVehicles.slice(this.beginSlice, this.endSlice);
    this.paginationClickedCount--;
    if (this.paginationClickedCount === 0) { this.disablePrev = true, this.disableNext = false; }



  }

  filtr($event) {
    this.filters.brand = $event.brand;
    this.filters.priceLow = $event.priceLow;
    this.filters.highestPrice = $event.highestPrice;
    this.filters.lowestMileage = $event.lowestMileage;
    this.filters.highestMileage = $event.highestMileage;
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

}
