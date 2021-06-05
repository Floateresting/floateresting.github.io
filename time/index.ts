let s = $('#subtract');
let sinput = s.find('.input');
let stime = s.find('.timestamp');

let getTime = (d: Date) => d.getTime() / 100;

sinput.on('input', () => {

    let dates = Array.from(sinput).map(e => Time.stod(e.innerText.replace(/\s/g, '')));
    console.log(dates);
    if(dates.some(d => isNaN(d.valueOf()))) return;

    console.log('not rejected');
    let [ start, end ] = dates.map(d => getTime(d));
    let diff = end - start;
    stime[0].innerText = start.toString();
    stime[1].innerText = end.toString();
    s.find('.output').text(Time.itod(diff));
});
