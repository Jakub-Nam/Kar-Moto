"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VehicleDbService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var VehicleDbService = /** @class */ (function () {
    function VehicleDbService(storage, db) {
        this.storage = storage;
        this.db = db;
    }
    VehicleDbService.prototype.fetchProfileData = function () {
        return this.db.collection('profiles').doc('mainProfile')
            .valueChanges();
    };
    VehicleDbService.prototype.fetchAllVehicles = function () {
        return this.db.collection('vehicles', function (ref) { return ref
            .orderBy('timestamp', 'desc'); })
            .snapshotChanges();
    };
    VehicleDbService.prototype.fetchMainPhoto = function (path) {
        return this.db.collection('vehicles').doc("a" + path).valueChanges();
    };
    VehicleDbService.prototype.fetchAdditionalVehiclePhotos = function (path) {
        return this.db.collection(path)
            .snapshotChanges()
            .pipe(operators_1.map(function (data) {
            var dataArray = [];
            for (var i = 0; i < data.length; i++) {
                dataArray.push(data[i].payload.doc.data());
            }
            console.log(dataArray);
            return dataArray;
        }));
    };
    VehicleDbService.prototype.deleteMainPhotoInStorage = function (path) {
        return this.storage.ref(path)["delete"]().toPromise();
    };
    VehicleDbService.prototype.deleteSecondaryPhotos = function (collectionId) {
        return this.db.collection("" + collectionId).get().toPromise();
    };
    VehicleDbService.prototype.deleteMainDocument = function (documentId) {
        return this.db.collection('vehicles').doc(documentId)["delete"]();
    };
    VehicleDbService.prototype.deletePhotosURLs = function (collectionId) {
        return this.db.collection("" + collectionId).get().toPromise();
    };
    VehicleDbService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], VehicleDbService);
    return VehicleDbService;
}());
exports.VehicleDbService = VehicleDbService;
