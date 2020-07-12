import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lowestMileage'
})
export class LowestMileagePipe implements PipeTransform {

  transform(vehicles: any, inputFilterValue: any): any {
    if (inputFilterValue === undefined) {
      return vehicles;
    }
    return vehicles.filter((vehicle) => {
      return vehicle.payload.doc.data().carMileage >= inputFilterValue;
    });

  }

}
