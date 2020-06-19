import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { AdminInterfaceComponent } from './auth/admin-interface/admin-interface.component';
import { AuthComponent } from './auth/auth.component';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireStorage } from '@angular/fire/storage';
import { environment } from './environments/environment';
import { DropzoneDirective } from './dropzone.directive';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { FilterMenuComponent } from './vehicles/filter-menu/filter-menu.component';
import { FilterBrandPipe } from './shared/filter-pipes/filter-brand.pipe';
import { FilterPriceLowPipe } from './shared/filter-pipes/filter-price-low.pipe';
import { HighestPricePipe } from './shared/filter-pipes/highest-price.pipe';
import { LowestMileagePipe } from './shared/filter-pipes/lowest-mileage.pipe';
import { HighestMileagePipe } from './shared/filter-pipes/highest-mileage.pipe';
import { AdditionalPhotosComponent } from './auth/admin-interface/additional-photos/additional-photos.component';
import { FooterComponent } from './footer/footer.component';
import { OneVehicleComponent } from './vehicles/one-vehicle/one-vehicle.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

const appRoutes: Routes = [
  { path: '', component: VehiclesComponent },
  { path: 'logowanie', component: AuthComponent }
];

const materialComponents = [
  MatSliderModule,
  MatButtonModule
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VehiclesComponent,
    AuthComponent,
    AdminInterfaceComponent,
    DropzoneDirective,
    FilterMenuComponent,
    FilterBrandPipe,
    FilterPriceLowPipe,
    HighestPricePipe,
    LowestMileagePipe,
    HighestMileagePipe,
    AdditionalPhotosComponent,
    FooterComponent,
    OneVehicleComponent
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
    // AngularFireStorageModule,
    NgxDropzoneModule,
    NgbModule,
    NgbCollapseModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }, AngularFireStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
