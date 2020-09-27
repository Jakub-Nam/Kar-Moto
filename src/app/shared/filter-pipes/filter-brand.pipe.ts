import { Pipe, PipeTransform } from '@angular/core';
import { Vehicle } from 'src/app/vehicles/vehicle';

@Pipe({
  name: 'filterBrand'
})

export class FilterBrandPipe implements PipeTransform {

  transform(vehicles: any, inputFilterValue: any): any {
    if (inputFilterValue === undefined) {
      return vehicles;
    }
    return vehicles.filter((vehicle: Vehicle) => {
      return vehicle.brand.toLowerCase().includes(inputFilterValue.toLowerCase());
    });
  }
}
