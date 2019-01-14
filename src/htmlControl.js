var textOn = true;

function showAddCandidate() {
	var html = document.getElementById('addCandidateDropdown');

	if(html.style.display === '') {
		html.style.display = 'block';
	} else {
		html.style.display = '';
	}
}

function selectCandidateDisplay(html) {
	var legendButtons = html.parentElement.children;

	for(var index = 0; index < legendButtons.length; ++index) {
		var button = legendButtons[index];
		button.style.borderStyle = 'none';
	}

	html.style.borderStyle = 'solid';
}

function toggleText() {
	var texts = document.querySelectorAll('[id$="text"]');

	textOn = !textOn;

	for(var index = 0; index < texts.length; ++index) {
		var text = texts[index];

		if(text.id.includes('button')) {
			continue;
		}
	
		if(text.style.display === '') {
			text.style.display = 'none';
		} else {
			text.style.display = '';
		}
	}
}

// make sure that text is properly toggled
function verifyTextToggle() {
	var texts = document.querySelectorAll('[id$="text"]');

	for(var index = 0; index < texts.length; ++index) {
		var text = texts[index];

		if(text.id.includes('button')) {
			continue;
		}

		if(textOn == false) {
			text.style.display = 'none';
		} else if(textOn == true) {
			text.style.display = '';
		}
	}
}

function darkPalette() {
	var body = document.getElementById('body');
	body.style.backgroundColor = '#181922';
	body.style.backgroundImage  = '';

	var menu = document.getElementById('menu-div');
	menu.style.backgroundColor = '#2f3136'
	
	var legend = document.getElementById('legend-div');
	legend.style.borderColor = '#2f3136';
	
	setTossupColor('#bbb7b2');
	setMapStyle('black', 1.5);
	setTextStyle('black', 'normal');
	setChartBorderStyle(2, 'black');
	
	chartOptions.plugins.datalabels.borderWidth = 2;
	chartOptions.plugins.datalabels.borderRadius = 4;

	chartBarScales.yAxes[0].ticks.fontColor = '#ffffff';
	chartBarScales.xAxes[0].ticks.fontColor = '#ffffff';
	setChart(chart.config.type);
}

function dark2Palette() {
	darkPalette();

	setTextStyle('white', 'bold');
	setTossupColor('#665544');
	setChartBorderStyle(2, '#ffffff');
	setMapStyle('white', 1.5);
	setChart(chart.config.type);
}

function terminalPalette() {
	var body = document.getElementById('body');
	body.style.backgroundColor = '#000000';
	body.style.backgroundImage  = '';
	
	var menu = document.getElementById('menu-div');
	menu.style.backgroundColor = '#2f3136'

	setTossupColor('black');
	setChartBorderStyle(2, '#ffffff');
	setTextStyle('white', 'bold');
	setMapStyle('white', 1.5);
	
	chartOptions.plugins.datalabels.borderWidth = 2;
	chartOptions.plugins.datalabels.borderRadius = 4;
	
	chartBarScales.yAxes[0].ticks.fontColor = '#ffffff';
	chartBarScales.xAxes[0].ticks.fontColor = '#ffffff';
	setChart(chart.config.type);
	setChart(chart.config.type);
}

function lightPalette() {
	var body = document.getElementById('body');
	body.style.backgroundColor = '#30353f';
	body.style.backgroundImage  = '';

	var menu = document.getElementById('menu-div');
	menu.style.backgroundColor = '#202225'
	
	var legend = document.getElementById('legend-div');
	legend.style.borderColor = '#202225';

	setTossupColor('#bbb7b2');
	setMapStyle('black', 1.5);
	
	setTextStyle('black', 'normal');
	setChartBorderStyle(2, 'black');
	
	chartOptions.plugins.datalabels.borderWidth = 2;
	chartOptions.plugins.datalabels.borderRadius = 4;
	
	chartBarScales.yAxes[0].ticks.fontColor = '#ffffff';
	chartBarScales.xAxes[0].ticks.fontColor = '#ffffff';
	setChart(chart.config.type);
}

