// TODO: вынести шаблоны в HTML
// TODO: много картинок в описании
$(document).ready(function() {
	ymaps.ready(function() {
		// model
		window.sights = new Sights();
		window.route = new Route();
		// fills model in constructor
		window.controller = new Controller(sights, route);
		// on creation needed filled model
		window.sightsView = new View(sights, route, controller);
	});
});