<?php
$username = 'dbo773751206';
$password = 'Betazmon1';
$database = 'db773751206';
$hostname = 'db773751206.hosting-data.io';

$dbh = null;

try {
	$dbh = new PDO("mysql:host=$hostname; dbname=$database;", $username, $password);
} 
catch(PDOException $e) {
	echo "Error: " . $e->getMessage();
	die();
}

$sql = 'select * from articles';

$q = $dbh->query($sql);

$data = array();

foreach($q as $row) {
	array_push($data, $row);	
}
echo json_encode($data);
?>
