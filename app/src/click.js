function buttonClick(clickElement) {
	if(mode === 'move') {
		return;
	} else if(mode === 'paint') {
		if(mapType === 'demprimary' ||
			mapType === 'repprimary') {
			buttonClickPaintPrimary(clickElement);
		} else {
			buttonClickPaint(clickElement);
		}
	} else if(mode === 'ec') {
		buttonClickEC(clickElement);
	}
}

function buttonClickPaint(clickElement) {
	var id = clickElement.getAttribute('id');
	var split = id.split('-');
	var state = states.find(state => state.name === split[0]);
	state.incrementCandidateColor(paintIndex);
	clickElement.style.fill = state.getDisplayColor();
	countVotes();
	updateChart();
	updateLegend();
}

function buttonClickPaintPrimary(clickElement) {
	stateClick(clickElement);
}

function buttonClickEC(clickElement) {
	var id = clickElement.getAttribute('id');
	var split = id.split('-');
	var state = states.find(state => state.name === split[0]);
	var ecedit = document.getElementById('ecedit');
	var eceditText = document.getElementById('ecedit-message');
	var input = document.getElementById('state-ec');
	var stateId = document.getElementById('state-id');
	eceditText.innerHTML = 'Set ' + split[0] + ' electoral college';
	input.value = state.voteCount;
	stateId.value = split[0];
	ecedit.style.display = 'inline';
}

function landClick(clickElement) {

	if(mode === 'move') {
		return;
	}

	var id = clickElement.getAttribute('id');
	var split = id.split('-');
	var stateName = split[0];

	var AL;
	var districts = [];

	// get each district
	states.forEach(function(state, index) {
		if(state.name.includes(stateName)) {
			districts.push(state);

			if(state.name.includes('AL')) {
				AL = state;
			}
		}
	});

	if(mode === 'paint') {
		// check if each district has the same candidate and color value
		AL.incrementCandidateColor(paintIndex);
		districts.forEach(function(district) {
			district.setColor(AL.getCandidate(), AL.getColorValue());
		});
	} else if(mode === 'delete') {
		var textHTML = document.getElementById(split[0] + '-text');
		textHTML.style.visibility = 'hidden';

		districts.forEach(function(district) {
			district.hide();
			district.setVoteCount(0);
		});
	}

	countVotes();
	updateChart();
	updateLegend();
}

function districtClick(clickElement) {

	var id = clickElement.getAttribute('id');
	var split = id.split('-');
	var district = states.find(state => state.name === id);

	if(mode === 'move') {

	} else if(mode === 'paint') {
		//var state = states.find(state => state.name === split[0]);
		//state.setColor('tossup', 1);
		district.incrementCandidateColor(paintIndex);
		var landId = split[0] + '-' + split[1] + '-land';
		var land = document.getElementById(landId);
		if(land != null) {
			land.style.fill = district.getDisplayColor();
		}
		
		countVotes();
		updateChart();
		updateLegend();
		if(loadConfig.filename === './res/lte_house.svg') {
			updateLTEHouse();
		}
	} else if(mode === 'delete') {
		// delete all districts and text

		var al = states.find(state => state.name == split[0] + '-AL');
		if(al != null) {
			al.hide();
			al.setVoteCount(0);
		}
		
		var d1 = states.find(state => state.name == split[0] + '-D1');
		if(d1 != null) {
			d1.hide();
			d1.setVoteCount(0);
		}
		var d2 = states.find(state => state.name == split[0] + '-D2');
		if(d2 != null) {
			d2.hide();
			d2.setVoteCount(0);
		}
		var d3 = states.find(state => state.name == split[0] + '-D3');
		if(d3 != null) {
			d3.hide();
			d3.setVoteCount(0);
		}

		countVotes();
		updateChart();
		updateLegend();
	} else if(mode === 'ec') {
		var ecedit = document.getElementById('ecedit');
		var eceditText = document.getElementById('ecedit-message');
		var input = document.getElementById('state-ec');
		var stateId = document.getElementById('state-id');
		eceditText.innerHTML = 'Set ' + id + ' electoral college';
		input.value = district.voteCount;
		stateId.value = id;
		ecedit.style.display = 'inline';
	}
}

function stateClick(clickElement, e) {
	var id = clickElement.getAttribute('id');
	// first element is the state
	// second element might be button
	var split = id.split('-');
	// get state where state.name equals the id attribute
	var state = states.find(state => state.name === split[0]);

	switch(mode) {
		case 'paint':
			if(mapType === 'demprimary' ||
				mapType === 'repprimary') {
				stateClickPaintPrimary(state, id);
			} else {
				stateClickPaint(state, id);
			}
			break;
		case 'ec':
			stateClickEC(state, id);
			break;
		case 'delete':
			stateClickDelete(state, id);
			break;
	}
}

