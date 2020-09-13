var txt='', poplen=100;
function getval(proto) {
	var val = '', parts=[], tmp=0, lwr=0, upr=0, flt=0;
	switch (Object.prototype.toString.call(proto)) {
		case Object.prototype.toString.call(''):
			// attempt to split the string and randomize
			parts = proto.split('-');
			if (parts.length > 1) {
				//val = proto;
				// randomize within range
				if (parseInt(parts[0]) == parseFloat(parts[0])) {
					lwr = parseInt(parts[0]);
				} else {
					flt = 1;
					lwr = parseFloat(parts[0]);
				};
				if (parseInt(parts[1]) == parseFloat(parts[1])) {
					lwr = parseInt(parts[1]);
				} else {
					flt = 1;
					lwr = parseFloat(parts[1]);
				};
				if (flt == 1) {
					val = (Math.random() * (parseFloat(parts[1]) - parseFloat(parts[0]))) + parseFloat(parts[0]);
				} else {
					val = Math.floor(Math.random() * (parseInt(parts[1]) - parseInt(parts[0])) + parseInt(parts[0]));
				};
			} else {
				// else return value
				if (parseInt(parts[0]) == parseFloat(parts[0])) {
					val = parseInt(parts[0]);
				} else {
					lwr = parseFloat(parts[0]);
				};
			};
			break;
		case Object.prototype.toString.call([]):
			// pick one from the list
			val = proto[Math.floor(Math.random() * proto.length)];
			break;
	};
	return val;
};
function gen(struct, population) {
	var txt="", vals=[], full=[], parts=[], proportion=[], segments={}, newpop=[],each, partot;
	//console.log("\ngen pop " + population.length);
	//console.log("gen struct" + JSON.stringify(struct));
	for (each in struct) {
		//console.log("gen each " + each + ' ' + population.length);
		switch (Object.prototype.toString.call(struct[each])) {
			case Object.prototype.toString.call(''):
			case Object.prototype.toString.call([]):
				//console.log("value");
				vals.push(each);
				break;
			case Object.prototype.toString.call({}):
				//console.log("obj");
				if (struct[each]['.'].length > 0) {
					// apply as partial
					//console.log("partial " + struct[each]['.']);
					proportion.push(each);
					//gen(struct[each], population)
				} else {
					// apply to all members of pop
					//console.log("full");
					full.push(each);
					//gen(struct[each], population)
				};
				break;
		};
	};
	
	//console.log("gen vals " + JSON.stringify(vals));
	for (indx in population) {
		// add values to each entry
		for (each in vals) {
			population[indx][vals[each]] = getval(struct[vals[each]]);
		};
	};
	// process sub-objects
	//console.log("gen full " + JSON.stringify(full));
	for (each in full) {
		//console.log("gen struct["+full[each]+"] = " + JSON.stringify(struct[full[each]]));
		gen(struct[full[each]], population);
		//population = newpop;
	};
	//console.log("gen proportion " + JSON.stringify(proportion));
	// make proportional segments
	if (proportion.length > 0) {
		// generate a proportionally sized list of keys
		for (each in proportion) {
			for (indx=0; indx<getval(struct[proportion[each]]['.']); indx++) {
				parts.push(proportion[each]);
			};
			segments[proportion[each]] = [];
		};
		//console.log("gen segments " + JSON.stringify(segments));
		for (each in population) {
			segments[getval(parts)].push(population[each])
		}
		newpop = [];
		for (each in segments) {
			//console.log("gen segments " + JSON.stringify(segments[each]));
			//console.log("gen prop "+full[each]+"] = " + JSON.stringify(struct[full[each]]));
			gen(struct[each], segments[each]);
			//population = newpop;
		};
	};
	//console.log("gen newpop " + newpop.length);
	//console.log("\ngen pop " + population.length);
	/**/
	return population
};
var fullpop = [];
var newpop = [];
var indx = 0;
//console.log("fullpop " + fullpop.length);
for (indx=0; indx<poplen; indx++) {
	fullpop.push({});
};
//console.log("fullpop " + fullpop.length);
pop = gen(skel, fullpop);
