<?php
	include "../dblogin.php";

	$title = trim($_POST["title"]);
	//$title = filter_var($title, FILTER_SANITIZE_SPECIAL_CHARS);

	$author = trim($_POST["author"]);
	//$author = filter_var($author, FILTER_SANITIZE_SPECIAL_CHARS);

	$catelection = trim($_POST["cat-election"]);
	//$catelection = filter_var($catelection, FILTER_SANITIZE_SPECIAL_CHARS);

	$catopinion = trim($_POST["cat-opinion"]);
	//$catopinion = filter_var($catopinion, FILTER_SANITIZE_SPECIAL_CHARS);

	$snippet = trim($_POST["snippet"]);
	//$snippet = filter_var($snippet, FILTER_SANITIZE_SPECIAL_CHARS);
	
	$text= trim($_POST["text"]);
	//$text = filter_var($text, FILTER_SANITIZE_SPECIAL_CHARS);

	$featured = trim($_POST["featured"]);
	$f;
	if($featured) {
		$f = true;
	} else {
		$f = false;
	}
	//$featured = filter_var($featured, FILTER_SANITIZE_SPECIAL_CHARS);

/*
	$sql = "insert into articles (title, author, date, snippet, text, Featured) values (".
		$title . "," . $author . "," . date("m/d/Y") . "," . $snippet . "," . $text . "," .
		$featured . ")";
*/

	$sql = 'insert into articles (title, author, date, snippet, text, Featured) values (?,?,?,?,?,?)';
	$stm = $dbh->prepare($sql);
	
	if($stm->execute([$title, $author, date("Y-m-d H:i:s"), $snippet, $text, $f])) {
		echo "sql query success...<br>";
		echo $sql;
	} else {
		echo "sql query failed...<br>";
	}
?>
