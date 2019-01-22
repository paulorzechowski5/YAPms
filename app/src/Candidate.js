class Candidate {
	constructor(name, colors) {
		this.name = name;
		this.colors = colors;
		this.voteCount = 0;
		this.probVoteCounts = [0,0,0];
	}
};

var tossupColor = 2;
var TOSSUP = new Candidate('Tossup', ['#000000', '#ffffff', '#bbb7b2']);
