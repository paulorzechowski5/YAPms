<?php
$username = 'dbo773751206';
$password = 'Betazmon1';
$database = 'db773751206';
$hostname = 'db773751206.hosting-data.io';

$link = new mysqli($hostname, $username, $password);

if(!$link) {
	echo "Error: " . $link->connect_error;
	exit;
}

echo 'Success';

?>
