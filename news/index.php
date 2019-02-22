<!DOCTYPE html>
<html>
	<head>
		<title>
			YAPNews
		</title>

		<link rel="stylesheet" type="text/css" href="style/common.css">
		<link rel="stylesheet" type="text/css" href="style/style.css">
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

		<div id="application">
		<div id="application-left">
		<?php
				require 'dblogin.php';
				$sql = 'select * from articles where featured = true order by date desc limit 1 offset 0';
				if($q = $dbh->query($sql)) {
					foreach($q as $row) {
						echo '<div id="featured-1" class="featured">'.
							'<div class="article-title">'.
							'<a href="article.php?a=' .
								$row['id'] .
							'">' .
								$row['title'].
							'</a>'.
							'</div>'.
							'<div class="article-author">'.
								$row['author'] .
							'</div>'.
							'<div class="article-date">'.
								$row['date'] .
							'</div>' .
							'<div class="article-snippet">'.
								$row['snippet'].
							'</div>'.
							'</div>';
					}
				} else {
					echo '<div class="error">Error</div>';
				}
			?>
			<div id="recent-1" class="recent">
				<?php
					$sql = 'select * from articles where featured = false order by date desc limit 3 offset 0';
					if($q = $dbh->query($sql)) {
						foreach($q as $row) {
							echo '<div class="article">'.
								'<div class="article-title">'.
								'<a href="article.php?a=' .
									$row['id'] .
								'">' .
									$row['title'].
								'</a>'.
								'</div>'.
								'<div class="article-author">'.
									$row['author'] .
								'</div>'.
								'<div class="article-date">'.
									$row['date'] .
								'</div>' .
								'<div class="article-snippet">'.
									$row['snippet'].
								'</div>'.
								'</div>';
						}
					} else {
						echo '<div class="error">Error</div>';
					}
				?>
			</div>
		</div>
		<div id="application-right">
			<div id="recent-2" class="recent">
				<?php
					$sql = 'select * from articles where featured = false order by date desc limit 3 offset 3';
					if($q = $dbh->query($sql)) {
						foreach($q as $row) {
							echo '<div class="article">'.
								'<div class="article-title">'.
								'<a href="article.php?a=' .
									$row['id'] .
								'">' .
									$row['title'].
								'</a>'.
								'</div>'.
								'<div class="article-author">'.
									$row['author'] .
								'</div>'.
								'<div class="article-date">'.
									$row['date'] .
								'</div>' .
								'<div class="article-snippet">'.
									$row['snippet'].
								'</div>'.
								'</div>';
						}
					} else {
						echo '<div class="error">Error</div>';
					}
				?>
			</div>
			<?php
				$sql = 'select * from articles where featured = true order by date desc limit 1 offset 1';
				if($q = $dbh->query($sql)) {
					foreach($q as $row) {
						echo '<div id="featured-2" class="featured">'.
							'<div class="article-title">'.
							'<a href="article.php?a=' .
								$row['id'] .
							'">' .
								$row['title'].
							'</a>'.
							'</div>'.
							'<div class="article-author">'.
								$row['author'] .
							'</div>'.
							'<div class="article-date">'.
								$row['date'] .
							'</div>' .
							'<div class="article-snippet">'.
								$row['snippet'].
							'</div>'.
							'</div>';
					}
				} else {
					echo '<div class="error">Error</div>';
				}
			?>
			<div id="recent-3" class="recent">
				<?php
					$sql = 'select * from articles where featured = false order by date desc limit 3 offset 6';
					if($q = $dbh->query($sql)) {
						foreach($q as $row) {
							echo '<div class="article">'.
								'<div class="article-title">'.
								'<a href="article.php?a=' .
									$row['id'] .
								'">' .
									$row['title'].
								'</a>'.
								'</div>'.
								'<div class="article-author">'.
									$row['author'] .
								'</div>'.
								'<div class="article-date">'.
									$row['date'] .
								'</div>' .
								'<div class="article-snippet">'.
									$row['snippet'].
								'</div>'.
								'</div>';
						}
					} else {
						echo '<div class="error">Error</div>';
					}
				?>
			</div>
		</div>
		</div>	
		<?php 
			include 'footer.php';
		?>
	
	</body>
</html>
