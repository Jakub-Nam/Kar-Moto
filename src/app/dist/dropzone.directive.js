"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DropzoneDirective = void 0;
var core_1 = require("@angular/core");
var DropzoneDirective = /** @class */ (function () {
    function DropzoneDirective() {
        this.dropped = new core_1.EventEmitter();
        this.hovered = new core_1.EventEmitter();
    }
    DropzoneDirective.prototype.onDrop = function ($event) {
        $event.preventDefault();
        this.dropped.emit($event.dataTransfer.files);
        this.hovered.emit(false);
    };
    DropzoneDirective.prototype.onDragOver = function ($event) {
        $event.preventDefault();
        this.hovered.emit(true);
    };
    DropzoneDirective.prototype.onDragLeave = function ($event) {
        $event.preventDefault();
        this.hovered.emit(false);
    };
    __decorate([
        core_1.Output()
    ], DropzoneDirective.prototype, "dropped");
    __decorate([
        core_1.Output()
    ], DropzoneDirective.prototype, "hovered");
    __decorate([
        core_1.HostListener('drop', ['$event'])
    ], DropzoneDirective.prototype, "onDrop");
    __decorate([
        core_1.HostListener('dragover', ['$event'])
    ], DropzoneDirective.prototype, "onDragOver");
    __decorate([
        core_1.HostListener('dragleave', ['$event'])
    ], DropzoneDirective.prototype, "onDragLeave");
    DropzoneDirective = __decorate([
        core_1.Directive({
            selector: '[appDropzone]'
        })
    ], DropzoneDirective);
    return DropzoneDirective;
}());
exports.DropzoneDirective = DropzoneDirective;
