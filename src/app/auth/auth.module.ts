import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
    PasswordStrengthMeterModule,
    FontAwesomeModule
  ]
})
export class AuthModule {}
