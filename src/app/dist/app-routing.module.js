"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_guard_1 = require("./auth/auth-guard.guard");
var page_not_found_component_1 = require("./page-not-found/page-not-found.component");
var slider_1 = require("@angular/material/slider");
var button_1 = require("@angular/material/button");
var input_1 = require("@angular/material/input");
var vehicles_module_1 = require("./vehicles/vehicles.module");
var materialComponents = [
    slider_1.MatSliderModule,
    button_1.MatButtonModule,
    input_1.MatInputModule
];
var appRoutes = [
    { path: '', redirectTo: '/vehicles', pathMatch: 'full' },
    {
        path: 'auth',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./auth/auth.module'); }).then(function (m) { return m.AuthModule; }); }
    },
    {
        path: 'vehicles',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./vehicles/vehicles.module'); }).then(function (m) { return m.VehiclesModule; }); }
    },
    {
        path: 'edit-profile',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./profile/profile.module'); }).then(function (m) { return m.ProfileModule; }); },
        canActivate: [auth_guard_guard_1.AuthGuard]
    },
    { path: '**', component: page_not_found_component_1.PageNotFoundComponent }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                materialComponents,
                router_1.RouterModule.forRoot(appRoutes, { preloadingStrategy: router_1.PreloadAllModules }),
                vehicles_module_1.VehiclesModule
            ],
            exports: [router_1.RouterModule],
            providers: []
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
