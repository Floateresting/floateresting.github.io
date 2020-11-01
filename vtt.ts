interface Subtitle {
    start: number;
    end: number;
    subtitle: string;
}

class VTT {
    subtitles: Subtitle[];
    e: JQuery;
    isPaused: boolean;
    interval: number = 0;
    i = 0.1;
    constructor(vtt: string, $element: JQuery) {
        this.subtitles = this.parse(vtt);
        this.e = $element.text('');
        this.isPaused = false;
    }

    private toSeconds(t: string): number {
        let s = 0.0;
        t.split(':').forEach(p => s = s * 60 + parseFloat(p));
        return s;
    }

    private getIndex(time: number): number {
        let i = 0;
        while (i < this.subtitles.length) {
            if (time < this.subtitles[i++].end) {
                break;
            }
        }
        return i - 1;
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

    stop() {
        clearInterval(this.interval);
    }

    startAt(time: number) {
        this.isPaused = false;
        let next = this.getIndex(time);
        let t: number;
        console.log(next);
        this.interval = setInterval(() => {
            // stop the interval when reaches the end
            if (next == this.subtitles.length) {
                this.stop();
                this.e.text('');
                return;
            }

            time += this.i;

            // if new line arrives
            if (this.subtitles[next].start < time) {
                this.e.text(this.subtitles[next++].subtitle);
                return;
            }
            // else if current line ends
            if (next) {
                t = this.subtitles[next - 1].end;
                // if the subtitle just ended
                if (time - this.i < t && t < time) {
                    this.e.text('');
                }
            }
        }, this.i * 1000);
    }
}