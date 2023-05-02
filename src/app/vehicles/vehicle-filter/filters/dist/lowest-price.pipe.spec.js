"use strict";
exports.__esModule = true;
var lowest_price_pipe_1 = require("./lowest-price.pipe");
describe('LowestPricePipe', function () {
    var pipe;
    beforeEach(function () {
        pipe = new lowest_price_pipe_1.LowestPricePipe();
    });
    it('create an instance', function () {
        expect(pipe).toBeTruthy();
    });
    it('should filter vehicles with price greater than or equal to input value', function () {
        var vehicles = [
            { id: 1, price: 10000 },
            { id: 2, price: 20000 },
            { id: 3, price: 30000 },
        ];
        var filteredVehicles = pipe.transform(vehicles, 20000);
        expect(filteredVehicles.length).toEqual(2);
        expect(filteredVehicles).toContain(vehicles[1]);
        expect(filteredVehicles).toContain(vehicles[2]);
    });
    it('should return all vehicles when input value is undefined', function () {
        var vehicles = [
            { id: 1, price: 10000 },
            { id: 2, price: 20000 },
            { id: 3, price: 30000 },
        ];
        var filteredVehicles = pipe.transform(vehicles, undefined);
        expect(filteredVehicles.length).toEqual(vehicles.length);
        expect(filteredVehicles).toEqual(vehicles);
    });
});
