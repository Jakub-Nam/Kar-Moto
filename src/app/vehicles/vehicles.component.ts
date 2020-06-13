import { Component, OnInit } from '@angular/core';
import { AutomotiveDatabaseService } from '../shared/automotive-database.service';
// import * as _ from 'lodash';
@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: any;

  filters = {
    brand: undefined,
    priceLow: undefined,
    highestPrice: undefined,
    lowestMileage: undefined,
    highestMileage: undefined
  };

  brandList: string[] = ['BMW', 'Honda', 'Junak', 'KAWASAKI', 'KTM', 'KYMCO', 'Suzuki', 'Romet', 'Yamaha', 'Zipp'];
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
  function($event){
    // console.log($event.brand, 'LAOAASLASL');
    this.filters.brand = $event.brand;
    this.filters.priceLow = $event.priceLow;
    this.filters.highestPrice = $event.highestPrice;
    this.filters.lowestMileage = $event.lowestMileage;
    this.filters.highestMileage = $event.highestMileage;
    // console.log($event);
  }

}
