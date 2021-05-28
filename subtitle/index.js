"use strict";
// @ts-ignore
var player;
var $vtt = $('#vtt');
var sub = new VTT($vtt);
// @ts-ignore
function onPlayerStateChange(_a) {
    var target = _a.target, data = _a.data;
    switch (data) {
        case YT.PlayerState.PLAYING:
            sub.startAt(player.getCurrentTime());
            break;
        case YT.PlayerState.PAUSED:
            sub.stop();
            break;
    }
}
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: 720,
        width: 1280,
        videoId: '26W2_I64nlA',
        events: {
            'onStateChange': onPlayerStateChange,
        },
    });
}
