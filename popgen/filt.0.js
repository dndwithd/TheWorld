// setup info for display script
// filter / sort by multiple (key, comparator, value) sets
//fs = [['age', '>', 15], ['age', '<', 55], ['age', '+', ''], ['str', '-', ''], ];
fs = [];
fsopt = ['>', '<','>=', '<=', '=', '+', '-'];
function filter_sort(population, fltsrt=[]) {
    var oldpop, newpop;
    oldpop = population.slice();
    newpop = [];
    //document.getElementById("ts").innerHTML += "<br><br>filter_sort()";
    for (indx in fltsrt) {
        // move relevant oldpop into newpop
        //document.getElementById("ts").innerHTML += "<br>" + fs[indx];
        newpop = [];
        switch(fltsrt[indx][1]) {
            case '>':
                for (each in oldpop) {
                    if (oldpop[each][fltsrt[indx][0]] > fltsrt[indx][2]) {
                        newpop.push(oldpop[each]);
                    };
                };
                break;
            case '<':
                for (each in oldpop) {
                    if (oldpop[each][fltsrt[indx][0]] < fltsrt[indx][2]) {
                        newpop.push(oldpop[each]);
                    };
                };
                break;
            case '>=':
                for (each in oldpop) {
                    if (oldpop[each][fltsrt[indx][0]] >= fltsrt[indx][2]) {
                        newpop.push(oldpop[each]);
                    };
                };
                break;
            case '<=':
                for (each in oldpop) {
                    if (oldpop[each][fltsrt[indx][0]] <= fltsrt[indx][2]) {
                        newpop.push(oldpop[each]);
                    };
                };
                break;
            case '=':
                for (each in oldpop) {
                    if (oldpop[each][fltsrt[indx][0]] == fltsrt[indx][2]) {
                        newpop.push(oldpop[each]);
                    };
                };
                break;
            case '+':
                // sort ascending
                for (each in oldpop) {
                    pos = 0;
                    for (item in newpop) {
                        if (oldpop[each][fltsrt[indx][0]] > newpop[item][fltsrt[indx][0]]) {
                            pos = item;
                            pos++;
                        };
                    };
                    newpop.splice(pos, 0, oldpop[each]);
                };
                break;
            case '-':
                // sort descending
                for (each in oldpop) {
                    pos = 0;
                    for (item in newpop) {
                        if (oldpop[each][fltsrt[indx][0]] < newpop[item][fltsrt[indx][0]]) {
                            pos = item;
                            pos++;
                        };
                    };
                    newpop.splice(pos, 0, oldpop[each]);
                };
                break;
        };
		console.log('filter_sort: '+oldpop.length+' ? '+fltsrt[indx][0]+' '+fltsrt[indx][1]+' '+fltsrt[indx][2]+' = '+newpop.length);
        oldpop = newpop.slice();
    };
    return newpop;
};
function filtsort(population) {
    // return the filtered and sorted population
    var txt="", keys=[], key, newpop=[], comp, comps=["+", "-", "=", "s"];
    var oldpop, newpop, indx;
    //document.getElementById("ts").innerHTML += "<br><br>filtsort: entry ";
    if (population.length < 1) {
        return [];
    };
    for (key in population[0]) {
    //for (key in fsopt) {
        keys.push(key);
    };
    oldpop = population.slice();
    // start filter/sort
    txt += "<table border='1'>";
    txt += "<tr><td colspan=\"3\">Alteration</td><td colspan=\"2\">Change</td><td colspan=\"3\">Priority</td></tr>";
    txt += "<tr><td colspan=\"3\">Start</td><td colspan=\"2\">" + oldpop.length + "</td><td colspan=\"3\">Reset</td></tr>";
    // filter population
    for (indx in fs) {
        txt += '<tr>';
        for (each in fs[indx]) {
            txt += "<td>" + fs[indx][each] + "</td>";
        };
        if (fs[indx].length > 1) {
            //document.getElementById("ts").innerHTML += "<br><br>filtsort: oldpop " + oldpop.length + " newpop " + newpop.length;
            //document.getElementById("ts").innerHTML += "<br>filtsort: indx " + indx;
            //document.getElementById("ts").innerHTML += "<br>filtsort: fs[indx] " + fs[indx];
            newpop = filter_sort(oldpop.slice(), [fs[indx]]);
            // add column to denote change in length
            //document.getElementById("ts").innerHTML += "<br>filtsort: oldpop " + oldpop.length + " newpop " + newpop.length;
            // report change in length
            //document.getElementById("ts").innerHTML += "<br>filtsort: oldpop " + oldpop.length + " newpop " + newpop.length;
            txt += "<td>" + (newpop.length - oldpop.length) + "</td><td>" + newpop.length + "</td>";
            //txt += "<td>" + oldpop.length + "</td><td>" + newpop.length + "</td>";
            // update working population
            oldpop = newpop.slice();
        };
        // add controls to adjust filters
        txt += "<td><input type=\"button\" value=\"Down\" onclick=\"fs_order(" + indx + ", '+');\"></input></td>";
        txt += "<td><input type=\"button\" value=\"Up\" onclick=\"fs_order(" + indx + ", '-');\"></input></td>";
        txt += "<td><input type=\"button\" value=\"X\" onclick=\"fs_order(" + indx + ", '0');\"></input></td>";
        // close row
        txt += '</tr>';
    };
    // show final result
    txt += "<tr><td colspan=\"3\">Finish</td><td colspan=\"2\">" + oldpop.length + "</td></tr>";
    // add filter / sort
    // add key
    txt += "<tr>"
    txt += "<td><select name=\"key\", id=\"key\">";
    for (key in keys) {
        txt += "<option value=\"" + keys[key] + "\">" + keys[key] + "</option>";
    };
    txt += "</select></td>";
    // add comparison
    txt += "<td><select name=\"comp\" id=\"comp\">";
    for (comp in fsopt) {
        txt += "<option value=\""+ fsopt[comp] +"\">"+ fsopt[comp] +"</option>";
    };
    txt += "</select></td>";
    // add value
    txt += "<td><input type=\"text\", id=\"val\"></input></td>";
    // add update button
    txt += "<td colspan=\"2\"><button type=\"button\" onclick=\"fs_add()\">Add</button></td>";
    // close add filter / sort
    txt += "</tr>";
    txt += "</table>";
    // display results
    document.getElementById("fs").innerHTML = txt;
    // return results
    //return oldpop
    return oldpop; //filter_sort(population)
};

