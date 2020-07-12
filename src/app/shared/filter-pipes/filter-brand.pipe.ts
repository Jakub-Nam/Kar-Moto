import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBrand'
})

export class FilterBrandPipe implements PipeTransform {

  transform(vehicles: any, inputFilterValue: any): any {
    if (inputFilterValue === undefined) {
      return vehicles;
    }
    return vehicles.filter((vehicle) => {
      return vehicle.payload.doc.data().brand.toLowerCase().includes(inputFilterValue.toLowerCase());
    });
  }
}
