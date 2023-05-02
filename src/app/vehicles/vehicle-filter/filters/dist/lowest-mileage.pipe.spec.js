"use strict";
exports.__esModule = true;
var lowest_mileage_pipe_1 = require("./lowest-mileage.pipe");
describe('LowestMileagePipe', function () {
    var pipe;
    beforeEach(function () {
        pipe = new lowest_mileage_pipe_1.LowestMileagePipe();
    });
    it('create an instance', function () {
        expect(pipe).toBeTruthy();
    });
    it('should filter vehicles with mileage greater than or equal to input value', function () {
        var vehicles = [
            { id: 1, carMileage: 10000 },
            { id: 2, carMileage: 20000 },
            { id: 3, carMileage: 30000 },
        ];
        var filteredVehicles = pipe.transform(vehicles, 20000);
        expect(filteredVehicles.length).toEqual(2);
        expect(filteredVehicles).toContain(vehicles[1]);
        expect(filteredVehicles).toContain(vehicles[2]);
    });
    it('should return all vehicles when input value is undefined', function () {
        var vehicles = [
            { id: 1, carMileage: 10000 },
            { id: 2, carMileage: 20000 },
            { id: 3, carMileage: 30000 },
        ];
        var filteredVehicles = pipe.transform(vehicles, undefined);
        expect(filteredVehicles.length).toEqual(vehicles.length);
        expect(filteredVehicles).toEqual(vehicles);
    });
});
