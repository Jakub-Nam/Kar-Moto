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
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var app_component_1 = require("./app.component");
var header_component_1 = require("./header/header.component");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/platform-browser/animations");
// import { AuthComponent } from './auth/auth.component';
// import { Routes, RouterModule } from '@angular/router';
var angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
var http_1 = require("@angular/common/http");
var select_1 = require("@angular/material/select");
var fire_1 = require("@angular/fire");
var firestore_1 = require("@angular/fire/firestore");
var storage_1 = require("@angular/fire/storage");
var environment_1 = require("./../environment/environment");
var footer_component_1 = require("./footer/footer.component");
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
var auth_1 = require("@angular/fire/auth");
var profile_data_edit_component_1 = require("./profile-data-edit/profile-data-edit.component");
var page_not_found_component_1 = require("./page-not-found/page-not-found.component");
var auth_guard_guard_1 = require("./auth/auth-guard.guard");
var app_routing_module_1 = require("./app-routing.module");
// import { VehiclesModule } from './vehicles/vehicles.module';
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var alert_component_1 = require("./shared/alert/alert.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                // AuthComponent,
                profile_data_edit_component_1.ProfileDataEditComponent,
                footer_component_1.FooterComponent,
                alert_component_1.AlertComponent,
                page_not_found_component_1.PageNotFoundComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                select_1.MatSelectModule,
                angular_fontawesome_1.FontAwesomeModule,
                http_1.HttpClientModule,
                fire_1.AngularFireModule.initializeApp(environment_1.environment.firebaseConfig),
                firestore_1.AngularFirestoreModule,
                storage_1.AngularFireStorageModule,
                auth_1.AngularFireAuthModule,
                // NgbModule,
                // NgbCollapseModule,
                app_routing_module_1.AppRoutingModule,
                // VehiclesModule,
                ng_bootstrap_1.NgbCollapseModule
            ],
            providers: [auth_guard_guard_1.AuthGuard],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
