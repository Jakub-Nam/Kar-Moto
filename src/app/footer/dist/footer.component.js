"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FooterComponent = void 0;
var core_1 = require("@angular/core");
var FooterComponent = /** @class */ (function () {
    function FooterComponent(vehicleDbService) {
        this.vehicleDbService = vehicleDbService;
        this.profileData = {
            name: '',
            email: '',
            phoneNumber: 0,
            street: '',
            postCode: '',
            city: ''
        };
    }
    FooterComponent.prototype.ngOnInit = function () {
        this.fetchProfileData();
    };
    FooterComponent.prototype.fetchProfileData = function () {
        var _this = this;
        return this.vehicleDbService.fetchProfileData()
            .subscribe(function (next) {
            if (!next) {
                window.alert('Problem with fetch profile data');
            }
            _this.profileData = next;
        }, function (error) {
            window.alert('There is a error with fetch profile data!');
        });
    };
    FooterComponent = __decorate([
        core_1.Component({
            selector: 'app-footer',
            templateUrl: './footer.component.html',
            styleUrls: ['./footer.component.css']
        })
    ], FooterComponent);
    return FooterComponent;
}());
exports.FooterComponent = FooterComponent;
