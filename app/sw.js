self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('v1').then(function(cache) {
			console.log('SW: installing');
			return cache.addAll([
				'./?m=true',
				'./index.php',
				'./data/gubernatorial_2018',
				'./data/gubernatorial_2020',
				'./data/gubernatorial_current',
				'./data/gubernatorial_open',
				'./data/senatorial_2020',
				'./data/senatorial_current',
				'./data/senatorial_open',

				'./style/battlechart.css',
				'./style/battlechartmobile.css',
				'./style/legend.css',
				'./style/mapmenu.css',
				'./style/mobile.css',
				'./style/popup.css',
				'./style/style.css',

				'./res/presidential.svg',
				'./res/usa_congressional_2018.svg',
				'./res/usa_dem_primary.svg',
				'./res/usa_rep_primary.svg',
				'./res/usa_gubernatorial.svg',
				'./res/usa_no_districts.svg',
				'./res/usa_senate.svg',
				'./res/canada_states.svg',
				'./res/lte.svg',
				'./res/lte_senate.svg',
				'./res/lte_house.svg',
				
				'./res/lte.jpg',

				'./src/main.js',
				'./src/mobile.js',
				'./src/presets.js',
				'./src/loadmap.js',
				'./src/htmlControl.js',
				'./src/html2canvas.min.js',
				'./src/data.js',
				'./src/click.js',
				'./src/battlechart.js',
				'./src/State.js',
				'./src/Candidate.js'
			]);
		})
	);
});

self.addEventListener('fetch', function(event) {
	console.log('SW: fetching ' + event.request.url);
	event.respondWith(
		caches.match(event.request)
			.then(function(response) {

				fetch(event.request).then(
					function(response) {
						if(!response || response.status !== 200 || response.type !== 'basic') {
							return;	
						}
						
						caches.open('v1')
						.then(function(cache) {
							console.log('SW: updated cache ' + event.request.url);
							cache.put(event.request, response.clone());
						});
					}
				);
				
				if(response) {
					console.log('SW: fetch return cache ' + event.request.url);
					return response;
				} else {
					console.log('SW: fetch return web ' + event.request.url);
					return fetch(event.request);
				}
			})
			.catch(function(err) {
				console.log('SW: error ' + err + ' ' + event.request.url);
			})
		);
	}
);

self.addEventListener('activate', function(event) {
	console.log('SW: activate');
});
