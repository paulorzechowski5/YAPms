<?php echo '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' ?>
<html class="noSelect">

<head>
	<title>LTE Map</title>
	<link rel="stylesheet" type="text/css" href="style.css">
	<link rel="stylesheet" type="text/css" href="menu.css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@0.5.0"></script> 
	<script src="src/State.js"></script>
	<script src="src/htmlControl.js"></script>
	<script src="src/Candidate.js"></script>
	<script src="src/presets.js"></script>
</head>

<body id="body">
<div id="menu-div">

	<div id="menu-left">

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
				<a onclick='setChart("horizontalBar")'>Bar</a>
				<a onclick='setChart("doughnut")'>Doughnut</a>
				<a onclick='setChart("none")'>None</a>
			</div>
		</div>

		<div class="dropdown">
			<button class="dropdown-button">
				Modes
			</button>
			<div class="dropdown-content">
				<a onclick='setMode("paint")'>Paint</a>
				<a onclick='setMode("ec")'>EC Edit</a>
			</div>
		</div>

		<div>
			<button class="click-button" onclick="showAddCandidate()">
				Add Candidate
			</button>
			<div id="addCandidateDropdown" class="dropdown-content">
				<a>Name <input id="name" type="text"></a>
				<a>Solid <input id="solid" type="color"></a>
				<a>Likely <input id="likely" type="color"></a>
				<a>Leaning <input id="leaning" type="color"></a>
				<a>Image <input id="image-upload" type="file" accept="image/*"></a>
				<a onclick="addCandidate()">Add</a>
			</div>
		</div>

	</div>
	<span id="menu-middle">
		Mode - Paint 
	</span>
	<div id="menu-right">

		<div class="dropdown" class="right-justify">
			<button class="dropdown-button">
				Misc
			</button>
			<div class="dropdown-content">
				<a onclick='darkPalette()'>Dark</a>
				<a onclick='lightPalette()'>Light</a>
				<a onclick='contrastPalette()'>Contrast</a>
				<a onclick='metallicPalette()'>Metallic</a>
				<a onclick='toggleLegendCounter()'>Legend Counter</a>
			</div>
		</div>

	</div>
</div>

<div id="legend-div">

</div>

<div id="application">
	<div id="chart-div">
		<canvas id="chart" width="100" height="100"></canvas>
	</div>

	<div id="map-div">
		<?php echo file_get_contents("usa.svg"); ?>
	</div>
</div>

<div id="ecedit" class="popup">
	<h3 id="ecedit-message">
	</h3>
	<input id="state-ec" type="number" name="value" min="1" max="9999">
	<input id="state-id" type="hidden">
	<button onclick="setEC(this)">set</button>
</div>

</body>

<script src="src/main.js"></script>

</html>
