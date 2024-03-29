import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Filter } from '../vehicle-filter/filter.model';
import { User } from '../../auth/user.model';
import { Vehicle } from './../../shared/interfaces/vehicle';
import { VehicleDbService } from '../../shared/vehicle-db.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  zeroVehicles = false;
  vehicles: Array<Vehicle> = [];
  vehicle!: Vehicle;
  showVehicle = false;
  faTrash = faTrash;
  showForAdmin = false;
  filters: Filter = {
    brand: '',
    priceLow: 0,
    highestPrice: 0,
    lowestMileage: 0,
    highestMileage: 0
  };

  deleteAlert = false;
  vehicleToDelete!: Vehicle;
  toggleDeleteAlertEvent!: Event;

  deletedMainPhotoInStorage = false;
  deletedPhotosURLs = false;
  deletedMainDocument = false;
  deletedSecondaryPhotos = false;

  errorMsg = '';
  successMsg = '';

  constructor(
    public vehicleDbService: VehicleDbService,
    private authService: AuthService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fetchAllVehicles();
    this.authService.user.subscribe(
      user => {
        if (user === {} as User) {
          return;
        }
        if (user.email !== 'kubanam1995@gmail.com') {
          return;
        }
        else {
          this.showForAdmin = true;
        }
      },
      err => {
        window.alert('Wystąpił błąd podczas wczytywania danych');
      });
  }

  filter($event: Filter) {
    this.filters.brand = $event.brand;
    this.filters.priceLow = $event.priceLow;
    this.filters.highestPrice = $event.highestPrice;
    this.filters.lowestMileage = $event.lowestMileage;
    this.filters.highestMileage = $event.highestMileage;
  }

  fetchAllVehicles() {
    this.vehicleDbService.fetchAllVehicles()
      .subscribe
      (response => {
        if (!response.length) {
          this.vehicles = [];
          this.zeroVehicles = true;
          return;
        }
        response.forEach(data => {
          const vehicle: Vehicle = data as Vehicle;
          this.vehicles.push(vehicle);
        });
        this.zeroVehicles = false;
      },
      err => {
        window.alert('Wystąpił błąd podczas wczytywania danych');
      });
  }

  toggleDeleteAlert(vehicle: Vehicle, event: Event) {
    event.preventDefault();
    if (!this.deleteAlert) {
      event.stopPropagation();
    }
    this.toggleDeleteAlertEvent = event;
    this.deleteAlert = !this.deleteAlert;
    this.vehicleToDelete = vehicle;
  }

  async deleteVehicle() {
    const vehicle = this.vehicleToDelete;
    const storagePath = vehicle.path;

    await this.vehicleDbService.deleteMainPhotoInStorage(storagePath)
      .then(res => {
        this.deletedMainPhotoInStorage = true;
      })
      .catch(err => {
        window.alert('Wystąpił błąd podczas wczytywania danych');
      });


    const collectionId = vehicle.timestamp;
    await this.vehicleDbService.deleteSecondaryPhotos(collectionId)
      .then(async querySnapshot => {
        querySnapshot.forEach(doc => {
          const path = doc.data().path;
          const storageRef = this.vehicleDbService.storage.ref(path);
          storageRef.delete();
          this.deletedSecondaryPhotos = true;
        });
      })
      .catch(err => {
        window.alert('Wystąpił błąd podczas wczytywania danych');
      });

    await this.vehicleDbService.deletePhotosURLs(collectionId)
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.vehicleDbService.db.collection(`${collectionId}`).doc(doc.id).delete()
            .then(() => {
              this.deletedPhotosURLs = true;
            })
            .catch( err => {
              window.alert('Wystąpił błąd podczas wczytywania danych');
            });
        });
      })
      .catch(error => {
        this.errorMsg = `Wystąpił błąd dotyczący serwera.`;
      });

    const documentId = `a${vehicle.timestamp}`;
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
      .catch( err => {
        window.alert('Wystąpił błąd podczas wczytywania danych');
      });
    this.toggleDeleteAlert(vehicle, this.toggleDeleteAlertEvent);
  }

  showOneVehicle(vehicle: Vehicle) {
    this.vehicle = vehicle;
    this.showVehicle = true;
  }

  hideOneVehicle() {
    this.showVehicle = false;
  }

  hideSuccessAlert() {
    this.successMsg = '';
  }

  hideErrorAlert() {
    this.errorMsg = '';
  }

  noneVehicles() {
    if (this.vehicles.length === 0) {
      this.zeroVehicles = true;
    }
  }
}
