"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var vehicle_db_service_1 = require("./vehicle-db.service");
var firestore_1 = require("@angular/fire/firestore");
var storage_1 = require("@angular/fire/storage");
describe('Vehicle-db', function () {
    var vehicleDb;
    // httpTestingCntroller: HttpTestingController
    var angularFireStorageSpy;
    var angularFirestoreSpy;
    beforeEach(function () {
        angularFireStorageSpy = jasmine.createSpyObj('AngularFireStore', ["collection", "doc", "valueChanges"]);
        angularFireStorageSpy = jasmine.createSpyObj('AngularFireStorage', ["ref", "delete", "toPromise"]);
        testing_1.TestBed.configureTestingModule({
            providers: [
                vehicle_db_service_1.VehicleDbService,
                { provide: firestore_1.AngularFirestore, useValue: angularFirestoreSpy },
                { provide: storage_1.AngularFireStorage, useValue: angularFirestoreSpy }
            ]
        });
        vehicleDb = testing_1.TestBed.inject(vehicle_db_service_1.VehicleDbService);
    });
    it("should fetch profile data from AngularFirestore", function () {
    });
});
