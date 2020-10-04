"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var common_1 = require("@angular/common");
var app_component_1 = require("./app.component");
var header_component_1 = require("./header/header.component");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var fire_1 = require("@angular/fire");
var firestore_1 = require("@angular/fire/firestore");
var storage_1 = require("@angular/fire/storage");
var environment_1 = require("./../environment/environment");
var footer_component_1 = require("./footer/footer.component");
var auth_1 = require("@angular/fire/auth");
var page_not_found_component_1 = require("./page-not-found/page-not-found.component");
var auth_guard_guard_1 = require("./auth/auth-guard.guard");
var app_routing_module_1 = require("./app-routing.module");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                footer_component_1.FooterComponent,
                page_not_found_component_1.PageNotFoundComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpClientModule,
                fire_1.AngularFireModule.initializeApp(environment_1.environment.firebaseConfig),
                firestore_1.AngularFirestoreModule,
                storage_1.AngularFireStorageModule,
                auth_1.AngularFireAuthModule,
                app_routing_module_1.AppRoutingModule,
                ng_bootstrap_1.NgbCollapseModule
            ],
            providers: [auth_guard_guard_1.AuthGuard],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
