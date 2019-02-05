var textOn = true;

function selectCandidateDisplay(html) {
	var legendButtons = html.parentElement.children;

	for(var index = 0; index < legendButtons.length; ++index) {
		var button = legendButtons[index];
		var text = button.childNodes[0];
		text.style.padding = '5px';
	}
	
	html.childNodes[0].style.padding = '8px';
}

function enableFullscreen() {
	var el = document.documentElement;
	rfs = el.requestFullScreen ||
		el.webkitRequestFullScreen ||
		el.mozRequestFullScreen ||
		el.msRequestFullScreen;
	
	if(typeof rfs !== 'undefined') {
		rfs.call(el);
	}
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

function displayShare() {
	closeAllPopups();
	var share = document.getElementById('share');
	share.style.display = 'inline';
}

function displayMapMenu(type) {
	closeAllPopups();
	var mapmenu = document.getElementById('mapmenu');
	mapmenu.style.display = 'flex';
}

function displayPresetMenu(type) {
	closeAllPopups();
	var presetmenu = document.getElementById('presetmenu');
	presetmenu.style.display = 'flex';
}

function displayChartMenu(type) {
	closeAllPopups();
	var chartmenu = document.getElementById('chartmenu');
	chartmenu.style.display = 'flex';
}

function displayCountersMenu(type) {
	closeAllPopups();
	var countersmenu = document.getElementById('countersmenu');
	countersmenu.style.display = 'flex';
}

function displayThemeMenu(type) {
	closeAllPopups();
	var thememenu = document.getElementById('thememenu');
	thememenu.style.display = 'flex';
}

function displayModeMenu(type) {
	closeAllPopups();
	var modemenu = document.getElementById('modemenu');
	modemenu.style.display = 'flex';
}

function displayAddCandidateMenu(type) {
	closeAllPopups();
	var addcandidatemenu = document.getElementById('addcandidatemenu');
	addcandidatemenu.style.display = 'flex';
}

function closeAllPopups() {
	var popups = document.getElementsByClassName('popup');
	for(var index = 0; index < popups.length; ++index) {
		var popup = popups[index];
		popup.style.display = 'none';
	}
}

function displayMiscMenu(type) {
	var miscmenu = document.getElementById('miscmenu');
	miscmenu.style.display = 'flex';
}

function darkPalette() {
	var body = document.getElementById('application');
	body.style.backgroundColor = '#181922';
	body.style.backgroundImage  = '';
	
	var legend = document.getElementById('legend-div');
	legend.style.borderColor = '#2f3136';
	
	setDisableColor('#212326');
	setTossupColor('#bbb7b2');
	setMapStyle('black', 1.5);
	setTextStyle('black', 'normal');
	setChartBorderStyle(2, 'black');
	setSideBarColor('#2b2e33');
	
	setClickButtonColor('#bbb7b2');
	setClickButtonTextColor('#000000');
	setMenuColor('#2f3136');
	
	chartOptions.plugins.datalabels.borderWidth = 2;
	chartOptions.plugins.datalabels.borderRadius = 4;

	chartBarScales.yAxes[0].ticks.fontColor = '#ffffff';
	chartBarScales.xAxes[0].ticks.fontColor = '#ffffff';
	setChart(chartType, chartPosition);
	verifyMap();
	previousPalette = darkPalette;
}

function terminalPalette() {
	var body = document.getElementById('application');
	body.style.backgroundColor = '#000000';
	body.style.backgroundImage  = '';
	
	var legend = document.getElementById('legend-div');
	legend.style.borderColor = '#2f3136';

	//setDisableColor('#bfbfbf');
	setDisableColor('#bcc8d9');
	setTossupColor('black');
	setChartBorderStyle(2, '#ffffff');
	setTextStyle('white', 'bold');
	setMapStyle('white', 1.5);
	setSideBarColor('#eeeeee');

	setClickButtonColor('#000000');
	setClickButtonTextColor('#ffffff');
	setMenuColor('#eeeeee');
	
	chartOptions.plugins.datalabels.borderWidth = 2;
	chartOptions.plugins.datalabels.borderRadius = 4;
	
	chartBarScales.yAxes[0].ticks.fontColor = '#ffffff';
	chartBarScales.xAxes[0].ticks.fontColor = '#ffffff';
	setChart(chartType, chartPosition);
	verifyMap();
	previousPalette = terminalPalette;
}

function lightPalette() {
	var body = document.getElementById('application');
	body.style.backgroundColor = '#3d4147';
	body.style.backgroundImage  = '';
	
	var legend = document.getElementById('legend-div');
	legend.style.borderColor = '#202225';

	setDisableColor('#212326');
	setTossupColor('#bbb7b2');
	setMapStyle('black', 1.5);

	setSideBarColor('#2b2e33');

	setTextStyle('black', 'normal');
	setChartBorderStyle(2, 'black');
	
	setClickButtonColor('#bbb7b2');
	setClickButtonTextColor('#000000');
	setMenuColor('#2b2e33');
	
	chartOptions.plugins.datalabels.borderWidth = 2;
	chartOptions.plugins.datalabels.borderRadius = 4;
	
	chartBarScales.yAxes[0].ticks.fontColor = '#ffffff';
	chartBarScales.xAxes[0].ticks.fontColor = '#ffffff';
	setChart(chartType, chartPosition);
	verifyMap();
	previousPalette = lightPalette;
}

function contrastPalette() {
	var body = document.getElementById('application');
	body.style.backgroundColor = '#f9f9fa';
	body.style.backgroundImage  = '';

	var legend = document.getElementById('legend-div');
	legend.style.borderColor = '#151515';
	
	setDisableColor('#212326');
	setTossupColor('#ded9d3');
	setMapStyle('black', 1.5);
	setTextStyle('black', 'normal');
	setChartBorderStyle(2, 'black');
	setSideBarColor('#cdcdcd');
	
	setClickButtonColor('#ded9d3');
	setClickButtonTextColor('#000000');
	setMenuColor('#222222');

	chartOptions.plugins.datalabels.borderWidth = 2;
	chartOptions.plugins.datalabels.borderRadius = 4;

	chartBarScales.yAxes[0].ticks.fontColor = '#000000';
	chartBarScales.xAxes[0].ticks.fontColor = '#000000';
	setChart(chartType, chartPosition);
	verifyMap();
	previousPalette = contrastPalette;
}

function metallicPalette() {
	var body = document.getElementById('application');
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
	
	setClickButtonColor('#bbb7b2');
	setClickButtonTextColor('#000000');
	setMenuColor('#33353b');

	chartOptions.plugins.datalabels.borderWidth = 2;
	chartOptions.plugins.datalabels.borderRadius = 4;
	
	chartBarScales.yAxes[0].ticks.fontColor = '#ffffff';
	chartBarScales.xAxes[0].ticks.fontColor = '#ffffff';
	setChart(chartType, chartPosition);
	verifyMap();
	previousPalette = metallicPalette;
}

function toWinPalette() {
	var body = document.getElementById('application');
	//body.style.backgroundImage  = 'radial-gradient(#2f3136, #181922)';
	body.style.backgroundColor = '#fffbf2';
	body.style.backgroundImage  = '';

	var menu = document.getElementById('menu-div');
	menu.style.backgroundColor = '#202020';
	
	var legend = document.getElementById('legend-div');
	legend.style.borderColor = '#202020';

	setDisableColor('#dddddd');
	setTossupColor('#bbaa90');
	setMapStyle('#fffbf2', 1);
	setTextStyle('white', 'bold');
	setChartBorderStyle(2, '#f2eee6');
	setSideBarColor('#f2eee6');
	
	setClickButtonColor('#f2eee6');
	setClickButtonTextColor('#000000');
	setMenuColor('#000000');

	chartOptions.plugins.datalabels.borderWidth = 0;
	chartOptions.plugins.datalabels.borderRadius = 2;

	chartBarScales.yAxes[0].ticks.fontColor = '#000000';
	chartBarScales.xAxes[0].ticks.fontColor = '#000000';
	setChart(chartType, chartPosition);
	verifyMap();
	previousPalette = toWinPalette;
}

function setChartBorderStyle(width, color) {
	chartBorderWidth = width;
	chartBorderColor = color;

	var battlechart = document.getElementById('battlechartright');
	battlechart.style.border = '1px solid ' + color;	
	updateChart();

	var legenddiv = document.getElementById('legend-div');
	legenddiv.style.borderColor = color;
}

function setMenuColor(color) {
	var menu = document.getElementById('menu-div');
	menu.style.backgroundColor = color;
	var clickButtons = document.getElementsByClassName('click-button');
	for(var index = 0; index < clickButtons.length; ++index) {
		button = clickButtons[index];
		button.style.borderColor = color;
	}
}

function setClickButtonTextColor(color) {
	var clickButtons = document.getElementsByClassName('click-button');
	for(var index = 0; index < clickButtons.length; ++index) {
		button = clickButtons[index];
		button.style.color = color;
	}
}

function setClickButtonColor(color) {
	var clickButtons = document.getElementsByClassName('click-button');
	for(var index = 0; index < clickButtons.length; ++index) {
		button = clickButtons[index];
		button.style.backgroundColor = color;
	}
}

function setDisableColor(color) {
	TOSSUP.colors[1] = color;
	//verifyMap();
}

function setTossupColor(color) {
	TOSSUP.colors[2] = color;
	var tossupText = document.getElementById('Tossup-text');
	tossupText.style.backgroundColor = color;
}

function setMapStyle(color, strokeWidth) {
	var outlines = document.getElementById('outlines');
	outlines.style.stroke = color;
	outlines.style.strokeWidth = strokeWidth * strokeMultiplier;

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
		text.style.textAlign = 'center';
		
		for(key in text.children) {
			var child = text.children[key];
			try {
				child.setAttribute('text-anchor', 'middle');
				child.setAttribute('alignment-baseline', 'central');
			} catch(e) {

			}
		} 
	}

	var battlechart = document.getElementById('battlechart');
	battlechart.style.color = color;
	battlechart.style.fontWeight = weight;

	var legenddiv = document.getElementById('legend-div');
	legenddiv.style.color = color;
	legenddiv.style.weight = weight;
}

