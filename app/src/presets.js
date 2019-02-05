
function blockPresetNotify() {
	var notification = document.getElementById('notification');
	notification.style.display = 'inline';
	var message = notification.querySelector('#notification-message');
	var notificationText = 'Presets cannot be changed while editing a historical ' + mapType + ' map';
	message.innerHTML = notificationText;
	var title = notification.querySelector('#notification-title');
	title.innerHTML = 'Sorry';
}

function loadPreset(value) {
	if(blockPresets) {
		blockPresetNotify();
		return;
	}
	
	clearDelegates();
	initCandidates();

	switch(value) {
		case 'tossup':
			break;
		case 'classic':
			loadPresetClassic();
			break;
		case 'libertarian':
			loadPresetLibertarian();
			break;
		case 'green':
			loadPresetGreen();
			break;
		case 'majors':
			loadPresetMajors();
			break;
	}
	
	verifyMap();
	verifyPaintIndex();
	countVotes();
	updateChart();
	chart.generateLegend();
	updateLegend();
	verifyTextToggle();
}

// republicans vs democrats
function loadPresetClassic() {
	var republican = new Candidate('Republican', 
		['#BF1D29', '#FF5865', '#FF8B98']);
	var democrat = new Candidate('Democrat',
		['#1C408C', '#577CCC', '#8AAFFF'])

	candidates['Republican'] = republican;
	candidates['Democrat'] = democrat;
}

// republican vs democrat vs libertarian
function loadPresetLibertarian() {
	var republican = new Candidate('Republican', 
		['#BF1D29', '#FF5865', '#FF8B98']);
	var democrat = new Candidate('Democrat',
		['#1C408C', '#577CCC', '#8AAFFF'])
	var libertarian = new Candidate('Libertarian',
		['#e6b700', '#e8c84d', '#ffe78a']);

	candidates['Republican'] = republican;
	candidates['Democrat'] = democrat;
	candidates['Libertarian'] = libertarian;
}

// republican vs democrat vs green
function loadPresetGreen() {
	var republican = new Candidate('Republican', 
		['#BF1D29', '#FF5865', '#FF8B98']);
	var democrat = new Candidate('Democrat',
		['#1C408C', '#577CCC', '#8AAFFF'])
	var green = new Candidate('Green',
		['#1c8c28', '#50c85e', '#8aff97']);

	candidates['Republican'] = republican;
	candidates['Democrat'] = democrat;
	candidates['Green'] = green;
}

// republican vs democrat vs green vs libertarian
function loadPresetMajors() {
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
}
