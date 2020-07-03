import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highestMileage'
})
export class HighestMileagePipe implements PipeTransform {

  transform(vehicles: any, filterData: any): any {

    if (filterData === undefined) { return vehicles; }
    return vehicles.filter((vehicle) => {
      return vehicle.payload.doc.data().carMileage  <= filterData;
    });
  }
}
