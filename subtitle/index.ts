declare const YT: any;

// @ts-ignore
let player: YT.Player;
let $vtt = $('#vtt');
let sub = new VTT($vtt);

// @ts-ignore
function onPlayerStateChange({ target, data }: YT.OnStateChangeEvent){
    switch(data){
        case YT.PlayerState.PLAYING:
            sub.startAt(player.getCurrentTime());
            break;
        case YT.PlayerState.PAUSED:
            sub.stop();
            break;
    }
}

function onYouTubeIframeAPIReady(){
    player = new YT.Player('player', {
        height: 720,
        width: 1280,
        videoId: '26W2_I64nlA',
        events: {
            'onStateChange': onPlayerStateChange,
        },
    });
}
