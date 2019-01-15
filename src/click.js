function buttonClick(clickElement) {
	if(mode === 'paint') {
		buttonClickPaint(clickElement);
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

	if(mode === 'paint') {
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

//called when a state is clicked
function stateClick(clickElement, e) {
	var id = clickElement.getAttribute('id');
	// first element is the state
	// second element might be button
	var split = id.split('-');
	// get state where state.name equals the id attribute
	var state = states.find(state => state.name === split[0]);
	
	if(mode === 'ec') {
		var ecedit = document.getElementById('ecedit');
		var eceditText = document.getElementById('ecedit-message');
		var input = document.getElementById('state-ec');
		var stateId = document.getElementById('state-id');
		eceditText.innerHTML = 'Set ' + id + ' electoral college';
		input.value = state.voteCount;
		stateId.value = id;
		ecedit.style.display = 'inline';
	} else if(mode === 'delete') {
		state.hide();
		state.setVoteCount(0);
	} else if(mode === 'paint') {
		state.incrementCandidateColor(paintIndex);
		countVotes();
		updateChart();
		updateLegend();
	}
}

function specialClick(clickElement, e) {
	var id = clickElement.getAttribute('id');
	var state = states.find(state => state.name === id);

	if(mode === 'paint') {
		state.incrementCandidateColor(paintIndex);
		countVotes();
		updateChart();
		updateLegend();
	}
}

// when a button on the legend is clicked, it saves the selected candidate
// to a variable, so that you can paint with it
function legendClick(candidate, button) {
	if(mode === 'paint') {
		paintIndex = candidate;
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