function setBattleHorizontal() {
	var application = document.getElementById('application');
	application.style.flexDirection = 'column-reverse';

	var map = document.getElementById('map-div');
	map.style.height = '80%';

	var sidebar = document.getElementById('chart-div');
	sidebar.style.flexDirection = 'row';
	sidebar.style.width = '100%';	
	sidebar.style.height = '20%';

	var battlechart = document.getElementById('battlechart');
	battlechart.style.flexDirection = 'column';
	battlechart.style.height = '55%';
	battlechart.style.marginLeft = '50px';
	battlechart.style.marginRight = '50px';
	battlechart.style.marginTop = '0px';
	battlechart.style.marginBottom = '0';
	var battlechartmid = document.getElementById('battlechartmid');
	battlechartmid.style.transform = 'rotate(90deg)';	
	var battlechartright = document.getElementById('battlechartright');
	battlechartright.style.flexDirection = 'row';

	var topbar = document.getElementById('topbar');
	//topbar.style.boxShadow = '1px 0px 3px black';
	topbar.style.borderRight = topbar.style.borderBottom;
	topbar.style.borderBottom = '';
	topbar.style.flexDirection = 'row';
	topbar.style.minWidth = '0';

	var bottombar = document.getElementById('bottombar');
	//bottombar.style.boxShadow = '-1px 0px 3px black';
	bottombar.style.borderLeft = bottombar.style.borderTop;	
	bottombar.style.borderTop = '';
	bottombar.style.flexDirection = 'row';
	bottombar.style.minWidth = '0';
}

