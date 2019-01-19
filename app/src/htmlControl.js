var textOn = true;

function toggleAddCandidate() {
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

function displayNotification(title, text) {
	var notification = document.getElementById('notification');
	var messageHTML = notification.querySelector('#notification-message');
	var titleHTML = notification.querySelector('#notification-title');
	notification.style.display = 'inline';
	messageHTML.innerHTML = text;
	titleHTML.innerHTML = title;
}

function darkPalette() {
	var body = document.getElementById('body');
	body.style.backgroundColor = '#181922';
	body.style.backgroundImage  = '';

	var menu = document.getElementById('menu-div');
	menu.style.backgroundColor = '#2f3136'
	
	var legend = document.getElementById('legend-div');
	legend.style.borderColor = '#2f3136';
	
	setDisableColor('#212326');
	setTossupColor('#bbb7b2');
	setMapStyle('black', 1.5);
	setTextStyle('black', 'normal');
	setChartBorderStyle(2, 'black');
	setSideBarColor('#2b2e33');
	
	chartOptions.plugins.datalabels.borderWidth = 2;
	chartOptions.plugins.datalabels.borderRadius = 4;

	chartBarScales.yAxes[0].ticks.fontColor = '#ffffff';
	chartBarScales.xAxes[0].ticks.fontColor = '#ffffff';
	setChart(chartType);
	verifyMap();
	previousPalette = darkPalette;
}

function terminalPalette() {
	var body = document.getElementById('body');
	body.style.backgroundColor = '#000000';
	body.style.backgroundImage  = '';
	
	var menu = document.getElementById('menu-div');
	menu.style.backgroundColor = '#2f3136'
	
	var legend = document.getElementById('legend-div');
	legend.style.borderColor = '#2f3136';

	//setDisableColor('#bfbfbf');
	setDisableColor('#bcc8d9');
	setTossupColor('black');
	setChartBorderStyle(2, '#ffffff');
	setTextStyle('white', 'bold');
	setMapStyle('white', 1.5);
	setSideBarColor('#888888');
	
	chartOptions.plugins.datalabels.borderWidth = 2;
	chartOptions.plugins.datalabels.borderRadius = 4;
	
	chartBarScales.yAxes[0].ticks.fontColor = '#ffffff';
	chartBarScales.xAxes[0].ticks.fontColor = '#ffffff';
	setChart(chartType);
	verifyMap();
	previousPalette = terminalPalette;
}

function lightPalette() {
	var body = document.getElementById('body');
	//body.style.backgroundColor = '#30353f';
	//body.style.backgroundColor = '#3a3f45';
	body.style.backgroundColor = '#3d4147';
	body.style.backgroundImage  = '';

	var menu = document.getElementById('menu-div');
	menu.style.backgroundColor = '#202225'
	
	var legend = document.getElementById('legend-div');
	legend.style.borderColor = '#202225';

	//setDisableColor('#333333');
	setDisableColor('#212326');
	setTossupColor('#bbb7b2');
	setMapStyle('black', 1.5);

	setSideBarColor('#2b2e33');

	setTextStyle('black', 'normal');
	setChartBorderStyle(2, 'black');
	
	chartOptions.plugins.datalabels.borderWidth = 2;
	chartOptions.plugins.datalabels.borderRadius = 4;
	
	chartBarScales.yAxes[0].ticks.fontColor = '#ffffff';
	chartBarScales.xAxes[0].ticks.fontColor = '#ffffff';
	setChart(chartType);
	verifyMap();
	previousPalette = lightPalette;
}

function contrastPalette() {
	var body = document.getElementById('body');
	body.style.backgroundColor = '#dbdbdb';
	body.style.backgroundImage  = '';

	var menu = document.getElementById('menu-div');
	menu.style.backgroundColor = '#151515'

	var legend = document.getElementById('legend-div');
	legend.style.borderColor = '#151515';
	
	setDisableColor('#212326');
	setTossupColor('#bbb7b2');
	setMapStyle('black', 1.5);
	setTextStyle('black', 'normal');
	setChartBorderStyle(2, 'black');
	setSideBarColor('#bababa');

	chartOptions.plugins.datalabels.borderWidth = 2;
	chartOptions.plugins.datalabels.borderRadius = 4;

	chartBarScales.yAxes[0].ticks.fontColor = '#000000';
	chartBarScales.xAxes[0].ticks.fontColor = '#000000';
	setChart(chartType);
	verifyMap();
	previousPalette = contrastPalette;
}

function metallicPalette() {
	var body = document.getElementById('body');
	//body.style.backgroundImage  = 'radial-gradient(#2f3136, #181922)';
	body.style.backgroundImage  = 'linear-gradient(#333333, #000000)';

	var menu = document.getElementById('menu-div');
	menu.style.backgroundColor = '#2f3136'
	
	var legend = document.getElementById('legend-div');
	legend.style.borderColor = '#2f3136';
	
	setDisableColor('#212326');
	setTossupColor('#bbb7b2');
	setMapStyle('black', 1.5);
	setTextStyle('black', 'normal');
	setChartBorderStyle(2, 'black');
	setSideBarColor('#33353b');

	chartOptions.plugins.datalabels.borderWidth = 2;
	chartOptions.plugins.datalabels.borderRadius = 4;
	
	chartBarScales.yAxes[0].ticks.fontColor = '#ffffff';
	chartBarScales.xAxes[0].ticks.fontColor = '#ffffff';
	setChart(chartType);
	verifyMap();
	previousPalette = metallicPalette;
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

	setDisableColor('#dddddd');
	setTossupColor('#bbaa90');
	setMapStyle('white', 1);
	setTextStyle('white', 'bold');
	setChartBorderStyle(2, 'white');
	setSideBarColor('#ffffff');

	chartOptions.plugins.datalabels.borderWidth = 0;
	chartOptions.plugins.datalabels.borderRadius = 2;

	chartBarScales.yAxes[0].ticks.fontColor = '#000000';
	chartBarScales.xAxes[0].ticks.fontColor = '#000000';
	setChart(chartType);
	verifyMap();
	previousPalette = toWinPalette;
}

function setChartBorderStyle(width, color) {
	chartBorderWidth = width;
	chartBorderColor = color;
	updateChart();
}

function setDisableColor(color) {
	TOSSUP.colors[1] = color;
	//verifyMap();
}

function setTossupColor(color) {
	TOSSUP.colors[2] = color;
	var tossupLegend = document.getElementById('Tossup');
	tossupLegend.style.background = color;
	//verifyMap();

	if(color === 'black') {
		tossupLegend.style.color = 'white';
	} else {
		tossupLegend.style.color = 'black';
	}
}

function setMapStyle(color, strokeWidth) {
	var outlines = document.getElementById('outlines');
	outlines.style.stroke = color;
	outlines.style.strokeWidth = strokeWidth * strokeMultiplier;
	
	if(mapType === 'congressional') {
	//	outlines.style.strokeWidth = 0.1;
	}

	var special = document.getElementById('special');
	if(special != null) {
		special.style.stroke = color;
		special.style.strokeWidth = strokeWidth * strokeMultiplier;
	}
}

function setSideBarColor(color) {
	var sidebar = document.getElementById('chart-div');
	sidebar.style.background = color;
}

function setTextStyle(color, weight) {
	var text = document.getElementById('text');
	if(text !== null) {
		text.style.strokeWidth = 0;
		text.style.fontWeight = weight;
		text.style.fill = color;
	}
}
