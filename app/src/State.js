var totalVotes = 0;

class State {
	constructor(name, htmlElement, dataid) {
		this.name = name;
		this.colorValue = 1;
		this.htmlElement = htmlElement;
		this.candidate = 'Tossup';
		this.dataid = dataid;
		this.voteCount = 0;
		this.resetVoteCount();
		this.disabled = false;
	}

	resetVoteCount() {
		totalVotes -= this.voteCount;
		if(this.dataid === 'congressional') {
			this.voteCount = 1;
		} else if(this.dataid === 'senate') {
			this.voteCount = 2;
		} else if(this.dataid === 'ltesenate') {
			this.voteCount = 1;	
		}else {
			this.voteCount = data[this.dataid][this.name];
		}
		totalVotes += this.voteCount;
	}

	getCandidate() { 
		return this.candidate; 
	}

	getName() { 
		return this.name; 
	}
	
	getColorValue() { 
		return this.colorValue; 
	}

	getVoteCount() { 
		return this.voteCount; 
	}

	setVoteCount(value) {
		var diff = value - this.voteCount;
		this.voteCount = value;
		totalVotes += diff;
	}

	getHtml() { 
		return this.htmlElement; 
	}

	getDisplayColor() {
		return this.htmlElement.style.fill;
	}

	setDisplayColor(color) {
		this.htmlElement.style.fill = color;

		var button = document.getElementById(this.name + '-button');
		if(button != null) {
			button.style.fill = color;
		}
	}

	verifyDisabledColor() {
		if(this.disabled) {
			this.setDisplayColor(candidates['Tossup'].colors[1]);
		}
	}

	enable() {
		this.disabled = false;
		this.setColor(this.getCandidate(), this.getColorValue());
		if(this.name.includes('-S')) {
			this.htmlElement.style.visibility = 'visible';
		}
	}

	toggleDisable() {
		if(this.disabled == false) {
			this.setDisplayColor(candidates['Tossup'].colors[1]);
			this.disabled = !this.disabled;
			if(this.name.includes('-S')) {
				this.htmlElement.style.visibility = 'hidden';
			}
		} else if(this.disabled == true) {
			this.disabled = !this.disabled;
			this.setColor(this.getCandidate(), this.getColorValue());
			if(this.name.includes('-S')) {
				this.htmlElement.style.visibility = 'visible';
			}
		}
	}

	// only incrememnt though the colors of the specified candidate
	// if the state isn't this candidates color, start at solid
	incrementCandidateColor(candidate) {
		if(this.disabled) {
			return;
		}

		// if changing color set to solor
		if(this.candidate !== candidate) {
			this.colorValue = 0;
		}
		// otherwise increment
		else {
			this.colorValue += 1;
		}

		// keep the color value within bounds
		if(this.candidate === 'Tossup') {
			// if the candidate is tossup go to max
			if(this.colorValue >= 3) {
				this.colorValue = 0;
			}

		} else {
			// if the candidate is anything else...
			if(this.colorValue >= maxColorValue + 1) {
				this.colorValue = 0;
			}
		}

		// make sure the candidate value is correct
		this.candidate = candidate;

		// skip black color for tossup candidate
		if(this.candidate === 'Tossup') {
			this.colorValue = tossupColor;
		}

		// get color
		var color = candidates[this.candidate]
			.colors[this.colorValue];
	
		// set color
		this.htmlElement.style.fill = color;

		var land = document.getElementById(this.name + '-land');
		if(land != null) {
			land.style.fill = color;
		}

		var button = document.getElementById(this.name + '-button');
		if(button != null) {
			button.style.fill = color;
		}
	}

	// directly change the color of a state (add error checking pls)
	setColor(candidate, colorValue) {
		if(this.disabled) {
			return;
		}

		this.candidate = candidate;

		// prevent black color
		if(candidate === 'Tossup' && colorValue == 0) {
			colorValue = 1;
		}

		this.colorValue = colorValue;


		var color = candidates[candidate]
			.colors[colorValue];

		this.htmlElement.style.fill = color;

		var land = document.getElementById(this.name + '-land');
		if(land != null) {
			land.style.fill = color;
		}

		var button = document.getElementById(this.name + '-button');
		if(button != null) {
			button.style.fill = color;
		}
	}

	// hide the state and its associated elements
	hide() {
		this.htmlElement.style.visibility = 'hidden';

		var text = document.getElementById(this.getName() + '-text');
		text.style.visibility = 'hidden';

		var button = document.getElementById(this.getName() + '-button');
		if(button != null) {
			button.style.visibility = 'hidden';
		}

		var land = document.getElementById(this.getName() + '-land');
		if(land != null) {
			land.style.visibility = 'hidden';
		}

		if(this.getName().includes('-AL')) {
			var split = this.getName().split('-');
			var mapText = document.getElementById(split[0] + '-text');
			mapText.style.visibility = 'hidden';
		}
	}

	show() {
		this.htmlElement.style.visibility = 'visible';
		var text = document.getElementById(this.getName() + '-text');
		if(text != null) {
			text.style.visibility = 'visible';
		}

		var button = document.getElementById(this.getName() + '-button');
		if(button != null) {
			button.style.visibility = 'visible';
		}

		var land = document.getElementById(this.getName() + '-land');
		if(land != null) {
			land.style.visibility = 'visible';
		}
		
		if(this.getName().includes('-AL')) {
			var split = this.getName().split('-');
			var mapText = document.getElementById(split[0] + '-text');
			mapText.style.visibility = 'visible';
		}
	}

	setVoteCount(value) {
		var diff = value - this.voteCount;
		totalVotes += diff;
		this.voteCount = value;
		countVotes();
		updateChart();
		updateLegend();
	}
};
