import { Component, OnInit } from '@angular/core';
import { VehicleDbService } from '../shared/vehicle-db.service';

// interface UserProfile {
//   userName: string;
//   email: string;
//   phoneNumber: any;
//   street: string;
//   postCode: any;
//   city: string;
// }

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
          this.profileData = next;

        });
    // error => {

    //   console.log(error)
    // });
  }
}
