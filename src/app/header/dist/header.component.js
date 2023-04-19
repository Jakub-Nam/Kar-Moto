"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(authService) {
        this.authService = authService;
        this.isBtnVisability = true;
        this.toggleNavbar = true;
        this.showAdminInterface = false;
        this.marked = false;
        this.isNavbarCollapsed = true;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.changeBtnVisability();
        this.autoLogin();
    };
    HeaderComponent.prototype.logout = function () {
        this.authService.logout();
        this.showAdminInterface = false;
        this.marked = false;
    };
    HeaderComponent.prototype.changeBtnVisability = function () {
        var _this = this;
        this.authService.user.subscribe(function (user) {
            if (user === _this.authService.emptyUser) {
                _this.isBtnVisability = true;
            }
            else {
                _this.isBtnVisability = false;
                return;
            }
        });
    };
    HeaderComponent.prototype.autoLogin = function () {
        if (localStorage.length > 0) {
            this.authService.autoLogin();
        }
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css']
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
