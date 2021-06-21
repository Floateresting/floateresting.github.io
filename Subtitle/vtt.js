"use strict";
var VTT = /** @class */ (function () {
    function VTT($element, subtitles) {
        this.interval = 0;
        this.refreshRate = 0.1;
        this.subtitles = this.parse(subtitles);
        this.$display = $element.css('display', '').html('');
    }
    VTT.prototype.toSeconds = function (timeline) {
        var s = 0.0;
        timeline.split(':').forEach(function (p) { return s = s * 60 + parseFloat(p); });
        return s;
    };
    VTT.prototype.getIndex = function (time) {
        var i = 0;
        while (i < this.subtitles.length) {
            if (time < this.subtitles[i++].end) {
                break;
            }
        }
        return i - 1;
    };
    VTT.prototype.parse = function (vtt) {
        var _a;
        var _this = this;
        var subs = [];
        var lines;
        var start, end;
        // slice(1) because the first line is 'WEBVTT'
        for (var _i = 0, _b = vtt.split('\r\n\r\n').map(function (c) { return c.trim(); }).slice(1); _i < _b.length; _i++) {
            var cue = _b[_i];
            lines = cue.split('\n');
            // first line is the timestamp
            _a = lines.shift()
                .split(' --> ')
                .map(function (l) { return _this.toSeconds(l); }), start = _a[0], end = _a[1];
            subs.push({
                start: start,
                end: end,
                // the rest is subtitle
                content: lines.join('\n'),
            });
        }
        if (!subs.length)
            throw Error('subtitle is empty!');
        return subs;
    };
    VTT.prototype.stop = function () {
        clearInterval(this.interval);
    };
    VTT.prototype.startAt = function (time) {
        var _this = this;
        var next = this.getIndex(time);
        var end;
        this.interval = setInterval(function () {
            // stop the interval when reaches the end
            if (next == _this.subtitles.length) {
                _this.stop();
                _this.$display.html('');
                return;
            }
            time += _this.refreshRate;
            // if new line arrives
            if (_this.subtitles[next].start < time + _this.refreshRate) {
                _this.$display.html(_this.subtitles[next++].content);
                return;
            }
            // no need to remove the subtitle if it's the 0th one
            if (next) {
                end = _this.subtitles[next - 1].end;
                // if the subtitle just ended
                if (time - _this.refreshRate < end && end < time) {
                    _this.$display.html('');
                }
            }
        }, this.refreshRate * 1000);
    };
    return VTT;
}());
