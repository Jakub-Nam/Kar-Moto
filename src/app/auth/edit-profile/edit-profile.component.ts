import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    street: new FormControl(''),
    postCode: new FormControl(''),
    city: new FormControl('')
  });
  editProfile = false;
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
  }

  onSubmitChangeProfile(form) {
    this.db.collection('mainData').doc('profileData').set(
      {
        userName: form.value.name,
        phoneNumber: form.value.phoneNumber,
        email: form.value.email,
        street: form.value.street,
        postCode: form.value.postCode,
        city: form.value.city,
      })

      .then(() => {
        console.log('Document successfully written!');
        form.reset();
      })
      .catch( error => {
        console.error('Error writing document: ', error);
      });
    form.reset();
  }
  showEditProfileMenu() {
    this.editProfile = !this.editProfile;
  }
}
