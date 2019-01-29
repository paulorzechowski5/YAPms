self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('v1').then(function(cache) {
			console.log('SW: opened cache');
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
		.then(function() {
			console.log('SW: install complete');
		})
	);
});

self.addEventListener('fetch', function(event) {
	console.log('SW: fetch event');
	event.respondWith(
		caches.match(event.request)
			.then(function(cached) {
				// Cache hit - return response
				var networked = fetch(event.request);
						.then(fetchedFromNetwork, unableToResolve)
						.catch(unableToResolve);
				
				return cached || networked;

				function fetchedFromNetwork(response) {
					var cacheCopy = response.clone();
					caches.open('v1')
					.then(function add(cache) {
						cache.put(event.request, cacheCopy);
					})
					.then(function() {
						console.log('SW: fetch response stored in cache ', event.request.url);
					});
					return response;
				}

				function unableToResolve() {
					console.log('SW: fetch request failed in both cache and network');
			
					return new Response('<h1>Service Unavailable</h1>', {
						status: 503,	
						statusText: 'Service Unavailable',
						headers: new Headers({
							'Content-Type': 'text/html'
						})	
					});
				}
		})
	);
});
