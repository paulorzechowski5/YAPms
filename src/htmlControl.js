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
}

function lightPalette() {
	var body = document.getElementById('body');
	body.style.backgroundColor = '#2f3136';
	body.style.backgroundImage  = '';

	var menu = document.getElementById('menu-div');
	menu.style.backgroundColor = '#202225'
	
	var legend = document.getElementById('legend-div');
	legend.style.borderColor = '#202225';
}

function contrastPalette() {
	var body = document.getElementById('body');
	body.style.backgroundColor = '#454545';
	body.style.backgroundImage  = '';

	var menu = document.getElementById('menu-div');
	menu.style.backgroundColor = '#111111'

	var legend = document.getElementById('legend-div');
	legend.style.borderColor = '#111111';
}

function metallicPalette() {
	
	var body = document.getElementById('body');
	//body.style.backgroundImage  = 'radial-gradient(#2f3136, #181922)';
	body.style.backgroundImage  = 'linear-gradient(#333333, #000000)';

	var menu = document.getElementById('menu-div');
	menu.style.backgroundColor = '#2f3136'
	
	var legend = document.getElementById('legend-div');
	legend.style.borderColor = '#2f3136';
}
