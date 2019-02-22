<?php
	require '../../external/db.php';

	$dbh = null;
	try {
		$dbh = new PDO("mysql:host=$hostname; dbname=$database;", $username, $password);
	} 
	catch(PDOException $e) {
		//echo "Error: " . $e->getMessage();
		echo "Error: failed to connect to database";
		die();
	}
?>
