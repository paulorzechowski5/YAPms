
// clear the candidate list, and map
function loadPresetEmpty() {
	initCandidates();
	clearMap();
	verifyPaintIndex();
	countVotes();
	updateChart();
	chart.generateLegend();
	updateLegend();
	verifyTextToggle();
}

// republicans vs democrats
function loadPresetClassic() {
	initCandidates();
	var republican = new Candidate('Republican', 
		['#BF1D29', '#FF5865', '#FF8B98']);
	var democrat = new Candidate('Democrat',
		['#1C408C', '#577CCC', '#8AAFFF'])

	candidates['Republican'] = republican;
	candidates['Democrat'] = democrat;

	verifyMap();
	verifyPaintIndex();
	countVotes();
	updateChart();
	chart.generateLegend();
	updateLegend();
	verifyTextToggle();
}

// republican vs democrat vs libertarian
function loadPresetLibertarian() {
	initCandidates();
	var republican = new Candidate('Republican', 
		['#BF1D29', '#FF5865', '#FF8B98']);
	var democrat = new Candidate('Democrat',
		['#1C408C', '#577CCC', '#8AAFFF'])
	var libertarian = new Candidate('Libertarian',
		['#e6b700', '#e8c84d', '#ffe78a']);


	candidates['Republican'] = republican;
	candidates['Democrat'] = democrat;
	candidates['Libertarian'] = libertarian;

	verifyMap();
	verifyPaintIndex();
	countVotes();
	updateChart();
	chart.generateLegend();
	updateLegend();
	verifyTextToggle();
}

// republican vs democrat vs green
function loadPresetGreen() {
	initCandidates();
	var republican = new Candidate('Republican', 
		['#BF1D29', '#FF5865', '#FF8B98']);
	var democrat = new Candidate('Democrat',
		['#1C408C', '#577CCC', '#8AAFFF'])
	var green = new Candidate('Green',
		['#1c8c28', '#50c85e', '#8aff97']);

	candidates['Republican'] = republican;
	candidates['Democrat'] = democrat;
	candidates['Green'] = green;

	verifyMap();
	verifyPaintIndex();
	countVotes();
	updateChart();
	chart.generateLegend();
	updateLegend();
	verifyTextToggle();
}

// republican vs democrat vs green vs libertarian
function loadPresetMajors() {
	initCandidates();
	var republican = new Candidate('Republican', 
		['#BF1D29', '#FF5865', '#FF8B98']);
	var democrat = new Candidate('Democrat',
		['#1C408C', '#577CCC', '#8AAFFF'])
	var green = new Candidate('Green',
		['#1c8c28', '#50c85e', '#8aff97']);
	var libertarian = new Candidate('Libertarian',
		['#e6b700', '#e8c84d', '#ffe78a']);

	candidates['Republican'] = republican;
	candidates['Democrat'] = democrat;
	candidates['Green'] = green;
	candidates['Libertarian'] = libertarian;

	verifyMap();
	verifyPaintIndex();
	countVotes();
	updateChart();
	chart.generateLegend();
	updateLegend();
	verifyTextToggle();
}
