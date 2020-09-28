import { Component, OnInit } from '@angular/core';
import { VehicleDbService } from '../shared/vehicle-db.service';
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import { Profile } from '../auth/edit-profile/profile';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  profileData: any;
  constructor(private vehicleDbService: VehicleDbService) { }

  ngOnInit(): void {
    this.fetchProfileData();
  }
  fetchProfileData(): Subscription {
    return this.vehicleDbService.fetchProfileData()
      .subscribe(
        next => {
          if (!next) {
            window.alert('Problem with fetch profile data');
          }

          this.profileData = next;
        },
        error => {
          window.alert('There is a error with fetch profile data!');
        });
  }
}
