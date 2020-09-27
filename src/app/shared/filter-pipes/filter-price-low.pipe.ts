import { Pipe, PipeTransform } from '@angular/core';
import { Vehicle } from 'src/app/vehicles/vehicle';

@Pipe({
  name: 'filterPriceLow'
})
export class FilterPriceLowPipe implements PipeTransform {

  transform(vehicles: any, inputFilterValue: any): any {
    if (inputFilterValue === undefined) {
      return vehicles;
    }
    return vehicles.filter((vehicle: Vehicle) => {
      return vehicle.price >= inputFilterValue;
    });
  }
}
