function display_old(population) {
    var x, txt = "", each;
    var oldpop, newpop;
    cols = ["firstname", "lastname", "age", "years", "background", "skin", "hair", "eyes", "sex", "gender", "int", "chr", "wis", "str", "dex", "con", ];
    txt += "<table border='1'>";
    keys = [];
    // add headers for columns
    txt += "<tr>"
    //for (x in population[0]) {
    for (x in cols) {
        txt += "<th>";
        txt += cols[x];
        keys.push(x);
        txt += "</th>";
    };
    //oldpop = filtsort(population);
    oldpop = filtsort(pop);
    txt += "</tr>";
    for (x in oldpop) {
        txt += "<tr>";
        //for (each in population[0]) {
        for (each in cols) {
            txt += "<td>";
            txt += oldpop[x][cols[each]];
            txt += "</td>";
        };
        txt += "</tr>";
    }
    txt += "</table>"
    document.getElementById("demo").innerHTML = txt;
};
function dshort(x) {
	var txt='';
	// build a single row description
	// name
	txt += '<td colspan="2">';
	txt += '<a onclick="slong(' + x + ');">';
	//txt += '<a onclick="console.log(\'clicked!\');">';
	txt += pop[x]['firstname'] + ' ';
	if (pop[x]['nickname'].length > 0) { txt += '"'+pop[x]['nickname']+'" '; };
	txt += pop[x]['lastname'] + ' ';
	txt += '</a>';
	txt += '</td>';
	// gender, race, age
	txt += '<td colspan="2">';
	txt += ''+ pop[x]['gender'] + ' ';
	txt += ''+pop[x]['age'] + ' ';
	txt += ''+pop[x]['race'] + ' ';
	txt += '('+pop[x]['years'] + ') ';
	txt += ''+ pop[x]['background'] + ' (' + pop[x]['level'] + ') ';
	txt += '</td>';
	// background
	txt += '<td colspan="2">';
	txt += ''+pop[x]['height'] + ' inches ';
	txt += ''+ parseInt(parseInt(pop[x]['height']) * parseFloat(pop[x]['weight'])) + ' lbs. ';
	txt += ''+pop[x]['skin'] + ' skin, ';
	txt += ''+pop[x]['hair'] + ' hair, ';
	txt += ''+pop[x]['eyes'] + ' eyes ';
	txt += '</td>';
	
	return txt;
};

function sshort(x) {
	var txt;
	console.log('sshort('+x+')');
	txt = dshort(x);
	document.getElementById(''+x+'_row').innerHTML = txt;
	console.log('sshort('+x+') '+txt.length);
};

function slong(x) {
	console.log('slong('+x+')');
	txt = dlong(x);
	document.getElementById(''+x+'_row').innerHTML = txt;
	console.log('dlong('+x+') '+txt.length);
};

