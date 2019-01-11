class State {
	constructor(name, htmlElement) {
		this.name = name;
		this.colorValue = 1;
		this.voteCount = ec[name];
		this.htmlElement = htmlElement;
		this.candidate = 'Tossup';
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
		this.voteCount = value;
	}

	getHtml() { 
		return this.htmlElement; 
	}

	getDisplayColor() {
		return this.htmlElement.style.fill;
	}

	// only incrememnt though the colors of the specified candidate
	// if the state isn't this candidates color, start at solid
	incrementCandidateColor(candidate) {
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
		if(this.candidate === 'Tossup' && this.colorValue != 2) {
			this.colorValue = 2;
		}

		// get color
		var color = candidates[this.candidate]
			.colors[this.colorValue];
	
		// set color
		this.htmlElement.style.fill = color;
	}

	// directly change the color of a state (add error checking pls)
	setColor(candidate, colorValue) {
		this.candidate = candidate;

		// prevent black color
		if(candidate === 'Tossup' && colorValue == 0) {
			colorValue = 1;
		}

		this.colorValue = colorValue;


		var color = candidates[candidate]
			.colors[colorValue];

		this.htmlElement.style.fill = color;
	}
};
