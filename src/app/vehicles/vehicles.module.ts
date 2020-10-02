import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropzoneDirective } from './dropzone.directive';
import { AdditionalPhotosComponent } from './vehicle-add/additional-photos/additional-photos.component';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';
import { VehicleFilterComponent } from './vehicle-filter/vehicle-filter.component';
import { VehicleSelectedComponent } from './vehicle-selected/vehicle-selected.component';
import { VehiclesComponent } from './vehicles.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxImageCompressService } from 'ngx-image-compress';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterBrandPipe } from './filter-pipes/filter-brand.pipe';
import { FilterPriceLowPipe } from './filter-pipes/filter-price-low.pipe';
import { HighestPricePipe } from './filter-pipes/highest-price.pipe';
import { LowestMileagePipe } from './filter-pipes/lowest-mileage.pipe';
import { HighestMileagePipe } from './filter-pipes/highest-mileage.pipe';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { environment } from './../../environment/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';


const materialComponents = [
    MatSliderModule,
    MatButtonModule,
    MatInputModule
];

@NgModule({
    declarations: [
        VehiclesComponent,
        VehicleAddComponent,
        AdditionalPhotosComponent,
        DropzoneDirective,
        VehicleSelectedComponent,
        VehicleFilterComponent,
        FilterBrandPipe,
        FilterPriceLowPipe,
        HighestPricePipe,
        LowestMileagePipe,
        HighestMileagePipe,
        VehicleListComponent
    ],
    imports: [
        CommonModule,
        NgxDropzoneModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        materialComponents,
        NgbModule,
        FontAwesomeModule,
        VehiclesRoutingModule
    ],
    providers: [NgxImageCompressService],
    exports: [RouterModule]
})
export class VehiclesModule { }
