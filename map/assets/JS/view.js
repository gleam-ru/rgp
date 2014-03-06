// TODO: заменить врапперы на айди
var View = function(sightsModel, routeModel, controller) {
	if(!sightsModel || !routeModel) {
		console.error('unknown model');
		return;
	}
	this.model = sightsModel;
	this.route = routeModel;



	if(!controller) {
		console.error('unknown controller');
		return;
	}
	this.controller = controller;



	var body = $('body');
	
	this.mapWrapper = "#sights";

	// left list of categories tree
	this.categoriesId = "tree";

	// page with review of item
	this.fullReviewWrapper = "#fullReview";

	this.processRouteId = "processRoute";

	// youtube-frame
	this.ytLayer = "#ytLayer";
		this.cinemaShadow = "#shadow";
	
	// event.stopPropagation() not works correctly
	this.legalBodyClick = false;

	this.routePointsCounterId = 'routePointsCount';


	// main-menu 
	this.updateRoutePointsCounter();

	// categories template (left list)
	if(!$('#'+this.categoriesId).length) body.append("<div id='"+this.categoriesId+"'></div>");
	var categoriesTemplate = Handlebars.compile("\
		<div class='closer' data-closer-item='"+this.categoriesId+"'></div>\
		<h1><nobr>Выберите категорию</nobr></h1>\
		<div class='"+this.categoriesId+"Wrapper'>\
			<ul class='categoriesContainer'>\
				{{#categories}}\
				<li>\
					<div class='expand'></div>\
					<input type='checkbox' data-category='{{name}}'/>\
					<div class='categoryName'>\
						{{name}}\
					</div>\
					<ul class='itemsContainer'>\
						{{#items}}\
						<li>\
							<input type='checkbox'\
								data-category='{{../name}}'\
								data-item='{{name}}'\
							/>\
							<div class='itemName itemClickableName'\
								data-category='{{../name}}'\
								data-item='{{name}}'\
							>\
								{{name}}\
							</div>\
						</li>\
						{{/items}}\
					</ul>\
				</lа если i>\
				{{/categories}}\
			</ul>\
		</div>\
	");
	$('#'+this.categoriesId).html(categoriesTemplate(this.getCategoriesStructure()));

	// fullReview template 
	this.fullReviewId = this.fullReviewWrapper.replace('#', '');
	if(!$(this.fullReviewWrapper).length) body.append("<div id='"+this.fullReviewId+"'></div>");
	this.fullReviewTemplate = Handlebars.compile("\
		<div class='closer' data-closer-item='"+this.fullReviewId+"'></div>\
		<div class='"+this.fullReviewId+"Wrapper'>\
			{{#item}}\
				{{#if images}}\
					{{#images}}\
						<a href='images/items/{{image}}' class='highslide' onclick='return hs.expand(this)'>\
							<img src='images/items/{{image}}' title='Увеличить' />\
						</a>\
					{{/images}}\
				{{/if}}\
				<h1>\
					Категория: {{category}}\
				</h1>\
				<h1>\
					Объект: {{name}}\
				</h1>\
				<div class='content'>\
					{{{review}}}\
				</div>\
				<button class='addItemToRoute' data-category='{{category}}' data-item='{{name}}'>\
					Добавить в маршрут\
				</button>\
				<button class='addItemOnMap' data-category='{{category}}' data-item='{{name}}'>\
					Добавить на карту\
				</button>\
				<button class='removeItemFromMap' data-category='{{category}}' data-item='{{name}}'>\
					Убрать с карты\
				</button>\
			{{/item}}\
		</div>\
	");
	$(this.fullReviewWrapper).html(this.fullReviewTemplate(this.getItemData()));

	// route template
	if(!$('#'+this.processRouteId).length) body.append("<div class='' id='"+this.processRouteId+"'></div>");
	this.routeTemplate = Handlebars.compile("\
		<div class='closer' data-closer-item='"+this.processRouteId+"'></div>\
		{{#if items}}\
			<h1><nobr>Редактирование маршрута</nobr></h1>\
			<div class='"+this.processRouteId+"Wrapper'>\
				<div class='routeItems'>\
					{{#items}}\
						<div class='item'>\
							<div class='positionName' data-category='{{categoryName}}' data-item='{{itemName}}'>\
								{{categoryName}}: {{itemName}}\
							</div>\
							<div class='positionButtons'>\
								<button class='positionMoveDown' data-category='{{categoryName}}' data-item='{{itemName}}'>\
									Вниз\
								</button>\
								<button class='positionMoveUp' data-category='{{categoryName}}' data-item='{{itemName}}'>\
									Вверх\
								</button>\
								<button class='positionDelete' data-category='{{categoryName}}' data-item='{{itemName}}'>\
									Удалить\
								</button>\
							</div>\
						</div>\
					{{/items}}\
				</div>\
				<button id='routeComplete'>Проложить маршрут</button>\
			</div>\
		{{else}}\
			<h1>Выберите объекты, которые хотите посетить!</h1>\
		{{/if}}\
	");
	$('#'+this.processRouteId).html(this.routeTemplate(this.getRouteData()));



	// inits yandex-map
	var mapId = this.mapWrapper.replace('#', '');
	if(!$(this.mapWrapper).length) $('body').append("<div id='"+mapId+"'></div>");
	this.map = new ymaps.Map(mapId, {
		center: [56.735987, 37.211286],
		zoom: 12,
		behaviors: ["default", "scrollZoom"]
	});
	// this.map.controls
		// .add('zoomControl')
		// .add('typeSelector');

	this.setUpClickEvents();
	this.update();



	return this;
}





