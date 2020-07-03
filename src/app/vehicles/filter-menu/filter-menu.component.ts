import { Component, OnInit, DoCheck, EventEmitter, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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

  constructor(private db: AngularFirestore) { }

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
    // console.log(ngModelForm.priceModel, 'highest price');
    return ngModelForm;
  }
}
