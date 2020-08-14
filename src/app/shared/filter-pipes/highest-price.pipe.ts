import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highestPrice'
})
export class HighestPricePipe implements PipeTransform {

  transform(vehicles: any, inputFilterValue: any): any {
    if (!inputFilterValue) {
      return vehicles;
    }

    return vehicles.filter((vehicle) => {
      return vehicle.payload.doc.data().price <= inputFilterValue;
    });
  }
}
