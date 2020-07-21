import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VehicleFormService {
  automotiveForm = new FormGroup({
    name: new FormControl(''),
    brand: new FormControl(''),
    price: new FormControl(''),
    carMileage: new FormControl(''),
    productionYear: new FormControl('')
  });
  constructor() { }
}
