"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VehicleSelectedComponent = void 0;
var core_1 = require("@angular/core");
var VehicleSelectedComponent = /** @class */ (function () {
    function VehicleSelectedComponent(vehicleDbService, config) {
        this.vehicleDbService = vehicleDbService;
        this["return"] = new core_1.EventEmitter();
        config.interval = 100000;
        config.wrap = true;
        config.keyboard = false;
        config.pauseOnHover = false;
    }
    VehicleSelectedComponent.prototype.ngOnInit = function () {
        this.fetchAdditionalVehiclePhotos();
    };
    VehicleSelectedComponent.prototype.fetchAdditionalVehiclePhotos = function () {
        var _this = this;
        var timestamp = this.vehicle.timestamp;
        this.vehicleDbService.fetchAdditionalVehiclePhotos("" + timestamp).subscribe(function (next) {
            console.log(timestamp, 'TIMESTApm');
            _this.vehicleURL = next;
        });
    };
    VehicleSelectedComponent.prototype.returnBtn = function (e) {
        this["return"].emit(e);
    };
    __decorate([
        core_1.Input()
    ], VehicleSelectedComponent.prototype, "vehicle");
    __decorate([
        core_1.Output()
    ], VehicleSelectedComponent.prototype, "return");
    VehicleSelectedComponent = __decorate([
        core_1.Component({
            selector: 'app-vehicle-selected',
            templateUrl: './vehicle-selected.component.html',
            styleUrls: ['./vehicle-selected.component.css']
        })
    ], VehicleSelectedComponent);
    return VehicleSelectedComponent;
}());
exports.VehicleSelectedComponent = VehicleSelectedComponent;