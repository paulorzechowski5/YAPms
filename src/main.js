// list of electoral vote counts
ec = {'AL': 9, 'AK': 3, 'AZ': 11, 'AR': 6, 'CA': 55, 'CO': 9, 'CT': 7, 'DE': 3, 'FL': 29, 'GA': 16, 'HI': 4, 'ID': 4, 'IL': 20, 'IN': 11, 'IA': 6, 'KS': 6, 'KY': 8, 'LA': 8, 'ME': 4, 'ME-AL': 2, 'ME-D1': 1, 'ME-D2': 1, 'MD': 10, 'MA': 11, 'MI': 16, 'MN': 10, 'MS': 6, 'MO': 10, 'MT': 3, 'NE': 5, 'NE-AL': 2, 'NE-D1': 1, 'NE-D2': 1, 'NE-D3': 1, 'NV': 6, 'NH': 4, 'NJ': 14, 'NM': 5, 'NY': 29, 'NC': 15, 'ND': 3, 'OH': 18, 'OK': 7, 'OR': 7, 'PA': 20, 'RI': 4, 'SC': 9, 'SD': 3, 'TN': 11, 'TX': 38, 'UT': 6, 'VT': 3, 'VA': 13, 'WA': 12, 'WV': 5, 'WI': 10, 'WY': 3, 'DC': 3};

// list of states
var states = [];
var lands = [];

// list of buttons
var buttons = [];

// list of candidates
var candidates = {};

// data for the chart
var chart;
var chartData;
var chartOptions;
var chartPieScales;
var chartBarScales;

// paint data
var paintIndex = 'Tossup';
var maxColorValue = 2;

var mode = 'paint';

var legendCounter = true;

function initSVG() {
	// get list of all html state elements
	var htmlElements = document.getElementById('outlines').children;

	// iterate over each element
	for(var index = 0; index < htmlElements.length; ++index) {
	//for(let htmlElement of htmlElements) {
		var htmlElement = htmlElements[index];
		var name = htmlElement.getAttribute('id');
		if(name.includes('text')) {
			// dont include text as states
			// make sure you can't click them
			htmlElement.style.pointerEvents = 'none';
			//htmlElement.style.fontSize = '14px';
			//htmlElement.style.fontWeight = 'bold';
			//console.log(htmlElement);
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
			states.push(new State(name, htmlElement));

		} else if(name.length == 2) {
			// set click function
			htmlElement.setAttribute('onclick', 
				'stateClick(this)');
			htmlElement.style.fill = '#bbb7b2';

			// add the state to the list
			states.push(new State(name, htmlElement));
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
					legendElement.style.backgroundColor = candidate.colors[2];
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
			display: false
		},
		// turn off animation
		animation: false,
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
		}
	}

	chartBarScales = {
			yAxes: [{
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
				data:[]
			}],
		},
		options: chartOptions,
		maintainAspectRatio: true
	});

	chart.generateLegend();
}

// empty the list of candidates and insert the tossup candidate
function initCandidates() {
	candidates = {};
	candidates['Tossup'] = 
	new Candidate('Tossup', ['#000000', '#ff00ff', '#bbb7b2']);
}

function buttonClick(clickElement) {
	var id = clickElement.getAttribute('id');
	var split = id.split('-');
	var state = states.find(state => state.name === split[0]);

	if(mode === 'paint') {
		state.incrementCandidateColor(paintIndex);
		clickElement.style.fill = state.getDisplayColor();
		countVotes();
		updateChart();
		updateLegend();
	} else if(mode === 'ec') {
		var ecedit = document.getElementById('ecedit');
		var eceditText = document.getElementById('ecedit-message');
		var input = document.getElementById('state-ec');
		var stateId = document.getElementById('state-id');
		eceditText.innerHTML = 'Set ' + split[0] + ' electoral college';
		input.value = state.voteCount;
		stateId.value = split[0];
		ecedit.style.display = 'inline';
	}
}

