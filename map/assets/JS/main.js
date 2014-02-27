// костыли...
window.legalBodyClick = false;

/***
* ITEM-CLASS
* ({
*	name: "",
*	review: "", // html-code
*	layout: "", // name of layout, contains this item
*	images: ["", ""], // list of names of images, which are located in the (images/items/)
* })
* .activate(); // makes item visible on map
* .disable(); // hide item from map
*/
	var Item = function(obj) {
		this.pos = {x: obj.pos[0]||0, y: obj.pos[1]||0};

		this.name = obj.name || "Noname";

		review = obj.review || "";
		review = review.replace("<a ", "<a onclick=baloonLinkClicked(event) ");
		this.review = review;
		
		this.layout = obj.layout || "default";

		this.images = [];
		if(obj.images) {
			for(var i = 0; i < obj.images.length; i++) {
				this.images.push("<img src='images/items/"+obj.images[i]+"' />");
			}
		}
		else {
			this.images.push("<img src='images/items/noImage.jpg' />");
		}

		this.active = false;

		return this;
	}
	Item.prototype.activate = function() {this.active = true;}
	Item.prototype.disable = function() {this.active = false;}





/***
* LAYOUT-CLASS
* ({
*	name: "",
*	icon: "", // http://api.yandex.ru/maps/doc/jsapi/1.x/ref/reference/styles.xml
*	image: "", // name of image, which is located in the (images/layouts/)
* })
* .addItem(item); // adds item into layout
*/
	var Layout = function(obj) {
		this.name = obj.name || "default";

		this.icon = obj.icon || "twirl#greyDotIcon";

		if(obj.image) {
			this.image = "images/layouts/"+obj.image;
		}
		else {
			this.image = "images/layouts/default.jpg";
		}

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





/***
* VIEWER-CLASS
* (wrapper to be iserted to)
* .addItem(item); // adds item into Viewer
* .addLayout(layout); // adds layout into Viewer
* 
* .activateItem(layoutName, itemName); // makes item active (able to show on the map)
* .disableItem(layoutName, itemName); // ...
*
* .init(); // inits yandex-maps (contains defaul values inside) !!!!!!!!!
* .update(); // redraws EVERY layout (with items)
* 
* .createView(); // creates view (item-selector)
* 	  .createLayoutsUL();
* 		  .createItemsUL();
*/
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
		var currentViewer = this;
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
								hintContent: currentItem.layout+": "+currentItem.name,
								// balloonContent: currentItem.review
							},
							{
								preset: currentLayout.icon
							}
						);
						placemark.events.add('click', placemarkClicked, {item:currentItem, layout:currentLayout})
						function placemarkClicked() {
						    window.legalBodyClick = true;
						    showFullReview(currentViewer.createItemView(this.layout, this.item));
						}
						this.map.geoObjects.add(placemark);
					}
				};
			}
		}
	}



	Viewer.prototype.createItemView = function(layout, item) {
		var view = "";
		view += "<h1>";
			view += "Категория: <span id='layoutName'>"
				view += layout.name;
			view += "</span><br />"
			view += "Объект: <span id='itemName'>"
				view += item.name;
			view += "</span>"
		view += "</h1>";
		view += "<div class='flexsliderWrapper'>";
			view += "<div class='flexslider'>";
				view += "<ul class='slides'>";
					for(var j = 0; j < item.images.length; j++) {
						view += "<li>"
							view += item.images[j];
						view += "</li>"
					}
				view += "</ul>"
			view += "</div>"
		view += "</div>"
		view += item.review;
		return view;
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
					ul += this.createItemView(layout, currentItem);
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
					ul += "<li style=\"background-image:url(\'"+currentLayout.image+"\');\">";
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





/***
* INITIATORS
* accordionInit()
* flexSliderInit()
*/
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
	                $this.stop().animate({'width':'125px'},500);
	                $('.heading',$this).stop(true,true).fadeIn();
	                $('.description',$this).stop(true,true).fadeOut(250);
	                $('.bgDescription',$this).stop(true,true).slideUp(350);
	            }
	        );
	    });
	}

	function flexSliderInit() {
		$('.flex-control-nav').remove();
		$('.flex-direction-nav').remove();
		$('.flexslider').flexslider();
	}





/***
* CLICK-EVENTS
* baloonLinkClicked
*     createCinemaView
*     destroyCinemaView
* itemClicked
*     showFullReview
*         addItemOnMap
*         removeItemFromMap
*     hideFullReview
* bodyClicked
*/
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
		showFullReview($(el).parent().find($('.invisible')).html());
	}

	function showFullReview(HTMLText) {
		$('#fullReview .content').html(HTMLText);
		$("#fullReview").css("display", "block");
		$("#fullReview").click(function(event) {
			event.stopPropagation();
		});
		flexSliderInit();
	}

	function hideFullReview() {
		$("#fullReview").css("display", "none");
	}
	function addItemOnMap(el) {
		layoutName = $(el).parent().find("#layoutName").text();
		itemName = $(el).parent().find("#itemName").text();
		map.activateItem(layoutName, itemName);
		hideFullReview();
	}
	function removeItemFromMap(el) {
		layoutName = $(el).parent().find("#layoutName").text();
		itemName = $(el).parent().find("#itemName").text();
		map.disableItem(layoutName, itemName);
		hideFullReview();
	}



	function bodyClicked() {
		if(!window.legalBodyClick) {
			hideFullReview();
			destroyCinemaView();
		}
		window.legalBodyClick = false;
	}










$(document).ready(function() {
	$("body").bind('click', bodyClicked);

	ymaps.ready(function(){
		window.map = new Viewer($("#viewer"));
		map.init();



		map.addLayout(new Layout({
			name: "default"
		}));
		map.addLayout(new Layout({
			name: "red",
			icon: "twirl#redDotIcon",
			image: "red.jpg"
		}));
		map.addLayout(new Layout({
			name: "green",
			icon: "twirl#darkgreenDotIcon",
			image: "green.jpg"
		}));
		map.addLayout(new Layout({
			name: "blue",
			icon: "twirl#blueDotIcon",
			image: "blue.jpg"
		}));



		var testItems = [];
		testItems.push(new Item({
			pos: [56.742679, 37.2132357],
			name: "Красный 1",
			review: "review_1",
			layout: "red"
		}));
		testItems.push(new Item({
			pos: [56.742679, 37.2232357],
			name: "Красный 2",
			review: "review_2",
			layout: "red"
		}));
		testItems.push(new Item({
			pos: [56.742679, 37.2332357],
			name: "Синий 1",
			review: "review_3",
			layout: "blue"
		}));
		testItems.push(new Item({
			pos: [56.742679, 37.2432357],
			name: "Синий 2",
			review: "review_4",
			layout: "blue"
		}));
		testItems.push(new Item({
			pos: [56.742679, 37.2532357],
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
			layout: "green",
			images: [
				"cars.jpg",
				"panda.jpg",
				"toys.jpg",
				"up.jpg",
				"walle.jpg"
			]
		}));


		for (var i = testItems.length - 1; i >= 0; i--) {
			map.addItem(testItems[i]);
			if(testItems[i].name == "Важный объект") testItems[i].activate();
		}
		map.update();
		map.createView();
	});
});
