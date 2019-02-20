<?php
	$email = trim($_POST["email"]);
	
	if(filter_var($email, FILTER_VALIDATE_EMAIL)) {
	} else {
		die("invalid email");
	}
	
	$email = filter_var($email, FILTER_SANITIZE_SPECIAL_CHARS);

	$title = trim($_POST["title"]);
	$title = filter_var($title, FILTER_SANITIZE_SPECIAL_CHARS);

	$author = trim($_POST["author"]);
	$author = filter_var($author, FILTER_SANITIZE_SPECIAL_CHARS);

/*
	$catelection = trim($_POST["cat-election"]);
	$catelection = filter_var($catelection, FILTER_SANITIZE_SPECIAL_CHARS);

	$catopinion = trim($_POST["cat-opinion"]);
	$catopinion = filter_var($catopinion, FILTER_SANITIZE_SPECIAL_CHARS);
*/

	$snippet = trim($_POST["snippet"]);
	$snippet = filter_var($snippet, FILTER_SANITIZE_SPECIAL_CHARS);
	
	$text= trim($_POST["text"]);
	$text = filter_var($text, FILTER_SANITIZE_SPECIAL_CHARS);

	$toyap =
		"***********\r\n" .
		$email .
		"\r\n***********\r\n" .
		$title .
		"\r\n***********\r\n" .
		$author . 
		"\r\n***********\r\n" .
		$snippet .
		"\r\n***********\r\n" .
		$text;
	
	$touser =
		"We have received an article submition from you, please reply to confirm your submission...\r\n" .
		$title . " by " . $author . "\r\n".
		$snippet;

	$touserheader = "From: YAPNews < articlesubmit@yapms.com >\r\n";
	$toyapheader = "From: " . $email . "\r\n";

	mail("articlesubmit@yapms.com", "Article Submission", $toyap, $toyapheader);

	echo 'Your article has been submited, please wait for our team to get back to you <a href="https://www.yapms.com/news/">Home</a>';
?>
