import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  successAlert = false;
  errorAlert = false;

  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    street: new FormControl(''),
    postCode: new FormControl(''),
    city: new FormControl('')
  });

  constructor(
    private db: AngularFirestore
    ) { }

  ngOnInit(): void {
  }

  onSubmitChangeProfile(form: any) {
    this.db.collection('mainData').doc('profileData').set(
      {
        userName: form.value.name,
        phoneNumber: form.value.phoneNumber,
        email: form.value.email,
        street: form.value.street,
        postCode: form.value.postCode,
        city: form.value.city,
      })

      .then( event => {
        this.successAlert = true;
        form.reset();
      })
      .catch(error => {
        this.errorAlert = true;
      });
    form.reset();
  }
  hideSuccessAlert() {
    this.successAlert = false;
  }

  hideErrorAlert() {
    this.errorAlert = false;
  }
}
