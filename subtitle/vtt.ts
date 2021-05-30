interface Subtitle{
    start: number;
    end: number;
    content: string;
}

class VTT{
    subtitles: Subtitle[];
    $display: JQuery;
    interval: number = 0;
    refreshRate = 0.1;

    constructor($element: JQuery, subtitles: string){
        this.subtitles = this.parse(subtitles);
        this.$display = $element.css('display', '').text('');
    }

    private toSeconds(timeline: string): number{
        let s = 0.0;
        timeline.split(':').forEach(p => s = s * 60 + parseFloat(p));
        return s;
    }

    private getIndex(time: number): number{
        let i = 0;
        while(i < this.subtitles.length){
            if(time < this.subtitles[i++].end){
                break;
            }
        }
        return i - 1;
    }

    parse(vtt: string){
        let subs: Subtitle[] = [];
        let lines: string[];
        let start: number, end: number;
        // slice(1) because the first line is 'WEBVTT'
        for(let cue of vtt.split('\r\n\r\n').map(c => c.trim()).slice(1)){
            lines = cue.split('\n');
            // first line is the timestamp
            [ start, end ] = lines.shift()!
            .split(' --> ')
            .map(l => this.toSeconds(l));

            subs.push({
                start: start,
                end: end,
                // the rest is subtitle
                content: lines.join('\n'),
            });
        }

        return subs;
    }

    stop(){
        clearInterval(this.interval);
    }

    startAt(time: number){
        let next = this.getIndex(time);
        let end: number;
        this.interval = setInterval(() => {
            // stop the interval when reaches the end
            if(next == this.subtitles.length){
                this.stop();
                this.$display.text('');
                return;
            }

            time += this.refreshRate;

            // if new line arrives
            if(this.subtitles[next].start < time + this.refreshRate){
                this.$display.text(this.subtitles[next++].content);
                return;
            }
            // no need to remove the subtitle if it's the 0th one
            if(next){
                end = this.subtitles[next - 1].end;
                // if the subtitle just ended
                if(time - this.refreshRate < end && end < time){
                    this.$display.text('');
                }
            }
        }, this.refreshRate * 1000);
    }
}