function unsetBattleHorizontal() {
	var application = document.getElementById('application');
	application.style.flexDirection = 'row';
	
	var map = document.getElementById('map-div');
	map.style.height = '100%';

	var sidebar = document.getElementById('chart-div');
	sidebar.style.flexDirection = 'column';
	sidebar.style.width = '28vw';	
	sidebar.style.height = '100%';

	var battlechart = document.getElementById('battlechart');
	battlechart.style.flexDirection = 'row';
	battlechart.style.height = '100%';
	if(mobile) {
		battlechart.style.width = '100%';
	}
	battlechart.style.marginLeft = '25px';
	battlechart.style.marginRight = '25px';
	battlechart.style.marginTop = '20px';
	battlechart.style.marginBottom = '20px';

	var battlechartmid = document.getElementById('battlechartmid');
	battlechartmid.style.transform = '';	
	var battlechartright = document.getElementById('battlechartright');
	battlechartright.style.flexDirection = 'column';

	var topbar = document.getElementById('topbar');
	//topbar.style.boxShadow = '0px -1px 3px black';
	topbar.style.borderBottom = topbar.style.borderRight;
	topbar.style.borderRight = '';
	topbar.style.flexDirection = 'column';
	topbar.style.minWidth = '0';

	var bottombar = document.getElementById('bottombar');
	//bottombar.style.boxShadow = '0px 1px 3px black';
	bottombar.style.borderTop = bottombar.style.borderLeft;
	bottombar.style.borderLeft = '';
	bottombar.style.flexDirection = 'column';
	bottombar.style.minWidth = '0';
}

