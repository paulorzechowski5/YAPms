// loads the svg element into the HTML
function loadMap(filename, fontsize, strokewidth, dataid, type, year) {
	var mapHTML = document.getElementById('map-div');
	mapHTML.style.visibility = 'hidden';

	totalVotes = 0;

	/* TURNING OFF LABELS BREAKS THE LEANS ON THE GRAPH */

	mapType = type;
	mapYear = year;
	strokeMultiplier = strokewidth;
	var dataname = './data/' + type + '_' + year;

	console.log(dataname);

	loadConfig = {
		filename: filename,
		fontsize: fontsize,
		strokewidth: strokewidth,
		dataid: dataid,
		type: type,
		year: year
	}

	console.log('Loading ' + filename);
	$('#map-div').load(filename, function(a) {
		console.log('Done loading ' + filename);
		
		var enablePan;
		var enableZoom
		if(panObject != null) {
			enablePan = panObject.isPanEnabled();
			enableZoom = panObject.isZoomEnabled();
		} else {
			enablePan = false;
			enableZoom = false;
		}

		panObject = svgPanZoom('#svgdata', {
			fit: true,
			center: true,
			contain: false,
			panEnabled: enablePan,
			zoomEnabled: enableZoom,
			dblClickZoomEnabled: false,
			maxZoom: 70,
			zoomScaleSensitivity: 0.05
		});

		centerMap();

		var textHTML = document.getElementById('text');
		if(textHTML !== null) {
			textHTML.style.fontSize = fontsize;
		}

		initData(dataid);
		
		previousPalette();

		// count the votes and update the displayed
		// numbers on the chart and legend
		countVotes();
		updateChart();
		updateLegend();
		
		if(loadConfig.filename === './res/lte_house.svg') {
			updateLTEHouse();
		}
		
		blockPresets = false;

		if(type === 'senatorial' && year !== 'open') {
			setMode('paint');
			loadSenateFile(dataname);
		} else if(type === 'gubernatorial' && year !== 'open') {
			setMode('paint');
			loadGubernatorialFile(dataname);
		} else {
			mapHTML.style.visibility = 'visible';
		}
	});
}

function loadGubernatorialFile(gubernatorialfile) {

	if(gubernatorialfile.includes('open') == false) {
		blockPresets = true;
	}

	initCandidates();
	
	var candidateNames = {};

	$.get(gubernatorialfile, function(data) {
		console.log('Done loading ' + gubernatorialfile);

		var loadMode = 'candidate';
		var lines = data.split('\n');
		// if the last element is empty remove it
		if(lines[lines.length - 1] === '') {
			lines.pop();
		}
		for(var index = 0; index < lines.length; ++index) {
			var line = lines[index].trim();
			if(loadMode === 'candidate') {
				if(line === '!') {
					loadMode = 'disable';
				} else {
					var split = line.split(' ');
					candidateNames[split[0]] = split[1];
					var candidate = new Candidate(split[1], [split[2], split[3], split[4]]);
					candidates[split[1]] = candidate;
				}

			} else if(loadMode === 'disable') {
				var split = line.split(' ');
				var state = states.find(state => state.name === split[0]);
				var candidate = candidateNames[split[1]];

				if(split[1] === 'o') {
					state.setColor('Tossup', 2);
				} else {
					state.setColor(candidate, 0);
					state.toggleDisable();
				}
			}
		}

		finishDataLoad();
	});
}

function loadSenateFile(senatefile) {

	if(senatefile.includes('open') == false) {
		blockPresets = true;
	}

	initCandidates();

	var candidateNames = {};

	console.log(senatefile);
	$.get(senatefile, function(data) {
		console.log('Done loading ' + senatefile);
	
		var loadMode = 'candidate';
		var lines = data.split('\n');
		if(lines[lines.length - 1] === '') {
			lines.pop();
		}
		for(var index = 0; index < lines.length; ++index) {
			var line = lines[index].trim();
			if(loadMode === 'candidate') {
				if(line === '!') {
					loadMode = 'disable';
				} else {
					var split = line.split(' ');
					candidateNames[split[0]] = split[1];
					var candidate = new Candidate(split[1], [split[2], split[3], split[4]]);
					candidates[split[1]] = candidate;
				}

			} else if(loadMode === 'disable') {
				var split = line.split(' ');
				var state = states.find(state => state.name === split[0]);
				var special = states.find(state => state.name === split[0] + '-S');

				if(split[1] === 'o') {
					state.setColor('Tossup', 2);
				} else {
					state.setColor(
						candidateNames[split[1]], 0);
					state.toggleDisable();
				}

				if(split[2] === 'o') {
					special.setColor('Tossup', 2);
				} else {
					special.setColor(
						candidateNames[split[2]], 0);
					special.toggleDisable();
				}
			}
		}

		finishDataLoad();
	});
}

function finishDataLoad() {
	verifyMap();
	verifyPaintIndex();
	chart.generateLegend();
	countVotes();
	updateLegend();
	updateChart();
	updateLegend();
	verifyTextToggle();

	var mapHTML = document.getElementById('map-div');
	mapHTML.style.visibility = 'visible';
}
