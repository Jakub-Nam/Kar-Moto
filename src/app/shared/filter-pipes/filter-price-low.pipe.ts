import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPriceLow'
})
export class FilterPriceLowPipe implements PipeTransform {

  transform(vehicles: any, inputFilterValue: any): any {
    if (inputFilterValue === undefined) {
      return vehicles;
    }
    return vehicles.filter((vehicle) => {
      return vehicle.payload.doc.data().price >= inputFilterValue;
    });
  }
}
