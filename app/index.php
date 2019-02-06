<!DOCTYPE html>
<?php echo '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' ?>
<html class="noSelect" lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="description" content="Presidential, Senatorial, Congressional, Guberntorial, and Democratic Primary, political map simulator.">
	<meta name="keywords" content="Maps,Political,Simulator,Election,President,Governor,Senator,Congress,Primary,Interactive">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<meta property="og:title" content="YAPms - Yet another political map simulator">
	<meta property="og:description" content="Interactive political maps">
	<meta property="og:image:type" content="image/jpeg">
	<meta property="og:site_name" content="yapms.com">

	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content="yapms.com">
	<meta name="twitter:description" content="Interactive political maps">

	<meta name="theme-color" content="#ffffff"/>

	<link rel="icon" href="../favicon.ico" type="image/x-icon"/>
	<link rel="shortcut icon" href="../favicon.ico" type="image/x-icon"/>
	<link rel="manifest" href="./manifest.json">
	
	<?php
		$m = false;
		
		if(strpos($_SERVER['HTTP_USER_AGENT'], 'Mobi')) {
			$m = true;	
			echo '<script>var mobile = true</script>';
		} else {
			$m = false;	
			echo '<script>var mobile = false</script>';
		};
	
		if(isset($_GET["i"]) && !empty($_GET["i"])) {
			echo '<meta property="og:image" content="http://www.yapms.com/app/uploads/' . $_GET["i"] . '.png">';
			echo '<meta property="og:image:secure_url" content="https://www.yapms.com/app/uploads/' . $_GET["i"] . '.png">';
			echo '<meta name="twitter:image" content="https://www.yapms.com/app/uploads/' . $_GET["i"] . '.png">';
		}
	?>

	<title>YAPms - Yet Another Political Map Simulator</title>

	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-132710089-1"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'UA-132710089-1');
	</script>

	<style>
		<?php
			include './style/menu.css';
			include './style/selectmenu.css';
			include './style/popup.css';
			include './style/legend.css';
			include './style/style.css';
			include './style/battlechart.css';
		?>
	</style>

	<link async rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
</head>

<body id="body" onresize="onResize()">

<div id="menu-div">
	<button class="click-button" onclick="clearMap()">
		Clear
	</button>

	<button class="click-button" onclick="displayMapMenu()">
		Maps
	</button>

	<button class="click-button" onclick="displayPresetMenu()" style="white-space: nowrap;">
		Preset Candidates
	</button>
	
	<button id="addcandidatebutton" class="click-button" onclick="displayAddCandidateMenu()">
		Custom Candidates
	</button>

	<button id="modesbutton" class="click-button" onclick="displayModeMenu()" style="white-space: nowrap;">
		Modes (Paint/Move)
	</button>

	<button class="click-button" onclick="displayChartMenu()">
		Charts
	</button>

	<button class="click-button" onclick="displayCountersMenu()">
		Counters
	</button>

	<button class="click-button" onclick="displayThemeMenu()">
		Themes
	</button>

	<button class="click-button" onclick="share()">
		Share
	</button>

	<button class="click-button" onclick="displayMiscMenu()">
		Misc
	</button>
</div>

<div id="application">
	<div id="legend-div">

	</div>

	<div id="chart-div">
		<div id="chart">
		<canvas id="chart-canvas" width="100" height="100"></canvas>
		</div>

		<div id="battlechart">
			<div id="battlechartleft">
				<svg id="battlechartmid" width="20" height="20">
					<polygon points="0,0 0,20 20,10"
		     				style="fill:lime; stroke:black; stroke-width:2"/>
				</svg>
			</div>
			<div id="battlechartright">
				<div id="topbar">
					<div id="topbar-solid">
					</div>
					<div id="topbar-likely">
					</div>
					<div id="topbar-lean">
					</div>
				</div>
				<div id="tossupbar">
				</div>
				<div id="bottombar">
					<div id="bottombar-lean">
					</div>
					<div id="bottombar-likely">
					</div>
					<div id="bottombar-solid">
					</div>
				</div>
			</div>
		</div>

		<div id="logo-div">
		</div>
	</div>

	<div id="map-div">

	</div>
