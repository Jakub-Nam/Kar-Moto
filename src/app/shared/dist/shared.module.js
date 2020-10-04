"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SharedModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var slider_1 = require("@angular/material/slider");
var button_1 = require("@angular/material/button");
var input_1 = require("@angular/material/input");
var select_1 = require("@angular/material/select");
var angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
var alert_component_1 = require("./alert/alert.component");
var angularMaterial = [
    slider_1.MatSliderModule,
    input_1.MatInputModule,
    button_1.MatButtonModule,
    select_1.MatSelectModule
];
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            declarations: [
                alert_component_1.AlertComponent,
            ],
            imports: [
                common_1.CommonModule,
                angular_fontawesome_1.FontAwesomeModule,
                angularMaterial
            ],
            exports: [
                alert_component_1.AlertComponent,
                common_1.CommonModule,
                angular_fontawesome_1.FontAwesomeModule,
                angularMaterial
            ],
            entryComponents: [alert_component_1.AlertComponent]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
