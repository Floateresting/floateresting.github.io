"use strict";
var s = $('#subtract');
var sinput = s.find('.input');
var stime = s.find('.timestamp');
var getTime = function (d) { return d.getTime() / 1000; };
sinput.on('input', function () {
    // convert to dates and check of all dates are valid
    var dates = Array.from(sinput).map(function (e) { return Time.stod(e.innerText.replace(/\s/g, '')); });
    if (dates.some(function (d) { return isNaN(d.valueOf()); }))
        return;
    var _a = dates.map(function (d) { return getTime(d); }), start = _a[0], end = _a[1];
    var diff = end - start;
    stime[0].innerText = start.toString();
    stime[1].innerText = end.toString();
    s.find('.output').text(Time.itod(diff));
});
//# sourceMappingURL=index.js.map