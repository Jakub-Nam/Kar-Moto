"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VehiclesRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_guard_1 = require("../auth/auth-guard.guard");
var vehicle_add_component_1 = require("./vehicle-add/vehicle-add.component");
var vehicle_selected_component_1 = require("./vehicle-selected/vehicle-selected.component");
var vehicles_component_1 = require("./vehicles.component");
var vehiclesRoutes = [
    {
        path: '',
        component: vehicles_component_1.VehiclesComponent,
        children: [
            //     // {
            //     //     path: 'vehicle-list',
            //     //     component: VehicleAddComponent,
            //     //     canActivate: [AuthGuard]
            //     // },
            {
                path: 'vehicle-add',
                component: vehicle_add_component_1.VehicleAddComponent,
                canActivate: [auth_guard_guard_1.AuthGuard]
            },
            {
                path: 'vehicle-selected/:timestamp',
                component: vehicle_selected_component_1.VehicleSelectedComponent
            },
        ]
    }
];
var VehiclesRoutingModule = /** @class */ (function () {
    function VehiclesRoutingModule() {
    }
    VehiclesRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(vehiclesRoutes)],
            exports: [router_1.RouterModule]
        })
    ], VehiclesRoutingModule);
    return VehiclesRoutingModule;
}());
exports.VehiclesRoutingModule = VehiclesRoutingModule;
