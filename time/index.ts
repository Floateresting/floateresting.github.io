let s = $('#subtract');
let sinput = s.find('.input');
let stime = s.find('.timestamp');

let getTime = (d: Date) => d.getTime() / 1000;

sinput.on('input', () => {
    // convert to dates and check of all dates are valid
    let dates = Array.from(sinput).map(e => Time.stod(e.innerText.replace(/\s/g, '')));
    if(dates.some(d => isNaN(d.valueOf()))) return;

    let [ start, end ] = dates.map(d => getTime(d));
    let diff = end - start;
    stime[0].innerText = start.toString();
    stime[1].innerText = end.toString();
    s.find('.output').text(Time.itod(diff));
});
