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

	this.map = this.createMap();

	return this;
}

View.prototype.createMap = function() {
	var mapId = "stuff";
	if(!$("#stuff").length) {
		$('body').append("<div id='"+mapId+"'></div>");
	}
	var map = new ymaps.Map(mapId, {
		center: [56.735987, 37.211286],
		zoom: 12,
		behaviors: ["default", "scrollZoom"]
	});

	map.controls
		// .add('zoomControl')
		.add('typeSelector');

	return map;
}





View.prototype.createView = function() {
	var currentView = this;
	if(!$('#categories').length) {
		// first init
		$('body').append("<div id=\"categories\"></div>");
	}
	var ul = this.createCategoriesUL();
	$('#categories').append($(ul));
	// FUNC:
	$('.itemClickableName').click(function(event) {
		// console.error('qq');
		event.stopPropagation();
		var el = $(event.target);
		// console.log(el);

		var itemName = el.data('item');
		var categoryName = el.data('category');
		// console.log(itemName, categoryName);

		currentView.showFullReview(categoryName, itemName);
	});
}
View.prototype.createCategoriesUL = function() {
	var ul = "";
	ul += "<ul class='categoriesContainer'>"
	for(var key in this.model.categories) if(this.model.categories.hasOwnProperty(key)) {
		var currentCategory = this.model.categories[key];
		if(currentCategory.items.length) { // disable empty categories
				ul += "<li>";
					ul += "<div class='expand'></div>";
					ul += "<input type='checkbox'/>";
					ul += "<div class='categoryName'>";
						ul += currentCategory.name;
					ul += "</div>";
					ul += this.createItemsUL(currentCategory);
				ul += "</li>"
			ul += "</div>";
		}
	}
	ul += "</ul>"
	return ul;
}
View.prototype.createItemsUL = function(category) {
	var ul = "";
	ul += "<ul class='itemsContainer'>"
	for(var i = 0; i < category.items.length; i++) {
		var currentItem = category.items[i];
		ul += "<li>"
			if(currentItem.active)
				ul += "<input type='checkbox' checked/>";
			else
				ul += "<input type='checkbox'/>";
			ul += "<div class='itemName itemClickableName' data-inline='true' data-category='"+category.name+"' data-item='"+currentItem.name+"'>";
				ul += currentItem.name
			ul += "</div>";
		ul += "</li>"
	}
	ul += "</ul>"
	return ul;
}







// redraws every item on the map
View.prototype.update = function() {
	var currentView = this;
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
				    window.legalBodyClick = true;
				    currentView.showFullReview(this.category, this.item);
				}
				this.map.geoObjects.add(placemark);
			}
		};
	}
}

View.prototype.hideFullReview = function() {
	console.error('qq');
	$("#fullReview").css("display", "none");
}
View.prototype.showFullReview = function(category, item) {
	// console.error('qq');

	if(!category || !item) {
		console.error('unknown item or category');
		return;
	}
	var currentView = this;
	var currentItem = item;
	var currentCategory = category;
	if(typeof(category.name) === "undefined") {
		// it is only NAMES of category and item...
		currentCategory = this.model.categories[currentCategory];
		for(var i = 0; i < currentCategory.items.length; i++) {
			if(currentCategory.items[i].name == currentItem) {
				currentItem = currentCategory.items[i];
				break;
			}
		}
	}

	var review = "";
	review += "<h1>";
		review += "Категория: <span id='categoryName'>"
			review += currentCategory.name;
		review += "</span><br />"
		review += "Объект: <span id='itemName'>"
			review += currentItem.name;
		review += "</span>"
	review += "</h1>";
	review += "<div class='flexsliderWrapper'>";
		review += "<div class='flexslider'>";
			review += "<ul class='slides'>";
				for(var i = 0; i < currentItem.images.length; i++) {
					review += "<li>"
						review += currentItem.images[i];
					review += "</li>"
				}
			review += "</ul>"
		review += "</div>"
	review += "</div>"
	review += currentItem.review;

	if(!$('#fullReview').length) {
		// first init
		var fullReviewElem = "";
		fullReviewElem += "<div id=\"fullReview\">"
			fullReviewElem += "<div class=\"content\"></div>"
			fullReviewElem += "<button class='addItemOnMap'>Добавить на карту</button>"
			fullReviewElem += "<button class='removeItemFromMap'>Убрать с карты</button>"
		fullReviewElem += "</div>"
		$('body').append(fullReviewElem);

		// FUNC:
		$('.addItemOnMap').click(currentView.addItemOnMap(event));
		// FUNC:
		$('.removeItemFromMap').click(currentView.removeItemFromMap(event));

	}

	$('#fullReview .content').html(review);
	$("#fullReview").css("display", "block");
	// FUNC:
	$("#fullReview").unbind().click(function(event) {
		event.stopPropagation();
	});

	flexSliderInit();
}

View.prototype.addItemOnMap = function(event) {
	event.stopPropagation();

	var el = event.target;
	var categoryName = $(el).parent().find("#categoryName").text();
	var itemName = $(el).parent().find("#itemName").text();

	// this.controller.setItemsState([[categoryName, itemName]], true);
	this.hideFullReview();
	this.update();
}
View.prototype.removeItemFromMap = function(event) {
	event.stopPropagation();

	var el = event.target;
	var categoryName = $(el).parent().find("#categoryName").text();
	var itemName = $(el).parent().find("#itemName").text();

	// this.controller.setItemsState([[categoryName, itemName]], false);
	this.hideFullReview();
	this.update();
}


function flexSliderInit() {
	$('.flex-control-nav').remove();
	$('.flex-direction-nav').remove();
	$('.flexslider').flexslider();
}


