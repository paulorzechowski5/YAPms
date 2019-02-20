<!DOCTYPE html>

<html>
	<head>
		<title>
			Article Preview
		</title>
		
		<link rel="stylesheet" type="text/css" href="style/common.css">
		<link rel="stylesheet" type="text/css" href="style/article.css">
	</head>
	
	<body>
		<div id="header">
			<div id="main-header">
				<a href="https://www.yapms.com/news">
					YAPNews
				</a>
			</div>

			<div id="sub-header">
				Yet Another Political News Source
			</div>
		</div>
	
		<div id="article">
			<div id="article-title">
			<?php
				echo $_POST["title"];
			?>
			</div>

			<div id="article-author">
			<?php
				echo $_POST["author"];
			?>
			</div>

			<div id="article-text">
			<?php
				echo $_POST["text"];
			?>
			</div>
		</div>
	
		<?php 
			include 'footer.php';
		?>
		
	</body>
</html>
