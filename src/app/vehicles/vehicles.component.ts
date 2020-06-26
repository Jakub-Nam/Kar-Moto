import { Component, OnInit } from '@angular/core';
import { AutomotiveDatabaseService } from '../shared/automotive-database.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: any;
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
  // user = this.auth.user;
  // brandList: string[] = ['BMW', 'Honda', 'Junak', 'KAWASAKI', 'KTM', 'KYMCO', 'Suzuki', 'Romet', 'Yamaha', 'Zipp'];
  constructor(public automotiveService: AutomotiveDatabaseService, private authService: AuthService,
              private route: ActivatedRoute, private router: Router) {
                // this.config = {
                //   currentPage : 1,
                //   itemsPerPage : 1,
                //   totalItem: 0
                // };
                // route.queryParams.subscribe(
                //   params => this.config.currentPage = params[`page`] ? params[`page`] : 1
                // );
                // for (let i = 1; i <= 100; i++){
                //   this.vehicle.push(`vehicle ${1}`);
                // }
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
  //}
  fetchAutomotives() {
    this.automotiveService.fetchAutomotives().subscribe(
      next => {
        this.vehicles = next;
      });
      // a co z errorem babelku xD
  }
  function($event) {
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

