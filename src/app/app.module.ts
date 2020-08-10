import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { AddVehicleComponent } from './auth/add-vehicle/add-vehicle.component';
import { AuthComponent } from './auth/auth.component';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from './environments/environment';
import { DropzoneDirective } from './dropzone.directive';
import { FilterMenuComponent } from './vehicles/filter-menu/filter-menu.component';
import { FilterBrandPipe } from './shared/filter-pipes/filter-brand.pipe';
import { FilterPriceLowPipe } from './shared/filter-pipes/filter-price-low.pipe';
import { HighestPricePipe } from './shared/filter-pipes/highest-price.pipe';
import { LowestMileagePipe } from './shared/filter-pipes/lowest-mileage.pipe';
import { HighestMileagePipe } from './shared/filter-pipes/highest-mileage.pipe';
import { AdditionalPhotosComponent } from './auth/add-vehicle/additional-photos/additional-photos.component';
import { FooterComponent } from './footer/footer.component';
import { OneVehicleComponent } from './vehicles/one-vehicle/one-vehicle.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { PaginationComponent } from './vehicles/pagination/pagination.component';
import { ZeroVehiclesComponent } from './vehicles/zero-vehicles/zero-vehicles.component';
import { RegisterProhibitedComponent } from './auth/register-prohibited/register-prohibited.component';
import { EditProfileComponent } from './auth/edit-profile/edit-profile.component';

const appRoutes: Routes = [
  { path: '', component: VehiclesComponent },
  { path: 'login', component: AuthComponent }
];

const materialComponents = [
  MatSliderModule,
  MatButtonModule,
  MatInputModule
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VehiclesComponent,
    AuthComponent,
    AddVehicleComponent,
    DropzoneDirective,
    FilterMenuComponent,
    FilterBrandPipe,
    FilterPriceLowPipe,
    HighestPricePipe,
    LowestMileagePipe,
    HighestMileagePipe,
    AdditionalPhotosComponent,
    FooterComponent,
    OneVehicleComponent,
    PaginationComponent,
    ZeroVehiclesComponent,
    RegisterProhibitedComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    RouterModule.forRoot(appRoutes),
    FontAwesomeModule,
    PasswordStrengthMeterModule,
    HttpClientModule,
    materialComponents,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    NgxDropzoneModule,
    NgbModule,
    NgbCollapseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
