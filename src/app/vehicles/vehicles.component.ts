import { Component, OnInit } from '@angular/core';
import { VehicleDbService } from '../shared/vehicle-db.service';
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
  zeroVehiclesComponent = false;
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
  errorMsg: any;
  paginationClickedCount = 0;

  disableNext = false;
  disablePrev = true;

  constructor(
    public automotiveService: VehicleDbService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.fetchAllVehicles();
    this.authService.user.subscribe(
      user => {
        if (user === null) {
          return;
        }
        if (user.email !== 'kubanam1995@gmail.com') {
          return null;
        }
        else {
          this.hideTrash = true;
        }
      });
  }

  emptyAllVehiclesArray() {
    if (this.vehicles.length === 0) { this.zeroVehiclesComponent = true; }
  }

  fetchAllVehicles() {
    this.automotiveService.fetchAllVehicles()
      .subscribe
      (response => {
        if (!response.length) {
          this.vehicles = [];
          this.zeroVehiclesComponent = true;
          return false;
        }
        this.vehicles = response;
        this.zeroVehiclesComponent = false;
        console.log('vehicles', this.vehicles.length);
      },
        error => {
          this.errorMsg = error,
            console.log(error);
        });
  }


  nextPage() {
    if (this.paginationClickedCount >= 0) {
      this.beginSlice += 2,
        this.endSlice += 2,
        this.disablePrev = false;
    }
  }
  prevPage() {
    if (this.paginationClickedCount > 0) {
      this.beginSlice -= 2,
        this.endSlice -= 2,
        this.disableNext = false;
    }
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

    const storagePath = vehicle.payload.doc.data().path;
    this.automotiveService.deleteMainPhotoInStorage(storagePath)
      .delete()
      .subscribe();

    const collectionId = vehicle.payload.doc.data().timestamp;
    this.automotiveService.deleteSecondaryPhotos(collectionId);

    const documentId = vehicle.payload.doc.id;
    this.automotiveService.deleteMainDocument(documentId);

    this.automotiveService.deletePhotosURLs(collectionId);
  }

}
