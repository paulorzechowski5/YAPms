<?php
$filename = "" . rand(0, 40000);

$imgData = $_POST["img"];
$imgData = str_replace(' ', '+', $imgData);
$imgData = substr($imgData, strpos($imgData, ",")+1);
$imgData = base64_decode($imgData);

$file = fopen("./maps/" . $filename . ".png", 'w');
if($file) {
	fwrite($file, $imgData);
	fclose($file);
}

$file = fopen("./maps/" . $filename, 'w');
if($file) {
	$writeData = $_POST["filename"] . " "
		. $_POST["fontsize"] . " " 
		. $_POST["strokewidth"] . " "
		. $_POST["dataid"] . " "
		. $_POST["type"] . " " 
		. $_POST["year"] . " ";

	$candidate_data = json_decode($_POST["candidates"], true);

	$writeData .= count($candidate_data["candidate_data"]) . PHP_EOL;

	foreach($candidate_data["candidate_data"] as $v) {
		$v["name"] = str_replace(' ', '%', $v["name"]);
		if($v["name"] !== "Tossup") {
			$writeData .= $v["name"] . " "
				. $v["solid"] . " "
				. $v["likely"] . " "
				. $v["lean"] . " "
				. $v["tilt"] . PHP_EOL;
		}
	}

	$state_data = json_decode($_POST["states"], true);

	foreach($state_data["state_data"] as $v) {
		$v["candidate"] = str_replace(' ', '%', $v["candidate"]);
		$writeData .= $v["name"] . " "
			. $v["candidate"] . " "
			. $v["colorValue"] . " ";

		if(isset($v["delegates"])) {
			foreach($v["delegates"] as $d) {
				$writeData .= $d . " ";
			}
		}
		
		$writeData .= $v["voteCount"] . " "
				. $v["disabled"] . PHP_EOL;
	}

	fwrite($file, $writeData);
	fclose($file);
	echo "https://www.yapms.com/app/?m=" . $filename;
}
?>
