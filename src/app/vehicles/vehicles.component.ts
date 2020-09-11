import { Component, OnInit } from '@angular/core';
import { VehicleDbService } from '../shared/vehicle-db.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';
import { Filter } from './filter';



@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  zeroVehiclesComponent = false;
  vehicles: any = [];
  showVehicle = false;
  vehicle: [];
  faTrash = faTrash;
  showForAdmin = false;
  filters: Filter = {
    brand: undefined,
    priceLow: undefined,
    highestPrice: undefined,
    lowestMileage: undefined,
    highestMileage: undefined
  };

  deleteAlert = false;
  vehicleToDelete;
  toggleDeleteAlertEvent: Event;

  deletedMainPhotoInStorage = false;
  deletedPhotosURLs = false;
  deletedMainDocument = false;
  deletedSecondaryPhotos = false;

  errorMsg: string;
  successMsg: string;

  constructor(
    public vehicleDbService: VehicleDbService,
    private authService: AuthService
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
      },
      error => {
        this.errorMsg = `Nie udało się załadować danych.`;
      });
  }

  noneVehicles() {
    if (this.vehicles.length === 0) {
      this.zeroVehiclesComponent = true;
    }
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
          this.errorMsg = `Wystąpił błąd dotyczący serwera.`;
        });
  }

  filtr($event) {
    this.filters.brand = $event.brand;
    this.filters.priceLow = $event.priceLow;
    this.filters.highestPrice = $event.highestPrice;
    this.filters.lowestMileage = $event.lowestMileage;
    this.filters.highestMileage = $event.highestMileage;
  }

  toggleDeleteAlert(vehicle, event) {
    if (!this.deleteAlert) {
      event.stopPropagation();
    }
    this.toggleDeleteAlertEvent = event;
    this.deleteAlert = !this.deleteAlert;
    this.vehicleToDelete = vehicle;
  }

  async deleteVehicle() {
    const vehicle = this.vehicleToDelete;
    const storagePath = vehicle.payload.doc.data().path;

    await this.vehicleDbService.deleteMainPhotoInStorage(storagePath)
      .then(res => {
        this.deletedMainPhotoInStorage = true;
      })
      .catch(err => {
        this.errorMsg = `Wystąpił błąd dotyczący serwera.`;
      });


    const collectionId = vehicle.payload.doc.data().timestamp;
    await this.vehicleDbService.deleteSecondaryPhotos(collectionId)
      .then(async querySnapshot => {
        querySnapshot.forEach(doc => {
          const path = doc.data().path;
          const storageRef = this.vehicleDbService.storage.ref(path);
          storageRef.delete();

          this.deletedSecondaryPhotos = true;
        });
      })
      .catch(error => {
        this.errorMsg = `Wystąpił błąd dotyczący serwera.`;
      });

    await this.vehicleDbService.deletePhotosURLs(collectionId)
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.vehicleDbService.db.collection(`${collectionId}`).doc(doc.id).delete()
            .then(() => {
              this.deletedPhotosURLs = true;
            })
            .catch(error => {
              this.errorMsg = `Wystąpił błąd dotyczący serwera.`;
            });
        });
      })
      .catch(error => {
        this.errorMsg = `Wystąpił błąd dotyczący serwera.`;
      });

    const documentId = vehicle.payload.doc.id;
    await this.vehicleDbService.deleteMainDocument(documentId)
      .then(() => {
        this.deletedMainDocument = true;
        if (
          this.deletedMainPhotoInStorage === true &&
          this.deletedSecondaryPhotos === true &&
          this.deletedMainDocument === true &&
          this.deletedPhotosURLs === true
        ) {
          this.successMsg = `Poprawnie usunięto obiekt.`;
        }
      })
      .catch(error => {
        this.errorMsg = `Wystąpił błąd dotyczący serwera.`;
      });
    this.toggleDeleteAlert(vehicle, this.toggleDeleteAlertEvent);
  }

  showOneVehicle(vehicle) {
    this.vehicle = vehicle;
    this.showVehicle = true;
  }

  hideOneVehicle() {
    this.showVehicle = false;
  }

  hideSuccessAlert() {
    this.successMsg = null;
  }

  hideErrorAlert() {
    this.errorMsg = null;
  }
}
