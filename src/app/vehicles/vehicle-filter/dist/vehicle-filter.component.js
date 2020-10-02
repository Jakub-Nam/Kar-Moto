"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VehicleFilterComponent = void 0;
var core_1 = require("@angular/core");
var VehicleFilterComponent = /** @class */ (function () {
    function VehicleFilterComponent() {
        this.filtered = new core_1.EventEmitter();
    }
    VehicleFilterComponent.prototype.ngOnInit = function () {
    };
    VehicleFilterComponent.prototype.ngDoCheck = function () {
        var formValues = {
            brand: this.brandModel,
            priceLow: this.lowestPrice,
            highestPrice: this.highestPrice,
            lowestMileage: this.lowestMileage,
            highestMileage: this.highestMileage
        };
        this.filtered.emit(formValues);
    };
    __decorate([
        core_1.Output()
    ], VehicleFilterComponent.prototype, "filtered");
    VehicleFilterComponent = __decorate([
        core_1.Component({
            selector: 'app-vehicle-filter',
            templateUrl: './vehicle-filter.component.html',
            styleUrls: ['./vehicle-filter.component.css']
        })
    ], VehicleFilterComponent);
    return VehicleFilterComponent;
}());
exports.VehicleFilterComponent = VehicleFilterComponent;
