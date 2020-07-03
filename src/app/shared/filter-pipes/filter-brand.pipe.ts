import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBrand'
})

export class FilterBrandPipe implements PipeTransform {

  transform(vehicles: any, filterData: any): any {
    // check if search filterData was used
    // tslint:disable-next-line: curly
    if (filterData === undefined) return vehicles;
    return vehicles.filter((vehicle) => {
      return vehicle.payload.doc.data().brand.toLowerCase().includes(filterData.toLowerCase());
    });
  }

  // transform(vehicles: Array<any>, filterData: any) {

  //   if (Array.isArray(vehicles) && vehicles.length && filterData && filterData.length) {
  //     return vehicles.filter(item => {
  //       const keys = Object.keys(item);
  //       if (Array.isArray(keys) && keys.length) {
  //         for (const key of keys) {
  //           if (item.hasOwnProperty(key) && item[key] &&
  //             item[key].length && (item[key].toString().toLowerCase().replace(/ /g, ''))
  //             .includes((filterData.toString().toLowerCase().replace(/ /g, '')))) {
  //             return true;
  //           }
  //         }
  //         return false;
  //       } else {
  //         return false;
  //       }
  //     });
  //   } else {
  //     return vehicles;
  //   }
  // }
}
