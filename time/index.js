const f = $('#from');
const d = $('#diff');
const t = $('#to');

/**
 * yyyymmdd to Date
 */
function stod(s){
	return new Date(`${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6)}`);
}

/**
 * Date to yyyymmdd
 */
function dtos(d){
	return d.toISOString().slice(0, 10).replace(/-/g, '');
}

/**
 * ms to day
 */
function itod(i){
	return i / 86400000;
}

/**
 * add day to Date
 */
function add(d, n){
	d.setDate(d.getDate() + n);
	return d;
}

function val(e){
	return e.val().length === 8;
}

f.on('input', () => {
	if(!val(f)) return;
	if(val(t)){
		d.val(itod(stod(t.val()) - stod(f.val())));
	}else if(d.val()){
		t.val(dtos(add(stod(f.val()), +d.val())));
	}
});