/********
***
*** INITIALISATION OF CLICK-EVENTS
***
*********/

View.prototype.setUpClickEvents = function() {
	var self = this;

	$('body').click(function() {
		if(!self.legalBodyClick) {
			// self.hideFullReview();
		}
		self.legalBodyClick = false;
	});

	$('.closer').click(function() {
		var closerItem = $(this).data('closer-item');
		if(closerItem == self.categoriesId) {
			$('#categories').click();
		}
	});

	// main-menu
	$("#categories").click(function() {
		self.hideFullReview();
		$(this).toggleClass("shown");
		$('#'+self.categoriesId).toggle('fast', function() {});
	});
	$("#route").click(function() {
		self.hideFullReview();
		$(this).toggleClass("shown");
		if($(this).hasClass("shown"))
			self.showRoute();
		else
			self.hideRoute();
	});

	// show full review on click on item name in list
	$('.itemClickableName').click(function(event) {
		event.stopPropagation();
		var el = $(event.target);
		var itemName = el.data('item');
		var categoryName = el.data('category');
		self.showFullReview(categoryName, itemName);
	});

	// show all items of category on the map
	$(".categoriesContainer>li>input").change(function() {
		var categoryCheckbox = $(this);
		var active = categoryCheckbox.is(":checked") ? true : false;

		categoryCheckbox.parent().find(".itemsContainer>li>input").each(function() {
			$(this).prop('checked', active);
		});

		var categoryName = categoryCheckbox.data('category');
		var currentCategory = self.model.categories[categoryName];
		var itemsList = currentCategory.items;
		var categoryItemList = [];
		for(var i = 0; i < itemsList.length; i++) {
			categoryItemList.push([currentCategory, itemsList[i]]);
		}
		self.controller.setItemsState(categoryItemList, active);

		self.update();
	});

	// show activated item on the map
	$(".itemsContainer>li>input").change(function() {
		var itemCheckbox = $(this);
		var active = itemCheckbox.is(":checked") ? true : false;
		if(!active) {
			// unckecked item -> unchecked category
			itemCheckbox.parent().parent().parent().find(">input[type=checkbox]").prop('checked', false);
		}

		var itemContainer = itemCheckbox.parent().find('.itemName');
		var itemName = itemContainer.data('item');
		var categoryName = itemContainer.data('category');

		self.controller.setItemsState([[categoryName, itemName]], active);

		self.update();
	});

	// categories-toggler
	$(".expand, .categoryName").on('click', function(event) {
		var el = $(event.target);
		var CategoryNode = el.parent();
		window.itemsNode = CategoryNode.find(".itemsContainer");
		itemsNode.parent().toggleClass("opened");
		itemsNode.toggle('normal', function() {});
	});
}





