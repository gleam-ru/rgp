var View = function(model, controller) {
	if(!model) {
		console.error('unknown model');
		return;
	}
	this.model = model;

	if(!controller) {
		console.error('unknown controller');
		return;
	}
	this.controller = controller;



	var body = $('body');
	
	this.mapWrapper = "#stuff";

	// left list of categories tree
	this.categoriesWrapper = "#categories";

	// page with review of item
	this.fullReviewWrapper = "#fullReview";

	// youtube-frame
	this.ytLayer = "#ytLayer";
		this.cinemaShadow = "#shadow";
	
	// event.stopPropagation() not works correctly
	this.legalBodyClick = false;



	// categories template (left list)
	if(!$(this.categoriesWrapper).length) body.append("<div id='"+this.categoriesWrapper.replace('#', '')+"'></div>");
	var categoriesTemplate = Handlebars.compile("\
		<h1>Выберите категорию</h1>\
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
	");
	$(this.categoriesWrapper).html(categoriesTemplate(this.getCategoriesStructure()));

	// fullReview template 
	if(!$(this.fullReviewWrapper).length) body.append("<div id='"+this.fullReviewWrapper.replace('#', '')+"'></div>");
	this.fullReviewTemplate = Handlebars.compile("\
		{{#item}}\
		<div class='content'>\
			<h1>\
				Категория: <span id='categoryName'>{{category}}</span>\
				<br />\
				Объект: <span id='itemName'>{{name}}</span>\
			</h1>\
			{{#if images}}\
			<div class='flexsliderWrapper'>\
				<div class='flexslider'>\
					<ul class='slides'>\
						{{#images}}\
						<li>\
							<img src='images/items/{{image}}' />\
						</li>\
						{{/images}}\
					</ul>\
				</div>\
			</div>\
			{{/if}}\
			{{{review}}}\
		</div>\
		<button class='addItemOnMap' data-category='{{category}}' data-item='{{name}}'>\
			Добавить на карту\
		</button>\
		<button class='removeItemFromMap' data-category='{{category}}' data-item='{{name}}'>\
			Убрать с карты\
		</button>\
		{{/item}}\
	");
	$(this.fullReviewWrapper).html(this.fullReviewTemplate(this.getItemData()));



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
			self.hideFullReview();
		}
		self.legalBodyClick = false;
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
	    itemsNode.toggle('fast', function() {});
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
						preset: currentCategory.icon
					}
				);
				placemark.events.add('click', placemarkClicked, {item:currentItem, category:currentCategory})
				function placemarkClicked() {
				    self.legalBodyClick = true;
				    self.showFullReview(this.category, this.item);
				}
				this.map.geoObjects.add(placemark);
			}
		};
	}
}

// shows/hides window with full review
View.prototype.hideFullReview = function() {$(this.fullReviewWrapper).css('display', 'none');}
View.prototype.showFullReview = function(categoryName, itemName) {
	var fullReview = $(this.fullReviewWrapper);
	fullReview.html(this.fullReviewTemplate(this.getItemData(categoryName, itemName)));
	fullReview.css("display", "block");
	// flexSlider init
	$('.flex-control-nav').remove();
	$('.flex-direction-nav').remove();
	$('.flexslider').flexslider();

	// FUNC:
	fullReview.find('.addItemOnMap, .removeItemFromMap').unbind().bind('click', {'self': this}, this.fullReviewButtonClicked);
	// FUNC:
	fullReview.find('a').unbind().bind('click', {'self': this}, this.reviewLinkClicked);
	// FUNC:
	fullReview.unbind().click(function(event) {event.stopPropagation();});
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

	var enableItem = $(this).hasClass("addItemOnMap") ? true : false;
	$(self.categoriesWrapper).find('.itemName').each(function() {
		if($(this).data('item') == itemName && $(this).data('category') == categoryName) {
			$(this).parent().find('input').prop('checked', enableItem).change();
			return;
		}
	});
	self.hideFullReview();
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
		var items = [];
		for(var i = 0; i < currentCategory.items.length; i++)
			items.push({name: currentCategory.items[i].name});
		data.categories.push({
			'name': currentCategory.name,
			'items': items
		});
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