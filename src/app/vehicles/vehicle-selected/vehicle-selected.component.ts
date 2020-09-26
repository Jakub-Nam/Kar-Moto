import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VehicleDbService } from 'src/app/shared/vehicle-db.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Vehicle } from '../vehicle';

@Component({
  selector: 'app-vehicle-selected',
  templateUrl: './vehicle-selected.component.html',
  styleUrls: ['./vehicle-selected.component.css']
})
export class VehicleSelectedComponent implements OnInit {
  @Input() vehicle: Vehicle;
  @Output() return = new EventEmitter();
  // vehicleURL: Array<object>;
  vehicleURL: any;

  constructor(
    private vehicleDbService: VehicleDbService,
    config: NgbCarouselConfig) {
    config.interval = 100000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
    this.fetchAdditionalVehiclePhotos();

  }
  fetchAdditionalVehiclePhotos() {
    const timestamp = this.vehicle.timestamp;
    this.vehicleDbService.fetchAdditionalVehiclePhotos(`${timestamp}`).subscribe(
      next => {
        console.log(timestamp, 'TIMESTApm')
        this.vehicleURL = next;
      });
  }

  returnBtn(e) {
    this.return.emit(e);
  }

}
