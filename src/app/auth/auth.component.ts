import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { User } from './user.model';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  registrationView = false;
  hideSpinner = true;
  error = '';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faEnvelope = faEnvelope;
  hidePassword = true;
  passwordStrengthmeter: any;
  adminInterface = false;
  successAlert = '';
  errorAlert = '';


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.user.subscribe(
      user => {
        if (user) {
          if (user.email !== 'kubanam1995@gmail.com') {
            return;
          }
          else {
            this.adminInterface = true;
          }
        }
        else {
          return;
        }
      },
      err => this.errorAlert = err
    );
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.authService.login(email, password)
      .then(async userCredential => {
        let token = '';
        let date: Date =
        await userCredential.user.getIdTokenResult().then(
          (response: { token: string; }) => token =  response.token
        );

        await userCredential.user.getIdTokenResult().then(
          (response: { expirationTime: Date; }) => date = response.expirationTime
        );

        const user = new User(
          userCredential.user.email,
          password,
          userCredential.user.uid,
          token,
          date
        );

        this.authService.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        this.successAlert = 'success';
      })


      .catch(error => {
        this.errorAlert = error;
      });

    form.reset();
  }
  onSwitchMode(form: NgForm) {
    this.registrationView = true;
  }
  showRegistrationView() {
    this.registrationView = true;
  }

  hideSuccessAlert() {
    this.successAlert = '';
  }

  hideErrorAlert() {
    this.errorAlert = '';
  }
}
