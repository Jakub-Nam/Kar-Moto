"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var user_model_1 = require("./user.model");
var AuthService = /** @class */ (function () {
    function AuthService(afAuth) {
        this.afAuth = afAuth;
        this.emptyUser = {
            email: '',
            password: '',
            id: '',
            _token: '',
            _tokenExpirationDate: null,
            get token() {
                if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
                    return null;
                }
                return this._token;
            }
        };
        this.user = new rxjs_1.BehaviorSubject(this.emptyUser);
    }
    AuthService.prototype.login = function (email, password) {
        return this.afAuth.signInWithEmailAndPassword(email, password);
    };
    AuthService.prototype.autoLogin = function () {
        var localStorageData = JSON.parse(localStorage.getItem('userData') || '{}');
        if (localStorageData) {
            var userData = JSON.parse(localStorage.getItem('userData') || '{}');
            if (!userData) {
                return;
            }
            var loadedUser = new user_model_1.User(userData.email, userData.password, userData.id, userData._token, new Date(userData._tokenExpirationDate));
            if (loadedUser.token) {
                this.user.next(loadedUser);
            }
            this.login(userData.email, userData.password);
        }
        else {
            return;
        }
    };
    AuthService.prototype.logout = function () {
        this.user.next(this.emptyUser);
        this.afAuth.signOut();
        localStorage.clear();
    };
    AuthService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
