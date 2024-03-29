import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleFilterComponent } from './vehicle-filter.component';

describe('VehicleFilterComponent', () => {
  let component: VehicleFilterComponent;
  let fixture: ComponentFixture<VehicleFilterComponent>;
  let emitSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleFilterComponent);
    component = fixture.componentInstance;
    emitSpy = spyOn(component.filtered, 'emit');
    fixture.detectChanges();
  });

  it('should emit the form values on ngDoCheck', () => {
    component.brandModel = 'Ford';
    component.lowestPrice = 5000;
    component.highestPrice = 10000;
    component.lowestMileage = 10000;
    component.highestMileage = 50000;
    component.ngDoCheck();
    expect(emitSpy).toHaveBeenCalledWith({
      brand: 'Ford',
      priceLow: 5000,
      highestPrice: 10000,
      lowestMileage: 10000,
      highestMileage: 50000
    });
  });
});