function landClick(clickElement) {
	var id = clickElement.getAttribute('id');
	var split = id.split('-');
	var stateName = split[0];

	var districts = [];

	// get each district
	states.forEach(function(state, index) {
		if(state.name.includes(stateName)) {
			districts.push(state);
		}
	});

	// check if each district has the same candidate and color value
	var sameColor = true;
	var candidate = districts[0].getCandidate();
	var colorValue = districts[0].getColorValue();

	for(var index = 1; index < districts.length; ++index) {
		var district = districts[index];
		if(candidate !== district.getCandidate() ||
			colorValue !== district.getColorValue()) {
			sameColor = false;
			break;
		}
	}


	var color;
	if(sameColor == true) {
		// if same color then increment all district colors
		districts.forEach(function(district) {
			district.incrementCandidateColor(paintIndex);
			color = district.getDisplayColor();
		});
		lands.forEach(function(land) {
			if(land.id.includes(stateName)) {
				land.style.fill = color;
			}
		});
	} else {
		districts.forEach(function(district) {
			district.setColor(paintIndex, 0);
			color = district.getDisplayColor();
		});
		lands.forEach(function(land) {
			if(land.id.includes(stateName)) {
				land.style.fill = color;
			}
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
		land.style.fill = district.getDisplayColor();
		
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
	} else if(mode === 'paint') {

		// increment the states color
		state.incrementCandidateColor(paintIndex);

		// get associated elements
		var elements = document.querySelectorAll('[id^="'
			+ split[0] + '"]');

		for(var i = 0; i < elements.length; ++i) {
			var element = elements[i];

			// change the color of the button elements to
			// the states color
			if (element.id.includes('button') && !element.id.includes('text')) {
				element.style.fill = state.getDisplayColor();
			} else if (element.id.includes('-D')) {
				var district = states.find(state => state.name === element.id);
				var candidate = state.getCandidate();
				var colorValue = state.getColorValue();
				district.setColor(candidate, colorValue);

			}
		}

		countVotes();
		updateChart();
		updateLegend();
	}
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

	htmldiv.style.position = 'relative';
	html.style.display = 'inline-block';

	// set the proper scales
	if(type === 'horizontalBar') {
		chartOptions.scales = chartBarScales;
	} else if(type === 'pie' || type === 'doughnut') {
		chartOptions.scales = chartPieScales;
	}

	// first destroy the chart
	chart.destroy();
	// then rebuild
	chart = new Chart(ctx, {type: type, data: chartData, options: chartOptions});
	updateChart();
}

function toggleLegendCounter() {
	legendCounter = !legendCounter;
	updateLegend();
}

function setMaxPaintIndex(value) {
	maxColorValue = value;	
	verifyMap();
}

function setMode(set) {
	mode = set;

	var modeHTML = document.getElementById('menu-middle');

	var text;
	if(set == 'paint') {
		text = 'Mode - Paint';
	} if(set == 'ec') {
		text = 'Mode - EC Edit';
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

// when a button on the legend is clicked, it saves the selected candidate
// to a variable, so that you can paint with it
function legendClick(candidate, button) {
	paintIndex = candidate;
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
			state.setColor('Tossup', 2);
		} else { 
			// the candidate the state thinks its controled by
			var currentCandidate = state.getCandidate();
			// the candidate the state should be controle by
			var shouldCandidate = candidates[state.getCandidate()].name;

			var currentCandidate
			// if these values differ, change the state to tossup
			if(currentCandidate !== shouldCandidate) {
				state.setColor('Tossup',2);
			}

			if(currentCandidate !== 'Tossup' &&
				state.getColorValue() > maxColorValue) {
				state.setColor(state.getCandidate(),
					maxColorValue);
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
		state.setColor('Tossup', 2);
		state.setVoteCount(ec[state.getName()]);
		var htmlText = document.getElementById(state.getName() + '-text');
		var text = state.getName() + ' ' + state.getVoteCount();
		
		if(text.includes('-')) {
			var split = text.split('-');
			text = split[0] + split[1];
		}

		htmlText.innerHTML = text;
	});

	buttons.forEach(function(button) {
		button.style.fill = candidates['Tossup'].colors[2];
	});

	lands.forEach(function(land) {
		land.style.fill = candidates['Tossup'].colors[2];	
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
		// iterate over every state
		for(var stateIndex = 0; 
			stateIndex < states.length; ++stateIndex) {

			var state = states[stateIndex];

			// skip white states
			if(state.candidateValue == 0 && 
				state.colorValue == 1) {
				continue;
			}

			// if the candidate value of the state
			// equals the index value of the candidate
			// add the vote count to the candidate 
			if(state.candidate == key) {
				candidate.voteCount += state.voteCount;
			}
		}
	}
}

// updates the information of the chart (so the numbers change)
function updateChart() {
	// reset the chart data
	chartData = {
		labels:[],
		datasets: [{
			label: "",
			backgroundColor: [],
			borderColor: '#000000',
			data:[]
		}]
	}

	// loop though candidates
	var index = -1;
	for(var key in candidates) {
		++index;
		var candidate = candidates[key];
		var name = candidate.name;
		var voteCount = candidate.voteCount;
		var color = candidate.colors[0];
		if(index == 0) {
			color = candidates['Tossup'].colors[2];
		}
		// append the candidate label
		chartData.labels[index] = name;
		// append the vote count
		chartData.datasets[0].data[index] = voteCount;
		// change the background color of the visual
		chartData.datasets[0].backgroundColor[index] = color;
	}

	chart.config.data = chartData;
	chart.update();
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

initCandidates();
initSVG();
initChart();
countVotes();
updateChart();
updateLegend();
lightPalette();
