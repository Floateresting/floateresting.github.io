inputs = [
    '#fg',
    '#bg',
    '#w',
    '#h',
    '#d'
].map(i => $(i).get(0) as HTMLInputElement);

// parse query string if possible
queryToInput(...inputs.map(i => i.id));
updateColors();

$('button').on('click', () => {
    updateColors();
    var ms = new Minesweeper(
        $('table').get(0) as HTMLTableElement,
        ...inputs.slice(2).map(i => +i.value)
    );
    $('tbody').empty();
    ms.initialize();
    $('td').each(function (i) {
        $(this).on('click', () => ms.openAt(i));
        $(this).on('contextmenu', () => { ms.flagAt(i); return false; });
    });
});

$('button').trigger('click');