function fs_order(indx, adj) {
    // adjust the order of the filter/sort criteria
    var each, temp = [], newpop=[], indx;
    //document.getElementById("ts").innerHTML += "<br><br>fs_order(" + indx +','+ adj + ")<br>";
    //document.getElementById("ts").innerHTML += "<br>fs_order fs " + fs;
    switch(adj) {
        case '+':
            // move this entry closer to the high
            //document.getElementById("ts").innerHTML += "<br>fs_order fs+ " + fs;
            if (indx < (fs.length-1)) {
                temp = fs[indx];
                fs[indx] = fs[indx + 1];
                fs[indx + 1] = temp;
            };
            //document.getElementById("ts").innerHTML += "<br>fs_order fs+ " + fs;
            break;
        case '-':
            // move this entry closer to the low
            //document.getElementById("ts").innerHTML += "<br>fs_order fs- " + fs;
            if (indx > 0) {
                temp = fs[indx];
                fs[indx] = fs[indx - 1];
                fs[indx - 1] = temp;
            };
            //document.getElementById("ts").innerHTML += "<br>fs_order fs- " + fs;
            break;
        case '0':
            // remove this entry
            //document.getElementById("ts").innerHTML += "delete fs[" + indx + "]<br>"
            //fs.pop(indx);
            delete fs[indx];
            //document.getElementById("ts").innerHTML += fs + '<br>';
            for (each in fs) {
                temp.push(fs[each]);
            };
            //delete temp
            //document.getElementById("ts").innerHTML += temp + '<br>';
            //fs = temp.slice();
            break;
    };
    // rerun filtsort
    newpop = filtsort(pop);
    display(newpop);
};

function fs_add() {
    var newpop=[], oldpop=[], newfs=[], each;
    
    //document.getElementById("ts").innerHTML += "<br><br>fs_add()";
    //document.getElementById("ts").innerHTML += "<br>fs_add key   " + document.getElementById("key").value;
    //document.getElementById("ts").innerHTML += "<br>fs_add comp  " + document.getElementById("comp").value;
    //document.getElementById("ts").innerHTML += "<br>fs_add val   " + document.getElementById("val").value;
    //fs.splice(0, 0, [document.getElementById("key").value, document.getElementById("comp").value, document.getElementById("val").value, ]);
    fs.push([document.getElementById("key").value, document.getElementById("comp").value, document.getElementById("val").value, ]);
    fs_order(0, '-');
};
