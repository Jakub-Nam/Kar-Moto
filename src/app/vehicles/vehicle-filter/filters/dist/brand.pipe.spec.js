"use strict";
exports.__esModule = true;
var brand_pipe_1 = require("./brand.pipe");
describe('BrandPipe', function () {
    var pipe;
    beforeEach(function () {
        pipe = new brand_pipe_1.BrandPipe();
    });
    it('create an instance', function () {
        expect(pipe).toBeTruthy();
    });
    it('should filter vehicles with brand equal to input value', function () {
        var vehicles = [
            { id: 1, brand: 'Toyota' },
            { id: 2, brand: 'BWM' },
            { id: 3, brand: 'Opel' },
        ];
        var filteredVehicles = pipe.transform(vehicles, 'BWM');
        expect(filteredVehicles.length).toEqual(1);
        expect(filteredVehicles).toContain(vehicles[1]);
    });
    it('should return all vehicles when input value is undefined', function () {
        var vehicles = [
            { id: 1, brand: 'Toyota' },
            { id: 2, brand: 'BWM' },
            { id: 3, brand: 'Opel' },
        ];
        var filteredVehicles = pipe.transform(vehicles, undefined);
        expect(filteredVehicles.length).toEqual(vehicles.length);
        expect(filteredVehicles).toEqual(vehicles);
    });
});
