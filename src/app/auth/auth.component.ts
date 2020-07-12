import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service'; //  AuthResponseData
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
  // hideForm = true;
  hideSpinner = true;
  isLoginMode = true;
  error: string = null;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faEnvelope = faEnvelope;
  hidePassword = true;
  passwordStrengthmeter;
  adminInterface = false;

  constructor(private authService: AuthService, private router: Router) { }  // private router: Router

  ngOnInit() {
    this.authService.user.subscribe(
      user => {
        if (user) {
          if (user.email !== 'kubanam1995@gmail.com') { return; }
          else {
            this.adminInterface = true;
          }
        }
        else { return; }
      }, err => console.log(err));

  }
  showPassword() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    // this.hideSpinner = false;
    // this.hideForm = false;

    const email = form.value.email;
    const password = form.value.password;
    // let authObs: Observable<AuthResponseData>;

    // console.log('TOKEN', userCredential.user.getIdTokenResult().then(
    //   response => console.log('Afryka', response.token)
    // ));
    if (this.isLoginMode) {
      // authObs = this.authService.login(email, password);
      this.authService.login(email, password)
        .then(async userCredential => {
          let token: string;
          let date: Date;
          console.log('userCREEE', userCredential);
          await userCredential.user.getIdTokenResult().then(
            response => token = response.token);

          await userCredential.user.getIdTokenResult().then(
            response => date = response.expirationTime);

          if (userCredential.user.email !== 'kubanam1995@gmail.com') { this.router.navigate(['/']); }
          this.adminInterface = true;
          const user = new User(
            userCredential.user.email,
            password,
            userCredential.user.uid,
            token,
            date
          );
          console.log('const user 3x', user);
          this.authService.user.next(user);
          localStorage.setItem('userData', JSON.stringify(user));
        })
        .catch(error => {
          console.log(error);
        });


    } else {
      this.authService.signUp(email, password),
        this.isLoginMode = !this.isLoginMode;
      // this.hideForm = true;
    }
    // authObs.subscribe(
    //   resData => {
    //     this.hideSpinner = false;
    //     console.log(resData);

    //     if (resData.email !== 'kubanam1995@gmail.com') {
    //       this.router.navigate(['/']);
    //     } else {
    //       this.nextComponent = !this.nextComponent;
    //     }


    //     // this.router.navigate(['/farms']);
    //   },
    //   errorMessage => {
    //     this.error = errorMessage;
    //     this.hideSpinner = true;
    //     this.hideForm = true;
    //   }
    // );
    form.reset();
  }
  onSwitchMode(form: NgForm) {
    // this.isLoginMode = !this.isLoginMode;
    this.registrationView = true;
    // form.reset();
  }
  showRegistrationView(){
    this.registrationView = true;
  }
}
