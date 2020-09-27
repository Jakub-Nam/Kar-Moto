"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FilterBrandPipe = void 0;
var core_1 = require("@angular/core");
var FilterBrandPipe = /** @class */ (function () {
    function FilterBrandPipe() {
    }
    FilterBrandPipe.prototype.transform = function (vehicles, inputFilterValue) {
        if (inputFilterValue === undefined) {
            return vehicles;
        }
        return vehicles.filter(function (vehicle) {
            return vehicle.brand.toLowerCase().includes(inputFilterValue.toLowerCase());
        });
    };
    FilterBrandPipe = __decorate([
        core_1.Pipe({
            name: 'filterBrand'
        })
    ], FilterBrandPipe);
    return FilterBrandPipe;
}());
exports.FilterBrandPipe = FilterBrandPipe;
