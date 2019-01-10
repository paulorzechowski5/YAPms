
// clear the candidate list, and map
function loadPresetEmpty() {
	initCandidates();
	clearMap();
	verifyPaintIndex();
	countVotes();
	updateChart();
	chart.generateLegend();
	updateLegend();
}

// republicans vs democrats
function loadPresetClassic() {
	initCandidates();
	var republican = new Candidate('Republican', 
		['#ff0000', '#ff4040', '#ff9999']);
	var democrat = new Candidate('Democrat',
		['#0000ff', '#4040ff', '#9999ff'])

	candidates['Republican'] = republican;
	candidates['Democrat'] = democrat;

	verifyMap();
	verifyPaintIndex();
	countVotes();
	updateChart();
	chart.generateLegend();
	updateLegend();
}

// republican vs democrat vs libertarian
function loadPresetLibertarian() {
	initCandidates();
	var republican = new Candidate('Republican', 
		['#ff0000', '#ff4040', '#ff9999']);
	var democrat = new Candidate('Democrat',
		['#0000ff', '#4040ff', '#9999ff'])
	var libertarian = new Candidate('Libertarian',
		['#ffcc00', '#ffd83f', '#ffe377']);


	candidates['Republican'] = republican;
	candidates['Democrat'] = democrat;
	candidates['Libertarian'] = libertarian;

	verifyMap();
	verifyPaintIndex();
	countVotes();
	updateChart();
	chart.generateLegend();
	updateLegend();
}

// republican vs democrat vs green
function loadPresetGreen() {
	initCandidates();
	var republican = new Candidate('Republican', 
		['#ff0000', '#ff4040', '#ff9999']);
	var democrat = new Candidate('Democrat',
		['#0000ff', '#4040ff', '#9999ff'])
	var green = new Candidate('Green',
		['#00ff00', '#40ff40', '#99ff99']);

	candidates['Republican'] = republican;
	candidates['Democrat'] = democrat;
	candidates['Green'] = green;

	verifyMap();
	verifyPaintIndex();
	countVotes();
	updateChart();
	chart.generateLegend();
	updateLegend();
}

// republican vs democrat vs green vs libertarian
function loadPresetMajors() {
	initCandidates();
	var republican = new Candidate('Republican', 
		['#ff0000', '#ff4040', '#ff9999']);
	var democrat = new Candidate('Democrat',
		['#0000ff', '#4040ff', '#9999ff'])
	var green = new Candidate('Green',
		['#00ff00', '#40ff40', '#99ff99']);
	var libertarian = new Candidate('Libertarian',
		['#ffcc00', '#ffd83f', '#ffe377']);

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
}
