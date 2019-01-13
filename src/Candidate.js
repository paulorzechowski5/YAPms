class Candidate {
	constructor(name, colors, img) {
		this.name = name;
		this.colors = colors;
		this.voteCount = 0;
		this.img = img;
		this.probVoteCounts = [0,0,0];
	}
};

var tossupColor = 2;
var TOSSUP = new Candidate('Tossup', ['#000000', '#bbaa90', '#bbb7b2']);
