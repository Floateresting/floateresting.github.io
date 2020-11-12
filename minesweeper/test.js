"use strict";
let size = 100;
var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
var poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
$(s).attr({ 'width': size, 'height': size });
let cs = [
    [size / 3, size / 2],
    [size / 3 * 2, size / 2],
    [size / 3 * 2, size / 4],
    [size / 3, size / 4],
    [size / 3, size / 4 * 3]
];
let p;
cs.forEach(c => {
    p = s.createSVGPoint();
    p.x = Math.round(c[0]);
    p.y = Math.round(c[1]);
    poly.points.appendItem(p);
});
s.append(poly);
$('body').append(s);
