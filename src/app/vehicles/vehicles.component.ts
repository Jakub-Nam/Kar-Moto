import { Component, OnInit } from '@angular/core';
import { AutomotiveDatabaseService } from '../shared/automotive-database.service';
// import * as _ from 'lodash';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: any;
  showVehicle = false;
  vehicle;
  faTrash = faTrash;
  filters = {
    brand: undefined,
    priceLow: undefined,
    highestPrice: undefined,
    lowestMileage: undefined,
    highestMileage: undefined
  };

  // brandList: string[] = ['BMW', 'Honda', 'Junak', 'KAWASAKI', 'KTM', 'KYMCO', 'Suzuki', 'Romet', 'Yamaha', 'Zipp'];
  constructor(public automotiveService: AutomotiveDatabaseService) { }

  ngOnInit(): void {
    this.fetchAutomotives();
  }
  fetchAutomotives() {
    this.automotiveService.fetchAutomotives().subscribe(
      next => {
        this.vehicles = next;
        // this.applyFilters();
      });
  }
  function($event) {
    // console.log($event.brand, 'LAOAASLASL');
    this.filters.brand = $event.brand;
    this.filters.priceLow = $event.priceLow;
    this.filters.highestPrice = $event.highestPrice;
    this.filters.lowestMileage = $event.lowestMileage;
    this.filters.highestMileage = $event.highestMileage;
    // console.log($event);
  }
  showOneVehicle(vehicle) {
    this.vehicle = vehicle;
    this.showVehicle = !this.showVehicle;
    console.log(vehicle);
  }
  deleteVehicle(vehicle) {
    // console.log(vehicle.doc.data().downloadURL);

    // delete main === first photo in storage firestore
    const path = `${vehicle.doc.data().path}`;
    this.automotiveService.deleteMainPhotoInStorage(path)
      .delete()
      .subscribe();

    // delete all secondary photos in storage firestore
    const collectionId = vehicle.doc.data().timestamp;
    this.automotiveService.deleteSecondaryPhotos(collectionId);

    // delete document in mainData collection in cloud firestore
    const mainData = 'mainData';
    this.automotiveService.deleteMainDocument(mainData, vehicle.doc.id);

    // delete all documents in collection of photos URL
    // const collectionId = vehicle.doc.data().timestamp;
    this.automotiveService.deletePhotosURLs(collectionId);

  }
}
