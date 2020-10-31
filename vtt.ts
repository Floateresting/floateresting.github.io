function toSeconds(t: string) {
    let s = 0.0;
    if (t) {
        for (let p of t.split(':')) {
            s = s * 60 + parseFloat(p);
        }
    }
    return s;
}

function strip(s: string) {
    return s.replace(/^\s+|\s+$/g, '');
}

var subtitles: { [id: number]: {} } = {};
var vtt;
function play(element: JQuery) {
    vtt = element.text().replace(/\r\n|\r|\n/g, '\n');
    element.text('');

    let a: string[];
    let start: string, end: string, sub: string;
    for (let s of vtt.split('\n\n').slice(1)) {
        a = s.split('\n');
        if (a.length > 1) {
            [start, end] = a[0].split(' --> ');
            sub = a.slice(1).join('\n')

            subtitles[toSeconds(start)] = { start: start, end: end, subtitle: sub };
        }
    }
    console.log(subtitles);
} 