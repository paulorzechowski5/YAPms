// list of candidates
var candidates = {};

class Candidate {
	constructor(name, colors) {
		this.name = name;
		this.colors = colors;
		this.voteCount = 0;
		this.probVoteCounts = [0,0,0,0];
	}
};

var tossupColor = 2;
var TOSSUP = new Candidate('Tossup', ['#000000', '#ffffff', '#bbb7b2', '#000000']);

function initCandidates() {
	candidates = {};
	candidates['Tossup'] = TOSSUP;
}

initCandidates();

// add candidate to the list
// update map, chart and legend
function addCandidate(name, solid, likely, leaning, tilting) {
	clearDelegates();

	if(name === undefined) {
		var nameHTML = document.getElementById('name');
		if(nameHTML !== null) {
			name = nameHTML.value;
		} else {
			name = "Error";
		}
	}

	// ignore white space candidates
	if(name.trim() === '') {
		return;
	}

	if(solid === undefined) {
		var solidHTML = document.getElementById('solid');
		if(solidHTML !== null) {
			solid = solidHTML.value;
		} else {
			solid = '#000000';
		}
	}

	if(likely === undefined) {
		var likelyHTML = document.getElementById('likely');
		if(likelyHTML !== null) {
			likely = likelyHTML.value;
		} else {
			likely = '#000000';
		}
	}

	if(leaning === undefined) {
		var leaningHTML = document.getElementById('leaning');
		if(leaningHTML !== null) {
			leaning = leaningHTML.value;
		} else {
			leaning = '#000000';
		}
	}

	if(tilting === undefined) {
		var tiltingHTML = document.getElementById('tilting');
		if(tiltingHTML !== null) {
			tilting = tiltingHTML.value;
		} else {
			tilting = '#000000';
		}
		
	}
	
	var candidate = new Candidate(name, [solid, likely, leaning, tilting]);
	candidates[name] = candidate;

	verifyMap();
	verifyPaintIndex();
	countVotes();
	updateChart();
	chart.generateLegend();
	updateLegend();
	verifyTextToggle();
}

function setCandidate(e) {
	// hide the popup window
	e.parentElement.style.display = 'none';

	var candidateid = e.parentElement.querySelector('#candidate-originalName').value;
	var newname = e.parentElement.querySelector('#candidate-name').value;
	var solidColor = e.parentElement.querySelector('#candidate-solid').value;
	var likelyColor = e.parentElement.querySelector('#candidate-likely').value;
	var leanColor = e.parentElement.querySelector('#candidate-lean').value;
	var tiltcolor = e.parentElement.querySelector('#candidate-tilt').value;

	// only rename the property if the name changed
	if(newname !== candidateid) {
		Object.defineProperty(candidates, newname,
			Object.getOwnPropertyDescriptor(candidates, candidateid));
		delete candidates[candidateid];
	}

	var candidate = candidates[newname];
	candidate.name = newname;
	candidate.colors[0] = solidColor;
	candidate.colors[1] = likelyColor;
	candidate.colors[2] = leanColor;
	candidate.colors[3] = tiltcolor;

	chart.generateLegend();
	countVotes();
	updateLegend();
	verifyMap();
	updateChart();
}
