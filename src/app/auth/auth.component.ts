import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service'; //  AuthResponseData
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  hideForm = true;
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
      user => { if (user.email !== 'kubanam1995@gmail.com' ) { return; }
             else { this.adminInterface = true; }
  }
    );
}
showPassword() {
  this.hidePassword = !this.hidePassword;
}

onSubmit(form: NgForm) {
  if (!form.valid) {
    return;
  }
  // this.hideSpinner = false;
  this.hideForm = false;

  const email = form.value.email;
  const password = form.value.password;
  // let authObs: Observable<AuthResponseData>;

  if (this.isLoginMode) {
    // authObs = this.authService.login(email, password);
    this.authService.login(email, password);

    if (email !== 'kubanam1995@gmail.com') { this.router.navigate(['/']); }
    else { this.adminInterface = true; }

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
  this.isLoginMode = !this.isLoginMode;
  // form.reset();
}
}
