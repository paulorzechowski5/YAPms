<?php
	$data = $_POST["fileToUpload"];
	$data = str_replace(' ', '+', $data);
	$data = substr($data, strpos($data, ",")+1);
	$data = base64_decode($data);

	$filename = "" . rand(0,9) . rand(0,9) . rand(0,9) . rand(0,9);

	//echo "https://www.yapms.com/?i=" . $filename;
	echo "https://www.yapms.com/app/uploads/" . $filename . ".png";	
	$file = fopen("./uploads/" . $filename . ".png", 'w');
	fwrite($file, $data);
	fclose($file);
?>
