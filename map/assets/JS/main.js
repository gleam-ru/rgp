var Item = function(x, y, review, layout) {
	if(!arguments[0] || !arguments[1]) { //there is no 'position'
		console.error('trying to init ITEM without position');
		pos = {x: 0, y: 0};
	}
	else {
		pos = {x: x, y: y};
	}
	this.pos = pos;

	if(!arguments[2]) { //there is no 'review'
		review = "";
	}
	review = review.replace("<a ", "<a onclick=baloonLinkClicked(event) ");
	this.review = review;
	
	var matches = review.match(/[^<h1>]+(?=<\/h1>)/g); // first h1.text() is popup
	if(matches)
		this.name = matches[0];
	else
		this.name = "";

	if(!arguments[3]) { // there is no 'layout'
		layout = "default";
	}
	this.layout = layout;

	return this;
}



var Layout = function(name, icon) {
	if(!arguments[0]) { //noname layout
		name = "default";
	}
	this.name = name;
	this.enabled = true;

	if(!arguments[1]) {
		icon = 'twirl#greyDotIcon';
	}
	this.icon = icon;

	this.items = [];

	return this;
}
Layout.prototype.addItem = function(item) {
	if(!item) return;
	this.items.push(item);
}
Layout.prototype.enable = function() {this.enabled = true;}
Layout.prototype.disable = function() {this.enabled = false;}
// TODO: redraw every layout - bad idea, rly...
Layout.prototype.show = function() {};
Layout.prototype.hide = function() {};



var Viewer = function(elElement) {
	if(elElement) {
		this.el = elElement;
		this.layouts = {};
		return this;
	}
	else {
		console.error("unable to create Viewer - HTML element is not given");
	}
}

// adds item into viewer
Viewer.prototype.addItem = function(item) {
	if(item) {
		var itemLayoutName = item.layout;
		var added = false;
		for(var key in this.layouts) {
			if(this.layouts.hasOwnProperty(key)) {
				var currentLayout = this.layouts[key];
				if(currentLayout.name == itemLayoutName) {
					currentLayout.addItem(item);
					added = true;
					break;
				}
			}
		}
		if(!added) { // unknown layout -> default 
			this.layouts["default"].addItem(item);
		}
	}
}

// adds new layout into viewer
Viewer.prototype.addLayout = function(layout) {
	if(!layout) return;
	this.layouts[layout.name] = layout;
}

// initial map position, zoom, etc...
Viewer.prototype.init = function() {
	this.map = new ymaps.Map(this.el.attr("id"), {
		center: [56.735987, 37.211286],
		zoom: 12,
		behaviors: ["default", "scrollZoom"]
	});

	this.map.controls
		.add('zoomControl')
		.add('typeSelector');
}

// redraws EACH layout
Viewer.prototype.update = function() {
	this.map.geoObjects.each(function(geoObject) { //remove all geoObjects from map
		geoObject.getParent().remove(geoObject);
	});

	for(var key in this.layouts) {
		if(this.layouts.hasOwnProperty(key)) {
			var currentLayout = this.layouts[key];
			if(currentLayout.enabled) {
				for (var j = 0; j < currentLayout.items.length; j++) {
					var currentItem = currentLayout.items[j];
					var placemark = new ymaps.Placemark(
						[currentItem.pos.x, currentItem.pos.y],
						{
							hintContent: currentItem.name,
							balloonContent: currentItem.review
						},
						{
							preset: currentLayout.icon
						}
					);
					this.map.geoObjects.add(placemark);
				};

			}
		}
	}
}

// creates HTML-list of non-empty layouts
Viewer.prototype.createLayoutList = function(el) {
	if(el) {
		$("<ul></ul>").appendTo(el);
		var list = el.find("ul");
		for(var key in this.layouts) {
			if(this.layouts.hasOwnProperty(key)) {
				var currentLayout = this.layouts[key];
				if(currentLayout.items.length) { // disable empty layouts
					var enabled = "";
					if(currentLayout.enabled) 
						enabled += " checked"
					$("<li><input type='checkbox'"+enabled+">"+currentLayout.name+"</li>").appendTo(list);
				}
			}
		}
		var Map = this;
		list.find("input").each(function() {
			$(this).click(function() {
				var layoutName  = $(this).parent().text();
				if(Map.layouts[layoutName].enabled) 
					Map.layouts[layoutName].disable();
				else
					Map.layouts[layoutName].enable();
				Map.update();
			});
		});
	}
}



// creates cinema-view or simply leaves the page
function baloonLinkClicked(event) {
	event.preventDefault ? event.preventDefault() : (event.returnValue=false);
	event.stopPropagation ? event.stopPropagation() : (event.returnValue=false);
	el = event.target;
	if(el.href.match(/youtube\.com/gi)) { // it`s youtube link
		createCinemaView(el.href);
	}
	else {
		location.href = el.href;
	}
}

function createCinemaView(ytLink) {
	var main = $("#main");
	if(main) {
		var ytLayer = $("#ytLayer");
		if(ytLayer) {
			var ytVideoId = ytLink.match(/\?v=([\w\d]+)/gi)[0].substring(3);
			var ytFrame = ""+
				"<iframe " +
					"width='640' "+
					"height='360' "+
					"src='http://www.youtube.com/embed/"+ytVideoId+"?"+
					"&autoplay=1"+
				"'><iframe>"
			$(ytFrame).appendTo(ytLayer);
			ytLayer.css("display", "block");
			main.css('opacity', '0.2');
			$('body').unbind().click(function() {
				destroyCinemaView();
			});
		}
		else {
			console.error("unable to show YT video - there is no '#ytLayer' containter");
		}
	}
}

function destroyCinemaView() {
	var main = $("#main");
	if(main) {
		main.css('opacity', '1');
		$("#ytLayer").css("display", "none");
		$("#ytLayer").empty();
		main.unbind();
	}
}





$(document).ready(function() {
	ymaps.ready(function(){
		window.map = new Viewer($("#viewer"));
		map.init();

		map.addLayout(new Layout("default"));
		map.addLayout(new Layout("red", "twirl#redDotIcon"));
		map.addLayout(new Layout("green", "twirl#darkgreenDotIcon"));
		map.addLayout(new Layout("blue", "twirl#blueDotIcon"));

		var testItems = [];
		testItems.push(new Item(56.742679, 37.2332357, "review1", "red"));
		testItems.push(new Item(56.742679, 37.2832357, "review2", "blue"));
		testItems.push(new Item(56.742679, 37.2732357, "review3", "blue"));
		testItems.push(new Item(56.742679, 37.2632357, "review4", "blue"));
		testItems.push(new Item(
			56.732679, 37.2632357,
			"<h1>Заголовок</h1>" +
			"<p>Радиант, в первом приближении, недоступно решает метеорит, тем не менее, Дон Еманс включил в список всего 82-е Великие Кометы.</p>" +
			"<p>В отличие от пылевого и ионного хвостов, противостояние однородно дает азимут, а оценить проницательную способность вашего телескопа поможет следующая формула</p>" +
			"<p>Небесная сфера традиционно меняет вращательный маятник Фуко.</p>" +
			"<p><a href='http://www.youtube.com/watch?v=sZwmo_2DOz0'>Подробное описание</a></p>" +
			"",
			"green"
			));
		for (var i = testItems.length - 1; i >= 0; i--) {
			map.addItem(testItems[i]);
		};

		map.update();
		map.createLayoutList($("#layoutList"));
	});
});