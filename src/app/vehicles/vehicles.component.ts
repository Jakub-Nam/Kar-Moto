import { Component, OnInit } from '@angular/core';
import { VehicleDbService } from '../shared/vehicle-db.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';

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
  showForAdmin = false;
  filters = {
    brand: undefined,
    priceLow: undefined,
    highestPrice: undefined,
    lowestMileage: undefined,
    highestMileage: undefined
  };
  errorMsg: any;
  paginationClickedCount = 0;

  constructor(
    public vehicleDbService: VehicleDbService,
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
          this.showForAdmin = true;
        }
      });
  }

  emptyAllVehiclesArray() {
    if (this.vehicles.length === 0) { this.zeroVehiclesComponent = true; }
  }

  fetchAllVehicles() {
    this.vehicleDbService.fetchAllVehicles()
      .subscribe
      (response => {
        if (!response.length) {
          this.vehicles = [];
          this.zeroVehiclesComponent = true;
          return false;
        }
        this.vehicles = response;
        this.zeroVehiclesComponent = false;
      },
        error => {
          this.errorMsg = error,
            console.log(error);
        });
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
    this.vehicleDbService.deleteMainPhotoInStorage(storagePath)
      .delete()
      .subscribe();

    const collectionId = vehicle.payload.doc.data().timestamp;
    this.vehicleDbService.deleteSecondaryPhotos(collectionId);

    const documentId = vehicle.payload.doc.id;
    this.vehicleDbService.deleteMainDocument(documentId);

    this.vehicleDbService.deletePhotosURLs(collectionId);
  }

}
