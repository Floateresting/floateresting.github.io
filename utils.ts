/**
 * Parse query strings and replace them in their <input> tags by id
 * @param keys keys to look for
 */
function queryToInput(...keys: string[]) {
    let map = new Map<string, string>();
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