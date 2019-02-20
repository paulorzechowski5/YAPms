<?php
$username = 'dbo773751206';
$password = 'Betazmon1';
$database = 'db773751206';
$hostname = 'db773751206.hosting-data.io';
$hostname = 'https://www.yapms.com/';

$dbh = null;

try {
	$dbh = new PDO("mysql:host=$hostname; dbname=$database;", $username, $password);
} 
catch(PDOException $e) {
	echo "Error: " . $e->getMessage();
	die();
}
?>
