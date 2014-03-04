// костыли...
window.legalBodyClick = false;

var Controller = function(model) {
	if(!model) {
		console.error('unknown model');
		return;
	}
	this.model = model;
	return this;
}





	
// adds new category into Stuff
Controller.prototype.addCategory = function(category) {
	if(!category) {
		console.error('unknown category');
		return;
	}
	this.model.categories[category.name] = category;
}

Controller.prototype.addItem = function(item) {
	if(item) {
		var itemCategoryName = item.category;
		var added = false;
		for(var key in this.model.categories) if(this.model.categories.hasOwnProperty(key)) {
			var currentCategory = this.model.categories[key];
			if(currentCategory.name == itemCategoryName) {
				currentCategory.items.push(item);
				added = true;
				break;
			}
		}
		if(!added) { // unknown category -> default 
			this.model.categories["default"].items.push(item);
		}
	}
}






// active items are shown on the map
// [[category, item], [..., ...]]
Controller.prototype.setItemsState = function(categoryItemList, state) {
	console.log(categoryItemList);
	state = state || true;
	if(!categoryItemList) {
		console.error('unable to activate items');
		return;
	}
	for(var i = 0; i < categoryItemList.length; i++) {
		var currentCategory = categoryItemList[i][0];
		var currentItem = categoryItemList[i][0];
		if(typeof(currentCategory.name) === "undefined") {
			// it is only NAMES of category and item...
			currentCategory = this.model.categories[currentCategory];
			for(var ii = 0; ii < currentCategory.items.length; ii++) {
				if(currentCategory.items[i].name == currentItem) {
					currentItem = currentCategory.items[i];
					break;
				}
			}
		}
		currentItem.active = state;
	}
}






/***
* CLICK-EVENTS
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



function bodyClicked() {
	if(!window.legalBodyClick) {
		hideFullReview();
		destroyCinemaView();
	}
	window.legalBodyClick = false;
}
