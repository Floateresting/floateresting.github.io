interface Subtitle {
    start: number;
    end: number;
    subtitle: string;
}

class VTT {
    subtitles: Subtitle[];
    constructor(vtt: string) {
        this.subtitles = this.parse(vtt);
    }

    private toSeconds(t: string): number {
        let s = 0.0;
        t.split(':').forEach(p => s = s * 60 + parseFloat(p));
        return s;
    }

    parse(vtt: string) {
        let subs: Subtitle[] = [];
        let lines: string[];
        let start: number, end: number;
        // slice(1) because the first line is 'WEBVTT'
        for (let cue of vtt.split('\n\n').map(c => c.trim()).slice(1)) {
            lines = cue.split('\n');
            // first line is the timestamp
            [start, end] = lines.shift()!
                .split(' --> ')
                .map(l => this.toSeconds(l));

            subs.push({
                start: start,
                end: end,
                // the rest is subtitle
                subtitle: lines.join('\n')
            });
        }

        return subs;
    }

    play($element: JQuery, currentTime: Function) {
        let subs = this.subtitles;
        console.log(subs);
        let next = 0, now: number;
        let interval = setInterval(function () {
            // stop the interval when reaches the end
            if (next == subs.length) {
                clearInterval(interval);
                $element.text('');
                console.log('done');
                return;
            }

            now = currentTime();
            console.log(now);
            // if new cue arrives
            if (subs[next].start < now) {
                $element.text(subs[next++].subtitle);
                // else if current cue ends
            } else if (next && now < subs[next - 1].end) {
                $element.text('');
            }
        }, 1000);
    }
}