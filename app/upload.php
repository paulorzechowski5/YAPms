<?php
	$data = $_POST["fileToUpload"];
	$data = str_replace(' ', '+', $data);
	$data = substr($data, strpos($data, ",")+1);
	$data = base64_decode($data);
	//move_uploaded_file($decode, "./uploads/test.jpeg");
	//file_put_contents('./uploads/test.jpeg', $decode);

	$filename = "" . rand(0,9) . rand(0,9) . rand(0,9) . rand(0,9);

	echo "https://www.yapms.com/app/?i=" . $filename;
	
	$file = fopen("./uploads/" . $filename . ".jpeg", 'w');
	fwrite($file, $data);
	fclose($file);
?>