// dynamically change the chart from one form to another
function setChart(type, position) {
	console.log('Set Chart - ' + type);
	var sidebar = document.getElementById('chart-div');
	var chartHTML = document.getElementById('chart');
	var html = document.getElementById('chart-canvas');
	var ctx = html.getContext('2d');
	var battlechart = document.getElementById('battlechart');
	chartHTML.style.display = 'inline-block';
	battlechart.style.display = 'none';
	sidebar.style.display = 'flex';
	
	sidebar.style.width = '28vw';

	if(type === 'none') {

		html.style.display = 'none';

		unsetBattleHorizontal();
		sidebar.style.width = '4vw';

		chartType = type;
		centerMap();
		return;
	} else if(type === 'horizontalbattle' || type === 'verticalbattle') {
		if(Object.keys(candidates).length > 3) {
		
			displayNotification('Sorry',
				'This chart requires that there be two candidates');
			return;
		}
		
		if(type === 'horizontalbattle') {
			setBattleHorizontal();
		}
		else {
			unsetBattleHorizontal();
			sidebar.style.width = '20vw';	
		}

		html.style.display = 'none';
		chartHTML.style.display = 'none';
		battlechart.style.display = 'flex';
		chartType = type;
		updateChart();
		centerMap();
		return;
	} 
	
	unsetBattleHorizontal();

	chartPosition = position;	
	if(position === 'bottom') {
		var application = document.getElementById('application');
		application.style.flexDirection = 'column-reverse';
		
		var map = document.getElementById('map-div');
		map.style.height = '80%';

		var sidebar = document.getElementById('chart-div');
		sidebar.style.flexDirection = 'row';
		sidebar.style.width = '100%';	
		sidebar.style.height = '20%';
	
		var charthtml = document.getElementById('chart');
		charthtml.style.height = 'auto';
		charthtml.style.width = '' + (sidebar.offsetHeight - 5) + 'px';
	} else {
		var application = document.getElementById('application');
		application.style.flexDirection = 'row';

		var map = document.getElementById('map-div');
		map.style.height = '100%';

		var sidebar = document.getElementById('chart-div');
		sidebar.style.flexDirection = 'column';
		sidebar.style.width = '28vw';	
		sidebar.style.height = '100%';
		
		var charthtml = document.getElementById('chart');
		charthtml.style.width = '100%';
	}


	centerMap();
		
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
	}

	// first destroy the chart
	chart.destroy();
	// then rebuild
	chart = new Chart(ctx, {type: type, data: chartData, options: chartOptions});
	countVotes();
	updateChart();
}


