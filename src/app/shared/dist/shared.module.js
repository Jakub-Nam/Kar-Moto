"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SharedModule = void 0;
var alert_component_1 = require("./alert/alert.component");
var common_1 = require("@angular/common");
var angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
var button_1 = require("@angular/material/button");
var input_1 = require("@angular/material/input");
var select_1 = require("@angular/material/select");
var slider_1 = require("@angular/material/slider");
var core_1 = require("@angular/core");
var placeholder_directive_1 = require("./placeholder/placeholder.directive");
var angularMaterial = [
    button_1.MatButtonModule,
    input_1.MatInputModule,
    select_1.MatSelectModule,
    slider_1.MatSliderModule
];
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            declarations: [
                alert_component_1.AlertComponent,
                placeholder_directive_1.PlaceholderDirective
            ],
            imports: [
                angularMaterial,
                common_1.CommonModule,
                angular_fontawesome_1.FontAwesomeModule
            ],
            exports: [
                alert_component_1.AlertComponent,
                angularMaterial,
                common_1.CommonModule,
                angular_fontawesome_1.FontAwesomeModule,
                placeholder_directive_1.PlaceholderDirective
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
