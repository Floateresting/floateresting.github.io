"use strict";
var s = $('#subtract');
var sinput = s.find('.input');
var stime = s.find('.timestamp');
var getTime = function (d) { return d.getTime() / 100; };
sinput.on('input', function () {
    var dates = Array.from(sinput).map(function (e) { return Time.stod(e.innerText.replace(/\s/g, '')); });
    console.log(dates);
    if (dates.some(function (d) { return isNaN(d.valueOf()); }))
        return;
    console.log('not rejected');
    var _a = dates.map(function (d) { return getTime(d); }), start = _a[0], end = _a[1];
    var diff = end - start;
    stime[0].innerText = start.toString();
    stime[1].innerText = end.toString();
    s.find('.output').text(Time.itod(diff));
});
