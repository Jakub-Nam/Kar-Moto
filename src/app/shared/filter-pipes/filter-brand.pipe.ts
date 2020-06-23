import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brand'
})

export class FilterBrandPipe implements PipeTransform {

  transform(vehicles: any, filterData: any): any {
    // check if search term was used
    // tslint:disable-next-line: curly
    if (filterData === undefined) return vehicles;
    return vehicles.filter((vehicle) => {
      return vehicle.brand.includes(filterData);
    });
  }
}
