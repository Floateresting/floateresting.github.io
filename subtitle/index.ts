var player: YT.Player;
var $v = $('#vtt');
var sub = new VTT($v);
function onPlayerStateChange({ target, data }: YT.OnStateChangeEvent) {
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
        }
    });
}