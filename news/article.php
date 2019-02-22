<!DOCTYPE html>
<html>
	<head>
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
		<?php
			require 'dblogin.php';	

			$sql = 'select * from articles where id = ' . $_GET['a']; 
			foreach($dbh->query($sql) as $row) {
				echo '<div id="article-title">';
				echo $row['title'];
				echo '</div>';
				echo '<div id="article-author">';
				echo 'By ' . $row['author'];
				echo '</div>';
				echo '<div id="article-text">';
				echo $row['text'];
				echo '</div>';
			}
		?>
		</div>
		
		<?php 
			include 'footer.php';
		?>
	</body>
</html>
