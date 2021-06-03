"use strict";
var Time = /** @class */ (function () {
    function Time() {
    }
    /**
     * yyyymmdd to Date
     */
    Time.prototype.stod = function (s) {
        return new Date(s.slice(0, 4) + "-" + s.slice(4, 6) + "-" + s.slice(6));
    };
    /**
     * Date to yyyymmdd
     */
    Time.prototype.dtos = function (d) {
        return d.toISOString().slice(0, 10).replace(/-/g, '');
    };
    /**
     * ms to day
     */
    Time.prototype.itod = function (i) {
        return i / 86400000;
    };
    /**
     * add day to Date
     */
    Time.prototype.add = function (d, ndays) {
        d.setDate(d.getDate() + ndays);
        return d;
    };
    return Time;
}());
