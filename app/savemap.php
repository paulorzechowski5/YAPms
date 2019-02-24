<?php
$filename = "" . rand(0, 40000);

$data = $_POST["img"];
$data = str_replace(' ', '+', $data);
$data = substr($data, strpos($data, ",")+1);
$data = base64_decode($data);

$file = fopen("./images/" . $filename . ".png", 'w');
if($file) {
	fwrite($file, $imgdata);
	fclose($file);
}

$file = fopen("./maps/" . $filename, 'w');
if($file) {
	fwrite($file, $_POST["filename"] . PHP_EOL);
	fwrite($file, $_POST["dataid"] . PHP_EOL);
	fwrite($file, $_POST["type"] . PHP_EOL);
	fwrite($file, $_POST["year"] . PHP_EOL);
	fwrite($file, $_POST["fontsize"] . PHP_EOL);
	fwrite($file, $_POST["strokewidth"] . PHP_EOL);
	fclose($file);
}

echo $file;
?>
