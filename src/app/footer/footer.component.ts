import { Component, OnInit } from '@angular/core';
import { VehicleDbService } from '../shared/vehicle-db.service';
import { Profile } from '../shared/interfaces/profile';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  profileData: Profile =  {
    name: '',
    email: '',
    phoneNumber: 0,
    street: '',
    postCode: '',
    city: ''
}
;

  constructor(private vehicleDbService: VehicleDbService) { }

  ngOnInit(): void {
    this.fetchProfileData();
  }
  fetchProfileData() {
    return this.vehicleDbService.fetchProfileData()
      .subscribe(
        next => {
          if (!next) {
            window.alert('Problem with fetch profile data');
          }
          this.profileData = next as Profile;
        },
        error => {
          window.alert('There is a error with fetch profile data!');
        });
  }
}
