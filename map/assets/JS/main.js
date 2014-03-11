// TODO: вынести шаблоны в HTML
// TODO: много картинок в описании
$(document).ready(function() {
	ymaps.ready(function() {
		// model
		window.sights = new Sights();
		window.routeModel = new Route();
		// fills model in constructor
		window.controller = new Controller(sights, routeModel);
		// on creation needed filled model
		window.sightsView = new View(sights, routeModel, controller);
	});
});