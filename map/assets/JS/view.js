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

	this.mapWrapper = "#stuff";
	this.categoriesWrapper = "#categories";
	this.fullReviewWrapper = "#fullReview";
	this.cinemaShadow = "#shadow";
	this.ytLayer = "#ytLayer";

	// inits yandex-map
	this.map = this.createMap();
	// list on categories-items
	this.createView();
	// puts pointers on map
	this.update();


	this.legalBodyClick = false;
	var currentView = this;
	$('body').click(function() {
		if(!currentView.legalBodyClick) {
			currentView.hideFullReview();
		}
		currentView.legalBodyClick = false;
	});


	return this;
}

View.prototype.createMap = function() {
	var mapId = this.mapWrapper.replace('#', '');
	if(!$(this.mapWrapper).length) {
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
	if(!$(currentView.categoriesWrapper).length) {
		// first init
		$('body').append("<div id=\"categories\"></div>");
	}
	categories = $(currentView.categoriesWrapper);

	categories.append("<h1>Выберите категорию</h1>");

	var ul = this.createCategoriesUL();
	categories.append($(ul));
	// FUNC:
	$('.itemClickableName').click(function(event) {
		// show full review on click on item name in list
		event.stopPropagation();
		var el = $(event.target);
		var itemName = el.data('item');
		var categoryName = el.data('category');
		currentView.showFullReview(categoryName, itemName);
	});
	// FUNC:
	$(".categoriesContainer>li>input").change(function() {
		// show all items of category
		var categoryCheckbox = $(this);
		var active = categoryCheckbox.is(":checked") ? true : false;

		categoryCheckbox.parent().find(".itemsContainer>li>input").each(function() {
			$(this).prop('checked', active);
		});

		var categoryName = categoryCheckbox.parent().find(".categoryName").text();
		var currentCategory = currentView.model.categories[categoryName];
		var itemsList = currentCategory.items;
		var categoryItemList = [];
		for(var i = 0; i < itemsList.length; i++) {
			categoryItemList.push([currentCategory, itemsList[i]]);
		}
		currentView.controller.setItemsState(categoryItemList, active);

		currentView.update();
	});
	// FUNC:
	$(".itemsContainer>li>input").change(function() {
		// show activated item
		window.itemCheckbox = $(this);
		var active = itemCheckbox.is(":checked") ? true : false;
		if(!active) {
			itemCheckbox.parent().parent().parent().find(">input[type=checkbox]").prop('checked', false);
		}

		var itemName = itemCheckbox.parent().find(".itemName").text();
		var categoryName = itemCheckbox.parent().parent().parent().find(".categoryName").text();

		currentView.controller.setItemsState([[categoryName, itemName]], active);

		currentView.update();
	});
	// FUNC:
	$(".expand, .categoryName").on('click', function(event) {
	    var el = $(event.target);
	    var CategoryNode = el.parent();
	    window.itemsNode = CategoryNode.find(".itemsContainer");
	    itemsNode.parent().toggleClass("opened");
	    itemsNode.toggle('fast', function() {});
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
				    currentView.legalBodyClick = true;
				    currentView.showFullReview(this.category, this.item);
				}
				this.map.geoObjects.add(placemark);
			}
		};
	}
}

View.prototype.hideFullReview = function() {
	$(this.fullReviewWrapper).css("display", "none");
}
View.prototype.showFullReview = function(category, item) {
	currentView = this;
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
	if(currentItem.images.length) {
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
	}
	review += currentItem.review;

	if(!$(this.fullReviewWrapper).length) {
		// first init
		var fullReviewElem = "";
		fullReviewElem += "<div id=\"fullReview\">"
			fullReviewElem += "<div class=\"content\"></div>"
			fullReviewElem += "<button class='addItemOnMap'>Добавить на карту</button>"
			fullReviewElem += "<button class='removeItemFromMap'>Убрать с карты</button>"
		fullReviewElem += "</div>"
		$('body').append(fullReviewElem);

		// FUNC:
		$('.addItemOnMap, .removeItemFromMap').click(function(event) {
			this.legalBodyClick = true;
			var el = $(event.target);
			var itemName = el.parent().find('#itemName').text();
			var categoryName = el.parent().find('#categoryName').text();

			var enableItem = $(this).hasClass("addItemOnMap") ? true : false;
			$(currentView.categoriesWrapper).find('>ul>li').each(function() {
				if($(this).find('.categoryName').text() == categoryName) {
					$(this).find('.itemName').each(function() {
						if($(this).text() == itemName) {
							$(this).parent().find('input').prop('checked', enableItem).change();
						}
					});
				}
			});
			currentView.hideFullReview();
		});
	}

	var fullReviewElem = $(currentView.fullReviewWrapper);
	fullReviewElem.find('.content').html(review);
	fullReviewElem.css("display", "block");
	// FUNC:
	$(currentView.fullReviewWrapper).find('a').bind('click', {'view': currentView}, currentView.reviewLinkClicked);
	// FUNC:
	fullReviewElem.unbind().click(function(event) {event.stopPropagation();});

	flexSliderInit();
}

View.prototype.setItemChecked = function(categoryName, itemName, checked) {
}



function flexSliderInit() {
	$('.flex-control-nav').remove();
	$('.flex-direction-nav').remove();
	$('.flexslider').flexslider();
}





View.prototype.reviewLinkClicked = function(event) {
	event.preventDefault ? event.preventDefault() : (event.returnValue=false);
	event.stopPropagation ? event.stopPropagation() : (event.returnValue=false);

	el = event.target;
	if(el.href.match(/youtube\.com/gi)) { // it`s youtube link
		event.data.view.createCinemaView(el.href);
	}
	else {
		location.href = el.href;
	}
}

View.prototype.createCinemaView = function(ytLink) {
	var currentView = this;
	if(!$(this.cinemaShadow).length) {
		$('body').append("<div id=\""+this.cinemaShadow+"\"></div>");
	}
	var shadow = $(this.cinemaShadow);
	shadow.css("display", "block");
	shadow.unbind().click(function(event) {
		event.stopPropagation();
		currentView.destroyCinemaView();
	});

	if(!$(this.ytLayer).length) {
		$('body').append("<div id=\""+this.ytLayer+"\"></div>");
	}
	var ytLayer = $(this.ytLayer);
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

View.prototype.destroyCinemaView = function() {
	$(this.ytLayer).css("display", "none");
	$(this.ytLayer).empty();
	$(this.cinemaShadow).css("display", "none");
}