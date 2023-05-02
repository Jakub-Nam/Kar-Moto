"use strict";
exports.__esModule = true;
var highest_price_pipe_1 = require("./highest-price.pipe");
describe('HighestPricePipe', function () {
    var pipe;
    beforeEach(function () {
        pipe = new highest_price_pipe_1.HighestPricePipe();
    });
    it('create an instance', function () {
        expect(pipe).toBeTruthy();
    });
    it('should filter vehicles with price less than or equal to input value', function () {
        var vehicles = [
            { id: 1, price: 10000 },
            { id: 2, price: 20000 },
            { id: 3, price: 30000 },
        ];
        var filteredVehicles = pipe.transform(vehicles, 20000);
        expect(filteredVehicles.length).toEqual(2);
        expect(filteredVehicles).toContain(vehicles[0]);
        expect(filteredVehicles).toContain(vehicles[1]);
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
