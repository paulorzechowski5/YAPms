function updateBattleChart() {

	if(Object.keys(candidates).length > 3) {
		setChart('pie');
		return;
	}

	var tossup = document.getElementById('tossupbar');

	var topbar = document.getElementById('topbar');
	var topbarSolid = document.getElementById('topbar-solid');
	var topbarLikely = document.getElementById('topbar-likely');
	var topbarLean = document.getElementById('topbar-lean');

	var bottombar = document.getElementById('bottombar');
	var bottombarSolid = document.getElementById('bottombar-solid');
	var bottombarLikely = document.getElementById('bottombar-likely');
	var bottombarLean = document.getElementById('bottombar-lean');

	var candidateIndex = -1;
	for(var key in candidates) {
		++candidateIndex;

		var candidate = candidates[key];

		if(candidateIndex == 0) {
			tossup.style.background = candidate.colors[2];
			
			tossup.style.flexBasis = '' + (candidate.voteCount / totalVotes) * 100 + '%';
			tossup.innerHTML = '<p>' + candidate.voteCount + '</p>';
		} else if(candidateIndex == 1) {
			topbar.style.flexBasis = '' + 
				(candidate.voteCount / totalVotes) * 100 + '%';
			topbarSolid.style.flexBasis = '' + 
				(candidate.probVoteCounts[0] / candidate.voteCount) * 100 + '%';
			topbarSolid.style.background = candidate.colors[0];
			topbarSolid.innerHTML = '<p>' + candidate.probVoteCounts[0] + '</p>';
			topbarLikely.style.flexBasis = '' + 
				(candidate.probVoteCounts[1] / candidate.voteCount) * 100 + '%';
			topbarLikely.style.background = candidate.colors[1];
			topbarLikely.innerHTML = '<p>' + candidate.probVoteCounts[1] + '</p>';
			topbarLean.style.flexBasis = '' + 
				(candidate.probVoteCounts[2] / candidate.voteCount) * 100 + '%';
			topbarLean.style.background = candidate.colors[2];
			topbarLean.innerHTML = '<p>' + candidate.probVoteCounts[2] + '</p>';

		} else if(candidateIndex == 2) {
			bottombar.style.flexBasis = '' + 
				(candidate.voteCount / totalVotes) * 100 + '%';
			bottombarSolid.style.flexBasis = '' + 
				(candidate.probVoteCounts[0] / candidate.voteCount) * 100 + '%';
			bottombarSolid.style.background = candidate.colors[0];
			bottombarSolid.innerHTML = '<p>'+candidate.probVoteCounts[0]+'</p>';

			bottombarLikely.style.flexBasis = '' + 
				(candidate.probVoteCounts[1] / candidate.voteCount) * 100 + '%';
			bottombarLikely.style.background = candidate.colors[1];
			bottombarLikely.innerHTML = '<p>'+candidate.probVoteCounts[1]+'</p>';

			bottombarLean.style.flexBasis = '' + 
				(candidate.probVoteCounts[2] / candidate.voteCount) * 100 + '%';
			bottombarLean.style.background = candidate.colors[2];
			bottombarLean.innerHTML = '<p>'+candidate.probVoteCounts[2]+'</p>';
		}
	}
}

