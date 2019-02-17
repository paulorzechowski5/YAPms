<!DOCTYPE html>
<html>
	<head>
		<title>
			YAPNews
		</title>

		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
		<link rel="stylesheet" type="text/css" href="style.css">
	</head>

	<body>
		<div id="header">
			<div id="main-header">
				YAPNews
			</div>

			<div id="sub-header">
				Yet Another Political News Source
			</div>
		</div>

		<div id="application">
			<div id="featured">
				<?php
					for($i = 0; $i < 5; $i++) {
						echo '<div class="article">' .
							'<div class="article-title">'.
							'<a href="article.php?a=123">title</a>' .
							'</div> ' .
							'<div class="article-snippet">' .
							'asdf asdf asdf asd asd fasd' .
							'</div>' .
							'</div>';
					}
				?>
			</div>
			
			<div id="recent">
				<?php
					for($i = 0; $i < 8; $i++) {
						echo '<div class="article"> ' .
							'<div class="article-title">'.
							' title ' .
							'</div> ' .
							'<div class="article-snippet">' .
							' asdf asdf asdf asd asd fasd' .
							'</div>' .
							'</div>';
					}
				?>
			</div>
		</div>
	</body>
</html>
