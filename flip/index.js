"use strict";
inputs = [
    '#fg',
    '#bg',
    '#w',
    '#h',
    '#d'
].map(i => $(i).get(0));
// parse query string if possible
queryToInput(...inputs.map(i => i.id));
updateColors();
$('button').on('click', () => {
    updateColors();
    var fp = new Flip($('table').get(0), ...inputs.slice(2).map(i => +i.value));
    $('tbody').empty();
    fp.initialize();
    $('td').each(function (i) {
        $(this).on('click', () => fp.flipAt(i));
    });
});
$('button').trigger('click');
