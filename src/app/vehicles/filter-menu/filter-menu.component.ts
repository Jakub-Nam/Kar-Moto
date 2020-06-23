import { Component, OnInit, DoCheck, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.css']
})
export class FilterMenuComponent implements OnInit, DoCheck {
  @Output() filtered = new EventEmitter<object>();

  // selected = '';
  brandModel: string;
  priceLow: string;
  highestPrice: number;
  lowestMileage: number;
  highestMileage: number;

  brandList: string[] = ['BMW', 'Honda', 'Junak', 'KAWASAKI', 'KTM', 'KYMCO', 'Suzuki', 'Romet', 'Yamaha', 'Zipp'];
  pricesLowest: number[] = [1000, 2000, 3000, 4000, 5000, 6000, 8000];
  highestPrices: number[] = [6000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000];
  lowestMileages: number[] = [1000, 2000, 3000, 4000, 5000, 6000, 8000];
  highestMileages: number[] = [6000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000];

  constructor() { }

  ngOnInit(): void {
  }
  ngDoCheck() {
    const ngModelForm = {
      brand: this.brandModel,
      priceLow: this.priceLow,
      highestPrice: this.highestPrice,
      lowestMileage: this.lowestMileage,
      highestMileage: this.highestMileage
    };
    this.filtered.emit(ngModelForm);
  }
}
