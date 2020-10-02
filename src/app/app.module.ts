import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AuthComponent } from './auth/auth.component';
// import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from './../environment/environment';

import { FooterComponent } from './footer/footer.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ProfileDataEditComponent } from './profile-data-edit/profile-data-edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth-guard.guard';
import { AppRoutingModule } from './app-routing.module';
// import { VehiclesModule } from './vehicles/vehicles.module';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from './shared/alert/alert.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // AuthComponent,
    ProfileDataEditComponent,
    FooterComponent,
    AlertComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    FontAwesomeModule,

    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    // NgbModule,
    // NgbCollapseModule,
    AppRoutingModule,
    // VehiclesModule,
    NgbCollapseModule

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
