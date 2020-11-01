interface Subtitle {
    start: number;
    end: number;
    subtitle: string;
}

class VTT {
    subtitles: Subtitle[] = [];
    constructor(vtt: string) {

    }

    private toSeconds(t: string): number {
        let s = 0.0
        t.split(':').forEach(p => s = s * 60 + parseFloat(p));
        return s;
    }

    parse(vtt: string) {
        let lines: string[];
        let start: number, end: number;
        // slice(1) because the first line is 'WEBVTT'
        for (let cue of vtt.split('\n\n').map(c => c.trim()).slice(1)) {
            lines = cue.split('\n');
            // first line is the timestamp
            [start, end] = lines.shift()!
                .split('  -->  ')
                .map(l => this.toSeconds(l));

            this.subtitles.push({
                start: start,
                end: end,
                // the rest is subtitle
                subtitle: lines.join('\n')
            });
        }
    }
}