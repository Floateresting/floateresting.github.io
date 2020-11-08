/**
 * Parse query strings and add them to <input> tags by id
 * @param keys required keys
 * @returns true if query string is valid
 */
function queryToInput(...keys: string[]): boolean {
    let map = new Map<string, string>();
    let pair;
    window.location.search.substr(1).split('&').forEach(q => {
        pair = q.split('=');
        if (keys.includes(pair[0])) {
            map.set(pair[0], pair[1]);
        }
    });
    if (map.size == keys.length) {
        // set the values in <input>
        keys.forEach(k => ($('#' + k)[0] as HTMLInputElement).value = map.get(k)!);
    }
    return map.size == keys.length;
}

async function sleep(ms: number) {
    return new Promise(r => setTimeout(r, ms));
}