function dlong(x) {
	var txt='';
	// build a multi line comprehensive display
	txt += '<td colspan="6"><table border="1">';
	txt += "<tr>";
	// name
	txt += '<td colspan="2">';
	txt += '<a onclick="sshort(' + x + ');">';
	txt += ''+pop[x]['firstname'] + ' ';
	if (pop[x]['nickname'].length > 0) { txt += '"'+pop[x]['nickname']+'" '; };
	txt += pop[x]['lastname'];
	txt += '</a>';
	txt += '</td>';
	// race
	txt += '<td colspan="2">'+pop[x]['age'] + ' ';
	txt += ''+pop[x]['race'] + ' ';
	txt += '('+pop[x]['years'] + ') </td>';
	// background
	txt += '<td colspan="2">'+pop[x]['background'] + ' ';
	txt += '('+pop[x]['level'] + ') </td>';
	txt += "</tr>";
	// physical desc 1
	txt += "<tr>";
	txt += '<td colspan="1">';
	txt += '<b>Int</b> '+pop[x]['int'] + ' ';
	txt += "</td>";
	txt += '<td colspan="1">';
	txt += '<b>Str</b> '+pop[x]['str'] + ' ';
	txt += "</td>";
	txt += '<td colspan="2">';
	txt += '<b>height</b> '+pop[x]['height'] + ' inches ';
	txt += "</td>";
	txt += '<td colspan="2">';
	txt += '<b>skin</b> '+pop[x]['skin'] + ' ';
	txt += "</td>";
	txt += "</tr>";
	// physical desc 2
	txt += "<tr>";
	txt += '<td colspan="1">';
	txt += '<b>wis</b> '+pop[x]['wis'] + ' ';
	txt += "</td>";
	txt += '<td colspan="1">';
	txt += '<b>dex</b> '+pop[x]['dex'] + ' ';
	txt += "</td>";
	txt += '<td colspan="2">';
	txt += '<b>weight</b> '+ parseInt(parseInt(pop[x]['height']) * parseFloat(pop[x]['weight'])) + ' lbs. ';
	txt += "</td>";
	txt += '<td colspan="2">';
	txt += '<b>hair</b> '+pop[x]['hair'] + ' ';
	txt += "</td>";
	txt += "</tr>";
	// physical desc 3
	txt += "<tr>";
	txt += '<td colspan="1">';
	txt += '<b>chr</b> '+pop[x]['chr'] + ' ';
	txt += "</td>";
	txt += '<td colspan="1">';
	txt += '<b>con</b> '+pop[x]['con'] + ' ';
	txt += "</td>";
	txt += '<td colspan="2">';
	txt += '<b>gender</b> '+ pop[x]['gender'] + ' ' + pop[x]['sex'] + ' ';
	txt += "</td>";
	txt += '<td colspan="2">';
	txt += '<b>eyes</b> '+pop[x]['eyes'] + ' ';
	txt += "</td>";
	txt += "</tr>";
	// background detail
	txt += "<tr>";
	txt += '<td colspan="6">';
	txt += '<b>Background:</b> '+pop[x]['desc'] + ' ';
	txt += "</td>";
	txt += "</tr>";
	// specialty
	txt += "<tr>";
	txt += '<td colspan="6">';
	txt += '<b>specialty:</b> '+pop[x]['specialty'] + ' ';
	txt += "</td>";
	txt += "</tr>";
	// trait
	txt += "<tr>";
	txt += '<td colspan="6">';
	txt += '<b>trait:</b> '+pop[x]['trait'] + ' ';
	txt += "</td>";
	txt += "</tr>";
	// ideal
	txt += "<tr>";
	txt += '<td colspan="6">';
	txt += '<b>ideal:</b> '+pop[x]['ideal'] + ' ';
	txt += "</td>";
	txt += "</tr>";
	// bond
	txt += "<tr>";
	txt += '<td colspan="6">';
	txt += '<b>bond:</b> '+pop[x]['bond'] + ' ';
	txt += "</td>";
	txt += "</tr>";
	// flaw
	txt += "<tr>";
	txt += '<td colspan="6">';
	txt += '<b>flaw:</b> '+pop[x]['flaw'] + ' ';
	txt += "</td>";
	txt += "</tr>";
	// notes
	txt += '<tr><td colspan="6">Notes:</td></tr>';
	for (item in pop[x]['notes']) {
	    txt += '<tr><td colspan="6">' + pop[x]['notes'][item] + '</td></tr>';
	};
	// notes input
	txt += '<tr><td colspan="6">';
	txt += '<textarea rows="4" width="100%" cols="80" id="'+x+'_note"></textarea>';
	//txt += '<input type="text" rows="4" width="100%" id="'+x+'_note"></input>';
	txt += '</td></tr>';
	// close out and return
	txt += "</table>";
	txt += "</td>";
	return txt
};
function display(population) {
    var x, txt = "", each;
    var oldpop, newpop;
    cols = ["firstname", "lastname", "age", "years", "background", "skin", "hair", "eyes", "sex", "gender", "int", "chr", "wis", "str", "dex", "con", ];
    txt += "<table border='1'>";
    keys = [];
    //oldpop = filtsort(population);
    oldpop = filtsort(pop);
    for (x in oldpop) {
		// line 1: name2 age race2 class level2
		txt += '<tr id="' + x + '_row">';
		txt += dshort(x);
		txt += "</tr>";
		// line 1: name2 age race2 class level2
		//txt += "<tr>";
		//txt += dlong(x);
		//txt += "</tr>";

		txt += '</form>';
    }
    txt += "</table>"
    document.getElementById("demo").innerHTML = txt;
};
