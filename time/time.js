"use strict";
var Time = /** @class */ (function () {
    function Time() {
    }
    /**
     * yyyymmdd to Date
     */
    Time.stod = function (s) {
        return new Date(s.slice(0, 4) + "-" + s.slice(4, 6) + "-" + s.slice(6));
    };
    /**
     * Date to yyyymmdd
     */
    Time.dtos = function (d) {
        return d.toISOString().slice(0, 10).replace(/-/g, '');
    };
    /**
     * ms to day
     */
    Time.itod = function (i) {
        return i / 86400;
    };
    /**
     * add day to Date
     */
    Time.add = function (d, ndays) {
        d.setDate(d.getDate() + ndays);
        return d;
    };
    return Time;
}());
