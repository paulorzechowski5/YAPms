var states = [];
var lands = [];
var buttons = [];

// list of candidates
var candidates = {};

// data for the chart
var chart;
var chartData = {
	labels:[],
	datasets: [{
		label: "",
		backgroundColor: [],
		borderColor: chartBorderColor,
		borderWidth: chartBorderWidth,
		data:[]
	}, {}, {}, {}]
}
var chartOptions;
var chartType;
var chartPieScales;
var chartBarScales;
var chartPolarScales;
var chartRadarScales;

var chartLeans = true;

// pan object
var panobject;

// paint data
var paintIndex = 'Tossup';
var maxColorValue = 2;

var chartBorderWidth = 2;
var chartBorderColor = '#000000';

var mode = 'paint';

var mapType = 'presidential';
var mapYear = 'open';

var blockPresets = false;

var legendCounter = true;

var loadConfig = {
	filename: '', 
	fontsize: 16, 
	strokewidth: 1.5,
	dataid: '', 
	type: '',
	year: ''
};

var strokeMultiplier = 1;

var previousPalette = function() {
	lightPalette();	
};

var panObject = null;

document.addEventListener('keydown', function(event) {
	return;
	switch(event.key) {
		case 'p':
			setMode('paint');
			break;
		case 'm':
			setMode('move');
			break;
		case 'd':
			setMode('delete');
			break;
		case 'e':
			setMode('ec');
			break;
		case 'c':
			setMode('candidate');
			break;
	}
});

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

// reads through the SVG and sets up states and buttons
function initData(dataid) {
	// clear any previously loaded data
	states = [];
	buttons = [];
	lands = [];

	// get list of all html state elements
	var htmlElements = document.getElementById('outlines').children;

	// iterate over each element
	for(var index = 0; index < htmlElements.length; ++index) {
		var htmlElement = htmlElements[index];
		htmlElement.setAttribute('style', 'inherit');
		var name = htmlElement.getAttribute('id');
		if(name.includes('text')) {
			// dont include text as states
			// make sure you can't click them
			//htmlElement.style.pointerEvents = 'none';
		} else if(name.includes('button')) {
			// don't include buttons as states
			htmlElement.setAttribute('onclick',
				'buttonClick(this)');
			htmlElement.style.fill = '#bbb7b2';
			buttons.push(htmlElement);

		} else if(name.includes('land')) {
			htmlElement.setAttribute('onclick', 'landClick(this)');
			htmlElement.style.fill = '#bbb7b2';
			lands.push(htmlElement);
		} else if(name.includes('-D') || name.includes('-A')) {
			htmlElement.setAttribute('onclick', 'districtClick(this)');
			htmlElement.style.fill = '#bbb7b2';
			states.push(new State(name, htmlElement, dataid));

		} else if(name.length == 5) {
			// set click function
			htmlElement.setAttribute('onclick', 
				'districtClick(this)');
			htmlElement.style.fill = '#bbb7b2';

			var state = new State(name, htmlElement, dataid);

			// add the state to the list
			states.push(state);

		} else if(name.length == 2 || name.length == 5 ) {
			// set click function
			htmlElement.setAttribute('onclick', 
				'stateClick(this)');
			htmlElement.style.fill = '#bbb7b2';

			var state = new State(name, htmlElement, dataid);

			// add the state to the list
			states.push(state);
		}
	}

	var special = document.getElementById('special');
	var specialChildren;
	if(special != null) {
		specialChildren = special.children;

		for(var index = 0; index < specialChildren.length; ++index) {
			var htmlElement = specialChildren[index];
			htmlElement.setAttribute('onclick',
				'specialClick(this)');
			var name = htmlElement.id;
			var state = new State(name, htmlElement, dataid);
			states.push(state);
		}
	}
}

