"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileDataEditComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ProfileDataEditComponent = /** @class */ (function () {
    function ProfileDataEditComponent(db) {
        this.db = db;
        this.successAlert = false;
        this.errorAlert = false;
        this.profileForm = new forms_1.FormGroup({
            name: new forms_1.FormControl(''),
            email: new forms_1.FormControl(''),
            phoneNumber: new forms_1.FormControl(''),
            street: new forms_1.FormControl(''),
            postCode: new forms_1.FormControl(''),
            city: new forms_1.FormControl('')
        });
    }
    ProfileDataEditComponent.prototype.ngOnInit = function () {
    };
    ProfileDataEditComponent.prototype.onSubmitChangeProfile = function (form) {
        var _this = this;
        this.db.collection('profiles').doc('mainProfile').set({
            name: form.value.name,
            phoneNumber: form.value.phoneNumber,
            email: form.value.email,
            street: form.value.street,
            postCode: form.value.postCode,
            city: form.value.city
        })
            .then(function (event) {
            _this.successAlert = true;
            form.reset();
        })["catch"](function (error) {
            _this.errorAlert = true;
        });
        form.reset();
    };
    ProfileDataEditComponent.prototype.hideSuccessAlert = function () {
        this.successAlert = false;
    };
    ProfileDataEditComponent.prototype.hideErrorAlert = function () {
        this.errorAlert = false;
    };
    ProfileDataEditComponent = __decorate([
        core_1.Component({
            selector: 'app-profile-data-edit',
            templateUrl: './profile-data-edit.component.html',
            styleUrls: ['./profile-data-edit.component.css']
        })
    ], ProfileDataEditComponent);
    return ProfileDataEditComponent;
}());
exports.ProfileDataEditComponent = ProfileDataEditComponent;