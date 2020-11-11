const inputs: HTMLInputElement[] = [
    '#fg',
    '#bg',
    '#w',
    '#h',
    '#d'
].map(i => $(i).get(0) as HTMLInputElement)

function updateColors() {
    $('style').text(`:root{--fg:${inputs[0].value};--bg:${inputs[1].value};}`)
}

// parse query string if possible
queryToInput(...inputs.map(i => i.id));
updateColors();

$('button').on('click', () => {
    updateColors();
    var ms = new Minesweeper(
        $('table').get(0) as HTMLTableElement,
        ...inputs.map(i => +i.value).slice(2)
    );
    $('tbody').empty();
    ms.initialize();
    $('td').each(function (i) {
        this.addEventListener('click', () => ms.openAt(i));
    });
});

$('button').trigger('click');