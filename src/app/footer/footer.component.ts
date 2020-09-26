import { Component, OnInit } from '@angular/core';
import { VehicleDbService } from '../shared/vehicle-db.service';
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  profileData;
  constructor(private vehicleDbService: VehicleDbService) { }

  ngOnInit(): void {
    this.fetchProfileData();
  }
  fetchProfileData() {
    this.vehicleDbService.fetchProfileData()
      .subscribe(
        next => {
          if (!next) {
            window.alert('Problem with fetch profile data');
          }
          this.profileDataz = next;
        },
        error => {
          window.alert('There is a error with fetch profile data!');
        });
  }
}
