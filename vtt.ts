function toSeconds(t: string) {
    let s = 0.0;
    if (t) {
        for (let p of t.split(':')) {
            s = s * 60 + parseFloat(p);
        }
    }
    return s;
}
