import { TestBed } from "@angular/core/testing";
import { VehicleDbService } from "./vehicle-db.service"
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";

describe('Vehicle-db', () => {
    let vehicleDb: VehicleDbService;
    // httpTestingCntroller: HttpTestingController

    let angularFireStorageSpy: any;
    let angularFirestoreSpy: any;

    beforeEach(() => {
        angularFireStorageSpy = jasmine.createSpyObj('AngularFireStore', ["collection", "doc", "valueChanges"]);
        angularFireStorageSpy = jasmine.createSpyObj('AngularFireStorage', ["ref", "delete", "toPromise"]);

        TestBed.configureTestingModule({
            providers: [
                VehicleDbService,
                { provide: AngularFirestore, useValue: angularFirestoreSpy },
                { provide: AngularFireStorage, useValue: angularFirestoreSpy }
            ]
        })
        vehicleDb = TestBed.inject(VehicleDbService);
    })

    it("should fetch profile data from AngularFirestore", () => {
    })
})