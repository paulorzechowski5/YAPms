var totalVotes = 0;

class State {
	constructor(name, htmlElement, dataid) {
		this.name = name;
		this.colorValue = 1;
		this.htmlElement = htmlElement;
		this.candidate = 'Tossup';
		this.dataid = dataid;
		this.voteCount = 0;
		this.voteCount_beforeDisable;
		this.resetVoteCount();
		this.disabled = false;
		this.locked = false;
	}

	resetVoteCount() {
		//totalVotes -= this.voteCount;
		if(this.dataid === 'congressional') {
			this.setVoteCount(1);
			//this.voteCount = 1;
		} else if(this.dataid === 'senate') {
			this.setVoteCount(2);
			//this.voteCount = 2;
		} else if(this.dataid === 'ltesenate') {
			this.setVoteCount(1);
			//this.voteCount = 1;	
		}else {
			this.setVoteCount(data[this.dataid][this.name]);
			//this.voteCount = data[this.dataid][this.name];
		}
		//totalVotes += this.voteCount;
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
	
	setVoteCount(value, updateText) {
		var diff = value - this.voteCount;
		this.voteCount = value;
		console.log("DIFF: " + diff + " " + value);
		totalVotes += diff;

		// update the html text display
		if(updateText) {
			var stateText = document.getElementById(this.name + '-text');
			var text = this.name + ' ' + value;

			// the text elements in an svg are inside spans
			if(typeof stateText.childNodes[1] !== 'undefined') {
				stateText.childNodes[1].innerHTML = ' ' + value;
			} else {
				stateText.childNodes[0].innerHTML = this.name + ' ' + value;
			}
		}
		
		countVotes();
		updateChart();
		updateLegend();
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
		if(button !== null) {
			button.style.fill = color;
		}

		var land = document.getElementById(this.name + '-land');
		if(land !== null) {
			land.style.fill = color;
		}
	}

	verifyTossupColor() {
		if(this.candidate === 'Tossup') {
			this.setDisplayColor(TOSSUP.colors[2]);
			//this.setColor('Tossup', 2);
		}
	}

	toggleLock() {
		if(this.locked == false) {
			this.disabled = true;
			//this.setColor('Tossup', 2);

			//this.setDisplayColor(candidates['Tossup'].colors[1]);
			this.locked = !this.locked;
			//this.disabled = !this.disabled;
			if(this.name.includes('-S')) {
				this.htmlElement.style.visibility = 'hidden';
			}
			this.setDisplayColor(TOSSUP.colors[2]);
			this.htmlElement.setAttribute('fill-opacity', '0.2');
			this.htmlElement.setAttribute('stroke-opacity', '0.2');
			var stateText = document.getElementById(this.name + '-text');
			if(stateText !== null) {
				stateText.setAttribute('fill-opacity', '0.2');
			}

			var land = document.getElementById(this.name + '-land');
			if(land !== null) {
				land.setAttribute('fill-opacity', '0.2');
				land.setAttribute('stroke-opacity', '0.2');
			}

			var button = document.getElementById(this.name + '-button');
			if(button !== null) {
				button.setAttribute('fill-opacity', '0.2');
				button.setAttribute('stroke-opacity', '0.2');
			}

			var stateLandText = document.getElementById(this.name.split("-")[0] + '-text');
			if(stateLandText !== null) {
//				stateLandText.setAttribute('fill-opacity', '0.25');
			}

		} else if(this.locked == true) {
			this.disabled = false;
			this.locked = !this.locked;
			this.setColor(this.getCandidate(), this.getColorValue());
			this.htmlElement.setAttribute('fill-opacity', '1.0');
			this.htmlElement.setAttribute('stroke-opacity', '1.0');
			if(this.name.includes('-S')) {
				this.htmlElement.style.visibility = 'visible';
			}
			var stateText = document.getElementById(this.name + '-text');
			if(stateText !== null) {
				stateText.setAttribute('fill-opacity', '1.0');
			}
			var land = document.getElementById(this.name + '-land');
			if(land != null) {
				land.setAttribute('fill-opacity', '1.0');
				land.setAttribute('stroke-opacity', '1.0');
			}
			
			var button = document.getElementById(this.name + '-button');
			if(button !== null) {
				button.setAttribute('fill-opacity', '1.0');
				button.setAttribute('stroke-opacity', '1.0');
			}
			
			var stateLandText = document.getElementById(this.name.split("-")[0] + '-text');
			if(stateLandText !== null) {
//				stateLandText.setAttribute('fill-opacity', '1.0');
			}
		}
	}

	toggleDisable() {
		if(this.locked == true) {
			return;
		}

		if(this.disabled == false) {
			this.voteCount_beforeDisable = this.voteCount;
			this.setVoteCount(0, save_type === "presidential");
			this.setColor('Tossup', 2);

			//this.setDisplayColor(candidates['Tossup'].colors[1]);
			this.disabled = !this.disabled;
			this.htmlElement.setAttribute('fill-opacity', '0.25');
			this.htmlElement.setAttribute('stroke-opacity', '0.25');
			if(this.name.includes('-S')) {
				this.htmlElement.style.visibility = 'hidden';
			}
			var stateText = document.getElementById(this.name + '-text');
			if(stateText !== null) {
				stateText.setAttribute('fill-opacity', '0.25');
			}

			var land = document.getElementById(this.name + '-land');
			if(land !== null) {
				land.setAttribute('fill-opacity', '0.25');
				land.setAttribute('stroke-opacity', '0.25');
			}

			var button = document.getElementById(this.name + '-button');
			if(button !== null) {
				button.setAttribute('fill-opacity', '0.25');
				button.setAttribute('stroke-opacity', '0.25');
			}

			var stateLandText = document.getElementById(this.name.split("-")[0] + '-text');
			if(stateLandText !== null) {
				stateLandText.setAttribute('fill-opacity', '0.25');
			}

		} else if(this.disabled == true) {
			this.resetVoteCount();
			this.setVoteCount(this.voteCount, save_type === "presidential");
			this.disabled = !this.disabled;
			this.setColor(this.getCandidate(), this.getColorValue());
			this.htmlElement.setAttribute('fill-opacity', '1.0');
			this.htmlElement.setAttribute('stroke-opacity', '1.0');
			if(this.name.includes('-S')) {
				this.htmlElement.style.visibility = 'visible';
			}
			var stateText = document.getElementById(this.name + '-text');
			if(stateText !== null) {
				stateText.setAttribute('fill-opacity', '1.0');
			}
			var land = document.getElementById(this.name + '-land');
			if(land != null) {
				land.setAttribute('fill-opacity', '1.0');
				land.setAttribute('stroke-opacity', '1.0');
			}
			
			var button = document.getElementById(this.name + '-button');
			if(button !== null) {
				button.setAttribute('fill-opacity', '1.0');
				button.setAttribute('stroke-opacity', '1.0');
			}
			
			var stateLandText = document.getElementById(this.name.split("-")[0] + '-text');
			if(stateLandText !== null) {
				stateLandText.setAttribute('fill-opacity', '1.0');
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
			//if(this.colorValue >= maxColorValue + 1) {
			if(this.colorValue >= 4) {
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
			colorValue = 2;
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
};