function initChart() {
	chartOptions = {
		// This basically inserts HTML into the legend-div div
		// it's a WIP
		legendCallback: function(chart) {
			console.log("Generating Legend...");
			var legendDiv = document.getElementById('legend-div');
			legendDiv.innerHTML = '';
			var index = -1;
			for(var key in candidates) {
				var candidate = candidates[key];
				++index;
				var legendElement = document.createElement('div');
				legendElement.setAttribute('id', candidate.name);
				legendElement.setAttribute('class', 'legend-button');
				legendElement.setAttribute(
					'onclick', 'legendClick("' + key + '", this);');
				legendElement.style.backgroundColor = candidate.colors[0];

				// if its the 0th candidate, make sure its purple
				if(index == 0) {
					var color = candidate.colors[tossupColor];
					legendElement.style.backgroundColor = color;
					if(color === '#000000' ||
						color === 'black') {
						legendElement.style.color = 'white';
					} else {
						legendElement.style.color = 'black';

					}
				}
				legendElement.style.padding = 5;
				legendDiv.appendChild(legendElement);

				var legendText = document.createElement('div');
				legendText.setAttribute('id', candidate.name + '-text');	
				legendText.setAttribute('class', 'legend-button-text');
				legendText.innerHTLM = candidate.name;
				legendElement.appendChild(legendText);

				if(typeof candidate.img !== 'undefined') { 
					var img = document.createElement('IMG');
					var reader = new FileReader();

					reader.onload = function(event) {
						url = event.target.result;
						img.src = url;
						img.style.width = '60';
						img.style.height = '60';
						legendElement.append(img);
					}

					reader.readAsDataURL(candidate.img);
				}
			}
		},
		// do not display the build in legend for the chart
		legend: {
			display: false
		},
		tooltips: {
			display: true,
			position: 'average',
			titleFontColor: 'black',
			bodyFontColor: 'black',
			backgroundColor: 'white',
			borderColor: 'black',
			borderWidth: 2,
			caretSize: 0,
			cornerRadius: 0
		},
		// turn off animation
		animation: {
			animateRotate: false,
			animateScale: true
		},
		plugins: {
			datalabels: {
				//display: 'auto',
				display: function(context) {
					return context.dataset.data[context.dataIndex] !== 0;
				},
				backgroundColor: 'white',
				borderColor: 'black',
				borderRadius: 5,
				borderWidth: 2,
				color: 'black',
				font: {
					family: 'Roboto',
					size: 15,
					weight: 700
				}
			}
		},
		barStrokeWidth: 0
	}
//Chart.defaults.global.barPercentage = 0;
//Chart.defaults.global.categoryPercentage = 0;

	chartBarScales = {
		yAxes: [{
			stacked: true,
			gridLines: {
				display: false,
				drawBorder: false
			},
			ticks: {
				fontSize: 15,
				fontColor: '#ffffff',
				fontFamily: 'Roboto',
				fontStyle: 500
			}
		}],
		xAxes: [{
			stacked: true,
			gridLines: {
				display: false,
				drawBorder: false
			},
			ticks: {
				beginAtZero: true,
				fontSize: 15,
				fontColor: '#ffffff',
				fontStyle: 500,
				fontFamily: 'Roboto'
			}
		}]
	}

	chartPieScales = {
		yAxes: [{
			display: false
		}],
		xAxes: [{
			display: false
		}]
	}
	
	chartPolarScales = {
		display: false
	}

	chartRadarScales = {
		display: false
	}

	chartOptions.scales = chartPieScales;

	Chart.defaults.global.elements.rectangle.borderWidth = 2;
	
	// get the context
	var ctx = document.getElementById('chart').getContext('2d');
	ctx.height = 600;

	// create the chart
	chart = new Chart(ctx, {
		type: 'doughnut',
		data: {
			labels:[],
			datasets: [{
				label: "",
				backgroundColor: '#ffffff',
				borderColor: '#ffffff',
				borderWidth: 0,
				data:[]
			}, {}, {}, {}],
		},
		options: chartOptions,
		maintainAspectRatio: true
	});

	chart.generateLegend();
	
	var html = document.getElementById('chart');
}

