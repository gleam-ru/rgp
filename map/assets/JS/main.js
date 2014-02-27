var Item = function(obj) {
	this.pos = {x: obj.pos[0]||0, y: obj.pos[1]||0};

	this.name = obj.name || "Noname";

	review = obj.review || "";
	review = review.replace("<a ", "<a onclick=baloonLinkClicked(event) ");
	this.review = review;
	
	this.layout = obj.layout || "default";

	// this.images = obj.images || ['1', '2', '3'];
	this.images = obj.images || ["", "<img src='images/noImage.png' />"];

	this.active = false;

	return this;
}
Item.prototype.activate = function() {this.active = true;}
Item.prototype.disable = function() {this.active = false;}



var Layout = function(name, icon) {
	if(!arguments[0]) { //noname layout
		name = "default";
	}
	this.name = name;

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
// TODO: redraw EACH layout - bad idea, rly...
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
			for (var j = 0; j < currentLayout.items.length; j++) {
				var currentItem = currentLayout.items[j];
				if(currentItem.active) {
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
				}
			};
		}
	}
}

Viewer.prototype.createItemsUL = function(layout) {
	var ul = "";
	ul += "<ul>"
	for(var i = 0; i < layout.items.length; i++) {
		window.currentItem = layout.items[i];
		ul += "<li>"
			ul += "<h1 onclick=itemClicked(this)>";
				ul += currentItem.name
			ul += "</h1>";
			ul += "<div class='invisible'>";
				ul += "<h1>";
					ul += "Категория: <span id='layoutName'>"
						ul += layout.name;
					ul += "</span><br />"
					ul += "Объект: <span id='itemName'>"
						ul += currentItem.name;
					ul += "</span>"
				ul += "</h1>";
				for(var i = 0; i < currentItem.images.length; i++) {
					var currentItemImage = currentItem.images[i];
					ul += "<ul id='itemPhotos'>";
						ul += "<li>"
							ul += currentItemImage;
						ul += "</li>"
					ul += "</ul>"
				}
				ul += currentItem.review;
			ul += "</div>";
		ul += "</li>"
	}
	ul += "</ul>"
	return ul;
}
Viewer.prototype.createLayoutsUL = function() {
	var ul = "";
	ul += "<ul class='accordion'>"
	for(var key in this.layouts) if(this.layouts.hasOwnProperty(key)) {
		var currentLayout = this.layouts[key];
		if(currentLayout.items.length) { // disable empty layouts
				ul += "<li>"
					ul += "<div class='heading'>";
						ul += currentLayout.name;
					ul += "</div>";
					ul += "<div class='bgDescription'></div>"; // accordion wants it
					ul += "<div class='description'>";
					ul += "<h2>"
						ul += currentLayout.name;
					ul += "</h2>"
					ul += this.createItemsUL(currentLayout);
				ul += "</li>"
			ul += "</div>";
		}
	}
	ul += "</ul>"
	return ul;
}
Viewer.prototype.createView = function() {
	window.ul = this.createLayoutsUL();
	$('body').append($(ul));
	accordionInit();
}

Viewer.prototype.activateItem = function(layoutName, itemName) {
	var currentLayout = this.layouts[layoutName];
	if(currentLayout) {
		for(var i = 0; i < currentLayout.items.length; i++) {
			var currentItem = currentLayout.items[i];
			if(currentItem.name == itemName) currentItem.activate();
		}
	}
	this.update();
}
Viewer.prototype.disableItem = function(layoutName, itemName) {
	var currentLayout = this.layouts[layoutName];
	if(currentLayout) {
		for(var i = 0; i < currentLayout.items.length; i++) {
			var currentItem = currentLayout.items[i];
			if(currentItem.name == itemName) currentItem.disable();
		}
	}
	this.update();
}











