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

// paint data
var paintIndex = 'Tossup';
var maxColorValue = 2;

var chartBorderWidth = 2;
var chartBorderColor = '#000000';

var mode = 'paint';

var map = 'presidential';

var legendCounter = true;

// loads the svg element into the HTML
function loadMap(filename, dataid, fontsize) {
	console.log('loading ' + filename);
	map = dataid;
	$('#map-div').load(filename, function() {
		console.log('done loading ' + filename);

		var textHTML = document.getElementById('text');
		textHTML.style.fontSize = fontsize;

		initData(dataid);

		countVotes();
		updateChart();
		updateLegend();

		lightPalette();
	});
}

/*
function initSenateData() {
	states = [];
	buttons = [];

	var htmlElements = document.getElementById('outlines').children;

	for(var index = 0; index < htmlElements.length; ++index) {
		var htmlElement = htmlElements[index];
		var name = htmlElement.getAttribute('id');

		if(name.includes('text')) {

		} else if(name.includes('button')) {

		} else {

		}
	}
}
*/

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

		} else if(name.length == 2) {
			// set click function
			htmlElement.setAttribute('onclick', 
				'stateClick(this)');
			htmlElement.style.fill = '#bbb7b2';

			// add the state to the list
			states.push(new State(name, htmlElement, dataid));
		}
	}
}

function initChart() {
	chartOptions = {
		// This basically inserts HTML into the legend-div div
		// it's a WIP
		legendCallback: function(chart) {
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
					'onclick', 'legendClick("' + key + '", this); selectCandidateDisplay(this);');
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
	/*	yAxes: [{
			display: false,
		}],
		xAxes: [{
			display: false
		}],*/
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
		type: 'pie',
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
	
	var htmldiv = document.getElementById('chart-div');
	var html = document.getElementById('chart');
	htmldiv.style.position = 'absolute';
	html.style.display = 'none';
}

// empty the list of candidates and insert the tossup candidate
function initCandidates() {
	candidates = {};
	candidates['Tossup'] = TOSSUP;
	//new Candidate('Tossup', ['#000000', '#ff00ff', '#bbb7b2']);
}

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

// when a button on the legend is clicked, it saves the selected candidate
// to a variable, so that you can paint with it
function legendClick(candidate, button) {
	paintIndex = candidate;
}

function setEC(e) {
	// get the popup window
	var ecedit = document.getElementById("ecedit");
	// make it disappear
	ecedit.style.display = 'none';

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
	var htmldiv = document.getElementById('chart-div');
	var html = document.getElementById('chart');
	var ctx = html.getContext('2d');

	if(type === 'none') {
		htmldiv.style.position = 'absolute';
		html.style.display = 'none';
		return;
	}
	
	chartData = {
		labels:[],
		datasets: [{
			borderColor: chartBorderColor,
			borderWidth: chartBorderWidth,
			data:[]
		}]
	};

	chartType = type;

	htmldiv.style.position = 'relative';
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
	// save type
	var type = chart.config.type;
	chart.destroy();
	chart = new Chart(ctx, {type: type, data: chartData, options: chartOptions});
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
	//rebuildChart();
	updateChart();
}

function setMode(set) {
	mode = set;

	var modeHTML = document.getElementById('menu-middle');

	var text;
	if(set == 'paint') {
		text = 'Mode - Paint';
	} else if(set == 'ec') {
		text = 'Mode - EC Edit';
	} else if(set == 'delete') {
		text = 'Mode - Delete';
	}

	modeHTML.innerHTML = text;
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
}


// if paint index is invalid, change it to tossup
// ( WORK IN PROGRESS)
function verifyPaintIndex() {
	if(typeof candidates[paintIndex] === 'undefined') {
		paintIndex = 'Tossup';
	}
}

// if states have invalid colors, turn them white
function verifyMap() {
	states.forEach(function(state) {
		if(typeof candidates[state.candidate] === 'undefined') {
			// if the current color is out of bounds set it to white
			state.setColor('Tossup', tossupColor);
		} else { 
			// the candidate the state thinks its controled by
			var currentCandidate = state.getCandidate();
			// the candidate the state should be controle by
			var shouldCandidate = candidates[state.getCandidate()].name;

			var currentCandidate
			// if these values differ, change the state to tossup
			if(currentCandidate !== shouldCandidate) {
				state.setColor('Tossup', tossupColor);
			}

			if(currentCandidate !== 'Tossup' &&
				state.getColorValue() > maxColorValue) {
				state.setColor(state.getCandidate(),
					maxColorValue);
			} if(currentCandidate === 'Tossup') {
				state.setColor('Tossup', tossupColor);
			}

			var land = document.getElementById(state.name + '-land');
			if(land != null)
				land.style.fill = state.getDisplayColor();

			var button = document.getElementById(state.name + '-button');

			if(button != null)
				button.style.fill = state.getDisplayColor();
		}
	});
}

// sets all states to white
function clearMap() {
	states.forEach(function(state) {
		state.show();
		state.setColor('Tossup', tossupColor);
		state.resetVoteCount();
		var htmlText = document.getElementById(state.getName() + '-text');
		var text = state.getName() + ' ' + state.getVoteCount();
		
		if(text.includes('-')) {
			var split = text.split('-');
			text = split[0] + split[1];
		}

		htmlText.innerHTML = text;
	});

	buttons.forEach(function(button) {
		button.style.fill = candidates['Tossup'].colors[tossupColor];
	});

	lands.forEach(function(land) {
		land.style.fill = candidates['Tossup'].colors[tossupColor];	
	});
	
	countVotes();
	updateChart();
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
		for(var stateIndex = 0; 
			stateIndex < states.length; ++stateIndex) {

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

// updates the information of the chart (so the numbers change)
function updateChart() {

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
	// reset the chart data
	/*chartData = {
		labels:[],
		datasets: [{
			label: "",
			backgroundColor: [],
			borderColor: chartBorderColor,
			borderWidth: chartBorderWidth,
			data:[]
		}]
	};*/
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

function start() {
	initCandidates();
	initChart();
	
	loadMap('../usa.svg', 'usa_ec', 16);
}

start();