/********
***
*** USER-INITIATED EVENTS
***
*********/

// redraws every item on the map
View.prototype.update = function() {
	var self = this;
	if(!this.map) {
		console.error("unable to find map");
		console.log(this);
		return;
	}
	this.map.geoObjects.each(function(geoObject) { //remove all geoObjects from map
		geoObject.getParent().remove(geoObject);
	});

	for(var key in this.model.categories) if(this.model.categories.hasOwnProperty(key)) {
		var currentCategory = this.model.categories[key];
		for (var i = 0; i < currentCategory.items.length; i++) {
			var currentItem = currentCategory.items[i];
			if(currentItem.active) {
				var placemark = new ymaps.Placemark(
					[currentItem.pos.x, currentItem.pos.y],
					{
						hintContent: currentItem.category+": "+currentItem.name,
						// balloonContent: currentItem.review
					},
					{
				        iconLayout: 'default#image',
				        iconImageHref: currentCategory.icon,
				        iconImageSize: [32, 37],
				        iconImageOffset: [-15, -32]
					}
				);
				// FUNC: placemark clicked
				placemark.events.add('click', placemarkClicked, {item:currentItem, category:currentCategory})
				function placemarkClicked() {
					self.legalBodyClick = true;
					self.showFullReview(this.category.name, this.item.name);
				}
				this.map.geoObjects.add(placemark);
			}
		};
	}
}

// shows/hides window with full review
View.prototype.hideFullReview = function() {$(this.fullReviewWrapper).hide('fast');}
View.prototype.showFullReview = function(categoryName, itemName) {
	var self = this;

	this.hideRoute();
	var fullReview = $(this.fullReviewWrapper);
	fullReview.html(this.fullReviewTemplate(this.getItemData(categoryName, itemName)));
	fullReview.show('normal');

	// FUNC: stop propogation
	fullReview.unbind().click(function(event) {event.stopPropagation();});
	// FUNC: full review closer
	fullReview.find('.closer').unbind().click(function() {self.hideFullReview();});
	// FUNC: full review buttons
	fullReview.find('button').unbind().bind('click', {'self': this}, this.fullReviewButtonClicked);
	// FUNC: full review links
	fullReview.find('.content a').unbind().bind('click', {'self': this}, this.reviewLinkClicked);
}

View.prototype.hideRoute = function() {
	$('#'+this.processRouteId).hide('fast');
	$('#route').removeClass('shown');
}
View.prototype.showRoute = function() {
	var self = this;
	var route = $('#'+this.processRouteId);
	route.html(this.routeTemplate(this.getRouteData()));
	route.show('normal');
	// FUNC: route closer
	route.find('.closer').unbind().click(function() {self.hideRoute();});
	// FUNC: view item from route processing window
	route.find('.positionName').unbind().click(function() {
		var categoryName = $(this).data('category');
		var itemName = $(this).data('item');
		self.showFullReview(categoryName, itemName);
	});
	// FUNC: processing route event
	route.find('#routeComplete').unbind().click(function() {
		console.log("Проложить маршрут");
	});
	// FUNC:
	route.find('.positionDelete').unbind().click(function() {
		var categoryName = $(this).data('category');
		var itemName = $(this).data('item');
		self.controller.removeItemFromRoute(categoryName, itemName);
		self.updateRoutePointsCounter();
		self.showRoute();
	});
	// FUNC:
	route.find('.positionMoveUp').unbind().click(function() {
		console.log("Переместить пункт маршрута вверх");
	});
	// FUNC:
	route.find('.positionMoveDown').unbind().click(function() {
		console.log("Переместить пункт маршрута вниз");
	});
}



// if youtube link - createCinemaView(), else - goto href
View.prototype.reviewLinkClicked = function(event) {
	event.preventDefault ? event.preventDefault() : (event.returnValue=false);
	event.stopPropagation ? event.stopPropagation() : (event.returnValue=false);
	var self = event.data.self;
	el = event.target;

	if(el.href.match(/youtube\.com/gi)) { // it`s youtube link
		self.createCinemaView(el.href);
	}
	else {
		location.href = el.href;
	}
}

