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

