import { Component, OnInit, DoCheck, EventEmitter, Output } from '@angular/core';
import { Filter } from './filter';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.css']
})

export class FilterMenuComponent implements OnInit, DoCheck {
  @Output() filtered = new EventEmitter<object>();

  brandModel: string;
  lowestPrice: number;
  highestPrice: number;
  lowestMileage: number;
  highestMileage: number;

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck() {
    const formValues: Filter = {
      brand: this.brandModel,
      priceLow: this.lowestPrice,
      highestPrice: this.highestPrice,
      lowestMileage: this.lowestMileage,
      highestMileage: this.highestMileage
    };
    this.filtered.emit(formValues);
  }
}