function contrastPalette() {
	var body = document.getElementById('body');
	body.style.backgroundColor = '#dbdbdb';
	body.style.backgroundImage  = '';

	var menu = document.getElementById('menu-div');
	menu.style.backgroundColor = '#151515'

	var legend = document.getElementById('legend-div');
	legend.style.borderColor = '#151515';
	
	setTossupColor('#bbb7b2');
	setMapStyle('black', 1.5);
	setTextStyle('black', 'normal');
	setChartBorderStyle(2, 'black');
	
	chartOptions.plugins.datalabels.borderWidth = 2;
	chartOptions.plugins.datalabels.borderRadius = 4;

	chartBarScales.yAxes[0].ticks.fontColor = '#000000';
	chartBarScales.xAxes[0].ticks.fontColor = '#000000';
	setChart(chart.config.type);
}

function metallicPalette() {
	var body = document.getElementById('body');
	//body.style.backgroundImage  = 'radial-gradient(#2f3136, #181922)';
	body.style.backgroundImage  = 'linear-gradient(#333333, #000000)';

	var menu = document.getElementById('menu-div');
	menu.style.backgroundColor = '#2f3136'
	
	var legend = document.getElementById('legend-div');
	legend.style.borderColor = '#2f3136';
	
	setTossupColor('#bbb7b2');
	setMapStyle('black', 1.5);
	setTextStyle('black', 'normal');
	setChartBorderStyle(2, 'black');
	
	chartOptions.plugins.datalabels.borderWidth = 2;
	chartOptions.plugins.datalabels.borderRadius = 4;
	
	chartBarScales.yAxes[0].ticks.fontColor = '#ffffff';
	chartBarScales.xAxes[0].ticks.fontColor = '#ffffff';
	setChart(chart.config.type);
}

function toWinPalette() {
	var body = document.getElementById('body');
	//body.style.backgroundImage  = 'radial-gradient(#2f3136, #181922)';
	body.style.backgroundColor = '#ffffff';
	body.style.backgroundImage  = '';

	var menu = document.getElementById('menu-div');
	menu.style.backgroundColor = '#202020';
	
	var legend = document.getElementById('legend-div');
	legend.style.borderColor = '#202020';

	setTossupColor('#bbaa90');
	setMapStyle('white', 1);
	setTextStyle('white', 'bold');
	setChartBorderStyle(2, 'white');

	chartOptions.plugins.datalabels.borderWidth = 0;
	chartOptions.plugins.datalabels.borderRadius = 2;

	chartBarScales.yAxes[0].ticks.fontColor = '#000000';
	chartBarScales.xAxes[0].ticks.fontColor = '#000000';
	setChart(chart.config.type);
}

function setChartBorderStyle(width, color) {
	chartBorderWidth = width;
	chartBorderColor = color;
	updateChart();
}

function setTossupColor(color) {
	TOSSUP.colors[2] = color;
	var tossupLegend = document.getElementById('Tossup');
	tossupLegend.style.background = color;
	verifyMap();

	if(color === 'black') {
		tossupLegend.style.color = 'white';
	} else {
		tossupLegend.style.color = 'black';
	}
}

function setButtonStyle(color, strokeWidth) {

	var states = document.getElementById('outlines').children;
	
	for(var index = 0; index < states.length; ++index) {
		var state = states[index];
		state.style.stroke = color;
		state.style.strokeWidth = strokeWidth;
	}
}

function setMapStyle(color, strokeWidth) {
	var states = document.getElementById('outlines').children;
	
	for(var index = 0; index < states.length; ++index) {
		var state = states[index];
		state.style.stroke = color;
		state.style.strokeWidth = strokeWidth;
	}
}

function setTextStyle(color, weight) {
	var text = document.getElementById('text');
	text.style.strokeWidth = 0;
	text.style.fontWeight = weight;
	text.style.fill = color;
}
