"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_component_1 = require("./app.component");
var header_component_1 = require("./header/header.component");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/platform-browser/animations");
var select_1 = require("@angular/material/select");
var input_1 = require("@angular/material/input");
var vehicles_component_1 = require("./vehicles/vehicles.component");
var vehicle_add_component_1 = require("./vehicles/vehicle-add/vehicle-add.component");
var auth_component_1 = require("./auth/auth.component");
var router_1 = require("@angular/router");
var angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
var angular_password_strength_meter_1 = require("angular-password-strength-meter");
var http_1 = require("@angular/common/http");
var slider_1 = require("@angular/material/slider");
var button_1 = require("@angular/material/button");
var ngx_dropzone_1 = require("ngx-dropzone");
var fire_1 = require("@angular/fire");
var firestore_1 = require("@angular/fire/firestore");
var storage_1 = require("@angular/fire/storage");
var environment_1 = require("./environment/environment");
var dropzone_directive_1 = require("./dropzone.directive");
var vehicle_filter_component_1 = require("./vehicles/vehicle-filter/vehicle-filter.component");
var filter_brand_pipe_1 = require("./shared/filter-pipes/filter-brand.pipe");
var filter_price_low_pipe_1 = require("./shared/filter-pipes/filter-price-low.pipe");
var highest_price_pipe_1 = require("./shared/filter-pipes/highest-price.pipe");
var lowest_mileage_pipe_1 = require("./shared/filter-pipes/lowest-mileage.pipe");
var highest_mileage_pipe_1 = require("./shared/filter-pipes/highest-mileage.pipe");
var additional_photos_component_1 = require("./vehicles/vehicle-add/additional-photos/additional-photos.component");
var footer_component_1 = require("./footer/footer.component");
var vehicle_selected_component_1 = require("./vehicles/vehicle-selected/vehicle-selected.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ng_bootstrap_2 = require("@ng-bootstrap/ng-bootstrap");
var auth_1 = require("@angular/fire/auth");
var edit_profile_component_1 = require("./auth/edit-profile/edit-profile.component");
var ngx_image_compress_1 = require("ngx-image-compress");
var page_not_found_component_1 = require("./page-not-found/page-not-found.component");
var appRoutes = [
    {
        path: 'vehicles',
        component: vehicles_component_1.VehiclesComponent,
        children: [
            {
                path: 'vehicle-add',
                component: vehicle_add_component_1.VehicleAddComponent
            },
            {
                path: 'vehicle-selected/:timestamp',
                component: vehicle_selected_component_1.VehicleSelectedComponent
            }
        ]
    },
    {
        path: 'login',
        component: auth_component_1.AuthComponent,
        children: [
            {
                path: 'edit-profile',
                component: edit_profile_component_1.EditProfileComponent
            }
        ]
    },
    { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
    { path: '**', component: page_not_found_component_1.PageNotFoundComponent }
];
var materialComponents = [
    slider_1.MatSliderModule,
    button_1.MatButtonModule,
    input_1.MatInputModule
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                vehicles_component_1.VehiclesComponent,
                auth_component_1.AuthComponent,
                vehicle_add_component_1.VehicleAddComponent,
                dropzone_directive_1.DropzoneDirective,
                vehicle_filter_component_1.FilterMenuComponent,
                filter_brand_pipe_1.FilterBrandPipe,
                filter_price_low_pipe_1.FilterPriceLowPipe,
                highest_price_pipe_1.HighestPricePipe,
                lowest_mileage_pipe_1.LowestMileagePipe,
                highest_mileage_pipe_1.HighestMileagePipe,
                additional_photos_component_1.AdditionalPhotosComponent,
                footer_component_1.FooterComponent,
                vehicle_selected_component_1.VehicleSelectedComponent,
                edit_profile_component_1.EditProfileComponent,
                page_not_found_component_1.PageNotFoundComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                select_1.MatSelectModule,
                router_1.RouterModule.forRoot(appRoutes),
                angular_fontawesome_1.FontAwesomeModule,
                angular_password_strength_meter_1.PasswordStrengthMeterModule,
                http_1.HttpClientModule,
                materialComponents,
                fire_1.AngularFireModule.initializeApp(environment_1.environment.firebaseConfig),
                firestore_1.AngularFirestoreModule,
                storage_1.AngularFireStorageModule,
                auth_1.AngularFireAuthModule,
                ngx_dropzone_1.NgxDropzoneModule,
                ng_bootstrap_1.NgbModule,
                ng_bootstrap_2.NgbCollapseModule
            ],
            providers: [ngx_image_compress_1.NgxImageCompressService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