// shows shadow + frame with youtube video
View.prototype.createCinemaView = function(ytLink) {
	var self = this;
	if(!$(this.cinemaShadow).length) {
		$('body').append("<div id=\""+this.cinemaShadow.replace('#', '')+"\"></div>");
		// FUNC: destroy cinema view
		$(this.cinemaShadow).click(function(event) {
			self.legalBodyClick = true;
			$(self.ytLayer).css("display", "none");
			$(self.ytLayer).empty();
			$(self.cinemaShadow).css("display", "none");
		});
	}
	var shadow = $(this.cinemaShadow);
	shadow.css("display", "block");

	if(!$(this.ytLayer).length)
		$('body').append("<div id=\""+this.ytLayer.replace('#', '')+"\"></div>");
	var ytLayer = $(this.ytLayer);
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

// add/remove buttons events
View.prototype.fullReviewButtonClicked = function(event) {
	this.legalBodyClick = true;

	var self = event.data.self;
	var el = $(event.target);
	var itemName = el.data('item');
	var categoryName = el.data('category');

	if(el.hasClass('addItemOnMap')) {
		$('#'+self.categoriesId).find('.itemName').each(function() {
			if($(this).data('item') == itemName && $(this).data('category') == categoryName) {
				$(this).parent().find('input').prop('checked', true).change();
				return;
			}
		});
		self.hideFullReview();
	}
	else if(el.hasClass('removeItemFromMap')) {
		$('#'+self.categoriesId).find('.itemName').each(function() {
			if($(this).data('item') == itemName && $(this).data('category') == categoryName) {
				$(this).parent().find('input').prop('checked', false).change();
				return;
			}
		});
		self.hideFullReview();
	}
	else if(el.hasClass('addItemToRoute')) {
		// TODO: ошибка о невозможности добавления
		if(self.controller.addItemToRoute(categoryName, itemName))
			self.updateRoutePointsCounter();
		el.hide();
	}

}

View.prototype.updateRoutePointsCounter = function() {
	$('#'+this.routePointsCounterId).html('('+this.route.items.length+')')
}



/********
***
*** GETTING DATA FROM MODEL
***
*********/

View.prototype.getCategoriesStructure = function() {
	// returned data will be like this:
	var data = {
		categories: [{
			name: "",
			items: [
				{name: ""}
			]
		}]
	};

	data.categories = [];
	for(var key in this.model.categories) if(this.model.categories.hasOwnProperty(key)) {
		var currentCategory = this.model.categories[key];
		if(currentCategory.items.length) {
			var items = [];
			for(var i = 0; i < currentCategory.items.length; i++)
				items.push({name: currentCategory.items[i].name});
			data.categories.push({
				'name': currentCategory.name,
				'items': items
			});
		}
	}
	return data;
}

View.prototype.getItemData = function(categoryName, itemName) {
	// returned data will be like this:
	var data = {
		item: {
			category: "categoryName",
			name: "itemName",
			review: "<p>Item not found..."
		}
	};
	
	if(typeof(categoryName) === 'undefined' || typeof(itemName) === 'undefined') return data;
	for(var key in this.model.categories) if(this.model.categories.hasOwnProperty(key)) {
		var currentCategory = this.model.categories[key];
		if(currentCategory.name == categoryName) {
			for(var i = 0; i < currentCategory.items.length; i++)
				if(currentCategory.items[i].name == itemName) {
					var currentItem = currentCategory.items[i];
					var images = [];
					for(var ii = 0; ii < currentItem.images.length; ii++)
						images.push({image: currentItem.images[ii]});
					data.item.category = categoryName;
					data.item.name = itemName;
					if(images.length) data.item.images = images;
					data.item.review = currentItem.review;
					break;
				}
			break;
		}
	}
	return data;
}

View.prototype.getRouteData = function() {
	// returned data will be like this:
	var data = {
		items: [{
			categoryName: "",
			itemName: ""
		}]
	}
	data = {};
	data.items = [];
	for(var i = 0; i < this.route.items.length; i++) {
		data.items.push({
			categoryName: this.route.items[i][0],
			itemName: this.route.items[i][1]
		});
	}
	return data;
}