<!DOCTYPE html>
<html>
	<head>
		<title>
			YAPNews Create
		</title>

		<link rel="stylesheet" type="text/css" href="style/common.css">
		<link rel="stylesheet" type="text/css" href="style/create.css">
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
			<form action="send.php" method="post">
				<p>
					Title
				</p>
			
				<input type="text" name="title"><br>
				
				<p>
					Author
				</p>
			
				<input type="text" name="author"><br>

				<p>
					Category
				</p>

				<input type="checkbox" name="cat-election" value="Election">
					Election
				<br>
				<input type="checkbox" name="cat-opinion" value="Opinion">
					Opinion	
				<br>

				<p>
					Snippet	
				</p>

				<input type="text" name="snippet"><br>
				
				<p>
					Article
				</p>
				
				<textarea rows="15" cols="50" name="text">Write Article Here</textarea>

				<br>
				
				<input type="checkbox" name="featured" value="true">
					Featured	
				<br>
				<br>
				<br>

				<input type="submit" value="Submit" name="Submit">
				<input type="submit" formaction="preview.php" formtarget="_blank" value="Preview" name="Preview">
			</form>
		</div>
	</body>
</html>
