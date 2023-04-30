import { DocumentChangeType } from '@firebase/firestore-types';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { Vehicle } from 'src/app/shared/interfaces/vehicle';
import { VehicleDbService } from 'src/app/shared/vehicle-db.service';
import { VehicleSelectedComponent } from './vehicle-selected.component';
import { DocumentData } from '@angular/fire/firestore/interfaces';

describe('VehicleSelectedComponent', () => {
    let component: VehicleSelectedComponent;
    let fixture: ComponentFixture<VehicleSelectedComponent>;
    let vehicleDbServiceSpy: jasmine.SpyObj<VehicleDbService>;

    beforeEach(() => {
        const activatedRouteStub = {
            snapshot: {
                paramMap: {
                    get: () => '12345' // or any other id you want to use for testing
                }
            }
        };
        const vehicleDbServiceSpyObj = jasmine.createSpyObj('VehicleDbService', [
            'fetchMainPhoto',
            'fetchAdditionalVehiclePhotos'
        ]);
        TestBed.configureTestingModule({
            declarations: [VehicleSelectedComponent],
            providers: [
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                NgbCarouselConfig,
                { provide: VehicleDbService, useValue: vehicleDbServiceSpyObj }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(VehicleSelectedComponent);
        component = fixture.componentInstance;
        vehicleDbServiceSpy = TestBed.inject(VehicleDbService) as jasmine.SpyObj<VehicleDbService>;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch main photo', () => {
        // brand: string;
        // carMileage: number;
        // name: string;
        // path: string;
        // downloadURL: string;
        // price: number;
        // timestamp: number;

        const mockVehicle: Vehicle = {
            brand: 'Toyota',
            carMileage: 1000,
            name: 'T-500',
            path: './',
            downloadURL: "",
            price: 5,
            timestamp: 15
        };
        vehicleDbServiceSpy.fetchMainPhoto.and.returnValue(of(mockVehicle));
        component.fetchMainPhoto('12345');
        expect(component.vehicle).toEqual(mockVehicle);
        expect(vehicleDbServiceSpy.fetchMainPhoto).toHaveBeenCalledWith('12345');
    });

    it('should fetch additional vehicle photos', () => {
        const mockURLs: Array<{ type: DocumentChangeType; payload: DocumentData }> = [      { type: 'added', payload: { imageUrl: 'image1.jpg' } },      { type: 'added', payload: { imageUrl: 'image2.jpg' } }    ];
        vehicleDbServiceSpy.fetchAdditionalVehiclePhotos.and.returnValue(of(mockURLs));
        component.fetchAdditionalVehiclePhotos('12345');
        expect(component.vehicleURLs).toEqual(mockURLs);
        expect(vehicleDbServiceSpy.fetchAdditionalVehiclePhotos).toHaveBeenCalledWith('12345');
    });

});
