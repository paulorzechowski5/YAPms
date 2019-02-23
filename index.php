<html>
<head>
	<meta charset="UTF-8">
	<meta name="description" content="Presidential, Senatorial, Congressional, Guberntorial and Democratic Primary political map simulator.">
	<meta name="keywords" content="Maps,Political,Simulator,Election,President,Governor,Senator,Congress,Primary,Interactive">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<meta property="og:title" content="YAPms - Yet another political map simulator">
	<meta property="og:description" content="Interactive political maps">
	<meta property="og:image:type" content="image/jpeg">
	<meta property="og:site_name" content="yapms.com">

	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content="yapms.com">
	<meta name="twitter:description" content="Interactive political maps">

	<?php 
		if(isset($_GET["i"])) {
			echo '<meta property="og:image" content="http://www.yapms.com/app/uploads/' . $_GET["i"] . '.png">';
			echo '<meta property="og:image:secure_url" content="https://www.yapms.com/app/uploads/' . $_GET["i"] . '.png">';
			echo '<meta name="twitter:image" content="https://www.yapms.com/app/uploads/' . $_GET["i"] . '.png">';
		}
	?>

	<title>YAPms - Yet Another Political Map Simulator</title>
	
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-132710089-1"></script>
	<script>
		var host = window.location.hostname;
		console.log(host);
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'UA-132710089-1');
	</script>
	
	<link rel="icon" href="../favicon.ico" type="image/x-icon"/>
	<link rel="shortcut icon" href="../favicon.ico" type="image/x-icon"/>
	
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
	<link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>
	<div id="info">
		<div id="topbar">
			<h2> YAPms - Yet Another Political Map Simulator </h2>
		</div>


		<div id="welcome" class="infobox">
			<p>
				YAPms is a tool for creating political maps that can be shared with friends
			</p>
		</div>

		<div id="support" class="infobox">
			<p>
				<b>Supported Browsers:</b>
				Chrome, Firefox and Opera
			</p>
		</div>

		<div id="whatsnew" class="infobox">
			<b>New Stuff:</b>
			Republican primary map! Share your Republican primary prediction with friends<br>
		</div>

		<div class="infobox">
			<br>If you would like to submit ideas, or report bugs, please send an email to <a style="color:blue;" href="mailto:bugreport@yapms.com">bugreport@yapms.com</a>
		</div>
	</div>
	
	<a href="./app">
		<div id="start" class="start">
			Start
		</div>
	</a>

	<br>

	<a href="https://play.google.com/apps/testing/com.fishstudio.yapms">
		<div id="app" class="start">
			Beta App
		</div>
	</a>
	
	<div id="amazon">
		<script type="text/javascript">
		amzn_assoc_placement = "adunit0";
		amzn_assoc_tracking_id = "yapms-20";
		amzn_assoc_ad_mode = "manual";
		amzn_assoc_ad_type = "smart";
		amzn_assoc_marketplace = "amazon";
		amzn_assoc_region = "US";
		amzn_assoc_linkid = "45adcb2c9eb97ff87d781da99a19129d";
		amzn_assoc_asins = "0307237702,0399594493,1250163269,0804189765";
		amzn_assoc_design = "in_content";
		amzn_assoc_title = "Interesting Reads";
		</script>
		<script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"></script>
	</div>

	<div id="bottombar">
		<a href="https://privacypolicies.com/privacy/view/5e9b5eee7febd2d29c0ec896e1ac90ef">Privacy</a>
	</div>
</body>
</html>
