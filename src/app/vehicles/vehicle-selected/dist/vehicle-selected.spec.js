"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var router_1 = require("@angular/router");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var rxjs_1 = require("rxjs");
var vehicle_db_service_1 = require("src/app/shared/vehicle-db.service");
var vehicle_selected_component_1 = require("./vehicle-selected.component");
describe('VehicleSelectedComponent', function () {
    var component;
    var fixture;
    var vehicleDbServiceSpy;
    beforeEach(function () {
        var activatedRouteStub = {
            snapshot: {
                paramMap: {
                    get: function () { return '12345'; } // or any other id you want to use for testing
                }
            }
        };
        var vehicleDbServiceSpyObj = jasmine.createSpyObj('VehicleDbService', [
            'fetchMainPhoto',
            'fetchAdditionalVehiclePhotos'
        ]);
        testing_1.TestBed.configureTestingModule({
            declarations: [vehicle_selected_component_1.VehicleSelectedComponent],
            providers: [
                { provide: router_1.ActivatedRoute, useValue: activatedRouteStub },
                ng_bootstrap_1.NgbCarouselConfig,
                { provide: vehicle_db_service_1.VehicleDbService, useValue: vehicleDbServiceSpyObj }
            ]
        }).compileComponents();
        fixture = testing_1.TestBed.createComponent(vehicle_selected_component_1.VehicleSelectedComponent);
        component = fixture.componentInstance;
        vehicleDbServiceSpy = testing_1.TestBed.inject(vehicle_db_service_1.VehicleDbService);
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
    it('should fetch main photo', function () {
        // brand: string;
        // carMileage: number;
        // name: string;
        // path: string;
        // downloadURL: string;
        // price: number;
        // timestamp: number;
        var mockVehicle = {
            brand: 'Toyota',
            carMileage: 1000,
            name: 'T-500',
            path: './',
            downloadURL: "",
            price: 5,
            timestamp: 15
        };
        vehicleDbServiceSpy.fetchMainPhoto.and.returnValue(rxjs_1.of(mockVehicle));
        component.fetchMainPhoto('12345');
        expect(component.vehicle).toEqual(mockVehicle);
        expect(vehicleDbServiceSpy.fetchMainPhoto).toHaveBeenCalledWith('12345');
    });
    it('should fetch additional vehicle photos', function () {
        var mockURLs = [{ type: 'added', payload: { imageUrl: 'image1.jpg' } }, { type: 'added', payload: { imageUrl: 'image2.jpg' } }];
        vehicleDbServiceSpy.fetchAdditionalVehiclePhotos.and.returnValue(rxjs_1.of(mockURLs));
        component.fetchAdditionalVehiclePhotos('12345');
        expect(component.vehicleURLs).toEqual(mockURLs);
        expect(vehicleDbServiceSpy.fetchAdditionalVehiclePhotos).toHaveBeenCalledWith('12345');
    });
});
