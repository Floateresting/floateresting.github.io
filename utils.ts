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

/**
 * Parse query strings and replace them in their <input> tags by id
 * @param keys keys to look for
 */
function queryToInput(...keys: string[]) {
    let pair;
    window.location.search.substr(1).split('&').forEach(q => {
        pair = q.split('=');
        if (keys.includes(pair[0])) {
            ($('#' + pair[0])[0] as HTMLInputElement).value = pair[1];
        }
    });
}

async function sleep(ms: number) {
    return new Promise(r => setTimeout(r, ms));
}

/**
 * Generate an array from 0 to n
 * @param n length of the array
 */
function array(n: number) {
    return Array.from(Array(n), (_, i) => i);
}

/**
 * Fisher-Yates shuffle algorithm
 * @param a 
 */
function shuffle(a: number[]) {
    for (let i = a.length, j: number; i--;) {
        j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}