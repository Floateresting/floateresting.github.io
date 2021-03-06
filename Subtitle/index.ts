declare const YT: any;

// './LuckyStar.vtt' '26W2_I64nlA' Lucky Star episode 02 at 14:08
const VTTPATH = './Danshikousei.vtt'
const YTID = 'fGhnitjA1Ks'

async function getFile(path: string){
    let s = '';
    await $.get(path, f => s = f);
    return s;
}

// @ts-ignore
let player: YT.Player;
let $vtt = $('#vtt');
let sub: VTT;
getFile(VTTPATH).then(s => {
    sub = new VTT($vtt, s);
});

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
        videoId: YTID,
        events: {
            'onStateChange': onPlayerStateChange,
        },
    });
}