function accordionInit() {
    $(function() {
    	$('.accordion').click(function(event) {
    		event.stopPropagation();
    	});
        $('.accordion > li').hover(
            function () {
                var $this = $(this);
                $this.stop().animate({'width':'480px'},300);
                $('.heading',$this).stop(true,true).fadeOut();
                $('.bgDescription',$this).stop(true,true).slideDown(300);
                $('.description',$this).stop(true,true).fadeIn();
            },
            function () {
                var $this = $(this);
                $this.stop().animate({'width':'115px'},500);
                $('.heading',$this).stop(true,true).fadeIn();
                $('.description',$this).stop(true,true).fadeOut(250);
                $('.bgDescription',$this).stop(true,true).slideUp(350);
            }
        );
    });
}

function createCinemaView(ytLink) {
	var body = $("body");
	if($("#shadow")) {
		$("#shadow").css("display", "block");
		$("#shadow").unbind().click(function(event) {
			event.stopPropagation();
			destroyCinemaView();
		});
	}
	var ytLayer = $("#ytLayer");
	if(ytLayer) {
		ytLayer.css("z-index", "40");
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
	}
	else {
		console.error("unable to show YT video - there is no '#ytLayer' containter");
	}
}

function destroyCinemaView() {
	$("#ytLayer").css("display", "none");
	$("#ytLayer").empty();
	$("#shadow").css("display", "none");
}

function itemClicked(el) {
	showFullReview($(el).parent().find($('.invisible')));
}

function showFullReview(el) {
	$('#fullReview .content').html($(el).html());
	$("#fullReview").css("display", "block");
	$("#fullReview").click(function(event) {
		event.stopPropagation();
	});
	// добавить кнопку активации айтема
}
function hideFullReview() {
	$("#fullReview").css("display", "none");
}

function bodyClicked() {
	hideFullReview();
	destroyCinemaView();
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

function addItemOnMap(el) {
	// TODO: как связать эту функцию с Viewer?
	layoutName = $(el).parent().find("#layoutName").text();
	itemName = $(el).parent().find("#itemName").text();
	map.activateItem(layoutName, itemName);
}
function removeItemFromMap(el) {
	// TODO: как связать эту функцию с Viewer?
	layoutName = $(el).parent().find("#layoutName").text();
	itemName = $(el).parent().find("#itemName").text();
	map.disableItem(layoutName, itemName);
}













$(document).ready(function() {
	$("body").bind('click', bodyClicked);

	ymaps.ready(function(){
		window.map = new Viewer($("#viewer"));
		map.init();

		map.addLayout(new Layout("default"));
		map.addLayout(new Layout("red", "twirl#redDotIcon"));
		map.addLayout(new Layout("green", "twirl#darkgreenDotIcon"));
		map.addLayout(new Layout("blue", "twirl#blueDotIcon"));

		var testItems = [];
		testItems.push(new Item({
			pos: [56.742679, 37.2332357],
			name: "Красный 1",
			review: "review_1",
			layout: "red"
		}));
		testItems.push(new Item({
			pos: [56.742679, 37.2932357],
			name: "Красный 2",
			review: "review_2",
			layout: "red"
		}));
		testItems.push(new Item({
			pos: [56.742679, 37.2832357],
			name: "Синий 1",
			review: "review_3",
			layout: "blue"
		}));
		testItems.push(new Item({
			pos: [56.742679, 37.2732357],
			name: "Синий 2",
			review: "review_4",
			layout: "blue"
		}));
		testItems.push(new Item({
			pos: [56.742679, 37.2632357],
			name: "Синий 3",
			review: "review_5",
			layout: "blue"
		}));
		testItems.push(new Item({
			pos: [56.732679, 37.2632357],
			name: "Важный объект",
			review: "" +
				"<p>Радиант, в первом приближении, недоступно решает метеорит, тем не менее, Дон Еманс включил в список всего 82-е Великие Кометы.</p>" +
				"<p>В отличие от пылевого и ионного хвостов, противостояние однородно дает азимут, а оценить проницательную способность вашего телескопа поможет следующая формула</p>" +
				"<p>Небесная сфера традиционно меняет вращательный маятник Фуко.</p>" +
				"<p><a href='http://www.youtube.com/watch?v=sZwmo_2DOz0'>Видео</a></p>",
			layout: "green"
		}));

		for (var i = testItems.length - 1; i >= 0; i--) {
			map.addItem(testItems[i]);
		};

		map.update();
		map.createView();
	});
});