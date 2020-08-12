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
  error: string = null;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faEnvelope = faEnvelope;
  hidePassword = true;
  passwordStrengthmeter;
  adminInterface = false;
  successAlert;
  errorAlert;


  constructor(private authService: AuthService, private router: Router) { }  // private router: Router

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
      err => this.errorAlert = true
    );
  }

  showPassword() {
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
        let token: string;
        let date: Date;
        await userCredential.user.getIdTokenResult().then(
          response => token = response.token);

        await userCredential.user.getIdTokenResult().then(
          response => date = response.expirationTime);

        if (userCredential.user.email !== 'kubanam1995@gmail.com') {
          this.router.navigate(['/']);
        }

        const user = new User(
          userCredential.user.email,
          password,
          userCredential.user.uid,
          token,
          date
        );

        this.authService.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        this.successAlert = true;
      })

      .catch(error => {
        this.errorAlert = true;
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
    this.successAlert = false;
  }

  hideErrorAlert() {
    this.errorAlert = null;
  }
}
