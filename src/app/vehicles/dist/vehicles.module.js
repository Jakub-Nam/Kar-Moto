"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VehiclesModule = void 0;
var additional_photos_component_1 = require("./vehicle-add/additional-photos/additional-photos.component");
var fire_1 = require("@angular/fire");
var firestore_1 = require("@angular/fire/firestore");
var brand_pipe_1 = require("./vehicle-filter/filters/brand.pipe");
var common_1 = require("@angular/common");
var environment_1 = require("./../../environment/environment");
var angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
var forms_1 = require("@angular/forms");
var highest_mileage_pipe_1 = require("./vehicle-filter/filters/highest-mileage.pipe");
var highest_price_pipe_1 = require("./vehicle-filter/filters/highest-price.pipe");
var lowest_mileage_pipe_1 = require("./vehicle-filter/filters/lowest-mileage.pipe");
var lowest_price_pipe_1 = require("./vehicle-filter/filters/lowest-price.pipe");
var button_1 = require("@angular/material/button");
var input_1 = require("@angular/material/input");
var slider_1 = require("@angular/material/slider");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var core_1 = require("@angular/core");
var ngx_dropzone_1 = require("ngx-dropzone");
var ngx_image_compress_1 = require("ngx-image-compress");
var router_1 = require("@angular/router");
var shared_module_1 = require("../shared/shared.module");
var vehicle_add_component_1 = require("./vehicle-add/vehicle-add.component");
var vehicle_filter_component_1 = require("./vehicle-filter/vehicle-filter.component");
var vehicle_list_component_1 = require("./vehicle-list/vehicle-list.component");
var vehicles_component_1 = require("./vehicles.component");
var vehicle_selected_component_1 = require("./vehicle-selected/vehicle-selected.component");
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
                additional_photos_component_1.AdditionalPhotosComponent,
                brand_pipe_1.BrandPipe,
                highest_mileage_pipe_1.HighestMileagePipe,
                highest_price_pipe_1.HighestPricePipe,
                lowest_mileage_pipe_1.LowestMileagePipe,
                lowest_price_pipe_1.LowestPricePipe,
                vehicle_add_component_1.VehicleAddComponent,
                vehicle_filter_component_1.VehicleFilterComponent,
                vehicle_list_component_1.VehicleListComponent,
                vehicles_component_1.VehiclesComponent,
                vehicle_selected_component_1.VehicleSelectedComponent,
            ],
            imports: [
                fire_1.AngularFireModule.initializeApp(environment_1.environment.firebaseConfig),
                firestore_1.AngularFirestoreModule,
                common_1.CommonModule,
                angular_fontawesome_1.FontAwesomeModule,
                forms_1.FormsModule,
                materialComponents,
                ng_bootstrap_1.NgbModule,
                ngx_dropzone_1.NgxDropzoneModule,
                forms_1.ReactiveFormsModule,
                shared_module_1.SharedModule,
                vehicles_routing_module_1.VehiclesRoutingModule
            ],
            providers: [ngx_image_compress_1.NgxImageCompressService],
            exports: [router_1.RouterModule]
        })
    ], VehiclesModule);
    return VehiclesModule;
}());
exports.VehiclesModule = VehiclesModule;
