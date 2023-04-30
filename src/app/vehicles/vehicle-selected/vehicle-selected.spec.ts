import { AngularFireStorage } from '@angular/fire/storage';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InjectionToken } from '@angular/core';
import { VehicleSelectedComponent } from './vehicle-selected.component';
import { VehicleDbService } from 'src/app/shared/vehicle-db.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environment/environment';
import { ActivatedRoute } from '@angular/router';

describe('VehicleSelectedComponent', () => {
    let component: VehicleSelectedComponent;
    let fixture: ComponentFixture<VehicleSelectedComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VehicleSelectedComponent],
            providers: [
                VehicleDbService,
                AngularFireStorage,
                {
                    provide: InjectionToken,
                    useValue: { name: '[DEFAULT]' }
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: {
                                get: () => 'some id'
                            }
                        }
                    }
                },
            ],
            imports: [
                AngularFireModule.initializeApp(environment.firebaseConfig),
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VehicleSelectedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

