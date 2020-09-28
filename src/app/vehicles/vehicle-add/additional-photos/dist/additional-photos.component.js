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
exports.AdditionalPhotosComponent = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var AdditionalPhotosComponent = /** @class */ (function () {
    function AdditionalPhotosComponent(automotiveDbService, formService, storage, db, imageCompress) {
        this.automotiveDbService = automotiveDbService;
        this.formService = formService;
        this.storage = storage;
        this.db = db;
        this.imageCompress = imageCompress;
        this._inputTimestamp = '';
        this.files = [];
        this.errorAlert = false;
    }
    Object.defineProperty(AdditionalPhotosComponent.prototype, "inputTimestamp", {
        get: function () {
            return this._inputTimestamp;
        },
        set: function (inputTimestamp) {
            this._inputTimestamp = "" + inputTimestamp;
        },
        enumerable: false,
        configurable: true
    });
    AdditionalPhotosComponent.prototype.ngOnInit = function () {
    };
    AdditionalPhotosComponent.prototype.onSelectPhotos = function (event) {
        var _a;
        (_a = this.files).push.apply(_a, event.addedFiles);
    };
    AdditionalPhotosComponent.prototype.onRemovePhotos = function (event) {
        this.files.splice(this.files.indexOf(event), 1);
    };
    AdditionalPhotosComponent.prototype.pushPhotos = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.compressAndPushPhotos()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AdditionalPhotosComponent.prototype.compressAndPushPhotos = function () {
        for (var _i = 0, _a = this.files; _i < _a.length; _i++) {
            var file = _a[_i];
            this.selectedFileToCompress(file);
        }
    };
    AdditionalPhotosComponent.prototype.selectedFileToCompress = function (file) {
        var _this = this;
        if (file) {
            var reader = new FileReader();
            reader.onload = function (ev) {
                _this.localUrl = ev.target.result;
                _this.compressFile(_this.localUrl);
            };
            reader.readAsDataURL(file);
        }
    };
    AdditionalPhotosComponent.prototype.compressFile = function (image) {
        var _this = this;
        var orientation = -1;
        this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
        this.imageCompress.compressFile(image, orientation, 50, 50)
            .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.imgResultAfterCompress = result;
                this.localCompressedURl = result;
                this.sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024);
                this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
                return [2 /*return*/];
            });
        }); });
    };
    AdditionalPhotosComponent.prototype.dataURItoBlob = function (dataURI) {
        var byteString = window.atob(dataURI);
        var arrayBuffer = new ArrayBuffer(byteString.length);
        var int8Array = new Uint8Array(arrayBuffer);
        for (var i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([int8Array], { type: 'image/jpeg' });
        this.startUpload(blob);
    };
    AdditionalPhotosComponent.prototype.startUpload = function (file) {
        var _this = this;
        var photoTimestamp = Date.now();
        var path = "vehicles/" + photoTimestamp;
        var ref = this.storage.ref(path);
        var task = this.storage.upload(path, file);
        var snapshot = task.snapshotChanges();
        snapshot.pipe(operators_1.finalize(function () { return __awaiter(_this, void 0, void 0, function () {
            var downloadURL;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ref.getDownloadURL().toPromise()];
                    case 1:
                        downloadURL = _a.sent();
                        this.db.collection(this.inputTimestamp).add({
                            downloadURL: downloadURL,
                            path: path
                        });
                        return [2 /*return*/];
                }
            });
        }); })).subscribe();
    };
    AdditionalPhotosComponent.prototype.clearDropZone = function () {
        this.files = [];
    };
    __decorate([
        core_1.Input()
    ], AdditionalPhotosComponent.prototype, "inputTimestamp");
    AdditionalPhotosComponent = __decorate([
        core_1.Component({
            selector: 'app-additional-photos',
            templateUrl: './additional-photos.component.html',
            styleUrls: ['./additional-photos.component.css']
        })
    ], AdditionalPhotosComponent);
    return AdditionalPhotosComponent;
}());
exports.AdditionalPhotosComponent = AdditionalPhotosComponent;
