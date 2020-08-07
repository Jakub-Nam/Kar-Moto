import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VehicleDbService } from 'src/app/shared/vehicle-db.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-one-vehicle',
  templateUrl: './one-vehicle.component.html',
  styleUrls: ['./one-vehicle.component.css']
})
export class OneVehicleComponent implements OnInit {
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
    this.vehicleDbService.fetchAdditionalVehiclePhotos(`a${timestamp}`).subscribe(
      next => {
        this.vehicleURLs = next;
      });
  }

  returnBtn(e) {
    this.return.emit(e);
  }

}
