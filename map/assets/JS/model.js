var Item = function(obj) {
	this.pos = {x: obj.pos[0]||0, y: obj.pos[1]||0};

	this.name = obj.name || "Noname";

	review = obj.review || "";
	this.review = review;
	
	this.category = obj.category || "default";

	this.images = [];
	if(obj.images)
		for(var i = 0; i < obj.images.length; i++)
			this.images.push(obj.images[i]);

	this.active = false;
	// this.active = true;

	return this;
}



var Category = function(obj) {
	if(!obj) obj = {};
	this.name = obj.name || "default";

	// http://api.yandex.ru/maps/doc/jsapi/2.x/ref/reference/option.presetStorage.xml
	this.icon = obj.icon || "twirl#greyDotIcon";

	this.items = [];

	return this;
}



var Sights = function() {
	this.categories = {};

	// default category:
	var defaultCategory = new Category();
	this.categories[defaultCategory.name] = defaultCategory;
	
	return this;
}





/********
***
*** ROUTE FUNCTIONALITY
*** (temp cookie data)
***
*********/

var Route = function() {
	this.items = []; // list of category-items [categoryName, itemName]
	return this;
}
Route.prototype.toString = function() {
	var routeString = "";
	for(var i = 0; i < this.items.length; i++)
		routeString+='<CATEGORY->'+this.items[i][0]+'<ITEM->'+this.items[i][1];
	return routeString;
}