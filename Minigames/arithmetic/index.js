"use strict";
inputs = [
    '#fg',
    '#bg',
    '#o',
    '#xmin',
    '#xmax',
    '#ymin',
    '#ymax'
].map(i => $(i).get(0));
// parse query string if possible
queryToInput(...inputs.map(i => i.id));
updateColors();
let arith = new Arithmetic($('table').get(0), ...inputs.slice(3).map(i => +i.value));
let value;
let operators = inputs[2].value.split('');
let answer = arith.generate(operators);
$('td[contenteditable=true]').on('input', function () {
    value = this.innerText;
    if (+value == answer) {
        answer = arith.generate(operators);
    }
    else if (value == '-\n' || !isNaN(+value))
        return;
    this.innerText = '\n';
});
