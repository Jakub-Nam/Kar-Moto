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
exports.AuthComponent = void 0;
var core_1 = require("@angular/core");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var free_solid_svg_icons_2 = require("@fortawesome/free-solid-svg-icons");
var free_solid_svg_icons_3 = require("@fortawesome/free-solid-svg-icons");
var user_model_1 = require("./user.model");
var AuthComponent = /** @class */ (function () {
    function AuthComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.registrationView = false;
        this.hideSpinner = true;
        this.error = '';
        this.faEye = free_solid_svg_icons_1.faEye;
        this.faEyeSlash = free_solid_svg_icons_2.faEyeSlash;
        this.faEnvelope = free_solid_svg_icons_3.faEnvelope;
        this.hidePassword = true;
        this.adminInterface = false;
        this.successAlert = '';
        this.errorAlert = '';
    }
    AuthComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.user.subscribe(function (user) {
            if (user) {
                if (user.email !== 'kubanam1995@gmail.com') {
                    return;
                }
                else {
                    _this.adminInterface = true;
                }
            }
            else {
                return;
            }
        }, function (err) { return _this.errorAlert = err; });
    };
    AuthComponent.prototype.togglePassword = function () {
        this.hidePassword = !this.hidePassword;
    };
    AuthComponent.prototype.onSubmit = function (form) {
        var _this = this;
        if (!form.valid) {
            return;
        }
        var email = form.value.email;
        var password = form.value.password;
        this.authService.login(email, password)
            .then(function (userCredential) { return __awaiter(_this, void 0, void 0, function () {
            var token, date, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = '';
                        return [4 /*yield*/, userCredential.user.getIdTokenResult().then(function (response) { return token = response.token; })];
                    case 1:
                        date = _a.sent();
                        return [4 /*yield*/, userCredential.user.getIdTokenResult().then(function (response) { return date = response.expirationTime; })];
                    case 2:
                        _a.sent();
                        user = new user_model_1.User(userCredential.user.email, password, userCredential.user.uid, token, date);
                        this.authService.user.next(user);
                        console.log(this.authService.user.next(user), '1');
                        console.log(this.authService.user.next(null), '2');
                        localStorage.setItem('userData', JSON.stringify(user));
                        this.successAlert = 'success';
                        return [2 /*return*/];
                }
            });
        }); })["catch"](function (error) {
            _this.errorAlert = error;
        });
        form.reset();
        this.router.navigate(['/']);
    };
    AuthComponent.prototype.onSwitchMode = function (form) {
        this.registrationView = true;
    };
    AuthComponent.prototype.showRegistrationView = function () {
        this.registrationView = true;
    };
    AuthComponent.prototype.hideSuccessAlert = function () {
        this.successAlert = '';
    };
    AuthComponent.prototype.hideErrorAlert = function () {
        this.errorAlert = '';
    };
    AuthComponent = __decorate([
        core_1.Component({
            selector: 'app-auth',
            templateUrl: './auth.component.html',
            styleUrls: ['./auth.component.css']
        })
    ], AuthComponent);
    return AuthComponent;
}());
exports.AuthComponent = AuthComponent;
