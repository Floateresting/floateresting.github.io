"use strict";
const inputs = ['#width', '#height', '#density'].map(i => $(i).get(0));
// parse query string 
queryToInput(...inputs.map(i => i.id));
$('button').on('click', () => {
    var ms = new Minesweeper($('table').get(0), ...inputs.map(i => +i.value));
    $('tbody').empty();
    ms.initialize();
    $('td').each(function (i) {
        this.addEventListener('click', () => ms.openAt(i));
    });
});
$('button').trigger('click');
