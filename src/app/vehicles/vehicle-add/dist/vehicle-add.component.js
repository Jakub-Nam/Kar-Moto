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
exports.VehicleAddComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var forms_1 = require("@angular/forms");
var VehicleAddComponent = /** @class */ (function () {
    function VehicleAddComponent(vehicleDbService, storage, db, imageCompress) {
        this.vehicleDbService = vehicleDbService;
        this.storage = storage;
        this.db = db;
        this.imageCompress = imageCompress;
        this.vehicleWasSent = false;
        this.error = false;
        this.oneFile = false;
        this.isHovering = false;
        this.vehicleForm = new forms_1.FormGroup({
            name: new forms_1.FormControl(''),
            brand: new forms_1.FormControl(''),
            price: new forms_1.FormControl(''),
            carMileage: new forms_1.FormControl(''),
            productionYear: new forms_1.FormControl('')
        });
        this.file = [];
        this.brandList = ['BMW', 'Honda', 'Junak', 'KAWASAKI', 'KTM', 'KYMCO', 'Suzuki', 'Romet', 'Yamaha', 'Zipp'];
    }
    VehicleAddComponent.prototype.ngOnInit = function () {
    };
    VehicleAddComponent.prototype.onSelectPhoto = function (event) {
        this.file = event.addedFiles;
        this.selectFile();
    };
    VehicleAddComponent.prototype.selectFile = function () {
        var _this = this;
        if (this.file && this.file[0]) {
            var reader = new FileReader();
            reader.onload = function (ev) {
                _this.localUrl = ev.target.result;
                _this.compressFile(_this.localUrl);
            };
            reader.readAsDataURL(this.file[0]);
        }
    };
    VehicleAddComponent.prototype.compressFile = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var orientation;
            var _this = this;
            return __generator(this, function (_a) {
                orientation = -1;
                this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
                this.imageCompress.compressFile(image, orientation, 50, 50)
                    .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                    var imageBlob;
                    return __generator(this, function (_a) {
                        this.imgResultAfterCompress = result;
                        this.localCompressedURl = result;
                        this.sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024);
                        imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
                        this.compressedFile = imageBlob;
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    VehicleAddComponent.prototype.dataURItoBlob = function (dataURI) {
        var byteString = window.atob(dataURI);
        var arrayBuffer = new ArrayBuffer(byteString.length);
        var int8Array = new Uint8Array(arrayBuffer);
        for (var i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([int8Array], { type: 'image/jpeg' });
        return blob;
    };
    VehicleAddComponent.prototype.onSubmitPushVehicle = function (myForm) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.startUpload(this.compressedFile, myForm)];
                    case 1:
                        _a.sent();
                        this.file = [];
                        this.additionalPhotos.clearDropZone();
                        return [2 /*return*/];
                }
            });
        });
    };
    VehicleAddComponent.prototype.onRemove = function (event) {
        this.file.splice(this.file.indexOf(event), 1);
    };
    VehicleAddComponent.prototype.startUpload = function (file, myForm) {
        var _this = this;
        var timestamp = Date.now();
        this.timestamp = timestamp;
        var path = "vehicles/" + timestamp;
        var ref = this.storage.ref(path);
        this.task = this.storage.upload(path, file);
        this.snapshot = this.task.snapshotChanges().pipe(operators_1.finalize(function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, ref.getDownloadURL().toPromise()];
                    case 1:
                        _a.downloadURL = _b.sent();
                        return [4 /*yield*/, this.db.collection('vehicles').doc("a" + timestamp).set({
                                name: this.vehicleForm.value.name,
                                brand: this.vehicleForm.value.brand,
                                price: this.vehicleForm.value.price,
                                carMileage: this.vehicleForm.value.carMileage,
                                downloadURL: this.downloadURL,
                                timestamp: timestamp,
                                path: path
                            })];
                    case 2:
                        _b.sent();
                        myForm.reset();
                        this.vehicleWasSent = true;
                        return [2 /*return*/];
                }
            });
        }); }), operators_1.catchError(function (err) {
            _this.errorMessage = err;
            return rxjs_1.throwError(_this.errorMessage);
        }));
        this.additionalPhotos.pushPhotos();
    };
    VehicleAddComponent.prototype.hideVehicleWasSentAlert = function () {
        this.vehicleWasSent = false;
    };
    VehicleAddComponent.prototype.hideErrorAlert = function () {
        this.errorMessage = false;
    };
    __decorate([
        core_1.ViewChild('AdditionalPhotosComponent')
    ], VehicleAddComponent.prototype, "additionalPhotos");
    VehicleAddComponent = __decorate([
        core_1.Component({
            selector: 'app-vehicle-add',
            templateUrl: './vehicle-add.component.html',
            styleUrls: ['./vehicle-add.component.css']
        })
    ], VehicleAddComponent);
    return VehicleAddComponent;
}());
exports.VehicleAddComponent = VehicleAddComponent;
