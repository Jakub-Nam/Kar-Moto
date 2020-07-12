import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AutomotiveDatabaseService } from 'src/app/shared/automotive-database.service';
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
  constructor(private automotiveService: AutomotiveDatabaseService, config: NgbCarouselConfig) {
    config.interval = 100000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;

  }

  ngOnInit(): void {
    this.fetchVehiclePhotos();

  }
  fetchVehiclePhotos() {
    const timestamp = this.vehicle.payload.doc.data().timestamp;
    this.automotiveService.fetchVehiclePhotos(`a${timestamp}`).subscribe(
      next => {
        this.vehicleURLs = next;
      });
  }

  returnBtn(e) {
    this.return.emit(e);
  }

}
