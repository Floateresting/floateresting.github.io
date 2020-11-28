"use strict";
class Arithmetic {
    /**
     * @param t table
     * @param range [ xmin, xmax, ymin, ymax ]
     */
    constructor(t, ...range) {
        this.t = t;
        [this.xmin, this.xmax, this.ymin, this.ymax] = range;
    }
    generate(operators) {
        let operator = operators[Math.floor(Math.random() * operators.length)];
        let x = Math.floor(Math.random() * (this.xmax - this.xmin) + this.xmin).toString();
        let y = Math.floor(Math.random() * (this.ymax - this.ymin) + this.ymin).toString();
        this.t.rows[0].cells[1].innerText = x;
        this.t.rows[1].cells[0].innerText = operator;
        this.t.rows[1].cells[1].innerText = y;
        return eval(x + operator + y);
    }
}
