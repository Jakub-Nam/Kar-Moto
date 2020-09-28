import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VehicleDbService } from 'src/app/shared/vehicle-db.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Vehicle } from '../vehicle';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-vehicle-selected',
  templateUrl: './vehicle-selected.component.html',
  styleUrls: ['./vehicle-selected.component.css']
})
export class VehicleSelectedComponent implements OnInit {
  vehicle: Vehicle;
  // @Output() return = new EventEmitter();
  vehicleURLs: Array<object>;
  timestamp: number;

  constructor(
    private vehicleDbService: VehicleDbService,
    private route: ActivatedRoute,
    private router: Router,
    config: NgbCarouselConfig) {
    config.interval = 100000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
    const timestamp: string | null = this.route.snapshot.paramMap.get('timestamp');
    const path: string = timestamp || '';
    this.fetchMainPhoto(path);
    this.fetchAdditionalVehiclePhotos(path);
  }

  fetchMainPhoto (path: string) {
    this.vehicleDbService.fetchMainPhoto(path).subscribe(
      next => {
        this.vehicle = next;
      });
  }

  fetchAdditionalVehiclePhotos(path: string) {
    this.vehicleDbService.fetchAdditionalVehiclePhotos(path).subscribe(
      next => {
        this.vehicleURLs = next;
      });
  }
}
