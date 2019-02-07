// keep data in function scope
(function() {
	var moveButton = document.getElementById('movebutton');
	moveButton.style.display = 'none';

	var paintmoveButton = document.getElementById('paintmovebutton');
	paintmoveButton.style.display = 'none';

	var clickButtons = document.getElementsByClassName('click-button');
	for(var index = 0; index < clickButtons.length; ++index) {
		clickButtons[index].style.padding = '7px';
	}

/*
	var themeButton = document.getElementById('themebutton');
	themeButton.style.display = 'none';

	var chartButton = document.getElementById('chartbutton');
	chartButton.style.display = 'none';

	var counterButton = document.getElementById('counterbutton');
	counterButton.style.display = 'none';

	var miscButton = document.getElementById('miscbutton');
	miscButton.style.display = 'none';

	var addCandidateButton = document.getElementById('addcandidatebutton');
	addCandidateButton.innerHTML = 'Add';
*/
})();
