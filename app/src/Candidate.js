// list of candidates
var candidates = {};

class Candidate {
	constructor(name, colors) {
		this.name = name;
		this.colors = colors;
		this.voteCount = 0;
		this.probVoteCounts = [0,0,0];
	}
};

var tossupColor = 2;
var TOSSUP = new Candidate('Tossup', ['#000000', '#ffffff', '#bbb7b2']);

function initCandidates() {
	candidates = {};
	candidates['Tossup'] = TOSSUP;
}

// add candidate to the list
// update map, chart and legend
function addCandidate() {
	clearDelegates();
	var name = document.getElementById('name').value;

	// ignore white space candidates
	if(name.trim() === '') {
		return;
	}

	var solid = document.getElementById('solid').value;
	var likely = document.getElementById('likely').value;
	var leaning = document.getElementById('leaning').value;
	var candidate = new Candidate(name, [solid, likely, leaning]);
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

	chart.generateLegend();
	countVotes();
	updateLegend();
	verifyMap();
	updateChart();
}
