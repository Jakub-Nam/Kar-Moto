import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VehicleDbService } from 'src/app/shared/vehicle-db.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vehicle-selected',
  templateUrl: './vehicle-selected.component.html',
  styleUrls: ['./vehicle-selected.component.css']
})
export class VehicleSelectedComponent implements OnInit {
  @Input() vehicle;
  @Output() return = new EventEmitter();
  vehicleURLs;

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
    const timestamp = this.vehicle.payload.doc.data().timestamp;
    this.vehicleDbService.fetchAdditionalVehiclePhotos(`${timestamp}`).subscribe(
      next => {
        this.vehicleURLs = next;
      });
  }

  returnBtn(e) {
    this.return.emit(e);
  }

}