function stateClickPaint(state, id) {
	state.incrementCandidateColor(paintIndex);
	countVotes();
	updateChart();
	updateLegend();
	updateLTEHouse();
}

function stateClickPaintPrimary(state, id) {
	var demdel = document.getElementById('demdel');
	demdel.style.display = 'inline';
	var message = document.getElementById('demdel-message');
	if(state.name !== 'SU') {
		message.innerHTML = state.name + ' - ' + state.voteCount + ' delegates';
	} else {
		message.innerHTML = 'Super - ' + state.voteCount + ' delegates';
	}
	var hidden = document.getElementById('demdel-state-name');
	hidden.value = state.name;
	var ranges = document.getElementById('demdel-ranges');

	// remove old sliders
	while(ranges.firstChild) {
		ranges.removeChild(ranges.firstChild);
	}

	var max  = state.voteCount;
	var total = 0;

	var displayTossup = document.createElement('DIV');
	displayTossup.setAttribute('id', 'display-Tossup');

	for(var key in candidates) {
		if(key === 'Tossup')
			continue;
		// create slider, set their max to the states delegate count
		var range = document.createElement('INPUT');
		range.setAttribute('id', 'range-' + key);
		range.setAttribute('type', 'range');
		range.setAttribute('max', max);
		range.value = state.delegates[key];
		total += state.delegates[key];
		// create display for slider
		var display = document.createElement('DIV');
		display.setAttribute('id', 'display-' + key);
		display.innerHTML = key + ' - ' + range.value + ' - ' +
			((state.delegates[key] / max) * 100).toFixed(2) + '%';

		// this is how you reference the display DOM
		// im not sure exactly what this is but its weird
		range.oninput = (function() {
			var refkey = key;
			var refdisplay = display;
			var refdisplayTossup = displayTossup;
			var prevvalue = parseInt(range.value);
			return function(b) {
				total -= prevvalue;
				total += parseInt(this.value);

				if(total > max) {
					var diff = total - max;
					total -= diff;
					this.value -= diff;
				}
				
				prevvalue = parseInt(this.value);

				displayTossup.innerHTML = 'Tossup - ' + (max - total) + ' - ' +
					(( (max - total) / max) * 100).toFixed(2) + '%';
				
				// update the display	
				refdisplay.innerHTML = refkey + ' - ' + this.value + ' - ' + 
					((this.value / max) * 100).toFixed(2) + '%';
			}
		})();

		ranges.appendChild(display);
		ranges.appendChild(range);
	}

	displayTossup.innerHTML = 'Tossup - ' + (max - total) + ' - ' + (( (max - total) / max) * 100).toFixed(2) + '%';
	ranges.appendChild(displayTossup);
}

function stateClickDelete(state, id) {
	state.hide();
	state.setVoteCount(0);
}

function stateClickEC(state, id) {
	var ecedit = document.getElementById('ecedit');
	var eceditText = document.getElementById('ecedit-message');
	var input = document.getElementById('state-ec');
	var stateId = document.getElementById('state-id');
	eceditText.innerHTML = 'Set ' + id + ' electoral college';
	input.value = state.voteCount;
	stateId.value = id;
	ecedit.style.display = 'inline';
}

function specialClick(clickElement, e) {
	
	var id = clickElement.getAttribute('id');
	var state = states.find(state => state.name === id);
	if(mode === 'move') {

	} else if(mode === 'paint') {
		state.incrementCandidateColor(paintIndex);
		countVotes();
		updateChart();
		updateLegend();
	}
}

// when a button on the legend is clicked, it saves the selected candidate
// to a variable, so that you can paint with it
function legendClick(candidate, button) {

	if(mode === 'move') {

	} else if(mode === 'paint') {
		paintIndex = candidate;
		selectCandidateDisplay(button);
	} else if(mode === 'candidate' && candidate !== 'Tossup') {
		var candidateedit = document.getElementById('candidateedit');
		candidateedit.style.display = 'inline';
		var nameinput = document.getElementById('candidate-name');
		nameinput.value = candidate;
		var solidinput = document.getElementById('candidate-solid');
		solidinput.value = candidates[candidate].colors[0];
		var likelyinput = document.getElementById('candidate-likely');
		likelyinput.value = candidates[candidate].colors[1];
		var leaninput = document.getElementById('candidate-lean');
		leaninput.value = candidates[candidate].colors[2];
		var hiddeninput = document.getElementById('candidate-originalName');
		var message = document.getElementById('candidateedit-message');
		message.innerHTML = 'Edit ' + candidate;
		hiddeninput.value = candidate;
	}
}