</div>

<div id="demdel" class="popup">
	<h3 id="demdel-message"></h3>
	<div id="demdel-ranges">
	</div>
	<input id="demdel-state-name" type="hidden">
	<button onclick="setDelegates(this)">set</button>
</div>

<div id="ecedit" class="popup">
	<h3 id="ecedit-message"></h3>
	<input id="state-ec" type="number" name="value" min="1" max="10000" step="1">
	<input id="state-id" type="hidden">
	<button onclick="setEC(this)">set</button>
</div>

<div id="candidateedit" class="popup">
	<h3 id="candidateedit-message"></h3>
	<p> A name change will remove the candidate from the map </p>
	Name:<input id="candidate-name" type="text" name="name"><br>
	Solid:<input id="candidate-solid" type="color"><br>
	Likely:<input id="candidate-likely" type="color"><br>
	Lean:<input id="candidate-lean" type="color"><br>
	<input id="candidate-originalName" type="hidden">
	<button onclick="setCandidate(this)">set</button>
</div>

<div id="miscmenu" class="popup selectmenu">
	<svg class="closebutton" onclick="closeNotification(this)" width="24" height="24">
		<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
		<line x1="7" y1="7" x2="17" y2="17" stroke="#dddddd" stroke-width="2"/>
		<line x1="17" y1="7" x2="7" y2="17" stroke="#dddddd" stroke-width="2"/>
	</svg>
	<h2>Misc</h2>
	<a onclick="centerMap()">Center Map</a>
	<a onclick="enableFullscreen()">Fullscreen</a>
	<a onclick="toggleLTELogo()">LTE Logo</a>
	<a href="https://commons.wikimedia.org/wiki/File:Blank_US_Map_(states_only).svg" target="_blank" rel="noreferrer">Map Src</a>
</div>

<div id="addcandidatemenu" class="popup selectmenu">
	<svg class="closebutton" onclick="closeNotification(this)" width="24" height="24">
		<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
		<line x1="7" y1="7" x2="17" y2="17" stroke="#dddddd" stroke-width="2"/>
		<line x1="17" y1="7" x2="7" y2="17" stroke="#dddddd" stroke-width="2"/>
	</svg>
	
	<h2>Add Candidate</h2>
	<a>Name <input id="name" type="text"></a>
	<a onclick='setColors("red")'>Red Colors</a>
	<a onclick='setColors("blue")'>Blue Colors</a>
	<a onclick='setColors("green")'>Green Colors</a>
	<a onclick='setColors("yellow")'>Yellow Colors</a>
	<a>Solid <input id="solid" type="color"></a>
	<a>Likely <input id="likely" type="color"></a>
	<a>Leaning <input id="leaning" type="color"></a>
	<!--<a>Image <input id="image-upload" type="file" accept="image/*"></a>-->
	<a onclick="addCandidate(); closeNotification(this);">Add</a>
</div>

<div id="modemenu" class="popup selectmenu">
	<svg class="closebutton" onclick="closeNotification(this)" width="24" height="24">
		<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
		<line x1="7" y1="7" x2="17" y2="17" stroke="#dddddd" stroke-width="2"/>
		<line x1="17" y1="7" x2="7" y2="17" stroke="#dddddd" stroke-width="2"/>
	</svg>
	
	<h2>Select Mode</h2>
	<a id="paintmovebutton" onclick='setMode("paintmove")'>Paint/Move</a>
	<a onclick='setMode("paint")'>Paint</a>
	<a id="movebutton" onclick='setMode("move")'>Move</a>
	<a onclick='setMode("delete")'>Delete</a>
	<a onclick='setMode("ec")'>EC Edit</a>
	<a onclick='setMode("candidate")'>Candidate Edit</a>
</div>


