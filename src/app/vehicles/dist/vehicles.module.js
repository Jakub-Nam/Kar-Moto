"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VehiclesModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var dropzone_directive_1 = require("./dropzone.directive");
var additional_photos_component_1 = require("./vehicle-add/additional-photos/additional-photos.component");
var vehicle_add_component_1 = require("./vehicle-add/vehicle-add.component");
var vehicle_filter_component_1 = require("./vehicle-filter/vehicle-filter.component");
var vehicle_selected_component_1 = require("./vehicle-selected/vehicle-selected.component");
var vehicles_component_1 = require("./vehicles.component");
var ngx_dropzone_1 = require("ngx-dropzone");
var ngx_image_compress_1 = require("ngx-image-compress");
var forms_1 = require("@angular/forms");
var filter_brand_pipe_1 = require("./filter-pipes/filter-brand.pipe");
var filter_price_low_pipe_1 = require("./filter-pipes/filter-price-low.pipe");
var highest_price_pipe_1 = require("./filter-pipes/highest-price.pipe");
var lowest_mileage_pipe_1 = require("./filter-pipes/lowest-mileage.pipe");
var highest_mileage_pipe_1 = require("./filter-pipes/highest-mileage.pipe");
var fire_1 = require("@angular/fire");
var firestore_1 = require("@angular/fire/firestore");
var slider_1 = require("@angular/material/slider");
var button_1 = require("@angular/material/button");
var input_1 = require("@angular/material/input");
var environment_1 = require("./../../environment/environment");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
var vehicles_routing_module_1 = require("./vehicles-routing.module");
var materialComponents = [
    slider_1.MatSliderModule,
    button_1.MatButtonModule,
    input_1.MatInputModule
];
var VehiclesModule = /** @class */ (function () {
    function VehiclesModule() {
    }
    VehiclesModule = __decorate([
        core_1.NgModule({
            declarations: [
                vehicles_component_1.VehiclesComponent,
                vehicle_add_component_1.VehicleAddComponent,
                additional_photos_component_1.AdditionalPhotosComponent,
                dropzone_directive_1.DropzoneDirective,
                vehicle_selected_component_1.VehicleSelectedComponent,
                vehicle_filter_component_1.VehicleFilterComponent,
                filter_brand_pipe_1.FilterBrandPipe,
                filter_price_low_pipe_1.FilterPriceLowPipe,
                highest_price_pipe_1.HighestPricePipe,
                lowest_mileage_pipe_1.LowestMileagePipe,
                highest_mileage_pipe_1.HighestMileagePipe
            ],
            imports: [
                common_1.CommonModule,
                ngx_dropzone_1.NgxDropzoneModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                fire_1.AngularFireModule.initializeApp(environment_1.environment.firebaseConfig),
                firestore_1.AngularFirestoreModule,
                materialComponents,
                ng_bootstrap_1.NgbModule,
                angular_fontawesome_1.FontAwesomeModule,
                vehicles_routing_module_1.VehiclesRoutingModule
            ],
            providers: [ngx_image_compress_1.NgxImageCompressService],
            exports: [router_1.RouterModule]
        })
    ], VehiclesModule);
    return VehiclesModule;
}());
exports.VehiclesModule = VehiclesModule;
