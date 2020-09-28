import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehicleAddComponent } from './vehicles/vehicle-add/vehicle-add.component';
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
import { environment } from './environment/environment';
import { DropzoneDirective } from './dropzone.directive';
import { FilterMenuComponent } from './vehicles/vehicle-filter/vehicle-filter.component';
import { FilterBrandPipe } from './shared/filter-pipes/filter-brand.pipe';
import { FilterPriceLowPipe } from './shared/filter-pipes/filter-price-low.pipe';
import { HighestPricePipe } from './shared/filter-pipes/highest-price.pipe';
import { LowestMileagePipe } from './shared/filter-pipes/lowest-mileage.pipe';
import { HighestMileagePipe } from './shared/filter-pipes/highest-mileage.pipe';
import { AdditionalPhotosComponent } from './vehicles/vehicle-add/additional-photos/additional-photos.component';
import { FooterComponent } from './footer/footer.component';
import { VehicleSelectedComponent } from './vehicles/vehicle-selected/vehicle-selected.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: 'vehicles',
    component: VehiclesComponent,
    children: [
      {
        path: 'vehicle-add',
        component: VehicleAddComponent,
      },
      {
        path: 'vehicle-selected/:timestamp',
        component: VehicleSelectedComponent,
      }],
  },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent
  },
  { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
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
    VehicleAddComponent,
    DropzoneDirective,
    FilterMenuComponent,
    FilterBrandPipe,
    FilterPriceLowPipe,
    HighestPricePipe,
    LowestMileagePipe,
    HighestMileagePipe,
    AdditionalPhotosComponent,
    FooterComponent,
    VehicleSelectedComponent,
    EditProfileComponent,
    PageNotFoundComponent
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
  providers: [NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