<div id="thememenu" class="popup selectmenu">
	<svg class="closebutton" onclick="closeNotification(this)" width="24" height="24">
		<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
		<line x1="7" y1="7" x2="17" y2="17" stroke="#dddddd" stroke-width="2"/>
		<line x1="17" y1="7" x2="7" y2="17" stroke="#dddddd" stroke-width="2"/>
	</svg>

	<h2>Select Theme</h2>	
	<a onclick='darkPalette()'>Dark</a>
	<a onclick='terminalPalette()'>Terminal</a>
	<a onclick='lightPalette()'>Light</a>
	<a onclick='contrastPalette()'>Contrast</a>
	<a onclick='metallicPalette()'>Metallic</a>
	<a onclick='toWinPalette()'>Default</a>
</div>

<div id="countersmenu" class="popup selectmenu">
	<svg class="closebutton" onclick="closeNotification(this)" width="24" height="24">
		<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
		<line x1="7" y1="7" x2="17" y2="17" stroke="#dddddd" stroke-width="2"/>
		<line x1="17" y1="7" x2="7" y2="17" stroke="#dddddd" stroke-width="2"/>
	</svg>

	<h2>Toggle Counters</h2>	
	<a onclick='toggleLegendCounter()'>Legend Counter</a>
	<a onclick='toggleChartLabels()'>Chart Labels</a>
	<a onclick='toggleChartLeans()'>Chart Leans</a>

</div>

<div id="chartmenu" class="popup selectmenu">
	<svg class="closebutton" onclick="closeNotification(this)" width="24" height="24">
		<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
		<line x1="7" y1="7" x2="17" y2="17" stroke="#dddddd" stroke-width="2"/>
		<line x1="17" y1="7" x2="7" y2="17" stroke="#dddddd" stroke-width="2"/>
	</svg>

	<h2>Select Chart</h2>	
	<a onclick='setChart("horizontalbattle")'>Horizontal Battle</a>
	<a onclick='setChart("verticalbattle")'>Vertical Battle</a>
	<a onclick='setChart("pie")'>Side Pie</a>
	<a onclick='setChart("pie","bottom")'>Bottom Pie</a>
	<a onclick='setChart("doughnut")'>Side Doughnut</a>
	<a onclick='setChart("doughnut", "bottom")'>Bottom Doughnut</a>
	<a onclick='setChart("horizontalBar")'>Side Bar</a>
	<a onclick='setChart("none")'>None</a>
</div>

<div id="presetmenu" class="popup selectmenu">
	<svg class="closebutton" onclick="closeNotification(this)" width="24" height="24">
		<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
		<line x1="7" y1="7" x2="17" y2="17" stroke="#dddddd" stroke-width="2"/>
		<line x1="17" y1="7" x2="7" y2="17" stroke="#dddddd" stroke-width="2"/>
	</svg>

	<h2>Select Preset</h2>	
	<a onclick='loadPreset("tossup")'>None</a>
	<a onclick='loadPreset("classic")'>Classic</a>
	<a onclick='loadPreset("libertarian")'>Libertarian</a>
	<a onclick='loadPreset("green")'>Green</a>
	<a onclick='loadPreset("majors")'>Majors</a>
</div>

