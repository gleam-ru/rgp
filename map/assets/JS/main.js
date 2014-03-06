// TODO: вынести шаблоны в HTML

$(document).ready(function() {
	ymaps.ready(function() {
		// model
		window.stuff = new Stuff();
		// fills model in constructor
		window.stuffController = new Controller(stuff);
		// on creation needed filled model
		window.stuffView = new View(stuff, stuffController);
	});
});