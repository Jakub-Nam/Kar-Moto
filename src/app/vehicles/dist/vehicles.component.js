"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VehiclesComponent = void 0;
var core_1 = require("@angular/core");
var VehiclesComponent = /** @class */ (function () {
    // zeroVehicles = false;
    // vehicles: Array<Vehicle> = [];
    // vehicle: Vehicle;
    // showVehicle = false;
    // faTrash = faTrash;
    // showForAdmin = false;
    // filters: Filter = {
    //   brand: '',
    //   priceLow: 0,
    //   highestPrice: 0,
    //   lowestMileage: 0,
    //   highestMileage: 0
    // };
    // deleteAlert = false;
    // vehicleToDelete: Vehicle;
    // toggleDeleteAlertEvent: Event;
    // deletedMainPhotoInStorage = false;
    // deletedPhotosURLs = false;
    // deletedMainDocument = false;
    // deletedSecondaryPhotos = false;
    // errorMsg = '';
    // successMsg = '';
    function VehiclesComponent(
    // public vehicleDbService: VehicleDbService,
    // private authService: AuthService,
    // public route: ActivatedRoute
    ) {
    }
    VehiclesComponent.prototype.ngOnInit = function () {
        // this.fetchAllVehicles();
        // this.authService.user.subscribe(
        //   user => {
        //     if (user === {} as User) {
        //       return;
        //     }
        //     if (user.email !== 'kubanam1995@gmail.com') {
        //       return;
        //     }
        //     else {
        //       this.showForAdmin = true;
        //     }
        //   },
        //   error => {
        //     this.errorMsg = `Nie udało się załadować danych.`;
        //   });
    };
    VehiclesComponent = __decorate([
        core_1.Component({
            selector: 'app-vehicles',
            templateUrl: './vehicles.component.html',
            styleUrls: ['./vehicles.component.css']
        })
    ], VehiclesComponent);
    return VehiclesComponent;
}());
exports.VehiclesComponent = VehiclesComponent;