<div id="mapmenu" class="popup selectmenu">
	<svg class="closebutton" onclick="closeNotification(this)" width="24" height="24">
		<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
		<line x1="7" y1="7" x2="17" y2="17" stroke="#dddddd" stroke-width="2"/>
		<line x1="17" y1="7" x2="7" y2="17" stroke="#dddddd" stroke-width="2"/>
	</svg>
	<h2>Select Map</h2>
	<a onclick='closeNotification(this); loadMap("./res/presidential.svg", 16, 1, "usa_ec", "presidential", "open");'>Presidential 2020</a>
	<a onclick='closeNotification(this); loadMap("./res/usa_no_districts.svg", 16, 1, "usa_no_districts_ec", "presidential", "open")'>Presidential Take All</a>
	<a onclick='closeNotification(this); loadMap("./res/usa_dem_primary.svg", 16, 1, "dem_primary", "demprimary", "2020");'>Democratic Primary</a>
	<a onclick='closeNotification(this); loadMap("./res/usa_rep_primary.svg", 16, 1, "rep_primary", "repprimary", "2020");'>Republican Primary</a>
	<a onclick='closeNotification(this); loadMap("./res/usa_senate.svg", 16, 1, "usa_senate", "senatorial", "2020")'>Senatorial 2020</a>
	<a onclick='closeNotification(this); loadMap("./res/usa_senate.svg", 16, 1.5, "usa_senate", "senatorial", "open")'>Senatorial Open</a>
	<a onclick='closeNotification(this); loadMap("./res/usa_congressional_2018.svg", 16, 0.075, "congressional", "congressional", "open")'>Congressional Open</a>
	<a onclick='closeNotification(this); loadMap("./res/usa_gubernatorial.svg", 16, 1, "usa_gubernatorial", "gubernatorial", "2020")'>Gubernatorial 2020</a>
	<a onclick='closeNotification(this); loadMap("./res/usa_gubernatorial.svg", 16, 1, "usa_gubernatorial", "gubernatorial", "open")'>Gubernatorial Open</a>
	<a onclick='closeNotification(this); loadMap("./res/canada_states.svg", 38, 3, "canada_ec", "presidential", "open");'>Canada</a>
	<a onclick='closeNotification(this); loadMap("./res/world.svg", 38, 0.5, "congressional", "congressional", "open");'>World</a>
	<a onclick='closeNotification(this); loadMap("./res/lte.svg", 35, 1, "lte_ec", "presidential", "open");'>LTE Discord</a>
	<a onclick='closeNotification(this); loadMap("./res/lte_senate.svg", 35, 1, "ltesenate", "senatorial", "open")'>LTE Senate</a>
	<a onclick='closeNotification(this); loadMap("./res/lte_house.svg", 35, 1, "congressional", "congressional", "open")'>LTE House</a>
</div> 

<div id="notification" class="popup">
	<svg id="notificationclose" class="closebutton" onclick="closeNotification(this)" width="24" height="24">
		<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
		<line x1="7" y1="7" x2="17" y2="17" stroke="#dddddd" stroke-width="2"/>
		<line x1="17" y1="7" x2="7" y2="17" stroke="#dddddd" stroke-width="2"/>
	</svg>

	<h3 id="notification-title"></h3>
	<p id="notification-message"></p>

</div>

<div id="share" class="popup">
	<svg id="shareclose" class="closebutton" onclick="closeNotification(this)" width="24" height="24">
		<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
		<line x1="7" y1="7" x2="17" y2="17" stroke="#dddddd" stroke-width="2"/>
		<line x1="17" y1="7" x2="7" y2="17" stroke="#dddddd" stroke-width="2"/>
	</svg>

	<h3>Share Link</h3>
	<div id="shareurl"></div>
	<img id="screenshotimg"/>
</div>

<script>
	document.getElementById('logo-div').innerHTML =
		'<img id="logo" src="./res/lte.jpg">';

	if('serviceWorker' in navigator) {
		navigator.serviceWorker
		.register('./sw.js')
		.then(function(a) {
			console.log('SW: registered');
		}, function(err) {
			console.log('SW: register error... ', err);
		});
	}
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@0.5.0"></script> 
<script src="https://cdn.jsdelivr.net/npm/svg-pan-zoom@3.5.0/dist/svg-pan-zoom.min.js"></script>
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js"></script>
<script src="./src/loadmap.js"></script>
<script src="./src/data.js"></script>
<script src="./src/State.js"></script>
<script src="./src/htmlControl.js"></script>
<script src="./src/Candidate.js"></script>
<script src="./src/battlechart.js"></script>
<script src="./src/presets.js"></script>
<script src="./src/main.js"></script>
<?php 
	if($m === true) {
		echo '<script src="./src/mobile.js"></script>';
	}
?>
<script src="./src/click.js"></script>
<script src="./src/html2canvas.min.js"></script>

</body>


</html>
