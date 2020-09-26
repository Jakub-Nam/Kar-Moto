"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.VehiclesComponent = void 0;
var core_1 = require("@angular/core");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var VehiclesComponent = /** @class */ (function () {
    function VehiclesComponent(vehicleDbService, authService) {
        this.vehicleDbService = vehicleDbService;
        this.authService = authService;
        this.zeroVehicles = false;
        this.vehicles = []; // Array<Vehicle>
        this.showVehicle = false;
        this.faTrash = free_solid_svg_icons_1.faTrash;
        this.showForAdmin = false;
        this.filters = {
            brand: '',
            priceLow: 0,
            highestPrice: 0,
            lowestMileage: 0,
            highestMileage: 0
        };
        this.deleteAlert = false;
        this.deletedMainPhotoInStorage = false;
        this.deletedPhotosURLs = false;
        this.deletedMainDocument = false;
        this.deletedSecondaryPhotos = false;
        this.errorMsg = '';
        this.successMsg = '';
    }
    VehiclesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fetchAllVehicles();
        this.authService.user.subscribe(function (user) {
            if (user === null) {
                return;
            }
            if (user.email !== 'kubanam1995@gmail.com') {
                return;
            }
            else {
                _this.showForAdmin = true;
            }
        }, function (error) {
            _this.errorMsg = "Nie uda\u0142o si\u0119 za\u0142adowa\u0107 danych.";
        });
    };
    VehiclesComponent.prototype.noneVehicles = function () {
        if (this.vehicles.length === 0) {
            this.zeroVehicles = true;
        }
    };
    VehiclesComponent.prototype.fetchAllVehicles = function () {
        var _this = this;
        this.vehicleDbService.fetchAllVehicles()
            .subscribe(function (response) {
            if (!response.length) {
                _this.vehicles = [];
                _this.zeroVehicles = true;
                return;
            }
            response.forEach(function (vehicleData) {
                var simpleVehicle = vehicleData.payload.doc.data();
                var vehicle = simpleVehicle;
                _this.vehicles.push(vehicle);
            });
            _this.zeroVehicles = false;
        }, function (error) {
            _this.errorMsg = "Wyst\u0105pi\u0142 b\u0142\u0105d dotycz\u0105cy serwera.";
        });
    };
    VehiclesComponent.prototype.filter = function ($event) {
        this.filters.brand = $event.brand;
        this.filters.priceLow = $event.priceLow;
        this.filters.highestPrice = $event.highestPrice;
        this.filters.lowestMileage = $event.lowestMileage;
        this.filters.highestMileage = $event.highestMileage;
    };
    VehiclesComponent.prototype.toggleDeleteAlert = function (vehicle, event) {
        if (!this.deleteAlert) {
            event.stopPropagation();
        }
        this.toggleDeleteAlertEvent = event;
        this.deleteAlert = !this.deleteAlert;
        this.vehicleToDelete = vehicle;
    };
    VehiclesComponent.prototype.deleteVehicle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var vehicle, storagePath, collectionId, documentId;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vehicle = this.vehicleToDelete;
                        storagePath = vehicle.path;
                        return [4 /*yield*/, this.vehicleDbService.deleteMainPhotoInStorage(storagePath)
                                .then(function (res) {
                                _this.deletedMainPhotoInStorage = true;
                            })["catch"](function (err) {
                                _this.errorMsg = "Wyst\u0105pi\u0142 b\u0142\u0105d dotycz\u0105cy serwera.";
                            })];
                    case 1:
                        _a.sent();
                        collectionId = vehicle.timestamp;
                        return [4 /*yield*/, this.vehicleDbService.deleteSecondaryPhotos(collectionId)
                                .then(function (querySnapshot) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    querySnapshot.forEach(function (doc) {
                                        var path = doc.data().path;
                                        var storageRef = _this.vehicleDbService.storage.ref(path);
                                        storageRef["delete"]();
                                        _this.deletedSecondaryPhotos = true;
                                    });
                                    return [2 /*return*/];
                                });
                            }); })["catch"](function (error) {
                                _this.errorMsg = "Wyst\u0105pi\u0142 b\u0142\u0105d dotycz\u0105cy serwera.";
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.vehicleDbService.deletePhotosURLs(collectionId)
                                .then(function (querySnapshot) {
                                querySnapshot.forEach(function (doc) {
                                    _this.vehicleDbService.db.collection("" + collectionId).doc(doc.id)["delete"]()
                                        .then(function () {
                                        _this.deletedPhotosURLs = true;
                                    })["catch"](function (error) {
                                        _this.errorMsg = "Wyst\u0105pi\u0142 b\u0142\u0105d dotycz\u0105cy serwera.";
                                    });
                                });
                            })["catch"](function (error) {
                                _this.errorMsg = "Wyst\u0105pi\u0142 b\u0142\u0105d dotycz\u0105cy serwera.";
                            })];
                    case 3:
                        _a.sent();
                        documentId = vehicle.payload.doc.id;
                        return [4 /*yield*/, this.vehicleDbService.deleteMainDocument(documentId)
                                .then(function () {
                                _this.deletedMainDocument = true;
                                if (_this.deletedMainPhotoInStorage === true &&
                                    _this.deletedSecondaryPhotos === true &&
                                    _this.deletedMainDocument === true &&
                                    _this.deletedPhotosURLs === true) {
                                    _this.successMsg = "Poprawnie usuni\u0119to obiekt.";
                                }
                            })["catch"](function (error) {
                                _this.errorMsg = "Wyst\u0105pi\u0142 b\u0142\u0105d dotycz\u0105cy serwera.";
                            })];
                    case 4:
                        _a.sent();
                        this.toggleDeleteAlert(vehicle, this.toggleDeleteAlertEvent);
                        return [2 /*return*/];
                }
            });
        });
    };
    VehiclesComponent.prototype.showOneVehicle = function (vehicle) {
        this.vehicle = vehicle;
        this.showVehicle = true;
    };
    VehiclesComponent.prototype.hideOneVehicle = function () {
        this.showVehicle = false;
    };
    VehiclesComponent.prototype.hideSuccessAlert = function () {
        this.successMsg = '';
    };
    VehiclesComponent.prototype.hideErrorAlert = function () {
        this.errorMsg = '';
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
