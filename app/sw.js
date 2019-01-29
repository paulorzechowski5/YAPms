self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('v1').then(function(cache) {
			console.log('Opened Cache');
			return cache.addAll([
				'/',
				'/index.php',
				'/upload.php',

				'/data/gubernatorial_2018',
				'/data/gubernatorial_2020',
				'/data/gubernatorial_current',
				'/data/gubernatorial_open',
				'/data/senatorial_2020',
				'/data/senatorial_current',
				'/data/senatorial_open',

				'/style/battlechart.css',
				'/style/battlechartmobile.css',
				'/style/legend.css',
				'/style/mapmenu.css',
				'/style/mobile.css',
				'/style/popup.css',
				'/style/style.css',

				'/res/presidential.svg',
				'/res/usa_congressional_2018.svg',
				'/res/usa_dem_primary.svg',
				'/res/usa_gubernatorial.svg',
				'/res/usa_no_districts.svg',
				'/res/usa_senate.svg',
				'/res/canada_states.svg',
				'/res/lte.svg',
				'/res/lte_senate.svg',
				'/res/lte_house.svg',

				'/res/lte.jpg',

				'/src/main.js',
				'/src/mobile.js',
				'/src/presets.js',
				'/src/loadmap.js',
				'/src/htmlControl.js',
				'/src/html2canvas.min.js',
				'/src/data.js',
				'/src/click.js',
				'/src/battlechart.js',
				'/src/State.js',
				'/src/Candidate.js'
			]);
		})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request)
			.then(function(response) {
				// Cache hit - return response
				if(response) {
					return response;
				}
				return fetch(event.request);
			}
		)
	);
});
