<?php echo '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' ?>
<html class="noSelect">

<head>
	<title>LTE Map</title>
	<link rel="stylesheet" type="text/css" href="style.css">
	<link rel="stylesheet" type="text/css" href="menu.css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>
	<script src="src/htmlControl.js"></script>
	<script src="src/State.js"></script>
	<script src="src/Candidate.js"></script>
	<script src="src/presets.js"></script>
</head>

<body>
<div id="menu-div">
	<button class="click-button" onclick="loadPresetEmpty()">
		Clear
	</button>

	<div class="dropdown">
		<button class="dropdown-button">
			Presets
		</button>
		<div class="dropdown-content">
			<a onclick='loadPresetClassic()'>Classic</a>
			<a onclick='loadPresetLibertarian()'>Libertarian</a>
			<a onclick='loadPresetGreen()'>Green</a>
			<a onclick='loadPresetMajors()'>Majors</a>
		</div>
	</div>
	
	<div class="dropdown">
		<button class="dropdown-button">
			Charts
		</button>
		<div class="dropdown-content">
			<a onclick='setChart("pie")'>Pie</a>
			<a onclick='setChart("bar")'>Bar</a>
			<a onclick='setChart("none")'>None</a>
		</div>
	</div>

	<div class="dropdown">
		<button class="dropdown-button">
			Modes
		</button>
		<div class="dropdown-content">
			<a onclick='setMaxPaintIndex(2)'>Normal</a>
			<a onclick='setMaxPaintIndex(1)'>Solid/Likely</a>
			<a onclick='setMaxPaintIndex(0)'>Solid Only</a>
		</div>
	</div>

	<div class="dropdown">
		<button class="dropdown-button">
			Misc
		</button>
		<div class="dropdown-content">
			<a onclick='toggleText()'>Toggle Text</a>
		</div>
	</div>

	<div class="dropdown">
		<button class="dropdown-button" onclick="showAddCandidate()">
			Add Candidate
		</button>
		<div id="addCandidateDropdown" class="dropdown-content">
			<a>Name <input id="name" type="text"></a>
			<a>Solid <input id="solid" type="color"></a>
			<a>Likely <input id="likely" type="color"></a>
			<a>Leaning <input id="leaning" type="color"></a>
			<a onclick="addCandidate()">Add</a>
		</div>
	</div>
</div>

<div id="legend-div">

</div>

<div id="application">
	<div id="chart-div">
		<canvas id="chart"></canvas>
	</div>

	<div id="map-div">
		<?php echo file_get_contents("usa.svg"); ?>
	</div>
</div>

</body>

<script src="src/main.js"></script>

</html>
