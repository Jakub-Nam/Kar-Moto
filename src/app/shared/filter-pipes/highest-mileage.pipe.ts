import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highestMileage'
})
export class HighestMileagePipe implements PipeTransform {

  transform(vehicles: any, filterData: any): any {
    // check if search term was used
    // tslint:disable-next-line: curly
    if (filterData === undefined) return vehicles;
    return vehicles.filter((vehicle) => {
      return vehicle.carMileage <= filterData;
    });
  }
}
