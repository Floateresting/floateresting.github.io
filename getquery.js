/**
 * Parse query strings
 * @param keys required keys
 * If all keys are found in the query string, returns the dictionary, else null
 */
export default function getQuery(...keys) {
    let m = new Map();
    let p;
    window.location.search.substr(1).split('&').forEach(q => {
        p = q.split('=');
        if (keys.includes(p[0])) {
            m.set(p[0], p[1]);
        }
    });
    return m.size == keys.length ? m : undefined;
}