// empty the list of candidates and insert the tossup candidate
function initCandidates() {
	candidates = {};
	candidates['Tossup'] = TOSSUP;
	//new Candidate('Tossup', ['#000000', '#ff00ff', '#bbb7b2']);
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

function setEC(e) {
	// hide the popup window
	e.parentElement.style.display = 'none';

	// get the stateId and input value
	var stateId = e.parentElement.querySelector('#state-id').value;
	var input = e.parentElement.querySelector('#state-ec').value;

	// get the state and set its new vote count
	states.forEach(function(element) {
		if(element.getName() === stateId) {
			element.voteCount = parseInt(input);
		}
	});


	// update the html text display
	var stateText = document.getElementById(stateId + '-text');
	// if the id has a dash then remove it
	if(stateId.includes('-')) {
		var split = stateId.split('-');
		stateId = split[0] + split[1];
	}
	var text = stateId + ' ' + input;
	stateText.innerHTML = text;

	// recount the votes
	countVotes();
	updateChart();
	updateLegend();
}

// dynamically change the chart from one form to another
function setChart(type) {
	var chartdiv = document.getElementById('chart-div');
	var html = document.getElementById('chart');
	var ctx = html.getContext('2d');
	var battlechart = document.getElementById('battlechart');
	battlechart.style.display = '';
	
	chartdiv.style.display = 'flex';
	
	if(type === 'none') {
		html.style.display = 'none';
		chartdiv.style.display = 'none';
		chartType = type;
		centerMap();
		return;
	} else if(type === 'battle') {

		if(Object.keys(candidates).length > 3) {
		
			displayNotification('Sorry',
				'This chart requires that there be two candidates');
			return;
		}

		html.style.display = 'none';
		var battlechart = document.getElementById('battlechart');
		battlechart.style.display = 'flex';
		chartType = type;
		updateChart();
		return;
	}
		
	chartType = type;
	
	chartData = {
		labels:[],
		datasets: [{
			borderColor: chartBorderColor,
			borderWidth: chartBorderWidth,
			data:[]
		}]
	};


	html.style.display = 'inline-block';

	// set the proper scales
	if(type === 'horizontalBar') {
		chartOptions.scales = chartBarScales;
		delete chartOptions.scale;
		// horizontal bar needs multiple datasets
		for(var i = 0; i < 3; ++i) {
			chartData.datasets.push({
				borderColor: chartBorderColor,
				borderWidth: chartBorderWidth,
				data:[]
			});
		}
	} else if(type === 'pie' || type === 'doughnut') {
		chartOptions.scales = chartPieScales;
		delete chartOptions.scale;
	} else if(type === 'polarArea') {
		chartOptions.scales = chartPolarScales;	
		chartOptions.scale =  {
			display: false
		}
	} else if(type === 'radar') {
		chartOptions.scale = chartRadarScales;	
	}

	// first destroy the chart
	chart.destroy();
	// then rebuild
	chart = new Chart(ctx, {type: type, data: chartData, options: chartOptions});
	countVotes();
	updateChart();
}

function rebuildChart() {
	var html = document.getElementById('chart');
	var ctx = html.getContext('2d');
	//var type = chart.config.type;
	chart.destroy();
	chart = new Chart(ctx, {
		type: chart.config.type, 
		data: chartData, 
		options: chartOptions
	});
	updateChart();
}

function toggleLegendCounter() {
	legendCounter = !legendCounter;
	updateLegend();
}

function toggleChartLabels() {

	if(chartOptions.plugins.datalabels.display != false) {
		chartOptions.plugins.datalabels.display = false;
	} else {
		chartOptions.plugins.datalabels.display = function(context) {
			return context.dataset.data[context.dataIndex] !== 0;
		}
	}

	rebuildChart();
	//setChart(chart.config.type);
}

function toggleChartLeans() {
	chartLeans = !chartLeans;
	rebuildChart();
	updateChart();
}

function setMode(set) {
	console.log('mode ' +  mode + ' | set ' + set + 
		' | mapType ' + mapType + ' | mapYear ' + mapYear);

	var notification = document.getElementById('notification');
	var message = notification.querySelector('#notification-message');
	var title = notification.querySelector('#notification-title');

	if(mapYear !== 'open') {
		if(set === 'ec' || set === 'candidate' || set === 'delete') {
			title.innerHTML = 'Sorry';
			message.innerHTML = 'This mode is not available while editing a historical ' + mapType + ' map';
			notification.style.display = 'inline';
			console.log('denied');
			return;
		}
	}

	if(mapType === 'gubernatorial') {
		if(set === 'ec') {
			title.innerHTML = 'Sorry';
			message.innerHTML = 'This mode is not available while editing a guberatorial map';
			notification.style.display = 'inline';
			console.log('denied');
			return;
		}
	}

	if(mapType === 'senatorial') {
		if(set === 'delete' || set === 'ec') {
			title.innerHTML = 'Sorry';
			message.innerHTML = 'This mode is not available while editing a senatorial map';
			notification.style.display = 'inline';
			console.log('denied');
			return;

		}
	}

	if(mapType === 'congressional') {
		if(set === 'delete' || set === 'ec') {
			title.innerHTML = 'Sorry';
			message.innerHTML = 'This mode is not available while editing a congressional map';
			notification.style.display = 'inline';
			console.log('denied');
			return;
		}
	}
	
	console.log('allowed');

	mode = set;

	var modeHTML = document.getElementById('menu-middle');
	var modeText;
	var notificationText;

	panObject.disablePan();
	panObject.disableZoom();

	if(set === 'paint') {
		modeText = 'Mode - Paint';
	} else if(set === 'move') {
		modeText = 'Mode - Move (click drag and scroll)';
//		notificationText = "Click and drag to pan. Scroll to zoom";
		panObject.enablePan();
		panObject.enableZoom();
	} else if(set === 'ec') {
		modeText = 'Mode - EC Edit (change EC of states)';
		notificationText = "Click on a state to set its electoral college";
	} else if(set === 'delete') {
		modeText = 'Mode - Delete (remove states from map)';
		notificationText = "Click on a state to delete it";
	} else if(set === 'candidate') {
		modeText = 'Mode - Candidate Edit (change candidates name and colors)';
		notificationText = "Click on a candidate in the legend to edit its name and color";
	}

	modeHTML.innerHTML = modeText;

	var split = modeText.split(' ');

	var notification = document.getElementById('notification');
	if(mode === 'paint' || mode === 'move') {
		notification.style.display = 'none';
	} else if(mode !== 'paint') {
		notification.style.display = 'inline';
		var title = notification.querySelector('#notification-title');
		title.innerHTML = split[0] + ' ' + split[1] + ' ' + split[2];
		var message = notification.querySelector('#notification-message');
		message.innerHTML = notificationText;
	}
}

function closeNotification(e) {
	e.parentElement.style.display = 'none';
}

// add candidate to the list
// update map, chart and legend
function addCandidate() {
	var name = document.getElementById('name').value;

	// ignore white space candidates
	if(name.trim() === '') {
		return;
	}

	var solid = document.getElementById('solid').value;
	var likely = document.getElementById('likely').value;
	var leaning = document.getElementById('leaning').value;
	var img = document.getElementById('image-upload').files[0];
	var candidate = new Candidate(name, [solid, likely, leaning], img);
	candidates[name] = candidate;

	verifyMap();
	verifyPaintIndex();
	countVotes();
	updateChart();
	chart.generateLegend();
	updateLegend();
	verifyTextToggle();
	toggleAddCandidate();
}


// if paint index is invalid, change it to tossup
// ( WORK IN PROGRESS)
function verifyPaintIndex() {
	if(typeof candidates[paintIndex] === 'undefined') {
		paintIndex = 'Tossup';
	}
}

// make sure states are proper colors
// if states have invalid colors, turn them white
function verifyMap() {
	states.forEach(function(state) {
		state.verifyDisabledColor();
		if(typeof candidates[state.candidate] === 'undefined') {
			// if the current color is out of bounds set it to white
			state.setColor('Tossup', tossupColor);
		} else { 
			// the candidate the state thinks its controled by
			var currentCandidate = state.getCandidate();
			// the candidate the state should be controle by
			var shouldCandidate = candidates[state.getCandidate()].name;

			// if these values differ, change the state to tossup
			if(currentCandidate !== shouldCandidate) {
				state.setColor('Tossup', tossupColor);
			} else if(state.getCandidate() === 'Tossup') {
				state.setColor('Tossup', 2);	
			}else {
				state.setColor(state.getCandidate(), state.getColorValue());
			}
		}
	});
	
	if(loadConfig.filename === './res/lte_house.svg') {
		updateLTEHouse();
	}
}

// sets all states to white
function clearMap() {
	loadMap(loadConfig.filename, loadConfig.fontsize, loadConfig.strokewidth, loadConfig.dataid, loadConfig.type, loadConfig.year);
}

// iterate over each state and delegate votes to the candidate
function countVotes() {
	// iterate over every candidate
	//candidates.forEach(function(candidate, candidateIndex) {
	var candidateIndex = -1;
	for(var key in candidates) {
		var candidate = candidates[key];
		++candidateIndex;
		candidate.voteCount = 0;
		candidate.probVoteCounts = [0,0,0];
		// iterate over every state
		for(var stateIndex = 0; stateIndex < states.length; ++stateIndex) {
			var state = states[stateIndex];
			// if the candidate value of the state
			// equals the index value of the candidate
			// add the vote count to the candidate 
			if(state.candidate === key) {
				candidate.voteCount += state.voteCount;
				candidate.probVoteCounts[state.colorValue] += state.voteCount;
			}
		}
	}
}

// change the colors of the districts so that they are the
// color of the majority
function updateLTEHouse() {
	var outlines = document.getElementById('outlines');

	var children = outlines.children;

	var districts = [];

	for(var index = 0; index < children.length; ++index) {
		var child = children[index];

		if(child.id.includes('-LTEHOUSE')) {
			districts.push(child);	
		}
	}

	districts.forEach(function(element) {
		var districtname = element.id.split('-')[0];
		var count = {};

		// loop through each district seat (because they are states)
		for(var index = 0; index < states.length; ++index) {
			var seat = states[index];
			// if the name of the district isnt in the seat skip it
			if(seat.name.includes(districtname) == false) {
				continue;
			}
			// look at the candidate and count it
			var candidate = seat.getCandidate();
			if(candidate in count) {
				count[candidate] += 1;
			} else {
				count[candidate] = 1;
			}
		}
		
		var majorCandidate = 'Tossup';
		var majorCount = 0;
	
		// find the candidate with the most seats
		for(var key in count) {
			if(count[key] > majorCount) {
				majorCandidate = key;
				majorCount = count[key];
			} else if(count[key] == majorCount) {
				majorCandidate = 'Tossup';
			}
		}
	
		// set the fill of the district
		if(majorCandidate === 'Tossup') {
			element.style.fill = candidates[majorCandidate].colors[2];
		} else {
			element.style.fill = candidates[majorCandidate].colors[0];
		}
	});
}

// updates the information of the chart (so the numbers change)
function updateChart() {

	if(chartType === 'battle') {
		updateBattleChart();
		return;
	}

	if(chartType === 'horizontalBar') {
		updateBarChart();
	} else {
		updateNonRadarChart();	
	}

	chart.config.data = chartData;
	chart.update();
}

function updateBarChart() {
	chartData.labels = [];
	chartData.datasets[0].data = [];
	chartData.datasets[0].backgroundColor = [];
	chartData.datasets[1].data = [];
	chartData.datasets[1].backgroundColor = [];
	chartData.datasets[2].data = [];
	chartData.datasets[2].backgroundColor = [];
	
	// each label is a candidate
	for(var key in candidates) {
		chartData.labels.push(key);
	}

	for(var probIndex = 0; probIndex < 3; ++probIndex) {
		for(var key in candidates) {
			var candidate = candidates[key];
			var name = candidate.name;
			var count = candidate.probVoteCounts[probIndex];
			chartData.datasets[probIndex].data.push(count);

			var color = candidate.colors[probIndex];
			chartData.datasets[probIndex].backgroundColor.push(color);
		}
	}
}

function updateNonRadarChart() {
	chartData.labels = [];

	chartData.datasets[0].data = [];
	chartData.datasets[0].backgroundColor = [];
	chartData.datasets[0].borderColor = chartBorderColor;
	chartData.datasets[0].borderWidth = chartBorderWidth;

	// loop though candidates
	var candidateIndex = -1;
	for(var key in candidates) {
		++candidateIndex;
		var candidate = candidates[key];
		var name = candidate.name;
		var voteCount = candidate.voteCount;
		var color = candidate.colors[0];
		if(candidateIndex == 0) {
			color = candidates['Tossup'].colors[tossupColor];
			// append the candidate label
			chartData.labels[0] = 'Tossup';
			// append the vote count
			chartData.datasets[0].data[0] = voteCount;
			// change the background color of the visual
			chartData.datasets[0].backgroundColor.push(color);
		} else if(chartLeans) {

			for(var probIndex = 0; probIndex < 3; ++probIndex) {
				var count = candidate.probVoteCounts[probIndex];
				color = candidate.colors[probIndex];
				var index = (probIndex + (candidateIndex * 3)) - 2;
				chartData.labels[index] = name;
				chartData.datasets[0].data[index] = count;
				chartData.datasets[0].backgroundColor.push(color);
			}
		} else {
			var count = candidate.voteCount;
			color = candidate.colors[0];
			chartData.labels[candidateIndex] = name;
			chartData.datasets[0].data[candidateIndex] = count;
			chartData.datasets[0].backgroundColor.push(color);
		}
	}
}

// displays the vote count on the legend
// makes sure that the selected candidate is highlighted
function updateLegend() {
	var index = -1;
	for(var key in candidates) {
		var candidate = candidates[key];
		++index;
		var html = document.getElementById(candidate.name + '-text');

		var newHTML = candidate.name;

		if(legendCounter == true) {
			newHTML += ' ' + candidate.voteCount;
		}

		html.innerHTML = newHTML;

		if(key === paintIndex) {
			selectCandidateDisplay(html.parentElement);
		}
	}
}

function centerMap() {
	panObject.resize();
	panObject.fit();
	panObject.center();
	panObject.zoomBy(0.85);
}

function toggleLTELogo() {
	var lteLogo = document.getElementById('logo');
	if(lteLogo.style.display === '') {
		lteLogo.style.display = 'inline';
	} else if(lteLogo.style.display === 'inline') {
		lteLogo.style.display = '';
	}
}

function setColors(palette) {
	var solid = document.getElementById('solid');
	var likely = document.getElementById('likely');
	var leaning =  document.getElementById('leaning');

	if(palette === 'republican') {
		solid.value = '#bf1d29';
		likely.value = '#ff5865';
		leaning.value = '#ff8b98';
	} else if(palette === 'democrat') {
		solid.value = '#1c408c';
		likely.value = '#577ccc';
		leaning.value = '#8aafff';
	}
}

function start() {
	initCandidates();
	initChart();
	loadMap('./res/presidential.svg', 16, 1, 'usa_ec',"presidential", "open");
	setChart('battle');
}

start();
